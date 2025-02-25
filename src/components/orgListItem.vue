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
    <img id="imageContainer" :src="props.org.imgUrl" />

    <div id="rightSide">
      <h3 class="h3">{{ props.org.name }}</h3>
      <p class="p-small">{{ props.org.shortDescription }}</p>
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
  gap: 1rem;
}

#imageContainer {
  background-color: lightgrey;
  height: 50px;
  width: 50px;
  border-radius: 50px;
}

#rightSide {
  display: flex;
  flex-direction: column;
}
</style>