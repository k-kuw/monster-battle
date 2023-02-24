import { createStore } from "vuex";
import heartModule from "./modules/heart";
import enemyHealthModule from "./modules/enemyHealth";

interface Health {
  health: number;
}

interface Context {
  commit: (arg0: string, arg1: number) => void;
}

const store = createStore({
  modules: {
    heart: heartModule,
    enemyHealth: enemyHealthModule,
  },
  state() {
    return {
      health: 100,
    };
  },
  mutations: {
    getDamage(state: Health, payload: number) {
      state.health = state.health - payload;
    },
    healing(state: Health, payload: number) {
      state.health = state.health + payload;
    },
    resetHealth(state: Health) {
      state.health = 100;
    },
  },
  actions: {
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
});

export default store;
