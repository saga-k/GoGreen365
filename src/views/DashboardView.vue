<script setup>
import { useUserStore } from '@/stores/userStore'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import Navbar from '@/components/Navbar.vue'
import PointsBar from '@/components/PointsBar.vue'
import dailyChallengeDashboard from '@/components/dailyChallengeDashboard.vue'

import weeklyProgress from '@/components/weeklyProgress.vue'

const router = useRouter()
const userStore = useUserStore()
let user = ref(null)
let isFetched = ref(false)

onMounted(() => {
  user.value = userStore.currentUser
  //If userStore doesnt have a current user, get current user from local storage
  if (user.value === null || user.value === undefined) {
    user.value = JSON.parse(localStorage.getItem('currentUser'))
    userStore.currentUser = user.value
  }

  //If there's no user in local storage, user is logged out and will be rerouted to login page
  if (user.value === null || user.value === undefined) {
    router.push('/')
  } else {
    isFetched.value = true
  }
})

const handleClickSettings = () => router.push('/settings')
const handleClickChallenge = () => router.push('/challenge')
</script>

<template>
  <main v-if="isFetched === true">
    <div id="headerWrapper">
      <img id="profilePic" :src="user?.profilePicUrl || 'src/assets/happyPlanet.svg'" />
      <div id="headerTextWrapper">
        <h2 class="h2">Hej {{ user.firstName }}</h2>
        <p class="p-medium">Välkommen tillbaka!</p>
        <button class="btn-primary" @click="handleClickSettings">Kontoinställningar</button>
      </div>
    </div>

    <PointsBar :points="user.ecoPoints"></PointsBar>
    <dailyChallengeDashboard @click = 'handleClickChallenge'></dailyChallengeDashboard>

    <weeklyProgress></weeklyProgress>

    <button id="inviteButton" class="btn-primary">Bjud in dina vänner</button>
  </main>
  <Navbar id="navBar" page="dashboard"></Navbar>
</template>

<style scoped>
main {
  background-color: var(--background-color);
  padding: 50px 20px 50px 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 40px;
  min-height: 100vh;
}

#headerWrapper {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
}

#profilePic {
  height: 150px;
  border-radius: 100px;
}

#headerTextWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

#inviteButton {
  height: 40px;
}

#navBar {
  z-index: 2;
}

@media (min-width: 768px) {
  main {
    gap: 1.5rem;
  }
  #profilePic {
    height: 200px;
  }

  #inviteButton {
    height: 45px;
  }
}

</style>
