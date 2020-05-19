import Vue from 'vue'
import Vuex from 'vuex'
import config from './config'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        checkSiteStr:'暂无'
    },
    mutations: {
        checkSiteMutations (state,str) {
            // 变更状态
            state.checkSiteStr = str;
        }
    },
    actions: {},
    modules: {
        config
    },
    strict: process.env.NODE_ENV === 'development',

})
