<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import DateDisplay from '@/components/dateDisplay.vue'
import { useUserStore } from '@/stores/userStore.js'
import { useChallengeStore } from '@/stores/challengeStore.js'

const userStore = useUserStore()
const challengeStore = useChallengeStore()
const today = new Date()
const selectedDate = ref(null)
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

// Restore user from localStorage on refresh
onMounted(async () => {
  const storedUser = JSON.parse(localStorage.getItem('currentUser'))
  if (storedUser) {
    userStore.currentUser = storedUser
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
    .filter((task) => task && task.id) // ✅ filter out undefined/null tasks
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
  //   const firstDay = new Date(currentYear.value, currentMonth.value, 1)
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
</script>

<template>
  <div class="archive-container">
    <div class="header">
      <h1 class="h1">Arkiverad utmaning</h1>
      <DateDisplay />
    </div>

    <div class="calendar-container">
      <div class="calendar-header">
        <button @click="changeMonth(-1)" class="btn btn-sm btn-outline-primary">❮</button>
        <h3>
          {{
            new Date(currentYear, currentMonth).toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })
          }}
        </h3>
        <button @click="changeMonth(1)" class="btn btn-sm btn-outline-primary">❯</button>
      </div>

      <div class="calendar-grid">
        <div
          v-for="day in daysInMonth"
          :key="day.toDateString()"
          class="calendar-day"
          :class="{ today: isToday(day) }"
          @click="selectDate(day)"
        >
          {{ day.getDate() }}
        </div>
      </div>
    </div>

    <div v-if="selectedDate" class="selected-date">
      <h4>Utmaningar för: {{ selectedDate }}</h4>
      <ul v-if="completedTasks.length > 0">
        <li v-for="task in completedTasks" :key="task.id">
          <strong>{{ task.title }}</strong
          >: {{ task.description }}
        </li>
      </ul>
      <p v-else>Inga utmaningar genomförda på detta datum.</p>
    </div>

    <Navbar page="archive"></Navbar>
  </div>
</template>

<style scoped>
.archive-container {
  text-align: center;
  padding: 20px;
}

.header {
  margin: 10px auto;
  display: flex;
}

.calendar-container {
  max-width: 100%;
  margin: 40px auto;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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
  width: 35x;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.calendar-day:hover {
  background-color: #e0f7fa;
}

.today {
  background-color: #ffdd57 !important; /* Highlight today's date */
  color: #fff;
  font-weight: bold;
  border: 2px solid #ffa500;
  box-shadow: 0px 2px 6px rgba(255, 165, 0, 0.4);
}
.calendar-day:hover {
  background-color: #d4edda;
}

.selected-date {
  margin-top: 20px;
  padding: 15px;
  border-radius: 12px;
  background: linear-gradient(to right, #232322, #514a2c); /* Warm gradient */
  color: #fff;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
}

.selected-date h4 {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.selected-date ul {
  list-style: none;
  padding: 0;
}

.selected-date li {
  background: rgba(255, 255, 255, 0.2); /* Subtle white transparency */
  padding: 10px;
  margin: 8px 0;
  border-radius: 8px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.selected-date li strong {
  color: #fff;
  font-size: 1.1rem;
}

.selected-date p {
  font-size: 1rem;
  margin-top: 10px;
  font-weight: bold;
  color: #fff;
}

.no-tasks {
  font-style: italic;
  opacity: 0.8;
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
</style>
