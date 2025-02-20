<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const router = useRouter()
const userStore = useUserStore()

// Reset error alert when the user try a new password and email
watch([email, password], () => {
  emailError.value = ''
  passwordError.value = ''
})

const login = () => {
  const isLoggedIn = userStore.loginUser(email.value, password.value)

  if (isLoggedIn) {
    router.push('/dashboard') // Go to dashboard after successful login
    // Get the alert message when fail
  } else {
    emailError.value = 'Fel lösenord eller e-postadress'
    passwordError.value = 'Fel lösenord eller e-postadress'
  }
}
</script>

<template>
  <!-- Welcoming -->
  <div class="login-app">
    <img src="@/assets/images/happy-earth.png" alt="Happy Earth" class="earth-image" />
    <h1>Välkommen!</h1>
    <p>Tack för att du vill vara med och rädda planeten.</p>

    <!-- Login Form-->
    <div class="form-container">
      <label for="email" :class="{ 'label-error': emailError }">E-post adress</label>
      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="Ange e-post"
        :class="{ 'input-error': emailError }"
      />

      <!-- Get the alert error message when fail  -->
      <span v-if="emailError" class="error-message">{{ emailError }}</span>

      <label :class="{ 'label-error': passwordError }" for="password">Lösenord</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Ange lösenord"
        :class="{ 'input-error': passwordError }"
      />

      <!-- Get the alert error message when fail  -->
      <span v-if="passwordError" class="error-message">{{ passwordError }}</span>

      <RouterLink to="/forgotPassword" class="forgot-link">Glömt lösenord?</RouterLink>
      <button @click="login" class="login-button">Logga in</button>
    </div>

    <RouterLink to="/createAccount" class="create-account-link">Skapa nytt konto</RouterLink>
  </div>
</template>

<style scoped>
/* Base style */
.login-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fef7ee;
  color: #3f3d3d;
  font-family: 'Comfortaa', serif;
}

/* Image - Logo */
.earth-image {
  width: 200px;
  margin-bottom: 0.5rem;
}

/* Font style */
h1 {
  font-size: 24px;
  margin-bottom: 1rem;
  color: #3f3d3d;
}

.subtitle {
  font-size: 16px;
  color: #3f3d3d;
  text-align: center;
  margin-bottom: 14px;
}

/* Form style */
.form-container {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
}

.form-container label {
  margin-bottom: 0.25rem;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.2s ease;
}

.form-container input {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid #f4dec3;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

/* Focus when click */
.form-container input:focus {
  border-color: #c2e07a;
  box-shadow: 0 0 0 2px rgba(194, 224, 122, 0.3);
}

/* Underline for every link paegs */
.forgot-link {
  text-align: right;
  font-size: 14px;
  color: #3f3d3d;
  text-decoration: underline;
  margin-bottom: 1rem;
}

.create-account-link {
  display: block;
  margin-top: 2rem;
  font-size: 14px;
  color: #3f3d3d;
  text-decoration: underline;
}

/* Loin button */
.login-button {
  font-family: 'Comfortaa', serif;
  background-color: #c2e07a;
  color: #3f3d3d;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 39px;
  padding: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #a5c261;
}
</style>
