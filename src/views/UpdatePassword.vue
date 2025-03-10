<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()

const oldPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

// Error messages in array
const errorMessages = ref([])

// Password must be at least 6 characters
const passwordPattern = /^[a-zA-Z0-9]{6,}$/

const currentUser = computed(() => userStore.currentUser)

const oldPasswordLabelError = ref(false)
const newPasswordLabelError = ref(false)
const confirmNewPasswordLabelError = ref(false)

// Input error
const oldPasswordInputError = ref(false)
const newPasswordInputError = ref(false)
const confirmNewPasswordInputError = ref(false)

onMounted(() => {
  userStore.fetchUsers()

  const storeUser = JSON.parse(localStorage.getItem('currentUser'))
  if (!currentUser.value && !storeUser) {
    router.push('/')
    return
  }
  if (!currentUser.value && storeUser) {
    userStore.currentUser = storeUser
  }
})

// Validation for password if not return error messages
watch([oldPassword, newPassword, confirmNewPassword], ([oldVal, newVal, confirmVal]) => {
  errorMessages.value = []
  oldPasswordLabelError.value = false
  newPasswordLabelError.value = false
  confirmNewPasswordLabelError.value = false
  oldPasswordInputError.value = false
  newPasswordInputError.value = false
  confirmNewPasswordInputError.value = false

  // User must type anything
  const typedSomething = oldVal || newVal || confirmVal

  if (typedSomething) {
    if (!oldVal) {
      errorMessages.value.push('Nuvarande lösenord saknas!')
      oldPasswordLabelError.value = true
      oldPasswordInputError.value = true
    }
    if (!newVal) {
      errorMessages.value.push('Nytt lösenord saknas!')
      newPasswordLabelError.value = true
      newPasswordInputError.value = true
    }
    if (!confirmVal) {
      errorMessages.value.push('Bekräfta nytt lösenord saknas!')
      confirmNewPasswordLabelError.value = true
      confirmNewPasswordInputError.value = true
    }

    if (newVal && !passwordPattern.test(newVal)) {
      errorMessages.value.push(
        'Lösnordet ska vara minst 6 tecken långt och endast bokstäver och siffror',
      )
      newPasswordLabelError.value = true
      newPasswordInputError.value = true

  // Check if the user wants to change the password
    if (newVal && confirmVal && newVal !== confirmVal) {
      errorMessages.value.push('Nya lösenorden matchar inte!')
      confirmNewPasswordLabelError.value = true
      confirmNewPasswordInputError.value = true
    }
  }
})

async function savePassword() {
  if (errorMessages.value.length > 0) return

  // If no user
  if (!currentUser.value) {
    errorMessages.value.push('Ingen användare inloggad!')
    return
  }

  const typedSomething = oldPassword.value || newPassword.value || confirmNewPassword.value

  if (typedSomething) {
    if (oldPassword.value !== currentUser.value.password) {
      errorMessages.value.push('Felaktigt nuvarande lösenord!')
      oldPasswordLabelError.value = true
      oldPasswordInputError.value = true
      return
    }
  }

  const updatedUser = {
    ...currentUser.value,
    password: typedSomething ? newPassword.value : currentUser.value.password,
  }

  try {
    await userStore.updateUserInBe(updatedUser, updatedUser.id)
    userStore.currentUser = updatedUser
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))

    router.push('/successPassword')
  } catch (error) {
    console.error('Error updating user:', error)
    errorMessages.value.push('Fel vid uppdatering av konto, försök igen senare.')
  }
}

function goBack() {
  router.push('/settings')
}

  //Go back to settings
  const goBack = () => router.push('/settings')

</script>

<template>
  <div class="update-password-container">
    <h1>Uppdatera lösenord</h1>
    <div class="form-container">
      <!-- Old Password -->
      <label for="oldPassword" :class="{ 'label-error': oldPasswordLabelError }">
        Nuvarande lösenord
      </label>
      <input
        id="oldPassword"
        v-model="oldPassword"
        type="password"
        placeholder="Ange ditt nuvarande lösenord"
        :class="{ 'input-error': oldPasswordInputError }"
      />

      <!-- New Password -->
      <label for="newPassword" :class="{ 'label-error': newPasswordLabelError }">
        Nytt lösenord
      </label>
      <input
        id="newPassword"
        v-model="newPassword"
        type="password"
        placeholder="Ange nytt lösenord"
        :class="{ 'input-error': newPasswordInputError }"
      />

      <!-- Confirm New Password -->
      <label for="confirmNewPassword" :class="{ 'label-error': confirmNewPasswordLabelError }">
        Bekräfta nytt lösenord
      </label>
      <input
        id="confirmNewPassword"
        v-model="confirmNewPassword"
        type="password"
        placeholder="Ange bekräfta nytt lösenord"
        :class="{ 'input-error': confirmNewPasswordInputError }"
      />

      <!-- Error messages in array -->
      <ul v-if="errorMessages.length" class="error-message">
        <li v-for="(msg, index) in errorMessages" :key="index">
          {{ msg }}
        </li>
      </ul>

      <!-- Buttons -->
      <button class="save-button" @click="savePassword" :disabled="errorMessages.length > 0">
        Spara
      </button>
      <button class="cancel-button" @click="goBack">Avbryt</button>
    </div>
  </div>
</template>

<style scoped>
/* Container styling */
.update-password-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fef7ee;
  color: #3f3d3d;
  font-family: Lato, sans-serif;
}

h1 {
  font-family: 'Comfortaa', serif;
  text-align: center;
  font-size: 24px;
  color: #3f3d3d;
}

.form-container {
  width: 100%;
  max-width: 300px;
  margin-top: 2rem;
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

/* Focus effect */
.form-container input:focus {
  border-color: #c2e07a;
  box-shadow: 0 0 0 2px rgba(194, 224, 122, 0.3);
}

.label-error {
  color: #e74c3c;
}

.input-error {
  border-color: #ff6b6b !important;
}

.error-message {
  color: #e74c3c;
  font-size: 16px;
  margin-top: -0.2rem;
}

/* Buttons */
.save-button {
  font-family: Lato, sans-serif;
  background-color: #c2e07a;
  color: #3f3d3d;
  font-size: 16px;
  border: none;
  border-radius: 39px;
  padding: 0.75rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #a5c261;
}

.cancel-button {
  font-family: Lato, sans-serif;
  background-color: #ffbcb5;
  color: #3f3d3d;
  font-size: 16px;
  border: none;
  border-radius: 39px;
  padding: 0.75rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.cancel-button:hover {
  background-color: #fbb3ab;
}

@media (min-width: 768px) {
  .update-password-container {
    padding: 2rem;
  }

  h1 {
    font-size: 40px;
  }

  .form-container {
    max-width: 350px;
  }

  .save-button,
  .cancel-button {
    font-size: 1.1rem;
    padding: 0.8rem 1.2rem;
  }
}

@media (min-width: 1024px) {
  .update-password-container {
    max-width: 1000px;
    margin: 0 auto;
  }

  h1 {
    font-size: 40px;
  }

  .form-container {
    max-width: 400px;
  }

  .save-button,
  .cancel-button {
    font-size: 1.1rem;
    padding: 1rem 1.5rem;
  }
}
</style>
