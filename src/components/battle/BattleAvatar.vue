<!-- 対戦画像＋体力バーのコンポーネント -->
<template>
  <h1>VS{{ monsterName }}バトル</h1>
  <div class="battle-field">
    <!-- 敵 -->
    <div class="avatars">
      <div class="avatar">
        <h3>{{ monsterName }}</h3>
        <img :src="monsterImageUrl" :alt="monsterName">
        <health-bar></health-bar>
      </div>

      <!-- 攻撃画像 -->
      <div v-if="image !== ''" class="attack-image">
        <img :src="image" alt="attack">
      </div>
      <div v-else class="empty"></div>

      <!-- 自分 -->
      <div class="avatar">
        <h3>自分</h3>
        <img :src="userImageUrl" :alt="userName">
        <div v-if="heal">かいふく⤴︎⤴︎⤴︎</div>
        <health-bar :me="true"></health-bar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import HealthBar from './HealthBar.vue'
export default defineComponent({
  // 親コンポーネントから自分と敵の情報取得
  props: ['userName', 'userImageUrl', 'monsterName', 'monsterImageUrl'],
  components: {
    HealthBar
  },
  data() {
    return {
      image: '',
      heal: false
    }
  },
  // Vuex animation flag取得
  computed: {
    ...mapGetters('animation', ['getMyAttack', 'getMySpecialAttack', 'getHealing', 'getEnemyAttack', 'getEnemySpecialAttack'])
  },
  watch: {
    getMyAttack() {
      if(this.getMyAttack) {
        this.image = "my-attack-small.png"
      } else {
        this.image = ""
      }
    },
    getMySpecialAttack() {
      if(this.getMySpecialAttack) {
        this.image = "my-attack-big.png"
      } else {
        this.image = ""
      }
    },
    getEnemyAttack() {
      if(this.getEnemyAttack) {
        this.image = "enemy-attack-small.png"
      } else {
        this.image = ""
      }
    },
    getHealing() {
      if(this.getHealing) {
        this.heal = true
      } else {
        this.heal = false
      }
    },
    getEnemySpecialAttack() {
      if(this.getEnemySpecialAttack) {
        this.image = "enemy-attack-big.png"
      } else {
        this.image = ""
      }
    },
  },


})
</script>

<style scoped>
/* 画像CSS */
.avatars {
  display: flex;
  justify-content: center;
}

.avatar {
  margin: 0 0;
  padding: 0 5rem;
}

img {
  width: 100px;
  height: 100px;
}

.attack-image {
  margin-top: 3rem;
  margin-right: 0;
  margin-left:0;
  padding: 0;
}

.empty {
  margin: 0 50px;
}

.battle-field {
  display: flex;
  list-style: none;
  justify-content: center;
  margin: 3rem 20%;
  padding: 5rem;
  border-radius: 2rem;
  background-color: #c3f7df;
}
</style>
