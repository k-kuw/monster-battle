<template>
  <h2>command</h2>
  <ul>
    <li><button @click="attack(5)">こうげき</button></li>
    <li>ひっさつこうげき</li>
    <li>かいふく</li>
    <li>にげる</li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex';

export default defineComponent({
  methods: {
    ...mapActions('enemyHealth', {
      attack: 'getSmallDamage',
      specialAttack: 'getBigDamage',
    })
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
