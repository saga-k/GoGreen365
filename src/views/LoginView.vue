<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})

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
    <p>Tack för att du vill vara med och</p>
    <p>rädda planeten.</p>

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
  font-family: Lato, sans-serif;
}

/* Image - Logo */
.earth-image {
  width: 180px;
  margin-bottom: 0.5rem;
}

/* Font style */
h1 {
  font-family: 'Comfortaa', serif;
  font-size: 24px;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #3f3d3d;
}

.subtitle {
  font-size: 16px;
  color: #3f3d3d;
  text-align: center;
  margin-bottom: 1.5rem;
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
  margin-top: 1rem;
  font-weight: 600;
  font-size: 16px;
  transition: color 0.2s ease;
}

.form-container input {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid #f4dec3;
  border-radius: 6px;
  font-size: 16px;
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
  font-size: 16px;
  color: #3f3d3d;
  text-decoration: underline;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
}

.create-account-link {
  display: block;
  margin-top: 1rem;
  font-size: 16px;
  color: #3f3d3d;
  text-decoration: underline;
}

/* Loin button */
.login-button {
  font-family: Lato, sans-serif;
  background-color: #c2e07a;
  color: #3f3d3d;
  font-size: 1rem;
  border: none;
  border-radius: 39px;
  padding: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #a5c261;
}

/* When it error*/
.label-error {
  color: #e74c3c;
}

.input-error {
  border-color: #ff6b6b !important;
}

.error-message {
  font-size: 16px;
  color: #e74c3c;
  margin-top: -0.25rem;
  margin-bottom: -0.25rem;
}

@media (min-width: 768px) {
  .login-app {
    padding: 2rem;
  }

  .earth-image {
    width: 220px;
  }

  h1 {
    font-size: 40px;
  }

  .form-container {
    max-width: 350px;
  }

  .login-button {
    font-size: 1.1rem;
    padding: 0.8rem 1.2rem;
  }
}

@media (min-width: 1024px) {
  .login-app {
    max-width: 1000px;
    margin: 0 auto;
  }

  .earth-image {
    width: 200px;
  }

  h1 {
    font-size: 40px;
  }

  .form-container {
    max-width: 400px;
  }

  .login-button {
    font-size: 1.1rem;
    padding: 1rem 1.5rem;
  }
}
</style>
