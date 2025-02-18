<script setup></script>

<template>
  <!-- Välkommen -->
  <div class="login-app">
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

<style scoped></style>
