import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import './theme/index.less';
import lib from './lib';
// import  { remote } from 'electron';
// const { BrowserWindow } = remote;
// let win = new BrowserWindow({ width: 800, height: 600 });
// win.loadURL('https://github.com');


Vue.use(lib);

Vue.use(ViewUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  // mounted () {
  //   // You'll need this for renderAfterDocumentEvent.
  //   document.dispatchEvent(new Event('render-event'))
  // }
}).$mount('#app1');
