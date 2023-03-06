<template>
  <h1>Monster Battle</h1>
  <div v-if="!monster">
    <monster-select @selectedMonster="selectedMonster"></monster-select>
  </div>
  <div v-if="monster">
    <battle-avatar :name="monster.name" :imageUrl="monster.imageUrl"></battle-avatar>
    <battle-command></battle-command>
  </div>
  <end-content v-if="isEnd" :isWin="isWin" @resetBattle="resetBattle"></end-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BattleAvatar from '../components/battle/BattleAvatar.vue';
import BattleCommand from '../components/battle/BattleCommand.vue';
import EndContent from '../components/battle/EndContent.vue'
import MonsterSelect from '@/components/battle/MonsterSelect.vue';

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
  data(): { isEnd: boolean, isWin: boolean | undefined, monster: null | Monster } {
    return {
      isEnd: false,
      isWin: undefined,
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
  }
})
</script>
