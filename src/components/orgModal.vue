<script setup>

import { computed, defineEmits, onMounted, ref } from 'vue';
import PointsBar from './PointsBar.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()

const props = defineProps({
  org: {
    type: Object,
    required: true
  },
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['closeModal'])
const closeModal = () => emit('closeModal')

let success = ref(false)

const donateMoney = () => {
  userStore.donatePoints(props.user)
  success.value = true
}

//for testing purposes
const addPoints = () => {
  userStore.addEcoPoints(props.user, 100)
}

const isDisabled = computed(() => props.user.ecoPoints < 100)

const closeSuccess = () => {
  success.value = false
  console.log(success.value)
}
</script>


<template>
  <div id="orgModal" v-if="success === false">
    <div id="firstRow">
      <h2 class="h2">{{ props.org.name }}</h2>
      <img id="closeIcon" src="/icons/circle-xmark-regular.svg" @click="closeModal" />
    </div>
    <img id="image" :src="props.org.imgUrl" />
    <p class="p-medium">{{ props.org.longDescription }}</p>
    <PointsBar :points="props.user.ecoPoints"></PointsBar>
    <button class="btn-primary" id="bigButton" @click="donateMoney()" :disabled="isDisabled">Donera 100
      sek</button>
  </div>

  <div class="successMsg" v-else>
    <img id="happyPlanet" src="../assets/happyPlanet.svg" />
    <h2 class="h2">Bra jobbat!</h2>
    <p class="p-small">Du har just donerat 100 SEK till en miljöorganisation! 🌱 Tack för att du gör
      skillnad –
      tillsammans skapar vi en grönare framtid. Fortsätt samla poäng och stöd fler viktiga miljöinitiativ! 💚</p>
    <button class="btn-primary" id="smallButton" @click="closeSuccess">Ok</button>
  </div>
</template>

<style scoped>
#orgModal {
  padding: 50px 20px 50px 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#firstRow {
  display: flex;
  justify-content: space-between;
}

#closeIcon {
  height: 20px;
}

#image {
  width: 100%;
  border-radius: 20px;
}

#bigButton {
  height: 3rem;
  width: 15rem;
  align-self: center;
}

.successMsg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

#smallButton {
  width: 150px;
}

#happyPlanet {
  width: 150px;
  border-radius: 300px;
  margin-bottom: 2rem;
}
</style>