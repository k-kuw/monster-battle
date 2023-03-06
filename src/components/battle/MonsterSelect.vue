<template>
  <h1>Monster Select</h1>
  <ul class="monsters">
    <li v-for="monster in monsters" :key="monster.id">
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
  data(): { monsters: null | Monster[], selectedMonster: null | string } {
    return {
      monsters: null,
      selectedMonster: null
    }
  },
  methods: {
    selectMonster(event: Event) {
      if (!(event.target instanceof HTMLInputElement)) {
        return;
      }
      this.selectedMonster = event.target.value
      if (!this.monsters) {
        return;
      }
      this.$emit("selectedMonster", this.monsters.find(monster => monster.name === this.selectedMonster))
    }
  },
  created() {
    this.axios.get('/api/monsters').then(res => {
      this.monsters = res.data
    })
  }
})
</script>

<style scoped>
.monsters {
  display: flex;
  list-style: none;
  justify-content: center;
}
</style>
