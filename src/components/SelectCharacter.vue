<template>
  <div>
    <input type="radio" name="characters" :value="character.name" @change="changeCharacter(character.id)">
    <label :for="character.name">{{ character.name }}</label>
    <img :src="character.imageUrl" :alt="character.name" height="200">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: ['character'],
  methods: {
    changeCharacter(characterId: number) {
      this.$emit("selectCharacter", characterId)
    }
  },
  emits: ['selectCharacter']
})
</script>
