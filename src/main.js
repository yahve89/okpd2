import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.config.productionTip = true;

Vue.prototype.$http = Axios.create({
    baseURL: 'https://razvitie.expert',
    withCredentials: 'true',
    headers: {
        'Authorization': 'Basic ______KEY______'
    }
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')