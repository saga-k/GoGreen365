<script setup>
import { onMounted } from 'vue'
import { useChallengeStore } from '@/stores/challengeStore'
import Navbar from '@/components/Navbar.vue'

const challengeStore = useChallengeStore()

challengeStore.setCurrentUser('1')

onMounted(async () => {
  await challengeStore.fetchChallenges()
  console.log('Challenges loaded:', challengeStore.challenges)
  console.log("Today's challenge:", challengeStore.todaysChallenge)
})
</script>

<template>
  <div class="challenge-container">
    <h1>Dagens utmaning</h1>

    <div v-if="challengeStore.loading">Loading...</div>
    <div v-else-if="challengeStore.error">Error: {{ challengeStore.error }}</div>

    <div v-if="challengeStore.todaysChallenge" class="challenge">
      <h2>{{ challengeStore.todaysChallenge.title }}</h2>
      <p>{{ challengeStore.todaysChallenge.description }}</p>
    </div>
    <div v-else class="no-challenge">
      <p>Inga fler utmaningar tillgängliga för idag.</p>
    </div>
  </div>
  <Navbar page="challenge"></Navbar>
</template>
