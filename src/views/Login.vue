<script setup></script>

<template>
  <!-- Välkommen -->
  <div class="login-app">
    <img src="@/assets/images/happy-earth.png" alt="Happy Earth" class="earth-image" />
    <h1>Välkommen!</h1>
    <p>Tack för att du vill vara med och rädda planeten.</p>

    <!-- Login Form-->
    <div class="form-container">
      <label for="email">E-post adress</label>
      <input v-model="email" type="email" placeholder="Ange e-post" />

      <label for="password">Lösenord</label>
      <input v-model="password" type="password" placeholder="Ange lösenord" />

      <!-- Link to forgot password page -->
      <RouterLink to="forgotPassword" class="forgot-link">Glömt lösenord?</RouterLink>

      <!-- Go to dashbord when click -->
      <button>
        <router-link to="dashboard">Logga in</router-link>
      </button>
    </div>

    <!-- Go to create account page -->
    <RouterLink to="/createAccount" class="create-account-link"> Skapa nytt konto </RouterLink>
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
  color: #3f3d3d;
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
  font-size: 16px;
  color: #3f3d3d;
  text-align: center;
  margin-bottom: 2rem;
}

/* Form style */
.form-container {
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
}

.form-container label {
  margin-bottom: 0.25rem;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.2s ease;
}

.form-container input {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid #f4dec3;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

/* Focus when click */
.form-container input:focus {
  border-color: #c2e07a;
  box-shadow: 0 0 0 2px rgba(194, 224, 122, 0.3);
}

/* Underline for every link paegs */
.forgot-link {
  text-align: right;
  font-size: 14px;
  text-decoration: underline;
  margin-bottom: 1rem;
}

.create-account-link {
  display: block;
  margin-top: 2rem;
  font-size: 14px;
  text-decoration: underline;
}
</style>
