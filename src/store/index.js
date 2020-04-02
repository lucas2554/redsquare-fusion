import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersist from 'vuex-persist'

const vp = new VuexPersist({
    key: 'store',
    storage: window.localStorage
})


Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [vp.plugin],
    state: {
        token: '',
        userId: '',
        userCoords: {
            lat: '',
            lng: ''
        }


    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },

        setUserId(state, id) {
            state.userId = id
        },
        setUserCoords(state, coords) {
            state.userCoords.lat = coords.latitude
            state.userCoords.lng = coords.longitude
        },

        logout(state) {
            state.userId = ''
            state.token = '';
        }

    },
    actions: {},
    modules: {}
})
