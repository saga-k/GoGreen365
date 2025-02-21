<script setup>
import { ref } from 'vue';

//Below is hardcoded mockdata for testing, add dynamic updates later

let week = ref([
  {
    day: 'Mån',
    challengeDone: true
  },
  {
    day: 'Tis',
    challengeDone: false
  },
  {
    day: 'Ons',
    challengeDone: false
  },
  {
    day: 'Tor',
    challengeDone: true
  },
  {
    day: 'Fre',
    challengeDone: true
  },
  {
    day: 'Lör',
    challengeDone: true
  },
  {
    day: 'Sön',
    challengeDone: true
  }

])

</script>

<template>

  <div id="componentWrapper">
    <h3 class="h3">Veckans Framsteg</h3>

  </div>
</template>

<style scoped>

#componentWrapper {
  width: 100%;
  height: 200px;
  border: solid 1px var(--border-color);
  background-color: white;
  border-radius: 20px;
  padding: 1rem;
}
</style>