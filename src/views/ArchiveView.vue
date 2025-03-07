<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import DateDisplay from '@/components/dateDisplay.vue'
import { useUserStore } from '@/stores/userStore.js'
import { useChallengeStore } from '@/stores/challengeStore.js'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const challengeStore = useChallengeStore()
const router = useRouter()
const today = new Date()
const selectedDate = ref(null)
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

// Restore user from localStorage on refresh
onMounted(async () => {
  const storedUser = JSON.parse(localStorage.getItem('currentUser'))
  if (storedUser) {
    userStore.currentUser = storedUser
  } else if (storedUser === undefined || storedUser === null){
    router.push('/')
  }

  if (!challengeStore.challenges.length) {
    await challengeStore.fetchChallenges()
  }
})

// Handle date selection
const selectDate = (date) => {
  selectedDate.value = date.toLocaleDateString('sv-SE')
}

// Get completed tasks
const completedTasks = computed(() => {
  if (!userStore.currentUser || !selectedDate.value) return []

  return userStore.currentUser.completedTasks
    .filter((task) => task.dateCompleted === selectedDate.value)
    .map((task) => challengeStore.getChallengeById(task.id))
    .filter((task) => task && task.id)
})

// Change Month Logic
const changeMonth = (step) => {
  currentMonth.value += step
  if (currentMonth.value < 0) {
    currentMonth.value = 11
    currentYear.value--
  } else if (currentMonth.value > 11) {
    currentMonth.value = 0
    currentYear.value++
  }
}

// Generate Days in Month
const daysInMonth = computed(() => {
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  return Array.from(
    { length: lastDay.getDate() },
    (_, i) => new Date(currentYear.value, currentMonth.value, i + 1),
  )
})

const isToday = (date) => {
  const todayDate = new Date()
  return (
    date.getDate() === todayDate.getDate() &&
    date.getMonth() === todayDate.getMonth() &&
    date.getFullYear() === todayDate.getFullYear()
  )
}

// Responsive dateDisplay for mobile view
const isMobile = ref(window.innerWidth <= 390)
onMounted(() => {
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 390
  })
})

  // Get the challenge that would have been available on the selected date
  const taskForSelectedDate = computed(() => {
    if (!selectedDate.value || !userStore.currentUser?.registrationDate) return null;

    // Convert dates to JavaScript Date objects
    const selectedDateObj = new Date(selectedDate.value.split('.').reverse().join('-'));
    const regDate = new Date(userStore.currentUser.registrationDate);

    // Calculate days between registration date and selected date
    const diffTime = selectedDateObj - regDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 as day 1 is registration day

    if (diffDays <= 0 || diffDays > challengeStore.challenges.length) return null;

    return challengeStore.challenges.find(c => c.date === diffDays);
  });

  // Check if the task for the selected date was missed
  const wasTaskMissed = computed(() => {
    if (!taskForSelectedDate.value || !selectedDate.value) return false;
    const isCompleted = completedTasks.value.some(task => task.id === taskForSelectedDate.value.id);
    return !isCompleted;
  });

  // Check if a date is the registration day
  const isRegistrationDay = (date) => {
    if (!userStore.currentUser?.registrationDate) return false;
    const regDate = new Date(userStore.currentUser.registrationDate);
    return (
      date.getDate() === regDate.getDate() &&
      date.getMonth() === regDate.getMonth() &&
      date.getFullYear() === regDate.getFullYear()
    );
  };

  // Check if a date is before registration
  const isBeforeRegistration = (date) => {
    if (!userStore.currentUser?.registrationDate) return false;
    const regDate = new Date(userStore.currentUser.registrationDate);
    return date < regDate;
  };

  // Check if a date is in the future
  const isFutureDay = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };

  // Check if a day has completed challenges
  const isDayCompleted = (date) => {
    if (!userStore.currentUser?.completedTasks) return false;
    return userStore.currentUser.completedTasks.some(task => task.dateCompleted === date.toLocaleDateString('sv-SE'));
  };

  // Check if a day has missed challenges
  const isDayMissed = (date) => {
    if (!userStore.currentUser?.registrationDate) return false;
    if (isFutureDay(date) || isBeforeRegistration(date)) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // If the day is in the past with no completed tasks
    if (date < today && !isDayCompleted(date)) {
      const regDate = new Date(userStore.currentUser.registrationDate);
      const diffDays = Math.floor((date - regDate) / (1000 * 60 * 60 * 24)) + 1;
      return diffDays > 0 && diffDays <= challengeStore.challenges.length;
    }
    return false;
  };

  // Determine if a date can be selected
  const canSelectDate = () => {
    return true;
  };

  // Check if selected date is in future
  const isSelectedDateInFuture = computed(() => {
    if (!selectedDate.value) return false;
    const selectedDateObj = new Date(selectedDate.value.split('.').reverse().join('-'));
    const today = new Date();

    // Reset time on both dates for accurate comparison
    selectedDateObj.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return selectedDateObj > today;
  });

  const isSelectedDateBeforeRegistration = computed(() => {
    if (!selectedDate.value || !userStore.currentUser?.registrationDate) return false;
    const selectedDateObj = new Date(selectedDate.value.split('.').reverse().join('-'));
    const regDate = new Date(userStore.currentUser.registrationDate);
    return selectedDateObj < regDate;
  });
