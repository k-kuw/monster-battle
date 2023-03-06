<template>
  <div v-if="isWin">Win!!</div>
  <div v-else>Lose...</div>
  <button @click="resetIsWin">戻る</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    isWin: { type: Boolean }
  },
  emits: ['resetBattle'],
  methods: {
    resetIsWin() {
      this.$emit("resetBattle")
    }
  }
})
</script>
