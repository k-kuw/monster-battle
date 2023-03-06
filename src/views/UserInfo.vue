<template>
  <h1>User Info</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  created() {
    this.axios.get('/api/user/1').then(res => { console.log(res) })
  }
})
</script>