</script>

<template>
  <main class="archive-container">
    <div class="header">
      <h2 class="h2">Arkiverad utmaning</h2>
      <DateDisplay class="date" :showPrefix="!isMobile"/>
    </div>

    <div class="calendar-container">
      <div class="calendar-header">
        <button @click="changeMonth(-1)" class="btn-primary">❮</button>
        <h3 class = "h3">
          {{
            new Date(currentYear, currentMonth).toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })
          }}
        </h3>
        <button @click="changeMonth(1)" class="btn-primary">❯</button>
      </div>

      <div class="calendar-grid">
        <div
          v-for="day in daysInMonth"
          :key="day.toDateString()"
          class="calendar-day"
          :class="{
              'today': isToday(day),
              'registration-day': isRegistrationDay(day),
              'before-registration': isBeforeRegistration(day),
              'future-day': isFutureDay(day),
              'completed-day': isDayCompleted(day),
              'missed-day': isDayMissed(day)
            }"
            @click="canSelectDate(day) ? selectDate(day) : null"
          >
          {{ day.getDate() }}
        </div>
      </div>
    </div>

    <div v-if="selectedDate" class="selected-date">
      <div v-if="isSelectedDateInFuture">
          <h3 class="h3">{{ selectedDate }}</h3>
          <p class="p-medium">Utmaningar blir tillgängliga på dagen de gäller.</p>
        </div>
        <div v-else-if="isSelectedDateBeforeRegistration">
          <h3 class="h3">{{ selectedDate }}</h3>
          <p class="p-medium">Du var inte registrerad detta datum.</p>
        </div>
        <div v-else>
          <h3 class="h3">{{ selectedDate }}</h3>

          <!-- Completed challenges -->
          <div v-if="completedTasks.length > 0">
            <h4 class="completed-header">Grattis!</h4>
            <p class="p-medium">Du klarade denna utmaning.</p>
            <ul>
              <li v-for="task in completedTasks" :key="task.id" class="completed-task">
                <div class="task-content">
                  <h3>{{ task.title }}</h3>
                  <p>{{ task.description }}</p>
                </div>
                <img :src="task.image" alt="Utmaningsbild" class="task-image" />
              </li>
            </ul>
          </div>

          <!-- Missed challenges -->
          <div v-if="wasTaskMissed" class="missed-tasks">
            <h4 class="missed-header">Ajdå!</h4>
            <p class="p-medium">Du klarade inte denna utmaning.</p>
            <ul>
              <li class="missed-task">
                <div class="task-content">
                  <h3>{{ taskForSelectedDate.title }}</h3>
                  <p>{{ taskForSelectedDate.description }}</p>
                </div>
                <img :src="taskForSelectedDate.image" alt="Utmaningsbild" class="task-image" />
              </li>
            </ul>
          </div>

          <!-- No challenges available -->
          <p class="p-medium" v-if="!completedTasks.length && !wasTaskMissed">
            Inga utmaningar tillgängliga för detta datum.
          </p>
        </div>
      </div>

    <Navbar page="archive"></Navbar>
  </main>
