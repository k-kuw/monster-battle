// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  // Declare your own store states.
  interface State {
    health: number;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
