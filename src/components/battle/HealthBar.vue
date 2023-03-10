<!-- 体力バーコンポーネント -->
<template>
  <div>
    <label for="hp">たいりょく:&nbsp;</label>
    <!-- me propsの判定により、自分か敵の体力バーを表示 -->
    <meter id="hp" min="0" :max="me ? myHp : enemyHp" low="20" high="80" optimum="90"
      :value="me ? myHealth : enemyHealth"></meter>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    // hp: 100は初期値、通常は設定したhpが入る
    return {
      myHp: 100,
      enemyHp: 100
    }
  },
  // 自分か敵の体力バー判定
  props: {
    me: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 自分の現在の体力を表示
    myHealth() {
      return this.$store.getters.currentHealth
    },
    // 敵の現在の体力を表示
    enemyHealth() {
      return this.$store.getters['enemyHealth/currentHealth']
    }
  },
  // 自分と敵の体力を取得、dataに設定
  created() {
    this.myHp = this.$store.getters['currentHealth']
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

label {
  font-weight: bolder;
}
</style>
