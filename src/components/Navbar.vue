<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav>
    <RouterLink class="link" to="dashboard">
      <img src="../assets/icons/profile-card.svg">
      <p>Profil</p>
    </RouterLink>

    <RouterLink class="link" to="challenge">
      <img src="../assets/icons/badge-check.svg">
      <p>Utmaning</p>
    </RouterLink>

    <RouterLink class="link" to="archive">
      <img src="../assets/icons/calendar-week.svg">
      <p>Arkiv</p>
    </RouterLink>

    <RouterLink class="link" to="points">
      <img src="../assets/icons/gift-box.svg">
      <p>Påäng</p>
    </RouterLink>
  </nav>

</template>

<style scoped>
nav {
  background-color: var(--background-color);
  display: flex;
  justify-content: space-around;
}

.link {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>