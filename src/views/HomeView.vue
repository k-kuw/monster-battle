<!-- ホームコンポーネント -->
<template>
  <!-- データ取得にエラーが発生した場合 -->
  <p v-if="fetchCharactersError !== ''">{{ fetchCharactersError }}</p>
  <p v-if="fetchMonstersError !== ''">{{ fetchMonstersError }}</p>
  <!-- キャラクター一覧 -->
  <div class="background" v-if="characters">
    <h2>キャラクター</h2>
    <ul>
      <li v-for="character in characters" :key="character.name">
        <img :src="character.imageUrl" :alt="character.name" height="200">
      </li>
    </ul>
  </div>
  <!-- vsマークの表示 -->
  <transition name="vs-text" appear>
    <img src="versus.png" alt="versus" height="200">
  </transition>
  <!-- モンスター一覧 -->
  <div class="background" v-if="monsters">
    <h2>モンスター</h2>
    <ul>
      <li v-for="monster in monsters" :key="monster.name">
        <img :src="monster.imageUrl" :alt="monster.name" height="200">
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Character {
  id: number;
  name: string;
  description: string;
  imageUrl: string
}

interface Monster {
  id: number;
  name: string;
  hp: number;
  atk: number;
  ex: number;
  imageUrl: string
}

export default defineComponent({
  data(): { characters: null | Character[], monsters: null | Monster[], fetchCharactersError: string, fetchMonstersError: string } {
    return {
      characters: null,
      monsters: null,
      fetchCharactersError: '',
      fetchMonstersError: ''
    }
  },
  created() {
    // 全キャラクター情報の取得
    this.axios.get('/api/characters').then(res => {
      this.characters = res.data
    }).catch((err) => {
      if (err.response.status === 500) {
        this.fetchCharactersError = "サーバーとの接続に失敗しました"
        return;
      }
      this.fetchCharactersError = err.response.data
    })
    // 全モンスター情報の取得
    this.axios.get('/api/monsters').then(res => {
      this.monsters = res.data
    }).catch((err) => {
      if (err.response.status === 500) {
        this.fetchMonstersError = "サーバーとの接続に失敗しました"
        return;
      }
      this.fetchMonstersError = err.response.data
    })
  }
})
</script>

<style scoped>
ul {
  display: flex;
  list-style: none;
  justify-content: center;
  padding: 0 1rem;
}

.background {
  list-style: none;
  justify-content: center;
  margin: 3rem 20%;
  padding: 5rem;
  border-radius: 2rem;
  background-color: #c3f7df;
}

/* VSテキストのアニメーション */
.vs-text-enter-from {
  opacity: 0;
  transform: scale(0);
}

.vs-text-enter-active {
  transition: all 2s ease-out;
}

.vs-text-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
