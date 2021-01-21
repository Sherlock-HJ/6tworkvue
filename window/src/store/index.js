import Vue from 'vue'
import Vuex from 'vuex'
import config from './config'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        checkSiteStr:sessionStorage.getItem('CheckSite')
    },
    mutations: {
        checkSiteMutations (state,str) {
            // 变更状态
            state.checkSiteStr = str;
            sessionStorage.setItem('CheckSite',str);
        }
    },
    actions: {},
    modules: {
        config
    },
    strict: process.env.NODE_ENV === 'development',

})
