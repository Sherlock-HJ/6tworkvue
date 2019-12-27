// import spinner from './spinner';
// import dropDown from './drop-down';
import methods from './methods';
// import cookie from 'js-cookie';
import bus from 'vue-bus';
import axios from 'axios';

export default {
  install: function (Vue) {
    Vue.use(bus);
    // Vue.prototype.$spinner = spinner;
    // Vue.prototype.$dropDown = dropDown;
    Vue.prototype.$api = axios.create();
    Vue.prototype.$m = methods;
    // Vue.prototype.$cookie = cookie;

  }
}