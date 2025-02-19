<script setup>
import { useUserStore } from '@/stores/userStore'
import { ref, onMounted } from 'vue'

onMounted(() => {
  userStore.fetchUsers()
})

const userStore = useUserStore()

let testUser = {
  firstname: null,
  lastname: null,
  email: null,
  password: null
}

function addTestUser() {
  userStore.addUser(testUser)
}

</script>

<template>
  <h1>createAccount</h1>
  <RouterLink to="onboarding">Lägg in länk till onboarding screen här</RouterLink>
  <input id='firstname' type="text" placeholder="firstname" v-model="testUser.firstname">
  <input id='lastname' type="text" placeholder="lastname" v-model="testUser.lastname">
  <input id='email' type="text" placeholder="email" v-model="testUser.email">
  <input id='password' type="text" placeholder="password" v-model="testUser.password">
  <button @click="addTestUser">AddUser</button>


</template>