
let baseURL = process.env.NODE_ENV === 'development'?'/api':'http://manager.m.xilu.com';
// let baseURL = '/api';

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

