<template>
  <h1>Login User</h1>
  <form>
    <div>
      <label for="email">email</label>
      <input type="text" name="email" id="email">
    </div>
    <div>
      <label for="passward">passward</label>
      <input type="text" name="passward" id="passward">
    </div>
    <button>ログイン</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

})
</script>
