<template>
    <div>
        <div >
            <Select v-model="siteid" @on-change="checkSite"
                    :label-in-value="true" size="large" style="width:100px">
                <Option :value="1" >西陆网</Option>
                <Option :value="2" >南讯网</Option>
                <Option :value="3" >尚陆网</Option>
                <Option :value="4" >看社会</Option>
                <Option :value="8" >moyou_app</Option>
            </Select>
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

                this.$api.post('', json, {params}).then(() => {

                    this.$Notice.success({title: '登录成功!'});

                });
            },
            checkSite(obj) {

                let params = {r: 'Wap/Menu/checkSite', siteid:obj.value};
                this.$api.get('', {params}).then(() => {

                    this.$Notice.success({title: obj.label+' 站点选择成功！'});
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