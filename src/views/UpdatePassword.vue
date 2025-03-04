<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()

const oldPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')
const passwordError = ref('')
const oldPasswordError = ref('')
const errorMessage = ref('')


const passwordPattern = /^[a-zA-Z0-9]{6,}$/

const currentUser = computed(() => userStore.currentUser)

onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem('currentUser'))
  if (!currentUser.value || !storedUser) {
    router.push('/')
  }
})

// Clear errors
const clearErrors = () => {
  errorMessage.value = ''
  passwordError.value = ''
  oldPasswordError.value = ''
}

const savePassword = async () => {
  clearErrors()

  if (!oldPassword.value || !newPassword.value || !confirmNewPassword.value) {
    errorMessage.value = 'Vänligen fyll i alla rutor!'
    return
  }

    if (!passwordPattern.test(newPassword.value)) {
    passwordError.value = 'Lösenordet måste vara minst 6 tecken och endast innehålla bokstäver och siffror.'
    return
  }

  // Check if the user wants to change the password
  if (newPassword.value || confirmNewPassword.value) {
    // 🔹 Validate old password before allowing change
    if (!oldPassword.value) {
      oldPasswordError.value = 'Ange ditt nuvarande lösenord!'
      return
    }

    if (oldPassword.value !== currentUser.value.password) {
      oldPasswordError.value = 'Felaktigt nuvarande lösenord!'
      return
    }

    if (newPassword.value !== confirmNewPassword.value) {
      passwordError.value = 'Nya lösenorden matchar inte!'
      return
    }
  }

  const updatedUser = {
    ...currentUser.value,
    password: newPassword.value ? newPassword.value : currentUser.value.password, // Only update if a new password is set
  }
  try {
    // Send update request to backend
    await userStore.updateUserInBe(updatedUser, updatedUser.id)

    // ✅ Update userStore instead of reloading the page
    userStore.currentUser = updatedUser

    // Update local storage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))

    // Success message
    alert('Profil uppdaterad!')

    //  Redirect to Dashboard
    router.push('/successPassword')
  } catch (error) {
    console.error('Error updating user:', error)
    errorMessage.value = 'Fel vid uppdatering av konto, försök igen senare.'
  }
  //   await userStore.updateUserInBe(updatedUser, updatedUser.id)
  //   userStore.currentUser = updatedUser
  //   localStorage.setItem('currentUser', JSON.stringify(updatedUser))
  //   router.push('/settings')
}
</script>

<template>
  <div class="update-password-container">
    <h1>Uppdatera lösenord</h1>
    <!-- 🔹 Extra Security: Old Password Required to Change -->
    <label for="oldPassword" class="label">Nuvarande lösenord</label>
    <input type="password" v-model="oldPassword" class="form-control" />
    <span v-if="oldPasswordError" class="error-message">{{ oldPasswordError }}</span>

    <label for="newPassword" class="label">Nytt lösenord</label>
    <input type="password" v-model="newPassword" class="form-control" />

    <label for="confirmNewPassword" class="label">Bekräfta nytt lösenord</label>
    <input type="password" v-model="confirmNewPassword" class="form-control" />
    <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
    <button @click="savePassword">Spara</button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
/* Base style */
.update-password-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  padding-top: 100px;
  font-family: 'Comfortaa', serif;
  background-color: #fef7ee;
  color: #3f3d3d;
  min-height: 100vh;
}

/* Font size */
h1 {
  font-size: 36px;
  margin-bottom: 3rem;
}

label {
  font-weight: 600;
  font-size: 14px;
  transition: color 0.2s ease;
}

/* Input */
input {
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #f4dec3;
  border-radius: 6px;
}

input:focus {
  outline: none;
  border-color: #c2e07a;
  box-shadow: 0 0 0 2px rgba(194, 224, 122, 0.3);
}

/* Buttons */
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #c2e07a;
  color: #3f3d3d;
  border: none;
  border-radius: 39px;
  font-weight: bold;
  cursor: pointer;
  min-width: 300px;
  font-size: 1rem;
  font-family: 'Comfortaa', serif;
}

button:hover {
  background-color: #a5c261;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
