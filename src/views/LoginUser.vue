<template>
  <h1>Login User</h1>
  <user-form></user-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserForm from '../components/UserForm.vue'

export default defineComponent({
  components: {
    UserForm
  }
})
</script>
