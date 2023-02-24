<template>
  <div class="avatars">
    <div class="avatar">
      <h3>ENEMY</h3>
      <img src="sword-man.png" alt="sword-man">
      <health-bar :health="enemyHealth"></health-bar>
    </div>
    <div class="avatar">
      <img src="my-attack-small.png" alt="attack">
    </div>
    <div class="avatar">
      <h3>ME</h3>
      <img src="spear-man.png" alt="spear-man">
      <health-bar :me="true" :health="myHealth"></health-bar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HealthBar from './HealthBar.vue'
export default defineComponent({
  components: {
    HealthBar
  },
  computed: {
    myHealth() {
      return this.$store.getters.currentHealth
    },
    enemyHealth() {
      return this.$store.getters['enemyHealth/currentHealth']
    }
  }
})
</script>

<style scoped>
.avatars {
  display: flex;
  justify-content: center;
}

.avatar {
  margin: 0 3rem;
}

img {
  width: 100px;
  height: 100px;
}
</style>
