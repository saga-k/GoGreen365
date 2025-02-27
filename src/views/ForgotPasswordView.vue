<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userEmail = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const errorMessages = ref([])

// Password must be at least 6 characters just only letters and numbers
const passwordPattern = /^[a-zA-Z0-9]{6,}$/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emailError = ref(false)
const passwordError = ref(false)
const confirmPasswordError = ref(false)

// Validation for password and email if not return error messages
watch([userEmail, newPassword, confirmPassword], ([email, password, confirm]) => {
  emailError.value = !emailPattern.test(email) && email.length > 0
  passwordError.value = !passwordPattern.test(password) && password.length > 0
  confirmPasswordError.value = password !== confirm && confirm.length > 0

  errorMessages.value = []

  if (!email || !password || !confirm) {
    errorMessages.value.push('Vänligen fyll i alla rutor')
  }
  if (!emailPattern.test(email) && email.length > 0) {
    errorMessages.value.push('Ange en giltig e-postadress')
  }
  if (!passwordPattern.test(password) && password.length > 0) {
    errorMessages.value.push(
      'Lösnordet ska vara minst 6 tecken långt och endast bokstäver och siffror',
    )
  }
  if (password !== confirm && confirm.length > 0) {
    errorMessages.value.push('Lösenord matchar inte!')
  }
})

// Update password in JSON server
async function updatePassword() {
  if (errorMessages.value.length > 0) return

  try {
    // Find the user by emial on json
    const response = await fetch(`http://localhost:3000/users?mail=${userEmail.value}`)
    const users = await response.json()

    if (users.length === 0) {
      errorMessages.value.push('Fel e-post adress')
      emailError.value = true
      return
    }

    const userId = users[0].id

    // Update new password to json
    const updateResponse = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PATCH',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword.value }),
    })

    // Push to success page
    if (updateResponse.ok) {
      router.push('/successPassword')
    } else {
      errorMessages.value.push('Missllyckades med att uppdatera lösenordet')
    }
  } catch (error) {
    console.error('Error updating password:', error)
    errorMessages.value.push('Något gick fel. Försök igen!')
  }
}
</script>

<template>
  <div class="forgot-app">
    <img src="@/assets/images/happy-earth.png" alt="Happy Earth" class="earth-image" />

    <div class="form-container">
      <!-- Change password -->
      <h1>Ändra lösenord</h1>

      <!-- Controll E-mail -->
      <label :class="{ 'label-error': emailError }" for="email">E-postadress</label>
      <input
        id="email"
        v-model="userEmail"
        type="email"
        placeholder="Ange e-post"
        :class="{ 'input-error': emailError }"
      />

      <!-- new password -->
      <label :class="{ 'label-error': passwordError }" for="newPassword">Nytt lösenord</label>
      <input
        id="password"
        v-model="newPassword"
        type="password"
        placeholder="Ange nytt lösenord"
        :class="{ 'input-error': passwordError }"
      />

      <!-- confirm new password -->
      <label :class="{ 'label-error': confirmPasswordError }" for="confirmPassword"
        >Bekräfta lösenord</label
      >
      <input
        id="confirmPassword"
        v-model="confirmPassword"
        type="password"
        placeholder="Bekräfta lösenord"
        :class="{ 'input-error': confirmPasswordError }"
      />

      <!-- Show up error message as a list -->
      <ul v-if="errorMessages.length" class="error-message">
        <li v-for="(message, index) in errorMessages" :key="index">{{ message }}</li>
      </ul>

      <!-- Push to success page -->
      <button @click="updatePassword" :disabled="errorMessages.length > 0" class="confirm-button">
        Ändra lösenord
      </button>
    </div>
    <RouterLink to="/" class="links">Har du redan konto? Logga in</RouterLink>
  </div>
</template>

<style scoped>
/* Base style */
.forgot-app {
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
h1 {
  font-size: 36px;
  color: #3f3d3d;
}

/* Form style */
.form-container {
  width: 100%;
  max-width: 300px;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
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

/* Underline for link paeg */
.links {
  display: block;
  margin-top: 2rem;
  font-size: 14px;
  color: #3f3d3d;
  text-decoration: underline;
}

/* Button */
.confirm-button {
  font-family: 'Comfortaa', serif;
  background-color: #c2e07a;
  color: #3f3d3d;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 39px;
  padding: 0.75rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.confirm-button:hover {
  background-color: #a5c261;
}

/* Error */
.label-error {
  color: red;
}

.input-error {
  border-color: red;
}

.input-error:focus {
  border-color: red !important;
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}

/* Error message */
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 0.5rem;
}
</style>
