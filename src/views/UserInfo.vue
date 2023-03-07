<template>
  <h1>User Info</h1>
  <div v-if="status">
    <ul class="status">
      <li>なまえ：{{ status.name }}</li>
      <li>レベル：{{ status.level }}</li>
      <li>たいりょく：{{ status.hp }}</li>
      <li>こうげきりょく：{{ status.atk }}</li>
    </ul>
  </div>
  <div v-else>
    <p>ログインしてください</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface User {
  id: number;
  level: number;
  ex: number;
  hp: number;
  atk: number;
  name: string;
  imageUrl: string;
}

export default defineComponent({
  data(): { status: null | User } {
    return {
      status: null
    }
  },
  created() {
    const login = this.$store.getters.getLogin
    if (!login.isLoggedIn) {
      return
    }
    this.axios.get(`/api/user/${login.id}`).then(res => {
      this.status = res.data
    })
  }
})
</script>

<style>
.status {
  list-style: none;
}
</style>
