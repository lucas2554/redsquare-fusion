import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


Vue.config.productionTip = false

window.axios = axios.create({
  baseURL: 'https://prj-redsquare.herokuapp.com/',
  params : {
    token : false
  },
  //headers: {'Authorization': "fd794b8d0fee9d04504f7b7027c3810e497d2e52"}
});


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
