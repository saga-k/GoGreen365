<script setup>
import dateDisplay from './dateDisplay.vue';
import { useUserStore } from '@/stores/userStore';
import { useChallengeStore } from '@/stores/challengeStore';
import { onMounted, ref } from 'vue';

const userStore = useUserStore()
const challengeStore = useChallengeStore()
let challenge = ref(null)
let isLoading = ref(true)

onMounted( () => {
  getChallenge()
})

const getChallenge = async () => {
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

    challenge.value = challengeStore.todaysChallenge
  } catch (error) {
    console.error('Error:', error)
  } finally {
    isLoading.value = false
  }
}

</script>

<template>
  <div id="wrapper">
    <div id="left">
      <h3 class="h3">Dagens utmaning - {{ challenge?.title }}</h3>
      <dateDisplay id="dateDisplay" />
    </div>

    <img id="placeHolder" :src="challenge?.image">

  </div>

</template>

<style scoped>
#wrapper {
  width: 100%;
  height: 7rem;
  background-color: white;
  border: solid 1px var(--border-color);
  border-radius: 20px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}

#left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#dateDisplay {
  width: min-content;
  text-wrap: noWrap;
}

#dateCopy {
  text-wrap: nowrap;
}

#placeHolder {
  height: 100%;
  border-radius: 8px;
}

@media (min-width: 768px) {
  .h3 {
    font-size: 24px;
  }
  #wrapper {
    height: 10rem;
    padding: 2rem;
  }
  #placeHolder {
    height: 100%;
  }
}
</style>
