import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import './theme/index.less';
import lib from './lib';
import cache from "./lib/cache";


Vue.use(lib);

Vue.use(ViewUI);

Vue.config.productionTip = false;

cache.createTable().then(()=>{
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app1');
},error=>{
  console.log(error);
}).catch(error=>{
  console.log(error);
});


