<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userEmail = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const errorMessages = ref('')

// Password must be at least 6 characters just only letters and numbers
const passwordPattern = /^[a-zA-Z0-9]{6,}$/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Validation for password and email if not return error messages
watch([userEmail, newPassword, confirmPassword], ([email, password, confirm]) => {
  if (!email || !password || !confirm) {
    errorMessages.value = 'Vänligen fyll i alla rutar.'
  } else if (!emailPattern.test(email)) {
    errorMessages.value = 'Ange en giltig e-postadress.'
  } else if (!passwordPattern.test(password)) {
    errorMessages.value = 'Lösnordet ska vara minst 6 tecken långt och endast bokstäver och siffror'
  } else if (password !== confirm) {
    errorMessages.value = 'Lösenord matchar inte!'
  } else {
    errorMessages.value = ''
  }
})

// Update password in JSON server
async function updatePassword() {
  try {
    // Find the user by emial on json
    const response = await fetch(`http://localhost:3000/users?mail=${userEmail.value}`)
    const users = await response.json()

    if (users.length === 0) {
      errorMessages.value = 'Fel e-post adress'
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
      errorMessages.value = 'Missllyckades med att uppdatera lösenordet.'
    }
  } catch (error) {
    console.error('Error updating password:', error)
    errorMessages.value = 'Något gick fel. Försök igen.'
  }
}
</script>

<template>
  <div class="">
    <div class="forgot-app">
      <img src="@/assets/images/happy-earth.png" alt="Happy Earth" class="earth-image" />
    </div>

    <div class="form-container">
      <!-- Change password -->
      <h1>Ändra lösenord</h1>

      <!-- Controll E-mail -->
      <label for="email">E-postadress</label>
      <input v-model="newEmail" type="email" placeholder="Ange e-post" />

      <!-- new password -->
      <label for="newPassword">Nytt lösenord</label>
      <input v-model="newPassword" type="password" placeholder="Ange nytt lösenord" />

      <!-- confirm new password -->
      <label for="confirmPassword">bekräfta lösenord</label>
      <input v-model="confirmPassword" type="password" placeholder="Bekräfta lösenord" />

      <!-- Show up error message -->
      <p v-if="errorMessages" class="error-message">{{ errorMessage }}</p>

      <!-- Push to success page -->
      <button @click="updatePassword" :disabled="!!errorMessages">Ändra lösenord</button>
    </div>
    <RouterLink to="/createAccount" class="create-account-link">Skapa nytt konto</RouterLink>
  </div>
</template>

<style scoped></style>
