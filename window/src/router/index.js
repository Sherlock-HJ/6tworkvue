import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import AD from '../views/AD.vue'

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    redirect: '/check-site'
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
    component: () => import('../views/ADAdd.vue')
  },
  {
    path: '/ad-generate',
    component: () => import('../views/ADGenerate.vue')
  },
  {
    path: '/check-site',
    component: () => import('../views/CheckSite.vue')
  },
  {
    path: '/qsention',
    component: () => import('../views/qsention.vue')
  },
  {
    path:'*',
    redirect: '/'
  }

];

const router = new VueRouter({
  // mode: "history",
  routes
});

export default router
