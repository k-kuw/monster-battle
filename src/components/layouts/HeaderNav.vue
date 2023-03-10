<!-- ヘッダーコンポーネント -->
<template>
  <header>
    <h1>モンスターバトル</h1>
    <nav>
      <ul>
        <li>
          <router-link to="/">ホーム</router-link>
        </li>
        <li>
          <router-link to="/battle">バトル</router-link>
        </li>
        <li>
          <router-link to="/login">ログイン</router-link>
        </li>
        <li>
          <router-link to="/register">ユーザー登録</router-link>
        </li>
        <li>
          <router-link to="/userInfo">ステータス</router-link>
        </li>
        <!-- ログイン時のみログアウト項目の表示 -->
        <li v-if="isLoggedIn">
          <router-link to="/" @click="logout">ログアウト</router-link>
        </li>
        <p v-if="name">ログイン中：{{ name }}さん</p>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  methods: {
    // ログアウトボタンの処理
    logout() {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.getLogin.isLoggedIn
    },
    name() {
      return this.$store.getters.getLogin.name
    }
  }
})
</script>

<style scoped>
header {
  border-bottom: #42b983 dashed 3px;
}

h1 {
  font-size: 48px;
  color: #42b983;
  text-shadow: black 3px 1px;
  margin: 0;
}

ul {
  display: flex;
  margin: 0;
  list-style: none;
  justify-content: center;
}

li, p {
  margin: 0 2rem;
  font-size: larger;
}

p {
  color: #42b983;
  text-shadow: black 1px 1px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
