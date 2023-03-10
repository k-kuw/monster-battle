<!-- ログインコンポーネント -->
<template>
  <h1>ログイン</h1>
  <h2 v-if="loginInfo.isLoggedIn">ログインできました！</h2>
  <h2 v-if="loginError !== '' && !loginInfo.isLoggedIn">{{ loginError }}</h2>
  <form @submit="login">
    <div class="input-field">
      <div class="input-label">
        <label for="email">メールアドレス</label>
        <input type="text" name="email" id="email" ref="email">
      </div>
      <div class="input-label">
        <label for="password">パスワード</label>
        <input :type="passwordVisible ? 'text' : 'password'" name="password" id="password" ref="password"
          autocomplete="off">
        <button @click="ChangeVisibly">パスワード表示</button>
      </div>
    </div>
    <button>ログイン</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      loginError: "",
      passwordVisible: false
    }
  },
  computed: {
    loginInfo() {
      return this.$store.getters.getLogin
    }
  },
  methods: {
    // パスワードの表示切り替え
    ChangeVisibly(event:Event) {
      event.preventDefault()
      this.passwordVisible = !this.passwordVisible
    },
    
    // ログイン処理(バックエンドと連携)
    login(event: Event) {
      event.preventDefault()
      // input内容の取得
      const email = (this.$refs.email as HTMLInputElement).value
      const password = (this.$refs.password as HTMLInputElement).value
      // input内容をバックエンドに送信
      this.axios.post('/api/login', { email, password }).then(res => {
        this.$store.dispatch("setLogin", res.data)
      }).catch(err => {
        if (err.response.status === 500) {
          this.loginError = "サーバーとの接続に失敗しました"
          return;
        }
        this.loginError = err.response.data
      })

      // HACK ログイン時にユーザー関連情報を全取得、localStorage等ブラウザ側の機能で共有すべき
    }
  }
})
</script>

<style scoped>
form {
  margin: 3rem 20%;
  padding: 5rem;
  border-radius: 2rem;
  background-color: #c3f7df;
}

input {
  width: 100%;
  height: 2rem;
  margin-bottom: 1rem;
  padding: 0;
  border: none;
  border-radius: 0.5rem;
  background-color: gainsboro;
}

label {
  font-size: 20px;
  font-weight: bolder;
  display: inline-block;
  text-align: center;
  width: 150px;
  margin-right: 1px;
}

.input-label {
  margin-left: 20%;
  margin-right: 20%;
}

.input-field {
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: 10rem;
  margin-right: 10rem;
}

button {
  font-size: 20px;
  font-weight: bolder;
  background-color: gainsboro;
  border-radius: 2rem;
  margin-top: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

button:hover {
  background-color: #42b983;
}
</style>
