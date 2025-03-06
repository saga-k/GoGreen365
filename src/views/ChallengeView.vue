<script setup>
import { onMounted, ref, computed } from 'vue'
import { useChallengeStore } from '@/stores/challengeStore'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import DateDisplay from '@/components/dateDisplay.vue'

const router = useRouter()
const challengeStore = useChallengeStore()
const userStore = useUserStore()
const isLoading = ref(true)

// Beräknad egenskap som kontrollerar om den aktuella utmaningen är avklarad
const isChallengeCompleted = computed(() => {
  const currentUser = userStore.currentUser
  const currentChallengeId = challengeStore.todaysChallenge?.id
  const currentChallenge = challengeStore.todaysChallenge
  if (currentUser && currentChallenge) {
    //Sagas kod här
    return (
      currentUser.completedTasks &&
      currentUser.completedTasks.some((element) => element.id === currentChallengeId)
    )
  }
  return false
})

// Arif code
const completeChallenge = () => {
  const currentUser = userStore.currentUser
  const currentChallengeId = challengeStore.todaysChallenge?.id

  if (!currentUser || !currentChallengeId) return

  // Prevent duplicates
  const alreadyCompleted = currentUser.completedTasks.some((task) => task.id === currentChallengeId)
  if (alreadyCompleted) {
    console.log('Challenge already completed for today.')
    return
  }

  // Store task with completion date
  const completedTask = {
    id: currentChallengeId,
    dateCompleted: new Date().toLocaleDateString('sv-SE'), // Store as 'YYYY-MM-DD'
  }

  currentUser.completedTasks.push(completedTask)
  userStore.addEcoPoints(currentUser, 5)
  userStore.updateUserInBe(currentUser, currentUser.id)
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
    } else if (currentUser === undefined || currentUser === null){
      router.push('/')
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
  <main :class="{ 'confetti-bg': isChallengeCompleted }">
<!-- Visa header endast om utmaningen inte är avklarad -->
    <div class="header" v-if="!isChallengeCompleted">
      <h2 class="h2">Dagens utmaning</h2>
      <DateDisplay />
    </div>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="challengeStore.error">Error: {{ challengeStore.error }}</div>

    <div v-else>
      <div v-if="isChallengeCompleted" class="good-job">
        <img src="../assets/happyPlanet-transparent-bg.svg" alt="Happy planet" class="good-job-image" />
        <h2 class="h2">Bra jobbat!</h2>
        <p class="p-medium">
          Belöningen har tilldelats!<br />
          Kom tillbaka imorgon för nya utmaningar!
        </p>
      </div>
      <div v-else>
        <div v-if="challengeStore.todaysChallenge" class="challenge">
          <img :src="challengeStore.todaysChallenge.image" alt="Utmaningsbild" class="challenge-image" />
          <h2 class="h2">{{ challengeStore.todaysChallenge.title }}</h2>
          <p class="p-medium">{{ challengeStore.todaysChallenge.description }}</p>
        </div>
        <div v-else class="no-challenge">
          <p class="p-medium">Inga fler utmaningar tillgängliga för idag.</p>
        </div>
        <div class="points-container">
          <div class="points-left">
            <img src="/UiImages/ecoPoints.svg" alt="eco points" />
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
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  padding: 50px 20px;
  margin: 0 auto 40px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
}

.challenge {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
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
  font-weight: 700;
  cursor: pointer;
}

.confetti-bg {
  background-image: url('/UiImages/Confetti.svg');
  background-repeat: repeat;
  background-size: auto;
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
  margin-top: 2rem;
}

.good-job-image {
  width: 100%;
  max-width: 70%;
  height: auto;
  object-fit: cover;
}

@media (min-width: 768px) {
  main {
    max-width: 700px;
  }
  .challenge-image {
    max-width: 700px;
  }
  .points-left img {
    width: 45px;
  }
  .points-right .btn-primary {
    width: 180px;
  }
}

@media (min-width: 1024px) {
  main {
    max-width: 900px;
  }
  .challenge-image {
    max-width: 900px;
  }
}
</style>
