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
    <div class="card shadow p-4">
      <h2>createAccount</h2>

      <input type="text" placeholder="firstname" v-model="firstName" class="form-control" />
      <input type="text" placeholder="lastname" v-model="lastName" class="form-control" />
      <input type="email" placeholder="email" v-model="email" class="form-control" />
      <input type="password" placeholder="password" v-model="password" class="form-control" />

      <button @click="createAccount" class="btn btn-primary mt-3">AddUser</button>

      <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>

      <p class="mt-3">
        Already have an account?
        <RouterLink class="text-decoration-none" to="/">Login</RouterLink>
      </p>
    </div>
  </div>
</template>
<style scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto;
}

.card {
  border-radius: 10px;
}

.form-control {
  margin-bottom: 10px;
}
</style>