</template>

<style scoped>
main {
    height: min-content;
    width: 100%;
    max-width: 500px;
    min-height: 100vh;
    padding: 50px 20px;
    margin: 0 auto 40px;
    font-family: Lato, sans-serif;
    color: var(--text-color);
}

.header {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.calendar-container {
  max-width: 100%;
  margin: 40px auto;
  border-radius: 20px;
  padding: 15px;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  font-size: 1.2rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  padding: 10px 0;
}

.calendar-day {
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.calendar-day:not(.today):hover {
  background-color: var(--border-color);
}

.today {
  background-color: var(--green);
  font-weight: 700;
}

.registration-day {
  background-color: #c2e07a80;
  border: 2px dashed var(--green);
}

.before-registration {
  background-color: #f0f0f0;
  color: #aaa;
  cursor: default;
  border: 1px solid #e0e0e0;
}

.completed-day {
  border: 2px solid var(--green);
}

.missed-day {
  background-color: var(--background-color);
  border: 2px solid var(--peach);
}

.today.completed-day {
  border: 3px solid white;
  box-shadow: 0 0 0 2px var(--green);
}

.selected-date {
  margin-top: 20px;
  padding: 15px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.selected-date ul {
  list-style: none;
  padding: 0;
}

.completed-task, .missed-task {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 15px;
  margin: 12px 0;
  border-radius: 14px;
  font-size: 1rem;
}

.completed-task {
  background: rgba(194, 224, 122, 0.2);
}

.missed-task {
  background: rgba(255, 188, 181, 0.2);
}

.task-image {
  height: 100%;
  border-radius: 15px;
  object-fit: cover;
  order: -1;
}

.selected-date li h3 {
  font-family: 'Lato', serif;
  display: block;
  margin: 0 0 16px 0;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 140%;
}

.selected-date p {
  font-size: 1.1rem;
  margin-top: 10px;
  font-weight: 500;
  line-height: 140%;
}

.btn-primary {
  background-color: var(--background-color);
}

/* Small animation when a new task is displayed */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.selected-date li,
.selected-date p {
  animation: fadeIn 0.4s ease-in-out;
}

.completed-header, .missed-header {
  font-family: 'Comfortaa', sans-serif;
  font-size: 24px;
  text-align: center;
  margin: 10px;
}

.p-medium {
  text-align: center;
  margin-bottom: 20px;
}

@media (min-width: 768px) {
  main {
    max-width: 700px;
  }
  .selected-date li,
  .selected-date p {
    font-size: 20px;
  }

  .calendar-grid {
    gap: 10px;
  }

  .calendar-day {
    height: 70px;
    font-size: 1.2rem;
  }

  .completed-header, .missed-header {
    font-size: 32px;
  }

  .completed-task, .missed-task {
    flex-direction: row;
    align-items: center;
    gap: 50px;
  }

  .task-content {
    order: 1;
    flex: 1;
  }

  .selected-date li h3 {
    font-size: 1.6rem;
  }

  .selected-date li p {
    font-size: 1.2rem;
  }

  .task-image {
    width: 300px;
    height: auto;
    order: 2;
  }
}

@media (min-width: 1024px) {
  main {
    max-width: 900px;
  }

  .task-image {
    width: 400px;
    height: auto;
  }
}

</style>
