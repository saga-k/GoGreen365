<script setup>
import Navbar from '@/components/Navbar.vue';
import orgListItem from '@/components/orgListItem.vue';
import PointsBar from '@/components/PointsBar.vue';
import orgModal from '@/components/orgModal.vue';
import { useUserStore } from '@/stores/userStore';
import { onMounted, ref } from 'vue';

const userStore = useUserStore()
let user = ref(null)
let isFetched = ref(false)

onMounted(() => {
  user.value = userStore.currentUser;
  console.log(user.value, 'uservalue-frompointsview')
  if (user.value === null || user.value === undefined) {
    user.value = JSON.parse(localStorage.getItem('currentUser'))
  }
  console.log(user.value, 'uservalue-frompointsview2')
  isFetched.value = true
})

const orgs = ref([
  {
    name: "Green Horizon Initiative",
    shortDescription: "Restoring ecosystems through reforestation and ocean cleanup.",
    longDescription: "Green Horizon Initiative is a global nonprofit dedicated to reversing environmental degradation by restoring forests, cleaning up oceans, and rehabilitating damaged ecosystems. Through large-scale tree planting efforts, coastal restoration projects, and collaboration with local communities, the organization works to create a sustainable future. By integrating technology and scientific research, they ensure that their environmental restoration initiatives have a lasting impact on biodiversity and climate resilience.",
    logoUrl: "public/orgLogos/greenHorizon.webp",
    imgUrl: "public/orgImages/greenHorizonImg.jpg"
  },
  {
    name: "Eco Pioneers Alliance",
    shortDescription: "Developing sustainable technologies for a greener future.",
    longDescription: "EcoPioneers Alliance is at the forefront of sustainable innovation, developing and promoting cutting-edge technologies that reduce environmental impact. Their projects range from renewable energy advancements to eco-friendly urban infrastructure and agricultural solutions. Partnering with engineers, scientists, and policymakers, they work to bridge the gap between technology and sustainability, ensuring that businesses and communities can transition towards a more eco-conscious future.",
    logoUrl: "public/orgLogos/ecoPioneers.webp",
    imgUrl: "public/orgImages/ecoPioneersImg.jpg"
  },
  {
    name: "Wild Guard International",
    shortDescription: "Protecting endangered wildlife through conservation programs.",
    longDescription: "WildGuard International is a conservation-focused organization that actively protects endangered species and their natural habitats. They work alongside local governments and indigenous communities to combat poaching, deforestation, and illegal wildlife trade. Through research, advocacy, and hands-on field operations, they ensure that vulnerable animal populations are safeguarded from extinction while promoting sustainable coexistence between humans and wildlife.",
    logoUrl: "public/orgLogos/wildGuard.webp",
    imgUrl: "public/orgImages/wildGuardImg.jpg"
  },
  {
    name: "Blue Pulse Foundation",
    shortDescription: "Preserving marine ecosystems and combating ocean pollution.",
    longDescription: "Blue Pulse Foundation is dedicated to protecting marine environments by reducing ocean pollution, preserving coral reefs, and advocating for sustainable fishing practices. They run community-led clean-up initiatives, fund scientific research on ocean conservation, and push for stronger policies to regulate plastic waste and industrial pollutants. By emphasizing education and community involvement, they empower people to take action in preserving the world’s oceans.",
    logoUrl: "public/orgLogos/bluePulse.jpg",
    imgUrl: "public/orgImages/bluePulseImg.jpg"
  },
  {
    name: "CarbonZero Collective",
    shortDescription: "Helping communities and businesses achieve net-zero emissions.",
    longDescription: "CarbonZero Collective provides innovative solutions to reduce global carbon footprints by supporting carbon offset programs, promoting clean energy adoption, and educating organizations on sustainable practices. They collaborate with companies and governments to implement strategies that lower greenhouse gas emissions while encouraging investments in renewable energy, carbon capture technology, and reforestation initiatives.",
    logoUrl: "public/orgLogos/carbonZero.jpg",
    imgUrl: "public/orgImages/carbonZeroImg.jpg"
  },
  {
    name: "The Verdant Future Project",
    shortDescription: "Empowering communities to adopt sustainable living practices.",
    longDescription: "The Verdant Future Project focuses on grassroots environmental activism, encouraging local communities to adopt sustainable lifestyles. They provide resources and funding for initiatives such as community gardens, renewable energy cooperatives, and zero-waste programs. By fostering environmental awareness and self-sufficiency, they empower individuals to take meaningful action in mitigating climate change and preserving natural resources.",
    logoUrl: "public/orgLogos/verdantFuture.jpg",
    imgUrl: "public/orgImages/verdantFutureImg.jpg"
  },
  {
    name: "Terra Nova Trust",
    shortDescription: "Rehabilitating land affected by deforestation and industrial waste.",
    longDescription: "TerraNova Trust is committed to restoring land that has been damaged by industrial waste, deforestation, and urban expansion. They collaborate with environmental scientists and policymakers to develop rewilding projects, introduce soil restoration techniques, and plant native vegetation in degraded areas. Their work not only helps reverse environmental damage but also supports biodiversity and climate resilience.",
    logoUrl: "public/orgLogos/terraNovaTrust.jpg",
    imgUrl: "public/orgImages/terraNovaImg.jpg"
  },
  {
    name: "Aurora Climate Corps",
    shortDescription: "Mobilizing youth for climate action and environmental advocacy.",
    longDescription: "Aurora Climate Corps is a youth-led movement dedicated to environmental education, climate activism, and policy advocacy. They organize campaigns, workshops, and volunteer programs to empower young people to take part in sustainability efforts. Their mission is to create a new generation of climate-conscious leaders who actively shape policies and promote sustainable change within their communities.",
    logoUrl: "public/orgLogos/aurora.jpg",
    imgUrl: "public/orgImages/auroraImg.jpg"
  }
]);

let chosenOrg = ref(null)
let modalIsOpen = ref(false)

const openModal = (org) => {
  chosenOrg.value = org
  modalIsOpen.value = true
}

const handleCloseModal = () => {
  modalIsOpen.value = false
}
</script>

<template>

  <main v-if="isFetched && !modalIsOpen">
    <div id="listView">
      <h2 class="h2">Påäng</h2>
      <p class="p-medium">Du har {{ user.ecoPoints }} Eco-points. Tjäna hundra så donerar vi 100 sek till valfri
        organisation.
      </p>
      <PointsBar :points='user.ecoPoints'></PointsBar>
      <div id="list">
        <orgListItem v-for="(org, index) in orgs" :key=index :org="org" @click="openModal(org)"></orgListItem>
      </div>
    </div>
  </main>

  <orgModal id="orgModal" v-if="modalIsOpen" :org="chosenOrg" :user="user" @close-modal="handleCloseModal"></orgModal>

  <Navbar id="navBar" page="points"></Navbar>
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

#orgModal {
  background-color: var(--background-color);
  min-height: 100vh;
  margin-bottom: 40px;
}

.h2 {
  margin-bottom: 0.5rem;
}

#navBar {
  z-index: 2;
}
</style>