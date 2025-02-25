<script setup>
import { onMounted, ref } from 'vue'
import { useChallengeStore } from '@/stores/challengeStore'
import { useUserStore } from '@/stores/userStore'
import Navbar from '@/components/Navbar.vue'

const challengeStore = useChallengeStore()
const userStore = useUserStore()
const isLoading = ref(true)

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

    console.log('Challenges loaded:', challengeStore.challenges)
    console.log("Today's challenge:", challengeStore.todaysChallenge)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="challenge-container">
    <h1>Dagens utmaning</h1>

    <div v-if="challengeStore.loading">Loading...</div>
    <div v-else-if="challengeStore.error">Error: {{ challengeStore.error }}</div>

    <div v-if="challengeStore.todaysChallenge" class="challenge">
      <img
        :src="challengeStore.todaysChallenge.image"
        alt="Utmaningsbild"
        class="challenge-image"
      />
      <h2>{{ challengeStore.todaysChallenge.title }}</h2>
      <p>{{ challengeStore.todaysChallenge.description }}</p>
    </div>
    <div v-else class="no-challenge">
      <p>Inga fler utmaningar tillgängliga för idag.</p>
    </div>
  </div>
  <Navbar page="challenge"></Navbar>
</template>

<style scoped>
.challenge-container {
  background-color: var(--background-color);
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-height: 100vh;
  text-align: center;
}

.challenge-image {
  display: block;
  margin: 1rem auto;
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: cover;
}
</style>
