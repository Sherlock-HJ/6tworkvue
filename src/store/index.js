import Vue from 'vue'
import Vuex from 'vuex'
import config from './config'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        config
    },
    strict: process.env.NODE_ENV === 'development',

})
