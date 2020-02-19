import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import AD from '../views/AD.vue'

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    redirect: '/ad'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/ad',
    component: AD
  },
  {
    path: '/ad-add',
    component: () => import(/* webpackChunkName: "about" */ '../views/ADAdd.vue')
  }

];

const router = new VueRouter({
  routes
});

export default router
