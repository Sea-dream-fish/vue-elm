import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入请求数据插件axios和vue-axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')