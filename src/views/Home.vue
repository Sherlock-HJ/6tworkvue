<template>
    <div class="home">
        <nav>

            <Menu mode="horizontal" theme="light" :active-name="maName">

                <Row>
                    <Col span="20">
                        <MenuItem name="/ad" to="/ad">
                            <Icon type="ios-paper"/>
                            广告列表
                        </MenuItem>
                        <MenuItem name="/ad-add" to="/ad-add">
                            <Icon type="ios-people"/>
                            广告创建
                        </MenuItem>
                        <MenuItem name="/ad-generate" to="/ad-generate">
                            <Icon type="ios-people"/>
                            广告生成
                        </MenuItem>
                    </Col>
                    <Col span="4"><h1>{{$store.state.checkSiteStr}}</h1></Col>
                </Row>
            </Menu>


        </nav>

        <router-view></router-view>
        <BackTop></BackTop>

    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'home',
        data() {
            return {}
        },
        computed: {
            maName() {
                return this.$route.path;
            }
        },
        methods: {},
        created() {

        }
    }
</script>
