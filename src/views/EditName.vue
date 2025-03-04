<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const errorMessage = ref('')

onMounted(() => {
  const currentUser = userStore.currentUser
  if (!currentUser) {
    router.push('/')
    return
  }
  firstName.value = currentUser.firstName
  lastName.value = currentUser.lastName
})

const saveName = async () => {
  if (!firstName.value || !lastName.value) {
    errorMessage.value = 'Alla fält måste fyllas i!'
    return
  }

  const updatedUser = {
    ...userStore.currentUser,
    firstName: firstName.value,
    lastName: lastName.value,
  }

  await userStore.updateUserInBe(updatedUser, updatedUser.id)
  userStore.currentUser = updatedUser
  localStorage.setItem('currentUser', JSON.stringify(updatedUser))
  router.push('/settings')
}
</script>

<template>
  <div class="edit-name-container">
    <h1>Redigera namn</h1>
    <input v-model="firstName" placeholder="Förnamn" />
    <input v-model="lastName" placeholder="Efternamn" />
    <button @click="saveName">Spara</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.edit-name-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: 'Comfortaa', serif;
}

input {
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #f4dec3;
  border-radius: 6px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #c2e07a;
  border: none;
  border-radius: 39px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #a5c261;
}

p {
  color: red;
  margin-top: 10px;
}
</style>
