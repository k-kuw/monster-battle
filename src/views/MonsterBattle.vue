<!-- 対戦画面コンポーネント -->
<template>
  <!-- ユーザー情報の取得に失敗した場合 -->
  <div v-if="fetchUserError !== ''">
    <p>{{ fetchUserError }}</p>
  </div>

  <!-- ログインしていない場合 -->
  <div v-if="!isLoggedIn">
    <p>ログインしてください</p>
  </div>


  <!-- ログインしている場合 -->
  <div v-else>
    <!-- 対戦モンスターの選択（初回画面） -->
    <div v-if="!monster">
      <monster-select @selectedMonster="selectedMonster"></monster-select>
    </div>
    <!-- 対戦モンスターの選択が完了かつユーザー情報が適切にある場合、対戦画面の表示 -->
    <!-- 対戦画像＋体力バーのコンポーネント -->
    <div v-if="user && monster">
      <battle-avatar :userName="user.name" :userImageUrl="user.imageUrl" :monsterName="monster.name"
        :monsterImageUrl="monster.imageUrl"></battle-avatar>
      <!-- 対戦コマンドコンポーネント -->
      <battle-command :user="user" :monster="monster"></battle-command>
    </div>
    <!-- 対戦が終了した場合のエンドコンテンツ -->
    <div v-if="isEnd || sendEx !== ''">
      <div class="end"></div>
      <transition name="end-animation" appear>
        <end-content :isWin="isWin" :sendEx="sendEx" @resetBattle="resetBattle" class="pop"></end-content>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BattleAvatar from '../components/battle/BattleAvatar.vue';
import BattleCommand from '../components/battle/BattleCommand.vue';
import EndContent from '../components/battle/EndContent.vue'
import MonsterSelect from '@/components/battle/MonsterSelect.vue';

interface User {
  id: number;
  level: number;
  ex: number;
  hp: number;
  atk: number;
  name: string;
  imageUrl: string;
}

interface Monster {
  id: number;
  name: string;
  hp: number;
  atk: number;
  ex: number;
  imageUrl: string
}

export default defineComponent({
  components: {
    BattleAvatar,
    BattleCommand,
    EndContent,
    MonsterSelect
  },
  data(): { isLoggedIn: boolean, isEnd: boolean, isWin: boolean | undefined, user: null | User, monster: null | Monster, sendEx: string, fetchUserError: string } {
    return {
      // ログイン状況
      isLoggedIn: false,
      // 戦闘終了判定
      isEnd: false,
      // 勝敗判定
      isWin: undefined,
      // ユーザー情報
      user: null,
      // モンスター情報
      monster: null,
      // 買った際の経験値
      sendEx: "",
      fetchUserError: ''
    }
  },
  computed: {
    // 自分の体力(Vuexから取得)
    myHealth() {
      return this.$store.getters.currentHealth
    },
    // 敵の体力(Vuexから取得)
    enemyHealth() {
      return this.$store.getters['enemyHealth/currentHealth']
    }
  },
  watch: {
    // 自分の体力が0以下になった場合、戦闘終了かつ勝者false
    myHealth() {
      if (this.myHealth <= 0) {
        this.isEnd = true
        this.isWin = false
      }
    },
    // 敵の体力が0以下になった場合、戦闘終了かつ勝者true
    enemyHealth() {
      if (this.enemyHealth <= 0) {
        this.isEnd = true
        this.isWin = true
      }
    },
    // モンスターが選択された時、Vuexでモンスターの体力を設定
    monster() {
      if (!this.monster) {
        return
      }
      this.$store.dispatch('enemyHealth/setHealth', this.monster.hp)
    },
    // Vuexで自分の体力を設定
    user() {
      if (!this.user) {
        return
      }
      this.$store.dispatch('setHealth', this.user.hp)
    },
    // 勝利した場合、バックエンドへ経験値を送信
    isWin() {
      if (!this.isWin || !this.monster || !this.user) {
        return
      }

      this.axios.post('/api/level', {
        id: this.user.id,
        ex: this.monster.ex
      }).then(res => {
        this.sendEx = `経験値${res.data}を獲得しました`
      }).catch(err => {
        if (err.response.status === 500) {
          this.sendEx = "サーバーとの接続に失敗したため、経験値の獲得に失敗しました"
          return;
        }
        this.sendEx = "経験値の獲得に失敗しました"
      })
    }
  },
  //XXX 戦闘終了を子孫コンポーネントへ共有、記述方法はネット参照
  provide() {
    const disabled = {}
    Object.defineProperty(disabled, 'isEnd', {
      enumerable: true,
      get: () => this.isEnd
    })
    return {
      disabled
    }
  },
  methods: {
    // エンドコンテンツのボタンを押した際に各判定が初期化する処理
    resetBattle() {
      this.isEnd = false
      this.isWin = undefined
      this.$router.push('/')
    },
    // モンスター選択
    selectedMonster(content: Monster) {
      this.monster = content
    }
  },
  // ログイン状況、ユーザー情報の取得
  created() {
    const login = this.$store.getters.getLogin
    this.isLoggedIn = login.isLoggedIn
    if (!login.id) {
      return
    }
    // HACK ユーザー情報はログイン時に全取得し、VuexやlocalStorage等で管理した方がバックエンドとの通信が少なくなる。
    this.axios.get(`/api/user/${login.id}`).then(res => {
      this.user = res.data
    }).catch(err => {
      if (err.response.status === 500) {
        this.fetchUserError = "サーバーとの接続に失敗しました"
        return;
      }
      this.fetchUserError = err.response.data
    })
  }
})
</script>

<style scoped>
.end {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 1;
}

.pop {
  position: fixed;
  background-color: #c3f7df;
  border-radius: 2rem;
  top: 50%;
  left: 50%;
  width: 75%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.end-animation-enter-from {
  opacity: 0;
}

.end-animation-enter-active,
.end-animation-leave-active {
  transition: opacity 0.5s ease;
}

.end-animation-enter-to {
  opacity: 1;
}
</style>
