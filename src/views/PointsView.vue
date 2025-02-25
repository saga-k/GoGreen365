<script setup>
import Navbar from '@/components/Navbar.vue';
import orgListItem from '@/components/orgListItem.vue';
import { ref } from 'vue';

const orgs = ref([
  {
    name: "Green Horizon Initiative",
    description: "A global organization dedicated to restoring degraded ecosystems through large-scale reforestation and ocean cleanup projects.",
    imgUrl: 'public/orgLogos/greenHorizon.webp'
  },
  {
    name: "Eco Pioneers Alliance",
    description: "Focuses on developing and promoting cutting-edge sustainable technologies for energy, agriculture, and urban planning.",
    imgUrl: 'public/orgLogos/ecoPioneers.webp'
  },
  {
    name: "Wild Guard International",
    description: "A conservation group that protects endangered wildlife through anti-poaching programs and habitat restoration.",
    imgUrl: 'public/orgLogos/wildGuard.webp'
  },
  {
    name: "Blue Pulse Foundation",
    description: "A marine-focused NGO working to combat plastic pollution, preserve coral reefs, and advocate for sustainable fishing practices.",
    imgUrl: null
  },
  {
    name: "CarbonZero Collective",
    description: "A nonprofit dedicated to helping businesses and communities achieve net-zero carbon emissions through innovative policies and green initiatives.",
    imgUrl: null
  },
  {
    name: "The Verdant Future Project",
    description: "A grassroots movement empowering local communities to implement eco-friendly solutions and sustainable living practices.",
    imgUrl: null
  },
  {
    name: "TerraNova Trust",
    description: "Works on reclaiming and rehabilitating land damaged by deforestation, mining, and industrial waste.",
    imgUrl: null
  },
  {
    name: "Aurora Climate Corps",
    description: "A youth-led organization that mobilizes volunteers for climate action, education, and policy advocacy.",
    imgUrl: null
  },
  {
    name: "Biosphere Builders",
    description: "Focuses on urban greening projects, such as rooftop gardens, vertical forests, and green infrastructure in cities.",
    imgUrl: null
  },
  {
    name: "Gaia’s Guardians",
    description: "A spiritual and environmental group that blends ecological activism with cultural traditions to promote harmony between humans and nature.",
    imgUrl: null
  }
]);

</script>

<template>

  <main>
    <h2 class="h2">Påäng</h2>
    <div id="list">
      <orgListItem v-for="(org, index) in orgs" :key=index :org="org"></orgListItem>
    </div>
  </main>
  <Navbar page="points"></Navbar>
</template>

<style scoped>
main {
  background-color: var(--background-color);
  height: min-content;
  min-height: 100vh;
  padding: 50px 20px 50px 20px;
  margin-bottom: 40px;
}

#list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>