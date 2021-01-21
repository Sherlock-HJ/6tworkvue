<template>
    <div>
        <div >
            登录中...
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        methods:{
            login() {
                let params = {r: 'Wap/Login/Login'};
                let json = {
                    username: "刘甜",
                    wapcode: "",
                    password: "e10adc3949ba59abbe56e057f20f883e"
                };

                this.$api.post('', json, {params}).then((obj) => {
                    console.log(obj.wapcode);
                    this.$Notice.success({title: '登录成功!'});
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