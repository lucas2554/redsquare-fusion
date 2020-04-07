import Vue from 'vue'
import App from './App.vue'
import {LMap, LTileLayer, LMarker, fixDefaultIcons} from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify';
import Gravatar from 'vue-gravatar';

import VuePeerJS from 'vue-peerjs';
import Peer from 'peerjs';

Vue.use(VuePeerJS, new Peer({}));
Vue.component('v-gravatar', Gravatar);
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();

import {outils} from "./utils/utils"

Vue.mixin(outils)


window.axios = axios.create({
    baseURL: 'https://prj-redsquare.herokuapp.com/',
    params: {
        token: false
    },
    //headers: {'Authorization': "fd794b8d0fee9d04504f7b7027c3810e497d2e52"}
});


new Vue({
    router,
    store,
    vuetify,
    render: function (h) {
        return h(App)
    }
    beforeCreate() {
        window.axios.interceptors.request.use((config) => {
            if (store.state.token) {
                config.headers['Authorization'] = 'Bearer ' + store.state.token
            }
            console.log('La config:' + config)
            return config
        }, error => {
            return console.log('Error during launch:' + error)
        })
    }
}).$mount('#app')
