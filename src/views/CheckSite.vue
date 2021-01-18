<template>
    <div>
        <div style="height: 2px;"></div>

            <Button v-for="item in siteDatas" @click="checkSite(item)" :key="item.value" >{{item.label}}</Button>

    </div>
</template>

<script>

    export default {
        name: "CheckSite",
        data(){
            return{
                siteDatas:[
                    {value:1,label:'西陆网'},
                    {value:2,label:'南讯网'},
                    {value:3,label:'尚陆网'},
                    {value:4,label:'看社会'},
                    {value:8,label:'moyou_app'},
                ]
            }
        },
        methods: {
            checkSite(obj) {

                let params = {r: 'Wap/Menu/checkSite', siteid: obj.value};
                this.$api.get('', {params}).then(() => {
                    this.$store.commit('checkSiteMutations',obj.label);
                    this.$Notice.success({title: obj.label + ' 站点选择成功！'});
                    this.$router.push('/ad');
                });
            }
        },
        created(){
            this.$store.commit('checkSiteMutations','请选择');

            let params = {r: 'Wap/Advert/adList', page: 1};
            this.$api.get('', {params});
        }
    }
</script>

<style scoped>

</style>