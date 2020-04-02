<template>
    <div class="home">
        <Menu mode="horizontal" theme="light" :active-name="maName">
            <MenuItem name="/ad" to="/ad">
                <Icon type="ios-paper" />
                广告列表
            </MenuItem>
            <MenuItem name="/ad-add" to="/ad-add">
                <Icon type="ios-people" />
                广告创建
            </MenuItem>

        </Menu>
        <router-view></router-view>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'home',
        data() {
            return {
                ci: 0,
                selectDone: false
            }
        },
        computed:{
            maName(){
                return this.$route.path;
            }
        },
        methods: {

            checkSite() {
                if (this.ci > 3) return;
                this.ci++;
                let params = {r: 'Wap/Menu/checkSite', siteid: 1};
                this.selectDone = false;
                this.$api.get('', {params}).then(() => {
                    this.selectDone = true;
                    this.$Notice.success({title: '西陆 站点选择成功！'});

                });
            }
        },
        created() {

            this.checkSite();
            console.log(this.$route);
        }
    }
</script>
