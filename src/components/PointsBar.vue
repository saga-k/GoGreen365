<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  points: {
    type: Number,
    required: true
  }
})

onMounted(() => console.log(props.points))

</script>

<template>
  <div id="pointsBar">
    <div id="pointsBarTop" :style="{ width: `${props.points}%` }"></div>
  </div>
</template>

<style scoped>
#pointsBar {
  height: 20px;
  width: 100%;
  background-color: lightgray;
  border-radius: 10px;
}

#pointsBarTop {
  background-color: var(--peach);
  height: 100%;
  transform-origin: left;
  border-radius: 10px;
}
</style>