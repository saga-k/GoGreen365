<script setup></script>

<template>
  <!-- Välkommen -->
  <div class="login-app">
    <img src="@/assets/images/happy-earth.png" alt="Happy Earth" class="earth-image" />
    <h1>Välkommen!</h1>
    <p>Tack för att du vill vara med och rädda planeten.</p>

    <!-- Login Form-->
    <div class="login-form">
      <label for="email">E-post adress</label>
      <input v-model="email" type="email" placeholder="Ange e-post" />

      <label for="password">Lösenord</label>
      <input v-model="password" type="password" placeholder="Ange lösenord" />

      <!-- Link to forgot password page -->
      <RouterLink to="forgotPassword">Glömt lösenord?</RouterLink>

      <!-- Go to dashbord when click -->
      <button>
        <router-link to="dashboard">Logga in</router-link>
      </button>
    </div>

    <!-- Go to create account page -->
    <RouterLink to="/createAccount"> Skapa nytt konto </RouterLink>
  </div>
</template>

<style scoped>
/* Base style */
.login-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fef7ee;
  font-family: 'Comfortaa', serif;
}

/* Image - Logo */
.earth-image {
  width: 200px;
  margin-bottom: 0.5rem;
}

/* Font style */
h1 {
  font-size: 24px;
  margin-bottom: 1rem;
  color: #3f3d3d;
}

.subtitle {
  color: #3f3d3d;
  text-align: center;
  margin-bottom: 2rem;
}


</style>
