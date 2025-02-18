<script setup></script>

<template>
  <router-link to="dashboard">Lägg in login-knapp här</router-link>

  <RouterLink to="forgotPassword">Lägg in länk till glömt lösenord här</RouterLink>

  <RouterLink to="createAccount">Lägg in länk till createAccount här</RouterLink>

  <!-- Välkommen -->
  <div class="login-app">
    <h1>Välkommen!</h1>
    <p>Tack för att du vill vara med och rädda planeten.</p>

    <!-- Login Form-->
    <div class="login-form">
      <label for="email">E-post adress</label>
      <input v-model="email" type="email" placeholder="Ange e-post" />

      <label for="password">Lösenord</label>
    </div>
  </div>
</template>

<style scoped></style>
