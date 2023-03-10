<!-- 対戦コマンドコンポーネント -->
<template>
  <ul>
    <li><button @click="attack" :disabled="disableCommand ? disableCommand : buttonDisabled">こうげき</button></li>
    <li><button @click="specialAttack" :disabled="disableCommand ? disableCommand : buttonDisabled">ひっさつこうげき</button></li>
    <li><button @click="heal" :disabled="disableCommand ? disableCommand : buttonDisabled">かいふく</button></li>
    <li><button @click="reset" :disabled="disableCommand ? disableCommand : buttonDisabled">にげる</button></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  data() {
    return {
      buttonDisabled: false
    }
  },
  // 親コンポーネントから自分と敵情報取得
  props: ['user', 'monster'],
  // 祖先コンポーネントから戦闘終了判定の取得
  inject: ['disabled'],
  computed: {
    // 戦闘終了時にコマンドボタンを無効化
    disableCommand() {
      return JSON.parse(JSON.stringify(this.disabled)).isEnd
    }
  },
  methods: {
    // Vuex animation flag取得
    ...mapActions('animation', {
      myAttack: 'changeMyAttack',
      mySpecialAttack: 'changeMySpecialAttack',
      myHealing: 'changeHealing',
      enemyAttack: 'changeEnemyAttack',
      enemySpecialAttack: 'changeEnemySpecialAttack',
    }),
    // 攻撃コマンド
    attack() {
      this.buttonDisabled = true
      this.myAttack()
      setTimeout(() => {
        this.myAttack()
        this.$store.dispatch('enemyHealth/getSmallDamage', this.user.atk)
      }, 1000)
      // 敵の攻撃
      setTimeout(() => { this.enemyAttacking() }, 1500)

    },
    // 特殊攻撃コマンド
    specialAttack() {
      this.buttonDisabled = true

      this.mySpecialAttack()
      setTimeout(() => {
        this.mySpecialAttack()
        this.$store.dispatch('enemyHealth/getBigDamage', this.user.atk)
      }, 1000)
      // 敵の攻撃
      setTimeout(() => { this.enemyAttacking() }, 1500)

    },
    // 回復コマンド
    heal() {
      this.buttonDisabled = true

      this.myHealing()
      setTimeout(() => {
        this.myHealing()
        this.$store.dispatch('healing', 5)
        this.buttonDisabled = false
      }, 1500)
    },
    // リセットコマンド
    reset() {
      this.$router.push('/')
    },
    // 敵の攻撃
    enemyAttacking() {
      // 小ダメージか大ダメージか、ランダムでVuexのactionsを実行
      const random = Math.random()
      let attack: string;
      if (random <= 0.7) {
        attack = 'Small'
      } else {
        attack = 'Big'
      }

      if (attack === 'Small') {
        this.enemyAttack()
        setTimeout(() => {
          this.enemyAttack()
          this.$store.dispatch(`get${attack}Damage`, this.monster.atk)
          this.buttonDisabled = false
        }, 1000)
      }
      else {
        this.enemySpecialAttack()
        setTimeout(() => {
          this.enemySpecialAttack()
          this.$store.dispatch(`get${attack}Damage`, this.monster.atk)
          this.buttonDisabled = false
        }, 1000)
      }

    }
  }
})
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  list-style: none;
  justify-content: center;
  margin: 3rem 20%;
  border-radius: 2rem;
}

button {
  font-size: 20px;
  font-weight: bolder;
  width: 40%;
  background-color: gainsboro;
  border-radius: 2rem;
  margin-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

button:hover {
  background-color: #42b983;
}
</style>
