<script setup>
//need to get daily challenge from json and pinia

</script>

<template>
  <div id="wrapper">
    <div id="left">
      <h3 class="h3">Dagens utmaning</h3>
      <div id="dateDisplay">
        <p class="p-small" id="dateCopy">I dag 17 Feb</p> <!--Detta är hårdkodat nu, vi får byta det sedan-->
      </div>
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
  border: solid 1px var(--border-color);
  width: min-content;
  padding: 0.2rem 0.5rem;
  border-radius: 30px;
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
</style>