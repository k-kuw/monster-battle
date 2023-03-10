interface AnimationFlag {
  myAttack: boolean;
  mySpecialAttack: boolean;
  healing: boolean;
  enemyAttack: boolean;
  enemySpecialAttack: boolean;
}

interface Context {
  commit: (arg0: string) => void;
}

export default {
  namespaced: true,
  state() {
    return {
      myAttack: false,
      mySpecialAttack: false,
      healing: false,
      enemyAttack: false,
      enemySpecialAttack: false,
    };
  },
  mutations: {
    changeMyAttack(state: AnimationFlag) {
      state.myAttack = !state.myAttack;
    },
    changeMySpecialAttack(state: AnimationFlag) {
      state.mySpecialAttack = !state.mySpecialAttack;
    },
    changeHealing(state: AnimationFlag) {
      state.healing = !state.healing;
    },
    changeEnemyAttack(state: AnimationFlag) {
      state.enemyAttack = !state.enemyAttack;
    },
    changeEnemySpecialAttack(state: AnimationFlag) {
      state.enemySpecialAttack = !state.enemySpecialAttack;
    },
  },
  actions: {
    changeMyAttack(context: Context) {
      context.commit("changeMyAttack");
    },
    changeMySpecialAttack(context: Context) {
      context.commit("changeMySpecialAttack");
    },
    changeHealing(context: Context) {
      context.commit("changeHealing");
    },
    changeEnemyAttack(context: Context) {
      context.commit("changeEnemyAttack");
    },
    changeEnemySpecialAttack(context: Context) {
      context.commit("changeEnemySpecialAttack");
    },
  },
  getters: {
    getMyAttack(state: AnimationFlag) {
      return state.myAttack;
    },
    getMySpecialAttack(state: AnimationFlag) {
      return state.mySpecialAttack;
    },
    getHealing(state: AnimationFlag) {
      return state.healing;
    },
    getEnemyAttack(state: AnimationFlag) {
      return state.enemyAttack;
    },
    getEnemySpecialAttack(state: AnimationFlag) {
      return state.enemySpecialAttack;
    },
  },
};
