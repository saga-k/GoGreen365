<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// const planets = [
//   { src: '/images/planet-sad.svg', alt: 'Sad Planet', size: '50px' },
//   { src: '/images/planet-neutral.svg', alt: 'Neutral Planet', size: '70px' },
//   { src: '/images/planet-happy.png', alt: 'Happy Planet', size: '100px' },
// ]

const goToDashboard = () => {
  router.push('/dashboard')
}
</script>
<template>
  <div class="onboarding-container">
    <!-- Planet Icons -->
    <div class="planet-wrapper">
      <img src="/images/planet-sad.svg" alt="Sad Planet" class="planet planet-sad" />
      <img src="/images/planet-neutral.svg" alt="Neutral Planet" class="planet planet-neutral" />
      <img src="/images/planet-happy.png" alt="Happy Planet" class="planet planet-happy" />
    </div>

    <!-- Title -->
    <h1>Välkommen!</h1>

    <!-- Description -->
    <p class="description">
      Här får du dagliga utmaningar som hjälper dig att leva mer hållbart och göra smartare val för
      planeten. Följ dina framsteg, samla poäng och upptäck hur små förändringar kan göra stor
      skillnad. Tillsammans skapar vi en grönare framtid!
    </p>

    <!-- Continue Button -->
    <button @click="goToDashboard" class="continue-button">Gå vidare</button>
  </div>
</template>

<style scoped>
.onboarding-container {
  background-color: #fef7ee;
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Comfortaa', serif;
}

.planet-wrapper {
  position: relative;
  width: 280px; /* Increased width for more room */
  height: 220px; /* Slightly taller */
  margin-bottom: 30px;
}

.planet {
  position: absolute;
  object-fit: contain;
}

/* Precise positions based on the Figma screenshot */
.planet-sad {
  width: 80px;
  top: 100px;
  left: 0;
}

.planet-neutral {
  width: 105px;
  top: 0;
  left: 55px;
}

.planet-happy {
  width: 140px;
  top: 70px;
  right: 0;
}

h1 {
  font-size: 28px;
  color: #3f3d3d;
  margin-bottom: 20px;
}

.description {
  font-size: 16px;
  color: #3f3d3d;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 400px;
}

.continue-button {
  background-color: #c2e07a;
  color: #3f3d3d;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 30px;
  border: none;
  border-radius: 39px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.continue-button:hover {
  background-color: #a5c261;
}
</style>
