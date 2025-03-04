<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()

const email = ref('')
const errorMessage = ref('')

onMounted(() => {
  const currentUser = userStore.currentUser
  if (!currentUser) {
    router.push('/')
    return
  }
  email.value = currentUser.mail
})

const saveEmail = async () => {
  if (!email.value) {
    errorMessage.value = 'E-post kan inte vara tomt!'
    return
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value)) {
    errorMessage.value = 'Ogiltig e-postadress!'
    return
  }

  const updatedUser = {
    ...userStore.currentUser,
    mail: email.value,
  }

  await userStore.updateUserInBe(updatedUser, updatedUser.id)
  userStore.currentUser = updatedUser
  localStorage.setItem('currentUser', JSON.stringify(updatedUser))
  router.push('/settings')
}
</script>

<template>
  <div class="edit-email-container">
    <h1>Redigera e-post</h1>
    <input v-model="email" placeholder="E-post" />
    <button @click="saveEmail">Spara</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.edit-email-container {
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
