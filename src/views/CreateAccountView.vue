<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const profileImage = ref(null)

const errorMessage = ref('')
const emailError = ref('')
const passwordError = ref('')

// Handle file upload
const handleImageUpload = (event) => {
  profileImage.value = event.target.files[0]
}

const clearErrors = () => {
  errorMessage.value = ''
  emailError.value = ''
  passwordError.value = ''
}
// Create a new user account
const createAccount = async () => {
  clearErrors()

  if (!firstName.value || !lastName.value || !email.value || !password.value) {
    errorMessage.value = 'Alla fält måste fyllas i!'
    return
  }

  if (password.value !== confirmPassword.value) {
    passwordError.value = 'Lösenorden matchar inte!'
    return
  }

  // Simple email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value)) {
    emailError.value = 'Ogiltigt email-format!'
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

  if (profileImage.value) {
    newUser.append('profilePic', profileImage.value)
  }

  try {
    await axios.post('http://localhost:3000/users', newUser)
    router.push('/onboarding') // Redirect to login after account creation
  } catch (error) {
    errorMessage.value = 'Fel vid skapande av konto, försök igen senare.'
    console.error('Error creating account:', error)
  }
}
</script>

<template>
  <div class="register-container">
    <div>
      <img src="@/assets/images/happy-earth.png" alt="Happy Earth" class="earth-image" />
    </div>
    <!-- want a image upload icon here -->
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
      <input
        type="password"
        placeholder="Bekräfta lösenord"
        v-model="confirmPassword"
        class="form-control"
      />

      <label>Profilbild (valfritt)</label>
      <input type="file" @change="handleImageUpload" class="form-control file-input" />

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

.earth-image {
  width: 180px;
  margin-bottom: 1rem;
}

h2 {
  font-size: 36px;
  margin-bottom: 1rem;
}

.form-container {
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
}

.name-container {
  width: 100%;
  max-width: 350px;
  display: flex;
}

label {
  margin-top: 1rem;
  font-weight: 600;
}

input.form-control {
  padding: 0.75rem;
  border: 1px solid #f4dec3;
  border-radius: 6px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

input.form-control:focus {
  border-color: #c2e07a;
  box-shadow: 0 0 0 2px rgba(194, 224, 122, 0.3);
}

.file-input {
  padding: 0.5rem;
}

.register-button {
  background-color: #c2e07a;
  color: #3f3d3d;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 39px;
  padding: 0.75rem;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #a5c261;
}

.login-link {
  margin-top: 2rem;
  font-size: 14px;
  text-decoration: underline;
}

.error-message {
  color: #e74c3c;
  margin-top: 0.75rem;
  text-align: center;
}
</style>
