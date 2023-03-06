interface Health {
  health: number;
}

interface Context {
  commit: (arg0: string, arg1: number) => void;
}

export default {
  namespaced: true,
  state() {
    return {
      health: 100,
    };
  },
  mutations: {
    setHealth(state: Health, payload: number) {
      state.health = payload;
    },
    getDamage(state: Health, payload: number) {
      if (state.health <= 0) {
        state.health = 0;
        return;
      }
      state.health = state.health - payload;
    },
    healing(state: Health, payload: number) {
      if (state.health >= 100) {
        return;
      }
      state.health = state.health + payload;
    },
    resetHealth(state: Health) {
      state.health = 100;
    },
  },
  actions: {
    setHealth(context: Context, payload: number) {
      context.commit("setHealth", payload);
    },
    getSmallDamage(context: Context, payload: number) {
      context.commit("getDamage", payload);
    },
    getBigDamage(context: Context, payload: number) {
      context.commit("getDamage", payload * 1.2);
    },
    healing(context: Context, payload: number) {
      context.commit("healing", payload);
    },
    resetHealth(context: Context, payload: number) {
      context.commit("resetHealth", payload);
    },
  },
  getters: {
    currentHealth(state: Health) {
      return state.health;
    },
  },
};
