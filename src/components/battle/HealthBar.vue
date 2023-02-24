<template>
  <h2>health bar</h2>
  <div>
    <label for="hp">たいりょく:&nbsp;</label>
    <meter id="hp" min="0" max="100" low="20" high="80" optimum="90" :value="health"></meter>
  </div>
  <div v-if="me">
    <label for="fp">&emsp;&emsp;きもち:&nbsp;</label>
    <progress id="fp" max="100" value="30"></progress>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    me: {
      type: Boolean,
      default: false
    },
    health: {
      type: Number,
      default: 100
    }
  },

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
