<template>
  <h1>Register User</h1>
  <form @submit="registerUser">
    <div>
      <label for="name">Name</label>
      <input type="text" name="name" id="name" ref="name">
    </div>
    <div>
      <label for="email">email</label>
      <input type="text" name="email" id="email" ref="email">
    </div>
    <div>
      <label for="password">password</label>
      <input type="text" name="password" id="password" ref="password">
    </div>
    <p v-if="!characters">サーバーエラー（再読み込みしてください）</p>
    <ul v-else class="characters">
      <li v-for="character in characters" :key="character">
        <select-character :character="character" @selectCharacter="setCharacter"></select-character>
      </li>
    </ul>
    <button>登録</button>
  </form>
  <p v-if="notification">全ての項目を入力してください</p>
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
  data(): { characters: Character | null, selectedCharacter: number | null, notification: boolean } {
    return {
      characters: null,
      selectedCharacter: null,
      notification: false
    }
  },
  components: {
    SelectCharacter
  },
  created() {
    this.axios.get('/api/characters').then(res => {
      this.characters = res.data
    })
  },
  methods: {
    setCharacter(characterId: number) {
      this.selectedCharacter = characterId
    },
    registerUser(event: Event) {
      event.preventDefault()

      const name = (this.$refs.name as HTMLInputElement).value
      const email = (this.$refs.email as HTMLInputElement).value
      const password = (this.$refs.password as HTMLInputElement).value

      if (!name || !email || !password || !this.selectedCharacter) {
        this.notification = true
        return
      }

      const registerData = {
        name,
        email,
        password,
        characterId: this.selectedCharacter
      }

      this.axios.post('/api/register', registerData).then(() => {
        this.notification = false
      }).catch(err => console.log(err))
    }
  }
})
</script>

<style scoped>
.characters {
  display: flex;
  list-style: none;
  justify-content: center;
}
</style>
