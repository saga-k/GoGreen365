<script setup>
import { onMounted, ref, computed } from 'vue'
import { useChallengeStore } from '@/stores/challengeStore'
import { useUserStore } from '@/stores/userStore'
import Navbar from '@/components/Navbar.vue'
import DateDisplay from '@/components/dateDisplay.vue'

const challengeStore = useChallengeStore()
const userStore = useUserStore()
const isLoading = ref(true)

// Beräknad egenskap som kontrollerar om den aktuella utmaningen är avklarad
const isChallengeCompleted = computed(() => {
  const currentUser = userStore.currentUser
  const currentChallengeId = challengeStore.todaysChallenge?.id
  if (currentUser && currentChallengeId) {
    return currentUser.completedTasks && currentUser.completedTasks.includes(currentChallengeId)
  }
  return false
})

const completeChallenge = () => {
  const currentUser = userStore.currentUser
  const currentChallengeId = challengeStore.todaysChallenge?.id

  // Förhindra dubbelslutförande om redan avklarad
  if (
    currentUser &&
    currentChallengeId &&
    currentUser.completedTasks &&
    currentUser.completedTasks.includes(currentChallengeId)
  ) {
    console.log('Challenge already completed for today.')
    return
  }

  // Om användare och utmaning finns, uppdatera poäng och avklarade uppgifter
  if (currentUser && currentChallengeId) {
    userStore.addEcoPoints(currentUser, 5)
    if (!currentUser.completedTasks) {
      currentUser.completedTasks = []
    }
    if (!currentUser.completedTasks.includes(currentChallengeId)) {
      currentUser.completedTasks.push(currentChallengeId)
    }
    userStore.updateUserInBe(currentUser, currentUser.id)
  }
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
    <!-- Visa header endast om utmaningen inte är avklarad -->
    <div class="header" v-if="!isChallengeCompleted">
      <h1 class="h1">Dagens utmaning</h1>
      <DateDisplay />
    </div>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="challengeStore.error">Error: {{ challengeStore.error }}</div>

    <div v-else>
      <!-- Om utmaningen är slutfört visas skärmen "Bra jobbat" -->
      <div v-if="isChallengeCompleted" class="good-job">
        <img
          src="../assets/happyPlanet-transparent-bg.svg"
          alt="Happy planet"
          class="good-job-image"
        />
        <h2 class="h2">Bra jobbat!</h2>
        <p class="p-medium">
          Belöningen har tilldelats!<br />
          Kom tillbaka imorgon för nya utmaningar!
        </p>
      </div>

      <div v-else>
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
  cursor: pointer;
}

#point-placeholder {
  background-color: lightgray;
  height: 35px;
  width: 35px;
  border-radius: 100%;
}

.good-job {
  width: 100%;
  max-width: 500px;
  margin: 50px auto;
  padding: 2rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.good-job h2 {
  font-size: 28px;
  margin-top: 2rem;
}

.good-job-image {
  width: 100%;
  max-width: 70%;
  height: auto;
  object-fit: cover;
}
</style>
