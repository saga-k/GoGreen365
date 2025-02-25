<script setup>

import { defineEmits } from 'vue';

const props = defineProps({
  org: {
    type: Object
  }
})

const emit = defineEmits(['closeModal'])
const closeModal = () => emit('closeModal')

</script>


<template>
  <article id="orgModal">
    <div id="firstRow">
      <p>{{ props.org.name }}</p>
      <img src="/icons/circle-xmark-regular.svg" @click="closeModal" />
      <button @click="closeModal">Close</button>
    </div>

  </article>
</template>

<style scoped></style>