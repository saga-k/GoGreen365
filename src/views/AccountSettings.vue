<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

import Navbar from '@/components/Navbar.vue'

const userStore = useUserStore()
const router = useRouter()

// Reactive form fields
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const oldPassword = ref('') // 🔹 New field for verifying current password
const newPassword = ref('')
const confirmNewPassword = ref('')
const profileImage = ref(null)
const profileImagePreview = ref(null)

// Errors
const errorMessage = ref('')
const emailError = ref('')
const passwordError = ref('')
const oldPasswordError = ref('')

// Fetch current user
const currentUser = computed(() => userStore.currentUser)

onMounted(() => {
  if (!currentUser.value) {
    router.push('/') // Redirect to login if no user
    return
  }
  // Populate fields with current user data
  firstName.value = currentUser.value.firstName
  lastName.value = currentUser.value.lastName
  email.value = currentUser.value.mail
})

// Handle file upload
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    profileImage.value = file
    profileImagePreview.value = URL.createObjectURL(file) // Preview the selected image
  }
}

// Clear errors
const clearErrors = () => {
  errorMessage.value = ''
  emailError.value = ''
  passwordError.value = ''
  oldPasswordError.value = ''
}

// Update user info
const updateUser = async () => {
  clearErrors()

  // Validate required fields
  if (!firstName.value || !lastName.value || !email.value) {
    errorMessage.value = 'Alla fält måste fyllas i!'
    return
  }

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value)) {
    emailError.value = 'Ogiltigt e-postformat!'
    return
  }

  // Check if the user wants to change the password
  if (newPassword.value || confirmNewPassword.value) {
    // 🔹 Validate old password before allowing change
    if (!oldPassword.value) {
      oldPasswordError.value = 'Du måste ange ditt nuvarande lösenord för att ändra det!'
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

  // Prepare updated user data
  const updatedUser = {
    ...currentUser.value, // Keep existing data
    firstName: firstName.value,
    lastName: lastName.value,
    mail: email.value,
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
    router.push('/dashboard')
  } catch (error) {
    console.error('Error updating user:', error)
    errorMessage.value = 'Fel vid uppdatering av konto, försök igen senare.'
  }
}
</script>

<template>
  <div class="account-settings-container">
    <h1 class="settings-title">Konto Inställningar</h1>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <div class="profile-image-container">
      <label>Profilbild</label>
      <img
        v-if="profileImagePreview"
        :src="profileImagePreview"
        alt="Profile Preview"
        class="profile-preview"
      />
      <img
        v-else-if="currentUser?.profilePicUrl"
        :src="currentUser.profilePicUrl"
        alt="Current Profile"
        class="profile-preview"
      />
      <input type="file" @change="handleImageUpload" class="file-input" />
    </div>

    <div class="form-container">
      <label for="firstName">Förnamn</label>
      <input type="text" v-model="firstName" class="form-control" />

      <label for="lastName">Efternamn</label>
      <input type="text" v-model="lastName" class="form-control" />

      <label for="email" :class="{ 'label-error': emailError }">E-post</label>
      <input type="email" v-model="email" class="form-control" />
      <span v-if="emailError" class="error-message">{{ emailError }}</span>

      <!-- 🔹 Extra Security: Old Password Required to Change -->
      <label for="oldPassword">Nuvarande lösenord (endast om du ändrar lösenordet)</label>
      <input type="password" v-model="oldPassword" class="form-control" />
      <span v-if="oldPasswordError" class="error-message">{{ oldPasswordError }}</span>

      <label for="newPassword">Nytt lösenord</label>
      <input type="password" v-model="newPassword" class="form-control" />

      <label for="confirmNewPassword">Bekräfta nytt lösenord</label>
      <input type="password" v-model="confirmNewPassword" class="form-control" />
      <span v-if="passwordError" class="error-message">{{ passwordError }}</span>

      <button @click="updateUser" class="update-button">Spara ändringar</button>
    </div>
    <Navbar />
  </div>
</template>

<style scoped>
.account-settings-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #fef7ee;
  color: #3f3d3d;
  font-family: 'Comfortaa', serif;
  padding: 20px;
}

.settings-title {
  font-size: 28px;
  margin-bottom: 1rem;
}

.profile-image-container {
  text-align: center;
  margin-bottom: 1rem;
}

.profile-preview {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.file-input {
  padding: 8px;
}

.form-container {
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
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

.update-button {
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

.update-button:hover {
  background-color: #a5c261;
}

.error-message {
  color: #e74c3c;
  margin-top: 0.5rem;
  text-align: center;
}
</style>
