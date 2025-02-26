<script setup>
import { onMounted, ref } from 'vue'
import { useChallengeStore } from '@/stores/challengeStore'
import { useUserStore } from '@/stores/userStore'
import Navbar from '@/components/Navbar.vue'
import DateDisplay from '@/components/dateDisplay.vue'

const challengeStore = useChallengeStore()
const userStore = useUserStore()
const isLoading = ref(true)
const challengeCompleted = ref(false)

const completeChallenge = () => {
  challengeCompleted.value = true
}

onMounted(async () => {
  try {
    // Vänta på att både users och challenges laddas
    await Promise.all([userStore.fetchUsers(), challengeStore.fetchChallenges()])

    // Hämta inloggad användare från userStore (eller från localStorage om ej satt)
    let currentUser = userStore.currentUser
    if (!currentUser) {
      const stored = localStorage.getItem('currentUser')
      if (stored) {
        currentUser = JSON.parse(stored)
        userStore.currentUser = currentUser
      }
    }
    if (currentUser) {
      challengeStore.setCurrentUser(currentUser.id)
    }

    console.log("Today's challenge:", challengeStore.todaysChallenge)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="challenge-container">
    <div class="header">
      <h1 class="h1">Dagens utmaning</h1>
      <!-- Hämta det formaterade datumet från DateDisplay-komponenten -->
      <DateDisplay />
    </div>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="challengeStore.error">Error: {{ challengeStore.error }}</div>

    <div v-else>
      <!-- Om utmaningen inte är slutförd, visa utmaningskort -->
      <div v-if="!challengeCompleted">
        <div v-if="challengeStore.todaysChallenge" class="challenge">
          <img
            :src="challengeStore.todaysChallenge.image"
            alt="Utmaningsbild"
            class="challenge-image"
          />
          <h2 class="h2">{{ challengeStore.todaysChallenge.title }}</h2>
          <p class="p-medium">{{ challengeStore.todaysChallenge.description }}</p>
        </div>
        <div v-else class="no-challenge">
          <p class="p-medium">Inga fler utmaningar tillgängliga för idag.</p>
        </div>
        <div class="points-container">
          <div class="points-left">
            <div id="point-placeholder"></div>
            <p class="p-small">Belöning: 5 Eco-points!</p>
          </div>
          <div class="points-right">
            <button class="btn-primary" @click="completeChallenge">Hämta</button>
          </div>
        </div>
      </div>

      <!-- Om utmaningen är slutfört visas skärmen "Bra jobbat" -->
      <div v-else class="good-job">
        <img
          src="../assets/happyPlanet-transparent-bg.svg"
          alt="Happy planet"
          class="good-job-image"
        />
        <h2>Bra jobbat!!</h2>
        <p>Belöningen har tilldelats! Kom tillbaka imorgon för nya utmaningar!</p>
      </div>
    </div>
  </main>
  <Navbar page="challenge"></Navbar>
</template>

<style scoped>
main {
  background-color: var(--background-color);
  height: min-content;
  min-height: 100vh;
  padding: 50px 20px;
  margin-bottom: 40px;
}

.challenge-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  gap: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin-bottom: 1rem;
}

.header h1 {
  font-size: 24px;
  margin: 0;
}

.challenge {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
}

.challenge-image {
  display: block;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: cover;
  border-radius: 20px;
}

.points-container {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
}

.points-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.p-small {
  font-weight: 700;
}

.points-right .btn-primary {
  width: 130px;
  height: 35px;
  font-weight: 700;
}

#point-placeholder {
  background-color: lightgray;
  height: 35px;
  width: 35px;
  border-radius: 100%;
}
</style>
