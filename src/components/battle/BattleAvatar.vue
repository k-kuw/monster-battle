<template>
  <div class="avatars">
    <div class="avatar">
      <h3>ENEMY</h3>
      <img :src="imageUrl" :alt="name">
      <health-bar></health-bar>
      <p>{{ name }}</p>
    </div>
    <div class="avatar">
      <img src="my-attack-small.png" alt="attack">
    </div>
    <div class="avatar">
      <h3>ME</h3>
      <img src="spear-man.png" alt="spear-man">
      <health-bar :me="true"></health-bar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HealthBar from './HealthBar.vue'
export default defineComponent({
  props: ['name', 'imageUrl'],
  components: {
    HealthBar
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
