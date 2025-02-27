<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const next = () => {
  router.push('/') // Go to login page when click
}
</script>
<template>
  <div class="success-app">
    <img src="@/assets/images/happy-earth.png" alt="Happy Planet" class="success-icon" />
    <h1>Lösenordet ändrat</h1>
    <p>Logga in igen med ditt nya lösenord</p>
    <button @click="next" class="success-button">Tillbaka till logga in</button>

    <img src="/UIImages/Confetti.svg" alt="Confetti" />
  </div>
</template>
<style scoped>
/* Base style */
.success-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fef7ee;
  background-image: url('/UIImages/Confetti.svg');
  background-size: cover;
  color: #3f3d3d;
  font-family: 'Comfortaa', serif;
  text-align: center;
}

/* logo */
.success-icon {
  width: 180px;
  margin-bottom: 1rem;
  margin-top: 6rem;
}

h1 {
  font-size: 36px;
  color: #3f3d3d;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
}

p {
  font-size: 14px;
  color: #3f3d3d;
  margin-bottom: 1.5rem;
}

/* Button */
.success-button {
  background-color: #c2e07a;
  color: #3f3d3d;
  font-size: 1rem;
  border: none;
  font-weight: 600;
  border-radius: 39px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Comfortaa', serif;
  margin-top: 10rem;
}

.success-button:hover {
  background-color: #a5c261;
}
</style>
