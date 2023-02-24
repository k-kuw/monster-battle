<template>
  <h1>Monster Battle</h1>
  <battle-avatar></battle-avatar>
  <battle-command></battle-command>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BattleAvatar from '@/components/battle/BattleAvatar.vue';
import BattleCommand from '@/components/battle/BattleCommand.vue';

export default defineComponent({
  components: {
    BattleAvatar,
    BattleCommand,
  }
})
</script>
