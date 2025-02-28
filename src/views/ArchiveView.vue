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
  display: flex;
}

.calendar-container {
  max-width: 350px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #f8f9fa;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.calendar-day:hover {
  background-color: #d4edda;
}

.selected-date {
  margin-top: 20px;
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 8px;
}
</style>
