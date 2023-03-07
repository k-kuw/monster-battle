<template>
  <header>
    <h2>Header</h2>
    <nav>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/battle">Battle</router-link>
        </li>
        <li>
          <router-link to="/login">Login</router-link>
        </li>
        <li>
          <router-link to="/register">Register</router-link>
        </li>
        <li>
          <router-link to="/userInfo">UserInfo</router-link>
        </li>
        <li>
          <button @click="logout">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
  <hr>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
})
</script>

<style scoped>
ul {
  display: flex;
  margin: 0;
}

li {
  margin: 0 1rem;
}
</style>
