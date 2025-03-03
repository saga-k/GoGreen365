<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import Navbar from '@/components/Navbar.vue'

// Modal - confirmation popup
const showLogoutPopup = ref(false)
const showDeletePopup = ref(false)
const showDeleteResult = ref(false)

const router = useRouter()
const userStore = useUserStore()

// Fetch user data
onMounted(async () => {
  await userStore.fetchUsers()
})

// Update password
const navigateToUpdatePassword = () => {
  router.push('/updatePassword')
}

// Logout Modal - confirmation popup
// Popup showup when click
const logout = () => {
  showLogoutPopup.value = true
}

// If confirm to logout push to login page
const confirmLogout = () => {
  showLogoutPopup.value = false
  userStore.logout() // Clear user data
  router.push('/')
}

// If not stay remaining to current page
const cancelLogout = () => {
  showLogoutPopup.value = false
}

// Delete account Modal - confirmation popup
// Popup showup when click
const deleteAccount = () => {
  showDeletePopup.value = true
}

// If confirm to delete push to login page
const confirmDelete = async () => {
  const success = await userStore.deleteUser()
  if (success) {
    showDeletePopup.value = false
    showDeleteResult.value = true
  }
}

// Final ask
const confirmFinalDelete = () => {
  showDeletePopup.value = false
  showDeleteResult.value = false
  router.push('/')
}

// If not stay remaining to current page
const cancelDelete = () => {
  showDeletePopup.value = false
}
</script>

<template>
  <div class="setting-container">
    <img src="@/assets/images/happy-earth.png" alt="Happy Planet" class="earth-image" />

    <div class="name-container">
      <h1 v-if="userStore.currentUser">
        {{ userStore.currentUser.firstName }} {{ userStore.currentUser.lastName }}
        <router-link to="/accountsetting">
          <img src="/icons/setting-mark.png" alt="setting-mark" class="setting-mark-img" />
        </router-link>
      </h1>
      <h1 v-else>...</h1>
    </div>

    <div class="email-container">
      <h2 v-if="userStore.currentUser">
        {{ userStore.currentUser.mail }}
        <router-link to="/accountsetting">
          <img src="/icons/setting-mark.png" alt="setting-mark" class="setting-mark-img" />
        </router-link>
      </h2>
    </div>

    <button @click="navigateToUpdatePassword" class="update-password-button">
      Uppdateara lösenord
    </button>

    <button @click="logout" class="logout-button">Logga ut</button>

    <h2 class="delete-account" @click="deleteAccount">Radera konto</h2>

    <!-- Logout confirmation popup -->
    <div v-if="showLogoutPopup" class="modal-overlay">
      <div class="modal">
        <p>Är du säker på att du vill logga ut?</p>
        <div class="button-container">
          <button @click="confirmLogout" class="confirm-button">Ja</button>
          <button @click="cancelLogout" class="cancel-button">Nej</button>
        </div>
      </div>
    </div>

    <!-- Deleat account confirmation popup -->
    <div v-if="showDeletePopup" class="modal-overlay">
      <div class="modal">
        <p>Är du säker på att du vill <strong>radera</strong> denna konto?</p>
        <div class="button-container">
          <button @click="confirmDelete" class="confirm-button">Ja</button>
          <button @click="cancelDelete" class="cancel-button">Nej</button>
        </div>
      </div>
    </div>

    <!-- Final confirmation popup -->
    <div v-if="showDeleteResult" class="modal-overlay">
      <div class="modal">
        <p><strong>Ditt konto har raderats!</strong></p>
        <div class="button-container">
          <button @click="confirmFinalDelete" class="confirm-button">OK</button>
        </div>
      </div>
    </div>
  </div>
  <Navbar id="navBar" page="setting"></Navbar>
</template>

<style scoped>
/* Base style */
.setting-container {
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
  font-size: 24px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #3f3d3d;
}

h2 {
  font-size: 16px;
  margin-bottom: 5rem;
  color: #3f3d3d;
}

.delete-account {
  font-size: 14px;
  color: #3f3d3d;
  text-decoration: underline;
}

/* Buttons */
.update-password-button {
  font-size: 14px;
  font-family: 'Comfortaa', serif;
  font-weight: bold;
  background-color: #c2e07a;
  color: #3f3d3d;
  border: none;
  border-radius: 39px;
  padding: 0.75rem;
  margin-bottom: 5rem;
  cursor: pointer;
  min-width: 200px;
  transition: background-color 0.3s ease;
}

.update-password-button:hover {
  background-color: #a5c261;
}

.logout-button {
  font-size: 14px;
  font-family: 'Comfortaa', serif;
  font-weight: bold;
  background-color: #ffbcb5;
  color: #3f3d3d;
  border: none;
  border-radius: 39px;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  min-width: 200px;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #fbb3ab;
}

/* Popup */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #3f3d3d;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fef7ee;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.modal p {
  margin-bottom: 3rem;
  margin-top: 3rem;
}

/* Buttons in modal or popup */
.confirm-button {
  font-size: 14px;
  font-family: 'Comfortaa', serif;
  font-weight: bold;
  background-color: #c2e07a;
  color: #3f3d3d;
  border: none;
  border-radius: 20px;
  padding: 0.75rem;
  cursor: pointer;
  margin-bottom: 3rem;
  transition: background-color 0.3s ease;
  min-width: 80px;
}

.confirm-button:hover {
  background-color: #a5c261;
}

.cancel-button {
  font-size: 14px;
  font-family: 'Comfortaa', serif;
  font-weight: bold;
  background-color: #fbb3ab;
  color: #3f3d3d;
  border: none;
  border-radius: 20px;
  padding: 0.75rem;
  margin-bottom: 3rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 80px;
}

.cancel-button:hover {
  background-color: #fbb3ab;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

/* Img */
.setting-mark-img {
  width: 18px;
}
</style>
