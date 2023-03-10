<!-- エンドコンテンツコンポーネント -->
<template>
  <div>
    <p v-if="isWin" class="win">Win!!</p>
    <p v-else class="lose">Lose...</p>
    <p v-if="sendEx !== ''">{{ sendEx }}</p>
    <button @click="resetIsWin">終了</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  // 親コンポーネントから勝敗判定を取得
  props: {
    isWin: { type: Boolean },
    sendEx: { type: String }
  },
  emits: ['resetBattle'],
  methods: {
    // 終了ボタン押したイベントを親コンポーネントに伝える
    resetIsWin() {
      this.$emit("resetBattle")
    }
  }
})
</script>

<style scoped>
p {
  font-size: 40px;
  font-weight: bold;
  padding: 0;
  margin-top: 2rem;
}

button {
  font-size: 20px;
  font-weight: bolder;
  background-color: gainsboro;
  border-radius: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 1rem;
}

button:hover {
  background-color: #42b983;
}

.win {
  color: red;
  text-shadow: black 2px 2px;
}

.lose {
  color: blue;
  text-shadow: black 1px 1px;
}
</style>
