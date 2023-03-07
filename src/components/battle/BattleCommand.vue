<template>
  <h2>command</h2>
  <ul>
    <li><button @click="attack" :disabled="disableCommand">こうげき</button></li>
    <li><button @click="specialAttack" :disabled="disableCommand">ひっさつこうげき</button></li>
    <li><button @click="heal" :disabled="disableCommand">かいふく</button></li>
    <li><button @click="reset" :disabled="disableCommand">にげる</button></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['user', 'monster'],
  inject: ['disabled'],
  computed: {
    disableCommand() {
      return JSON.parse(JSON.stringify(this.disabled)).isEnd
    }
  },
  methods: {
    attack() {
      this.$store.dispatch('enemyHealth/getSmallDamage', this.user.atk)
      this.enemyAttack()
    },
    specialAttack() {
      this.$store.dispatch('enemyHealth/getBigDamage', this.user.atk)
      this.enemyAttack()
    },
    heal() {
      this.$store.dispatch('healing', 5)
    },
    reset() {
      this.$store.dispatch('resetHealth')
    },
    enemyAttack() {
      const random = Math.random()
      let attack;
      if (random <= 0.7) {
        attack = 'Small'
      } else {
        attack = 'Big'
      }
      this.$store.dispatch(`get${attack}Damage`, this.monster.atk)
    }
  }
})
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  border: 1px solid black;
}
</style>
