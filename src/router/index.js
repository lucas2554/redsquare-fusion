import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About'
import Login from "../components/Login";
import Register from "../components/Register";
import TestArthur from "../components/TestArthur";
import Profile from "../components/Profile";

import Store from "../store/index"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next){
      if(Store.state.token === ""){
        router.push('/login')
      }else{
        next()
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    component:About,
    beforeEnter(to, from, next){
      if(Store.state.token === ""){
        router.push('/login')
      }else{
        next()
      }
    }

  },
  {
    path: '/login',
    name: 'Login',
    component:Login,
    beforeEnter(to, from, next){
      if(Store.state.token !== ""){
        router.push('/')
      }else{
        next()
      }
    }

  },
  {
    path: '/signin',
    name: 'Signin',
    component: Register,
    beforeEnter(to, from, next){
      if(Store.state.token !== ""){
        router.push('/')
      }else{
            next()
      }
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: TestArthur,
    beforeEnter(to, from, next){
      if(Store.state.token === ""){
        router.push('/')
      }else{
        next()
      }
    }
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
    beforeEnter(to, from, next){
      if(Store.state.token === ""){
        router.push('/')
      }else{
        next()
      }
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
