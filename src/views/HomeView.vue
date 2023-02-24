<template>
  <h1>Home View</h1>
  <transition name="vs-text" appear>
    <img src="versus.png" alt="versus">
  </transition>
  <transition name="vs-man" appear class="vs-man">
    <img src="1vs1.png" alt="1vs1">
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

})
</script>

<style scoped>
img {
  width: 400px;
  height: 200px;
}

.vs-text-enter-from {
  opacity: 0;
  transform: scale(0);
}

.vs-text-enter-active {
  transition: all 2s ease-out;
}

.vs-text-enter-to {
  opacity: 1;
  transform: scale(1);
}

.vs-man-enter-active,
.vs-man {
  animation: vs-battle 1s infinite;
}

@keyframes vs-battle {
  0% {
    transform: translateX(0px);
  }

  25% {
    transform: translateX(-4px);
  }

  50% {
    transform: translateX(0px);
  }

  75% {
    transform: translateX(4px);
  }

  100% {
    transform: translateX(0px);
  }
}
</style>
