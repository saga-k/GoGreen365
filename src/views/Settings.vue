<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import Navbar from '@/components/Navbar.vue'

const showLogoutPopup = ref(false)
const showDeletePopup = ref(false)
const showDeleteResult = ref(false)
const passwordInput = ref('')
const passwordError = ref('')

const router = useRouter()
const userStore = useUserStore()

let user = ref(null)

onMounted(async () => {
  await userStore.fetchUsers()
  setCurrentUser()
})

// const navigateToUpdatePassword = () => {
//   router.push('/updatePassword')
// }

const setCurrentUser = () => {
  user.value = userStore.currentUser
  //If userStore doesnt have a current user, get current user from local storage
  if (user.value === null || user.value === undefined) {
    user.value = JSON.parse(localStorage.getItem('currentUser'))
    userStore.currentUser = user.value
  }

  //If there's no user in local storage, user is logged out and will be rerouted to login page
  if (user.value === null || user.value === undefined) {
    router.push('/')
  }
}

const logout = () => {
  showLogoutPopup.value = true
}

const confirmLogout = () => {
  showLogoutPopup.value = false
  userStore.logout()
  router.push('/')
}

const cancelLogout = () => {
  showLogoutPopup.value = false
}

const deleteAccount = () => {
  showDeletePopup.value = true
}

const confirmDelete = async () => {
  passwordError.value = ''

  if (!passwordInput.value) {
    passwordError.value = 'Vänligen ange ditt lösenord.'
    return
  }

  /*
    Is only safe if passwords are stored in plain text (which is not recommended in real-world apps).
    If you later switch to hashed passwords, this logic will need to compare via backend verification instead.
  */

  if (passwordInput.value !== userStore.currentUser.password) {
    passwordError.value = 'Felaktigt lösenord!'
    return
  }

  const success = await userStore.deleteUser()
  if (success) {
    passwordInput.value = ''
    alert('Ditt konto har raderats!')
    router.push('/')
  } else {
    alert('Fel vid radering av konto.')
  }
}

const confirmFinalDelete = () => {
  showDeleteResult.value = false
  router.push('/')
}

const cancelDelete = () => {
  showDeletePopup.value = false
  passwordInput.value = ''
  passwordError.value = ''
}
</script>

<template>
  <div class="setting-container">
    <img src="@/assets/images/happy-earth.png" alt="Happy Planet" class="earth-image" />

    <!-- Edit name -->
    <div class="name-container" @click="router.push('/editName')">
      <h1 v-if="userStore.currentUser">
        {{ userStore.currentUser.firstName }} {{ userStore.currentUser.lastName }}
        <img src="/icons/setting-mark.png" alt="Edit Name" class="setting-mark-img" />
      </h1>
    </div>

    <!-- Edit email -->
    <div class="email-container" @click="router.push('/editEmail')">
      <h2 v-if="userStore.currentUser">
        {{ userStore.currentUser.mail }}
        <img src="/icons/setting-mark.png" alt="Edit Email" class="setting-mark-img" />
      </h2>
    </div>

    <!-- Update password -->
    <button @click="router.push('/updatePassword')" class="update-password-button">
      Uppdatera lösenord
    </button>

    <!-- Logout and delete buttons -->
    <button @click="logout" class="logout-button">Logga ut</button>
    <h2 class="delete-account" @click="deleteAccount">Radera konto</h2>

    <!-- Modals (Logout, Delete) -->
    <div v-if="showLogoutPopup" class="modal-overlay">
      <div class="modal-logout">
        <p>Är du säker på att logga ut?</p>
        <div class="button-container">
          <button @click="confirmLogout" class="confirm-button">Ja</button>
          <button @click="cancelLogout" class="cancel-button">Nej</button>
        </div>
      </div>
    </div>

    <div v-if="showDeletePopup" class="modal-overlay">
      <div class="modal">
        <p>Är du säker på att <strong>radera</strong> ditt konto?</p>

        <label for="password" class="label">(Ange lösenord för att radera)</label>

        <input
          type="password"
          v-model="passwordInput"
          :class="{ 'input-error': passwordError }"
          placeholder="Ange ditt lösenord"
          class="control-password"
          autocomplete="current-password"
        />

        <p v-if="passwordError" class="error-message">{{ passwordError }}</p>

        <div class="button-container">
          <button @click="confirmDelete" class="confirm-button">Ja</button>
          <button @click="cancelDelete" class="cancel-button">Nej</button>
        </div>
      </div>
    </div>

    <div v-if="showDeleteResult" class="modal-overlay">
      <div class="modal">
        <p><strong>Ditt konto har raderats!</strong></p>
        <div class="button-container">
          <button @click="confirmFinalDelete" class="confirm-button">OK</button>
        </div>
      </div>
    </div>

    <Navbar id="navBar" page="setting"></Navbar>
  </div>
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
  font-family: Lato, sans-serif;
}

