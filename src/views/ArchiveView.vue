<script setup>
import Navbar from '@/components/Navbar.vue';
import DateDisplay from '@/components/dateDisplay.vue';



</script>




<template>
 <div class="min-h-screen flex flex-col items-center pt-8">
  <main class="challenge-container">
    <div class="header">
      <h1 class="h1">Arkiverad utmaning</h1>
      <DateDisplay />
    </div>
   
    

      
      
              
     <Navbar page="archive"></Navbar>
    
    
    </main>
  </div>
</template>

<style scoped>

main {
  background-color: var(--background-color);
  height: min-content;
  min-height: 100vh;
  padding: 50px 20px;
  margin-bottom: 40px;
}

.challenge-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  gap: 1rem;
}


.archived-container {
  background-color: #fdfaf4;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}



.date-button {
  background: #fff;
  border: 1px solid #ddd;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 14px;
}

.calendar-wrapper {
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
}



  
  .calender {
    width: 380px;
    height: auto;
    display: flex;
    flex-direction: column;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
  }
  
  .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 10px;
}

.header button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  width: 40px;
  height: 40px;
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
}

</style>


