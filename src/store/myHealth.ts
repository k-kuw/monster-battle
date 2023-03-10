import { createStore } from "vuex";
import enemyHealthModule from "./modules/enemyHealth";
import animationModule from "./modules/animation"

interface Health {
  health: number;
  login: { isLoggedIn: boolean; id: null | number; name: null | string };
}

interface Context {
  commit: (arg0: string, arg1: number) => void;
}

const store = createStore({
  modules: {
    enemyHealth: enemyHealthModule,
    animation: animationModule
  },
  // stateは自分の体力とログイン情報
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
    // DBのステータス情報を基に、体力を設定
    setHealth(state: Health, payload: number) {
      state.health = payload;
    },
    // 敵からの攻撃ダメージ
    getDamage(state: Health, payload: number) {
      if (state.health <= 0) {
        state.health = 0;
        return;
      }
      state.health = state.health - payload;
    },
    // 回復
    healing(state: Health, payload: number) {
      state.health = state.health + payload;
    },
    // ログイン時のログイン情報の設定
    setLogin(state: Health, payload: { id: number; name: string }) {
      state.login.isLoggedIn = true;
      state.login.id = payload.id;
      state.login.name = payload.name;
    },
    // ログアウト
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
