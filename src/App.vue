<template>
    <div id="app">
        <home></home>
    </div>
</template>
<script>

    import Qs from 'qs'
    import Home from "./views/Home";

    export default {
        components: {
            Home
        },
        data() {
            return {
                isShowHome: false,
                isShowLogin: false,
                isShowSign: false
            }
        },
        methods: {
            login() {
                let params = {r: 'Wap/Login/Login'};
                let json = {
                    username: "zxw",
                    wapcode: "",
                    password: "2e1f17104fbb36b97b96229daeb4251c"
                };

                this.$api.post('', json, {params}).then(() => {

                    this.$Notice.success({title: '登录成功!'});

                });
            }
        },
        beforeCreate() {

            //添加一个路由守卫
            this.$router.beforeEach((to, from, next) => {
                this.$Loading.start();
                next();
            });

            this.$router.afterEach(() => {
                this.$Loading.finish();
                window.scrollTo(0, 0);
            });

            // 设置默认的 根url
            this.$api.defaults.baseURL = this.$store.state.config.baseURL;

            // 设置默认的 提交方式
            this.$api.defaults.paramsSerializer = (params) => {
                let q = Qs.stringify(params, {arrayFormat: 'brackets'});
                // params.sign = md5(q);
                // return Qs.stringify(params, {arrayFormat: 'brackets'})
                return q;
            };
            // 设置默认的 提交方式是json字符串
            this.$api.defaults.transformRequest = [(data) => {
                if (data) {
                    return JSON.stringify(data);

                }
                return '';
            }];

            // 添加一个请求拦截器
            this.$api.interceptors.request.use((config) => {
                this.$Loading.start();

                return config;

            }, (error) => {
                this.$Loading.finish();

                return Promise.reject(error);
            });

            // 添加一个响应拦截器
            this.$api.interceptors.response.use((response) => {
                this.$Loading.finish();

                if (response.data && response.data.ret === 200) {
                    return response.data.data;
                } else {
                    const msg1 = this.$Message.warning(response.data.msg);

                    const error = new Error(response.data.ret + ':' + response.data.msg);
                    error.msg = msg1;
                    error.data = response.data;
                    return Promise.reject(error);

                }

            }, (error) => {
                this.$Loading.finish();

                let txt = '';
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    txt = error.response.data.msg;
                } else {
                    // Something happened in setting up the request that triggered an Error
                    txt = error.message;
                }
                this.$Message.warning(txt);

                return Promise.reject(error);
            });
        },
        created() {
            // 添加一个响应拦截器
            this.$api.interceptors.response.use((response) => {
                        return response;

                }, (error) => {
                    if (error.data && error.data.ret === 401) {
                        this.login();

                    }
                    return Promise.reject(error);
                }
            );
        },
        mounted() {


        }

    }
</script>

<style>


    .tip {
        color: #999999;
        font-size: 12px;
    }

    .sub-title {
        color: #666666;
        font-size: 15px;
    }

    .cubeic-right {
        color: #3c763d;
    }

    .cubeic-wrong {
        color: #a94442;
    }

    .confirm-content {
        margin: 10px;
    }

    .no-more {
        margin: 50px;
        text-align: center;
        border-bottom: solid 1px #eeeeee;
        color: #999999;

    }

</style>
