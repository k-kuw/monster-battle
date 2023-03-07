<template>
  <h1>Login User</h1>
  <form @submit="login">
    <div>
      <label for="email">email</label>
      <input type="text" name="email" id="email" ref="email">
    </div>
    <div>
      <label for="password">password</label>
      <input type="text" name="password" id="password" ref="password">
    </div>
    <button>ログイン</button>
  </form>
  <p>{{ loginInfo }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    loginInfo() {
      return this.$store.getters.getLogin
    }
  },
  methods: {
    login(event: Event) {
      event.preventDefault()
      const email = (this.$refs.email as HTMLInputElement).value
      const password = (this.$refs.password as HTMLInputElement).value

      this.axios.post('/api/login', { email, password }).then(res => {
        console.log(res.data)
        this.$store.dispatch("setLogin", res.data)

      }).catch(err => console.log(err.response.data))
    }
  }
})
</script>
