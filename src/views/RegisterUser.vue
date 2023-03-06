<template>
  <h1>Register User</h1>
  <form>

    <div>
      <label for="name">Name</label>
      <input type="text" name="name" id="name">
    </div>

    <div>
      <label for="email">email</label>
      <input type="text" name="email" id="email">
    </div>
    <div>
      <label for="passward">passward</label>
      <input type="text" name="passward" id="passward">
    </div>
    <p v-if="!characters">サーバーエラー（再読み込みしてください）</p>
    <ul v-else class="characters">
      <li v-for="character in characters" :key="character">
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
  data(): { characters: Character | null, selectedCharacter: number | null } {
    return {
      characters: null,
      selectedCharacter: null
    }
  },
  components: {
    SelectCharacter
  },
  created() {
    this.axios.get('/api/characters').then(res => {
      console.log(res.data)
      this.characters = res.data
    })
  },
  methods: {
    setCharacter(characterId: number) {
      this.selectedCharacter = characterId
      console.log(this.selectedCharacter)
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