.name-container,
.email-container {
  cursor: pointer;
}

.name-container:hover,
.email-container:hover {
  opacity: 0.8;
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
  margin-bottom: 1rem;
  color: #3f3d3d;
}

h2 {
  font-size: 16px;
  margin-bottom: 3.5rem;
  color: #3f3d3d;
}

.delete-account {
  font-size: 16px;
  color: #3f3d3d;
  text-decoration: underline;
}

/* Buttons */
.update-password-button {
  font-size: 16px;
  background-color: #c2e07a;
  color: #3f3d3d;
  border: none;
  border-radius: 39px;
  padding: 0.75rem;
  margin-bottom: 3.5rem;
  cursor: pointer;
  min-width: 250px;
  transition: background-color 0.3s ease;
}

.update-password-button:hover {
  background-color: #a5c261;
}

.logout-button {
  font-size: 16px;
  background-color: #ffbcb5;
  color: #3f3d3d;
  border: none;
  border-radius: 39px;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  min-width: 250px;
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
  z-index: 9999;
}

.modal {
  background: #fef7ee;
  padding: 15px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  width: 300px;
  min-height: 250px;
  z-index: 9999;
}

.modal-logout {
  background: #fef7ee;
  padding: 15px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  width: 300px;
  min-height: 250px;
  z-index: 9999;
}

.modal-logout p {
  font-size: 16px;
}

.modal p {
  font-size: 16px;
}

.modal label {
  font-size: 16px;
  margin-bottom: 0.25rem;
}

.modal input {
  margin: 0.5rem 0 0.75rem;
  margin-bottom: 0;
  padding: 10px;
  width: 100%;
  max-width: 250px;
  border: 1px solid #f4dec3;
  border-radius: 6px;
  outline: none;
}

.modal input:focus {
  border-color: #c2e07a;
  box-shadow: 0 0 0 2px rgba(194, 224, 122, 0.3);
}

.error-message {
  font-size: 16px;
  color: #e74c3c;
}

.input-error {
  border-color: #ff6b6b !important;
}

/* Buttons in modal or popup */
.confirm-button {
  font-size: 16px;
  background-color: #c2e07a;
  color: #3f3d3d;
  border: none;
  border-radius: 20px;
  padding: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 80px;
}

.confirm-button:hover {
  background-color: #a5c261;
}

.cancel-button {
  font-size: 16px;
  background-color: #fbb3ab;
  color: #3f3d3d;
  border: none;
  border-radius: 20px;
  padding: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 80px;
}

.cancel-button:hover {
  background-color: #e79a91;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 0.5rem;
  margin-bottom: 0;
}

/* Img */
.setting-mark-img {
  width: 18px;
}

@media (min-width: 768px) {
  .setting-container {
    padding: 2rem;
  }

  .earth-image {
    width: 220px;
  }

  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 16px;
  }

  .update-password-button,
  .logout-button {
    font-size: 16px;
    padding: 0.9rem 1.2rem;
  }

  .modal,
  .modal-logout {
    width: 350px;
    min-height: 280px;
  }

  .modal p,
  .modal-logout p {
    font-size: 16px;
    margin: 1rem 0;
  }
}

@media (min-width: 1024px) {
  .setting-container {
    max-width: 1000px;
    margin: 0 auto;
  }

  .earth-image {
    width: 200px;
  }

  h1 {
    font-size: 40px;
  }

  h2 {
    font-size: 20px;
  }

  .update-password-button,
  .logout-button {
    font-size: 1rem;
    padding: 1rem 1.5rem;
  }

  .modal,
  .modal-logout {
    width: 400px;
    min-height: 300px;
    padding: 20px;
  }

  .modal p,
  .modal-logout p {
    font-size: 20px;
  }
}
</style>
