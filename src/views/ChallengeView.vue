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
  <h1>Dagens utmaning</h1>
  <Navbar page="challenge"></Navbar>
</template>
