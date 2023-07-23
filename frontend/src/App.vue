<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import { computed } from 'vue'

// Destructure the methods you need from useAuth0
const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

// Create computed property to track if user is authenticated
const isLoggedIn = computed(() => isAuthenticated.value)

// Login method
const login = () => {
  loginWithRedirect({})
}

// Logout method
const logoutUser = () => {
  logout({ returnTo: window.location.origin })
}
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
        <div class="container">
          <RouterLink class="navbar-brand" to="/">Student Lists</RouterLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/students">Students</RouterLink>
              </li>
              <li v-if="!isLoggedIn" class="nav-item">
                <button class="nav-link btn btn-link" @click="login">Login</button>
              </li>
              <li v-if="isLoggedIn" class="nav-item">
                <button class="nav-link btn btn-link" @click="logout">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <RouterView />
</template>
