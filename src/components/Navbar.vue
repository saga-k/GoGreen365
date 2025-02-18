<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <RouterLink class="link" to="/dashboard">
      <img src="../assets/icons/profile-card.svg" alt="Profil" />
      <p>Profil</p>
    </RouterLink>

    <RouterLink class="link" to="/challenge">
      <img src="../assets/icons/badge-check.svg" alt="Utmaning" />
      <p>Utmaning</p>
    </RouterLink>

    <RouterLink class="link" to="/archive">
      <img src="../assets/icons/calendar-week.svg" alt="Arkiv" />
      <p>Arkiv</p>
    </RouterLink>

    <RouterLink class="link" to="/points">
      <img src="../assets/icons/gift-box.svg" alt="Poäng" />
      <p>Poäng</p>
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
</style>
