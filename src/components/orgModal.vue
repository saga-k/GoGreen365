<script setup>

const props = defineProps({
  org: {
    type: Object
  }
})


</script>


<template>
  <article id="orgModal">
    <div id="firstRow">
      <p v-if="props.org">Received org: {{ props.org }}</p>
      <p v-else>No org received</p>
    </div>

  </article>
</template>

<style scoped></style>