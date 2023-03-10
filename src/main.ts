import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/myHealth'
import axios from 'axios'
import VueAxios from 'vue-axios'


// create app, router, store接続
const app = createApp(App)

app.use(VueAxios, axios)

app.use(router)

app.use(store)

app.mount('#app')
