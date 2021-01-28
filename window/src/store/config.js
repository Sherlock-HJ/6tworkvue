let baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'http://manager.m.xilu.com';
// let baseURL = '/api';

let accounts = JSON.parse(localStorage.getItem('accounts'));
accounts = accounts?accounts:[];

const platforms = [
    {
        key: 'adnet',
        name: '优量汇'
    },
    {
        key: 'baidu',
        name: '百度'
    },
    {
        key: 'sogou',
        name: '搜狗'
    },
];
export default {
    namespaced: true,
    state: {
        baseURL,
        accounts,
        platforms
    },
    mutations: {
        setAccounts(state, obj) {
            state.accounts = obj;
            localStorage.setItem('accounts', JSON.stringify(obj));
        }
    },
    actions: {}
}

