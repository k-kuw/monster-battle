<!-- モンスター選択コンポーネント -->
<template>
  <p v-if="fetchMonstersError !== ''">{{ fetchMonstersError }}</p>
  <h1>モンスター選択</h1>
  <ul class="monsters">
    <li v-for="monster in monsters" :key="monster.id" class="monster">
      <input type="radio" name="monster" :value="monster.name" @change="selectMonster">
      <label for="monster">{{ monster.name }}</label>
      <img :src="monster.imageUrl" :alt="monster.name" height="200">
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Monster {
  id: number;
  name: string;
  hp: number;
  atk: number;
  ex: number;
  imageUrl: string
}

export default defineComponent({
  emits: ["selectedMonster"],
  data(): { monsters: null | Monster[], selectedMonster: null | string, fetchMonstersError: string } {
    return {
      // 全モンスター情報
      monsters: null,
      // 選択したモンスター情報
      selectedMonster: null,
      fetchMonstersError: ''
    }
  },
  methods: {
    // モンスターの選択処理
    selectMonster(event: Event) {
      if (!(event.target instanceof HTMLInputElement)) {
        return;
      }
      this.selectedMonster = event.target.value
      if (!this.monsters) {
        return;
      }
      // 選択したモンスター情報を親コンポーネントへ渡す
      this.$emit("selectedMonster", this.monsters.find(monster => monster.name === this.selectedMonster))
    }
  },
  // 全モンスターの情報取得(バックエンドとの連携)
  created() {
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

label {
  font-size: 20px;
  font-weight: bold;
}

input {
  margin: 1rem;
  transform: scale(2.0);
}

.monster {
  display: flex;
  flex-direction: column-reverse;
  margin-left: 2rem;
  margin-right: 2rem;
}
.monsters {
  display: flex;
  list-style: none;
  justify-content: center;
  margin: 3rem 20%;
  padding:5rem;
  border-radius: 2rem;
  background-color: #c3f7df;
}
</style>
