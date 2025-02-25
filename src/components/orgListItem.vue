<script setup>
import { onMounted } from 'vue';


const props = defineProps({
  org: {
    type: Object
  }
})

onMounted(() => console.log('props:', props.org))

</script>

<template>
  <article id="orgWrapper">
    <div id="imageContainer"></div>

    <div id="rightSide">
      <h3 class="h3">{{ props.org.name }}</h3>
      <p class="p-small">{{ props.org.description }}</p>
    </div>
  </article>
</template>

<style scoped>
#orgWrapper {
  background-color: white;
  border: solid 1px var(--border-color);
  border-radius: 20px;
  padding: 1rem;
  display: flex;
}

#imageContainer {
  background-color: lightgrey;
  height: 50px;
  width: 50px !important;
  border-radius: 50px;
  flex-grow: 1;
}

#rightSide {
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
}
</style>