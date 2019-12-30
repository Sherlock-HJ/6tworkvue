const isdev = process.env.NODE_ENV === 'development';

let baseURL = '';
if (isdev){
   baseURL = '/api';

}else {
  baseURL = '';

}

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

