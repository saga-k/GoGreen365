<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const bgImage = ref('/UiImages/Confetti.svg')

const router = useRouter()

const next = () => {
  router.push('/') // Go to login page when click
}
</script>

<template>
  <div class="success-app" :style="{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }">
    <img src="@/assets/images/happy-earth.png" alt="Happy Planet" class="success-icon" />
    <h1>Lösenordet ändrat</h1>
    <p>Logga in igen med ditt nya lösenord</p>
    <button @click="next" class="success-button">Tillbaka till logga in</button>
    <img src="/UiImages/Confetti.svg" alt="Confetti" />
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
  background-color: #fef7ee;

  background-image: url('/uiImages/Confetti.svg');
  background-size: cover;

  color: #3f3d3d;
  font-family: Lato, sans-serif;
  text-align: center;
}

/* logo */
.success-icon {
  width: 180px;
  margin-bottom: 2.5rem;
}

h1 {
  font-family: 'Comfortaa', serif;
  font-size: 24px;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #3f3d3d;
}

p {
  font-size: 16px;
  color: #3f3d3d;
  margin-bottom: 2rem;
}

/* Button */
.success-button {
  background-color: #c2e07a;
  color: #3f3d3d;
  font-size: 16px;
  border: none;
  border-radius: 39px;
  padding: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 6rem;
  min-width: 350px;
}

.success-button:hover {
  background-color: #a5c261;
}

@media (min-width: 768px) {
  .success-app {
    padding: 2rem;
  }

  .success-icon {
    width: 220px;
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 40px;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 16px;
    margin-bottom: 2.5rem;
  }

  .success-button {
    font-size: 1.1rem;
    padding: 0.8rem 1.2rem;
    margin-top: 4rem;
  }
}

@media (min-width: 1024px) {
  .success-app {
    max-width: 1000px;
    margin: 0 auto;
    padding: 3rem;
  }

  .success-icon {
    width: 200px;
  }

  h1 {
    font-size: 40px;
  }

  p {
    font-size: 20px;
  }

  .success-button {
    font-size: 1.1rem;
    padding: 1rem 1.5rem;
    margin-top: 5rem;
  }
}
</style>
