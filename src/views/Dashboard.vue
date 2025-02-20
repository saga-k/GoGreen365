<script setup>
import Navbar from '@/components/Navbar.vue'
import { useUserStore } from '@/stores/userStore'
import { ref, onMounted, computed, watch, nextTick } from 'vue';

const userStore = useUserStore()
let user = ref(null)

onMounted(async () => {
  await userStore.fetchUsers()
  user.value = userStore.getUserById('1');
  console.log(user.value)
})







</script>

<template>
  <h1>dashboard</h1>
  <Navbar page="dashboard"></Navbar>
</template>