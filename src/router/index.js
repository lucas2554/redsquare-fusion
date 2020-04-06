import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Stream from '../views/Stream'
import Login from "../components/Login";
import Register from "../components/Register";
import Profil from "../components/Profil";
import Watch from "../components/Watch";


import Store from "../store/index"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter(to, from, next) {
            if (Store.state.token === "") {
                router.push('/login')
            } else {
                next()
            }
        }
    },
    {
        path: '/stream',
        name: 'Stream',
        component: Stream,
        beforeEnter(to, from, next) {
            if (Store.state.token === "") {
                router.push('/login')
            } else {
                next()
            }
        }

    },
    {
        path: '/watch/:id',
        name: 'Watch',
        component: Watch,
        beforeEnter(to, from, next) {
            if (Store.state.token === "") {
                router.push('/login')
            } else {
                next()
            }
        },
        beforeLeave(to, from, next) {
            window.location.reload()
        }

    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter(to, from, next) {
            if (Store.state.token !== "") {
                router.push('/')
            } else {
                next()
            }
        }

    },
    {
        path: '/signin',
        name: 'Signin',
        component: Register,
        beforeEnter(to, from, next) {
            if (Store.state.token !== "") {
                router.push('/')
            } else {
                next()
            }
        }
    },
    {
        path: '/profil/:id',
        name: 'Profil',
        component: Profil,
        beforeEnter(to, from, next) {
            if (Store.state.token === "") {
                router.push('/')
            } else {
                next()
            }
        }
    }

]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
