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
      <h2 class="h2">{{ props.org.name }}</h2>
      <img id="closeIcon" src="/icons/circle-xmark-regular.svg" @click="closeModal" />
    </div>
    <img id="image" :src="props.org.imgUrl" />
    <p class="p-medium">{{ props.org.longDescription }}</p>
  </article>
</template>

<style scoped>
#orgModal {
  padding: 50px 20px 50px 20px;
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
</style>