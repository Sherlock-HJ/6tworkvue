<template>
    <div>
        登录中...
    </div>
</template>

<script>
    export default {
        name: "Login",
        methods:{
            login() {
                let params = {r: 'Wap/Login/Login'};
                let json = {
                    username: "zxw",
                    wapcode: "",
                    password: "2e1f17104fbb36b97b96229daeb4251c"
                };

                this.$api.post('', json, {params}).then(() => {

                    this.$Notice.success({title: '登录成功!'});
                    this.checkSite();

                });
            },
            checkSite() {
          
                let params = {r: 'Wap/Menu/checkSite', siteid: 1};
                this.$api.get('', {params}).then(() => {

                    this.$Notice.success({title: '西陆 站点选择成功！'});
                    this.$router.replace('/');

                });
            }
        },
        created(){
            this.login();
        }
    }
</script>

<style scoped>

</style>