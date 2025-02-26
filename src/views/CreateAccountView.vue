<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')

// Create a new user account
const createAccount = async () => {
  if (!firstName.value || !lastName.value || !email.value || !password.value) {
    errorMessage.value = 'All fields are required!'
    return
  }

  // Simple email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value)) {
    errorMessage.value = 'Invalid email format'
    return
  }

  const newUser = {
    firstName: firstName.value,
    lastName: lastName.value,
    mail: email.value,
    password: password.value,
    profilePicUrl: null,
    ecoPoints: 0,
    completedTasks: [],
    registrationDate: new Date().toDateString(),
  }

  //   const getCurrentDate = () => {
  //   let today = new Date().toDateString()
  //   newUser.registrationDate = today
  // }

  try {
    await axios.post('http://localhost:3000/users', newUser)
    router.push('/') // Redirect to login after account creation
  } catch (error) {
    errorMessage.value = 'Error creating account.'
    console.error('Error creating account:', error)
  }
}
</script>

<template>
  <div class="register-container">
    <img src="@/assets/images/happy-earth.png" alt="Happy Earth" class="earth-image" />
    <h2>Skapa konto</h2>
    <div class="form-container">
      <div class="name-container">
        <div>
          <label for="firstName">Förnamn</label>
          <input type="text" placeholder="firstname" v-model="firstName" class="form-control" />
        </div>
        <div>
          <label for="firstName">Efternamn</label>
          <input type="text" placeholder="lastname" v-model="lastName" class="form-control" />
        </div>
      </div>
      <label for="email" :class="{ 'label-error': emailError }">E-post adress</label>
      <input type="email" placeholder="email" v-model="email" class="form-control" />
      <label :class="{ 'label-error': passwordError }" for="password">Lösenord</label>
      <input type="password" placeholder="Ange lösenord" v-model="password" class="form-control" />
      <label :class="{ 'label-error': passwordError }" for="password">Bekräfta lösenord</label>
      <input type="password" placeholder="Ange lösenord" v-model="password" class="form-control" />
      <button @click="createAccount" class="register-button">Registera</button>
    </div>

    <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>

    <p class="login-link">
      Har redan ett konto?
      <RouterLink class="text-decoration-none" to="/">Login</RouterLink>
    </p>
  </div>
</template>
<style scoped>
/* Base style */
.register-container {
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
  width: 180px;
  margin-bottom: 0.5rem;
}

/* Font style */
h2 {
  font-size: 36px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #3f3d3d;
}

.subtitle {
  font-size: 14px;
  color: #3f3d3d;
  text-align: center;
  margin-bottom: 1.5rem;
}

/* Form style */
.form-container {
  width: 100%;
  max-width: 300px;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
}
.name-container {
  display: flex;
}

.form-container label {
  margin-bottom: 0.25rem;
  margin-top: 1rem;
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
.login-link {
  display: block;
  margin-top: 2rem;
  font-size: 14px;
  color: #3f3d3d;
  text-decoration: underline;
}

/* Register button */
.register-button {
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

.register-button:hover {
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
  font-size: 14px;
  color: #e74c3c;
  margin-top: -0.25rem;
  margin-bottom: -0.25rem;
}
</style>
