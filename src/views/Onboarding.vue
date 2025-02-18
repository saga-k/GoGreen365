<script setup>
import Navbar from '@/components/Navbar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const avatars = [
  { src: 'https://randomuser.me/api/portraits/men/1.jpg', alt: 'Avatar 1' },
  { src: 'https://randomuser.me/api/portraits/women/2.jpg', alt: 'Avatar 2' },
  { src: 'https://randomuser.me/api/portraits/men/3.jpg', alt: 'Avatar 3' },
]

const goToDashboard = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="onboarding-container">
    <!-- Avatar Section -->
    <div class="avatar-container">
      <img
        v-for="(avatar, index) in avatars"
        :key="index"
        :src="avatar.src"
        :alt="avatar.alt"
        class="avatar"
      />
    </div>

    <!-- Title & Text -->
    <h1>Välkommen</h1>
    <p class="description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
      Sed cursus ante dapibus diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
      nec odio. Praesent libero. Sed cursus ante dapibus diam. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
      Sed cursus ante dapibus diam.
    </p>

    <!-- 'Gå vidare' Button -->
    <button @click="goToDashboard" class="continue-button">Gå vidare</button>

    <!-- Navbar -->
    <Navbar />
  </div>
</template>

<style scoped>
.onboarding-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.avatar-container {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 24px;
  color: #2e7d32;
}

.description {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
  text-align: justify;
}

.continue-button {
  background-color: #4caf50;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.continue-button:hover {
  background-color: #388e3c;
}
</style>
