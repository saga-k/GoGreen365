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
      <p v-if="props.org">Received org: {{ props.org }}</p>
      <p v-else>No org received</p>
      <button @click="closeModal">Close</button>
    </div>

  </article>
</template>

<style scoped></style>