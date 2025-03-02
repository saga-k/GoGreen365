<script setup>
import { ref, computed } from 'vue'
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

// Handle date selection - Use `toLocaleDateString` to prevent timezone shift
const selectDate = (date) => {
  selectedDate.value = date.toLocaleDateString('sv-SE') // Format: YYYY-MM-DD (Swedish Locale)
}

// Get completed tasks filtered by selectedDate
const completedTasks = computed(() => {
  if (!userStore.currentUser || !selectedDate.value) return []

  return userStore.currentUser.completedTasks
    .filter((task) => task.dateCompleted === selectedDate.value) // ✅ Filter by date
    .map((task) => challengeStore.getChallengeById(task.id)) // ✅ Convert ID to challenge
    .filter((task) => task !== null) // ✅ Remove null values
})

// Get completed tasks filtered by selectedDate
// const completedTasks = computed(() => {
//   if (!userStore.currentUser || !selectedDate.value) return []

//   return userStore.currentUser.completedTasks
//     .map((taskId) => challengeStore.getChallengeById(taskId)) // Convert task ID to full object
//     .filter(
//       (task) => task !== null && task.dateCompleted === selectedDate.value, // Ensure dateCompleted matches
//     )
// })

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
  <main class="archive-container">
    <div class="header">
      <h2 class="h2">Arkiverad utmaning</h2>
      <DateDisplay />
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
          :class="{ today: isToday(day) }"
          @click="selectDate(day)"
        >
          {{ day.getDate() }}
        </div>
      </div>
    </div>

    <div v-if="selectedDate" class="selected-date">
      <h3 class="h3">Utmaningar för: {{ selectedDate }}</h3>
      <ul v-if="completedTasks.length > 0">
        <li v-for="task in completedTasks" :key="task.id">
          <strong>{{ task.title }}</strong
          >: {{ task.description }}
        </li>
      </ul>
      <p class="p-medium" v-else>Inga utmaningar genomförda på detta datum.</p>
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
  border: 1px;
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

.selected-date {
  margin-top: 20px;
  padding: 15px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
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
  font-size: 1.1rem;
}

.selected-date p {
  font-size: 1rem;
  margin-top: 10px;
  font-weight: 700;
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

.btn-primary {
  background-color: var(--background-color);
}

@media (min-width: 768px) {
  main {
    max-width: 700px;
  }
  .selected-date li,
  .selected-date p {
    font-size: 18px;
  }

}

@media (min-width: 1024px) {
  main {
    max-width: 900px;
  }
}

</style>
