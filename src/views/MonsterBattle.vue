<template>
  <div v-if="!isLoggedIn">
    <p>ログインしてください</p>
  </div>
  <div v-else>
  <div v-if="!monster">
    <monster-select @selectedMonster="selectedMonster"></monster-select>
  </div>
  <div v-if="user && monster">
    <battle-avatar :userName="user.name" :userImageUrl="user.imageUrl" :monsterName="monster.name"
      :monsterImageUrl="monster.imageUrl"></battle-avatar>
    <battle-command :user="user" :monster="monster"></battle-command>
  </div>
  <end-content v-if="isEnd" :isWin="isWin" @resetBattle="resetBattle"></end-content>
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
  data(): { isLoggedIn: boolean,isEnd: boolean, isWin: boolean | undefined, user: null | User, monster: null | Monster } {
    return {
      isLoggedIn: false,
      isEnd: false,
      isWin: undefined,
      user: null,
      monster: null
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
  watch: {
    myHealth() {
      if (this.myHealth <= 0) {
        this.isEnd = true
        this.isWin = false
      }
    },
    enemyHealth() {
      if (this.enemyHealth <= 0) {
        this.isEnd = true
        this.isWin = true
      }
    },
    monster() {
      if (!this.monster) {
        return
      }
      this.$store.dispatch('enemyHealth/setHealth', this.monster.hp)
    },
    user() {
      if (!this.user) {
        return
      }
      this.$store.dispatch('setHealth', this.user.hp)
    },
    isWin() {
      if (!this.isWin || !this.monster || !this.user) {
        return
      }
      this.axios.post('/api/level', {
        id: this.user.id,
        ex: this.monster.ex
      }).then(res => {
        console.log(this.monster?.ex)
        console.log(res)
      })
    }
  },
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
    resetBattle() {
      this.isEnd = false
      this.isWin = undefined
      this.$router.push('/')
    },
    selectedMonster(content: Monster) {
      this.monster = content
    }
  },
  created() {
    const login =  this.$store.getters.getLogin
    this.isLoggedIn = login.isLoggedIn
    if(!login.id) {
      return
    }
    this.axios.get(`/api/user/${login.id}`).then(res => {
      this.user = res.data
    })
  }
})
</script>
