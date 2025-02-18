<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterLink to="/"><!--Detta kan fortsätta vara tomt--></RouterLink>
  <RouterLink to="/onboarding"
    >OnBoarding
    <!--Detta har adderat här bara för testning-->
  </RouterLink>

  <RouterView />
</template>
