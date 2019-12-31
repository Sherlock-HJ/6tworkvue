<template>
    <div class="home">
       <a-d></a-d>

        <router-view></router-view>
    </div>
</template>

<script>
    // @ is an alias to /src

    import AD from "./AD";
    export default {
        name: 'home',
        components: {AD},
        data() {
            return {
                ci: 0
            }
        },
        methods: {

            checkSite() {
                if (this.ci > 3) return;
                this.ci++;

                let params = {r: 'Wap/Menu/checkSite', siteid: 1};
                this.$api.get('', {params}).then(() => {

                    this.$Notice.success({title: '西陆 站点选择成功！'});

                });
            }
        },
        created() {

            this.checkSite();
        }
    }
</script>
