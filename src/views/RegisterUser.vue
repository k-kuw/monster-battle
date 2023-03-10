<!-- ユーザー登録コンポーネント -->
<template>
  <h1>ユーザー登録</h1>
  <!-- 入力不備、登録時サーバーエラーがあった場合 -->
  <p v-if="notification !== ''">{{ notification }}</p>

  <p v-if="fetchCharactersError !== ''">{{ fetchCharactersError }}</p>
  <form @submit="registerUser">
    <div class="input-field">
      <div class="input-label">
        <label for="name">なまえ</label>
        <input type="text" name="name" id="name" ref="name">
      </div>
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

    <!-- バックエンドからのキャラクター情報が取得できなかった場合 -->
    <p v-if="!characters">サーバーエラー（再読み込みしてください）</p>

    <ul v-else class="characters">
      <li v-for="character in characters" :key="character.name">
        <select-character :character="character" @selectCharacter="setCharacter"></select-character>
      </li>
    </ul>
    <button>登録</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SelectCharacter from '@/components/SelectCharacter.vue';

interface Character {
  id: number;
  name: string;
  description: string;
  imageUrl: string
}

export default defineComponent({
  data(): { characters: Character[] | null, selectedCharacter: number | null, notification: string, fetchCharactersError: string, passwordVisible: boolean } {
    return {
      // DBのキャラクター情報
      characters: null,
      // 選択したキャラクター
      selectedCharacter: null,
      // 入力不備、サーバーエラーの通知
      notification: '',
      // キャラクター取得失敗通知
      fetchCharactersError: "",

      passwordVisible: false
    }
  },
  components: {
    SelectCharacter
  },
  // DBからキャラクター情報の取得
  created() {
    this.axios.get('/api/characters').then(res => {
      this.characters = res.data
    }).catch(err => {
      if (err.response.status === 500) {
        this.fetchCharactersError = "サーバーとの接続に失敗しました"
        return;
      }
      this.fetchCharactersError = err.response.data
    })
  },
  methods: {
    // パスワードの表示切り替え
    ChangeVisibly(event: Event) {
      event.preventDefault()
      this.passwordVisible = !this.passwordVisible
    },

    // ユーザーが選択したキャラクターidの取得
    setCharacter(characterId: number) {
      this.selectedCharacter = characterId
    },
    // ユーザー登録（バックエンドとの通信）
    registerUser(event: Event) {
      event.preventDefault()
      // 入力内容の取得
      const name = (this.$refs.name as HTMLInputElement).value
      const email = (this.$refs.email as HTMLInputElement).value
      const password = (this.$refs.password as HTMLInputElement).value
      // 入力に不備がある場合、notificationをtrueかつバックエンド連携せずに処理を終了
      if (!name || !email || !password || !this.selectedCharacter) {
        this.notification = "全ての項目を入力してください"
        return
      }
      if (!email.includes("@")) {
        this.notification = "正確なメールアドレスを入力してください"
        return
      }
      if (password.length < 6) {
        this.notification = "パスワードは6文字以上で入力してください"
      }

      // バックエンドへ送信するデータ
      const registerData = {
        name,
        email,
        password,
        characterId: this.selectedCharacter
      }
      // バックエンドへ登録内容を送信
      this.axios.post('/api/register', registerData).then((res) => {
        this.notification = res.data
      }).catch(err => {
        if (err.response.status === 500) {
          this.notification = "サーバーとの接続に失敗したため、登録に失敗しました"
          return;
        }
        this.notification = err.response.data
      })
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

/* キャラクター一覧のCSS */
.characters {
  display: flex;
  list-style: none;
  justify-content: center;
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
