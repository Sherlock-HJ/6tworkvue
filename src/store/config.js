
let baseURL = process.env.NODE_ENV === 'development'?'/api':'http://manager.m.xilu.com';

export default {
  namespaced: true,
  state: {
    baseURL
  },
  mutations: {

  },
  actions: {

  }
}

