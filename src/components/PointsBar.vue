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
  <div id="componentWrapper">
    <p id="pointsTitle" class="p-medium">Eco points</p>

    <div id="pointsBarWrapper">
      <p class="p-medium" id="pointsCopy">{{ props.points }} / 100</p>

      <div id="pointsBar">
        <div id="pointsBarTop" :style="{ width: `${props.points}%` }">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#componentWrapper {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

#pointsTitle {
  font-weight: 700;
}

#pointsBarWrapper {
  display: flex;
  justify-content: center;
}

#pointsCopy {
  position: absolute;
  z-index: 1;
  font-weight: 700;
}

#pointsBar {

  height: 22px;
  width: 100%;
  max-width: 100%;
  background-color: lightgray;
  border-radius: 15px;
}

#pointsBarTop {

  background-color: var(--peach);
  height: 22px;
  max-width: 100%;
  border-radius: 15px;
}

#succesMessage {
  position: absolute;
  z-index: 3;
}
</style>