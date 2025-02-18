<script setup></script>

<template>
  <!-- Create account -->
  <div class="create-account">
    <h1>Skapa konto</h1>

    <!-- Registration Form -->
    <div class="create-form">
      <label for="email">E-post adress</label>
      <input v-model="email" type="email" placeholder="Ange e-post" />

      <label for="password">Lösenord</label>
      <input v-model="password" type="password" placeholder="Ange lösenord" />

      <label for="password">Bekräfta lösenord</label>
      <input v-model="password" type="password" placeholder="Ange lösenord" />
    </div>

    <!-- Link to onboarding page -->
    <button>
      <RouterLink to="onboarding">Registera</RouterLink>
    </button>

    <!-- Go to login page -->
    <RouterLink to="/">Har du redan ett konto? Logga in</RouterLink>
  </div>
</template>
