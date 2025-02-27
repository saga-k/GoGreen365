<script setup>
import { useUserStore } from '@/stores/userStore'
import { ref, onMounted } from 'vue';

import Navbar from '@/components/Navbar.vue'
import PointsBar from '@/components/PointsBar.vue';
import dailyChallengeDashboard from '@/components/dailyChallengeDashboard.vue';

import weeklyProgress from '@/components/weeklyProgress.vue';

const userStore = useUserStore()
let user = ref(null)
let isFetched = ref(false)

onMounted(() => {
  user.value = userStore.currentUser;
  if (user.value === null || user.value === undefined) {
    user.value = JSON.parse(localStorage.getItem('currentUser'))
  }
  isFetched.value = true
})


</script>

<template>
  <main v-if="isFetched === true">

    <div id="headerWrapper">
      <img id="profilePic" :src="user?.profilePicUrl || 'src/assets/happyPlanet.svg'" />
      <div id="headerTextWrapper">
        <h2 class="h2">Hej {{ user.firstName }}</h2>
        <p class="p-medium">Välkommen tillbaka!</p>
        <button class="btn-primary">Kontoinställningar</button>
      </div>
    </div>

    <PointsBar :points='user.ecoPoints'></PointsBar>
    <dailyChallengeDashboard></dailyChallengeDashboard>

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
</style>