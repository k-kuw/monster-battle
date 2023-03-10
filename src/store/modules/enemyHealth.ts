interface Health {
  health: number;
}

interface Context {
  commit: (arg0: string, arg1: number) => void;
}

export default {
  namespaced: true,
  // stateは敵の体力
  state() {
    return {
      health: 100,
    };
  },
  mutations: {
    // DBのステータス情報を基に、体力を設定
    setHealth(state: Health, payload: number) {
      state.health = payload;
    },
    // 自分からの攻撃ダメージ
    getDamage(state: Health, payload: number) {
      if (state.health <= 0) {
        state.health = 0;
        return;
      }
      state.health = state.health - payload;
    },
    // 回復
    healing(state: Health, payload: number) {
      if (state.health >= 100) {
        return;
      }
      state.health = state.health + payload;
    },
  },
  actions: {
    setHealth(context: Context, payload: number) {
      context.commit("setHealth", payload);
    },
    // 通常攻撃
    getSmallDamage(context: Context, payload: number) {
      context.commit("getDamage", payload);
    },
    // 特殊攻撃
    getBigDamage(context: Context, payload: number) {
      context.commit("getDamage", payload * 1.2);
    },
    healing(context: Context, payload: number) {
      context.commit("healing", payload);
    },
  },
  getters: {
    currentHealth(state: Health) {
      return state.health;
    },
  },
};
