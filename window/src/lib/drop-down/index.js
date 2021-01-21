import spinner from './drop-down';
import Vue from 'vue'
const Instance = new Vue({
  render (h) {
    return h(spinner);
  }
});

const component = Instance.$mount();
document.body.appendChild(component.$el);
const spin = Instance.$children[0];

export default {
  show (obj) {
    spin.showAction(obj);
  },
  hide () {
    spin.isShow =false

  }
};
