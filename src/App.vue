<!-- ヘッダーとフッターを固定 -->
<template>
  <body>
    <header-nav></header-nav>
    <main>
      <router-view />
    </main>
    <the-footer></the-footer>
  </body>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderNav from './components/layouts/HeaderNav.vue'
import TheFooter from './components/layouts/TheFooter.vue'

export default defineComponent({
  components: {
    HeaderNav,
    TheFooter
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
