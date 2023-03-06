<template>
  <h2>health bar</h2>
  <div>
    <label for="hp">たいりょく:&nbsp;</label>
    <meter id="hp" min="0" :max="me ? 100 : enemyHp" low="20" high="80" optimum="90"
      :value="me ? myHealth : enemyHealth"></meter>
  </div>
  <div v-if="me">
    <label for="fp">&emsp;&emsp;きもち:&nbsp;</label>
    <progress id="fp" max="100" value="30"></progress>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      enemyHp: 100
    }
  },
  props: {
    me: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    myHealth() {
      return this.$store.getters.currentHealth
    },
    enemyHealth() {
      return this.$store.getters['enemyHealth/currentHealth']
    }
  },
  created() {
    this.enemyHp = this.$store.getters['enemyHealth/currentHealth']
  }
})
</script>

<style scoped>
div {
  display: flex;
}

meter,
progress {
  width: 100px;
  margin: 3px 0;
}
</style>
