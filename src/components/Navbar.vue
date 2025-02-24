<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  page: {
    required: true,
    type: String,
  },
})
</script>

<template>
  <nav class="navbar">
    <RouterLink class="link" to="dashboard" :class="{ isActive: props.page === 'dashboard' }">
      <img src="../assets/icons/profile-card.svg" />
      <p class="p-small">Profil</p>
    </RouterLink>

    <RouterLink class="link" to="challenge" :class="{ isActive: props.page === 'challenge' }">
      <img src="../assets/icons/badge-check.svg" />
      <p class="p-small">Utmaning</p>
    </RouterLink>

    <RouterLink class="link" to="archive" :class="{ isActive: props.page === 'archive' }">
      <img src="../assets/icons/calendar-week.svg" />
      <p class="p-small">Arkiv</p>
    </RouterLink>

    <RouterLink class="link" to="points" :class="{ isActive: props.page === 'points' }">
      <img src="../assets/icons/gift-box.svg" />
      <p class="p-small">Påäng</p>
    </RouterLink>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--background-color, #fff);
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-size: 14px;
}

.link img {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

.isActive {
  text-decoration: underline;
  font-weight: 700 !important;
}
</style>
