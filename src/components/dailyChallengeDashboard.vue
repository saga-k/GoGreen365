<script setup>
import dateDisplay from './dateDisplay.vue';
//need to get daily challenge from json and pinia

</script>

<template>
  <div id="wrapper">
    <div id="left">
      <h3 class="h3">Dagens utmaning</h3>
      <dateDisplay id="dateDisplay" />
    </div>
    <div id="placeHolder"></div>
  </div>

</template>

<style scoped>
#wrapper {
  width: 100%;
  height: 7rem;
  background-color: white;
  border: solid 1px var(--border-color);
  border-radius: 20px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}

#left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#dateDisplay {
  width: min-content;
  text-wrap: noWrap;
}

#dateCopy {
  text-wrap: nowrap;
}

#placeHolder {
  background-color: lightgray;
  height: 100%;
  width: 7rem;
  border-radius: 8px;
}

@media (min-width: 768px) {
  .h3 {
    font-size: 24px;
  }
  #wrapper {
    height: 10rem;
    padding: 2rem;
  }
  #placeHolder {
    width: 10rem;
    height: 100%;
  }
}
</style>
