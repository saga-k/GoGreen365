<script setup></script>

<template>
  <div class="">
    <div class="forgot-app">
      <img src="@/assets/images/happy-earth.png" alt="Happy Earth" class="earth-image" />
    </div>

    <div class="form-container">
      <!-- Change password -->
      <h1>Ändra lösenord</h1>

      <!-- Controll E-mail -->
      <label for="email">E-postadress</label>
      <input v-model="newEmail" type="email" placeholder="Ange e-post" />

      <!-- new password -->
      <label for="newPassword">Nytt lösenord</label>
      <input v-model="newPassword" type="password" placeholder="Ange nytt lösenord" />

      <!-- confirm new password -->
      <label for="confirmPassword">bekräfta lösenord</label>
      <input v-model="confirmPassword" type="password" placeholder="Bekräfta lösenord" />

      <button @click="updatePassword">Ändra lösenord</button>
    </div>
    <RouterLink to="/createAccount" class="create-account-link">Skapa nytt konto</RouterLink>
  </div>
</template>

<style scoped></style>
