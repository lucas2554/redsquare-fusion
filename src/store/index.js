import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersist from 'vuex-persist'

const vp = new VuexPersist({
  key: 'store',
  storage: window.localStorage
})


Vue.use(Vuex)

export default new Vuex.Store({
  plugins : [vp.plugin],
  state: {
    token: ''
  },
  mutations: {
    setToken(state, data){
      state.token = data;
    },

    logout(state){
      state.user = null;
    }

  },
  actions: {
  },
  modules: {
  }
})
