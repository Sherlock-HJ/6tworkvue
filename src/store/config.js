const isdev = process.env.NODE_ENV === 'development';

let baseURL = '/api';
// if (isdev){
//    baseURL = '/api';
//
// }else {
//   baseURL = 'http://localhost:9999';
//
// }

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

