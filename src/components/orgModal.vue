<script setup>

import { computed, defineEmits, onMounted } from 'vue';
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

const donateMoney = () => {
  userStore.donatePoints(props.user)
}

//for testing purposes
const addPoints = () => {
  userStore.addEcoPoints(props.user, 100)
}

const isDisabled = computed(() => props.user.ecoPoints < 100)

</script>


<template>
  <article id="orgModal">
    <div id="firstRow">
      <h2 class="h2">{{ props.org.name }}</h2>
      <img id="closeIcon" src="/icons/circle-xmark-regular.svg" @click="closeModal" />
    </div>
    <img id="image" :src="props.org.imgUrl" />
    <p class="p-medium">{{ props.org.longDescription }}</p>
    <PointsBar :points="props.user.ecoPoints"></PointsBar>
    <button class="btn-primary" @click="donateMoney()" :disabled="isDisabled">Donera 100
      sek</button>
  </article>
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

.btn-primary {
  height: 3rem;
  width: 15rem;
  align-self: center;
}
</style>