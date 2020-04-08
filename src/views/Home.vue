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

            }
        },
        computed:{
            maName(){
                return this.$route.path;
            }
        },
        methods: {


        },
        created() {

        }
    }
</script>
