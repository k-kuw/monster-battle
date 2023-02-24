<template>
  <h1>Register User</h1>
  <user-form>
    <div>
    <label for="name">Name</label>
    <input type="text" name="name" id="name">
    </div>
  </user-form>
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
