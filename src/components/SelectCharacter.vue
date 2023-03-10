<!-- ユーザー登録画面でのキャラクター選択コンポーネント -->
<template>
  <div class="character">
    <!-- 親コンポーネントから取得したキャラクター情報を使用 -->
    <input type="radio" name="characters" :value="character.name" @change="changeCharacter(character.id)">
    <label :for="character.name">{{ character.name }}</label>
    <img :src="character.imageUrl" :alt="character.name" height="200">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  // 親コンポーネントからキャラクター情報を取得
  props: ['character'],
  methods: {
    // 選択したキャラクターのidを親コンポーネントに渡す
    changeCharacter(characterId: number) {
      this.$emit("selectCharacter", characterId)
    }
  },
  emits: ['selectCharacter']
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

.character {
  display: flex;
  flex-direction: column-reverse;
  margin-left: 2rem;
  margin-right: 2rem;
}
</style>
