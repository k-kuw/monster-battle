import { createStore } from "vuex";
import heartModule from "./modules/heart";
import enemyHealthModule from "./modules/enemyHealth";

interface Health {
  health: number;
  login: { isLoggedIn: boolean; id: null | number; name: null | string };
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
      login: {
        isLoggedIn: false,
        id: null,
        name: null,
      },
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
    setLogin(state: Health, payload: { id: number; name: string }) {
      state.login.isLoggedIn = true;
      state.login.id = payload.id;
      state.login.name = payload.name;
    },
    logout(state: Health) {
      state.login.isLoggedIn = false;
      state.login.id = null;
      state.login.name = null;
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
    resetHealth(context) {
      context.commit("resetHealth");
    },
    setLogin(context, payload: { id: number; name: string }) {
      context.commit("setLogin", payload);
    },
    logout(context) {
      context.commit("logout");
    },
  },
  getters: {
    currentHealth(state: Health) {
      return state.health;
    },
    getLogin(state: Health) {
      return state.login;
    },
  },
});

export default store;
