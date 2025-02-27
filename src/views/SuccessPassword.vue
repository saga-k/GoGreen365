<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const next = () => {
  router.push('/') // Go to login page when click
}
</script>
<template>
  <div class="success-app">
    <img src="@/assets/icons/badge-check.svg" alt="Success" class="success-icon" />
    <h1>Lyckades!</h1>
    <p>Lyckades att återställa lösenordet!</p>
    <button @click="next" class="success-button">Gå vidare</button>
  </div>
</template>
<style scoped>
/* Base style */
.success-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #c2e07a;
  color: #3f3d3d;
  font-family: 'Comfortaa', serif;
  text-align: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
}

h1 {
  font-size: 36px;
  color: #3f3d3d;
  margin-bottom: 1.5rem;
}

p {
  font-size: 14px;
  color: #3f3d3d;
  margin-bottom: 1.5rem;
}

/* Button */
.success-button {
  background-color: #ffbcb5;
  color: #3f3d3d;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 20px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.success-button:hover {
  background-color: #fbb4ad;
}
</style>
