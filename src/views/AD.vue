<template>
    <div class="ad">

        <div class="hj-search">

            <Input search enter-button clearable
                   style="width: 300px"
                   @on-search="searchAction"
                   placeholder="输入广告名（按回车键可搜索）..."/>

        </div>
        <div class="hj-toolbar">
            <Poptip
                    confirm
                    title="Are you sure you want to delete this item?"
                    @on-ok="deleteAction">
                <Button>删除</Button>
            </Poptip>
        </div>
        <Table border ref="selection" :columns="columns" :data="datas">
            <template slot-scope="{ row }" slot="n_code">
                <Poptip title="HTML代码"  word-wrap width="500">
                    <div slot="content" class="hj-poptip-cnt">
                       <div>
                           <h6>当前的：</h6>
                           {{row.code}}
                       </div>
                        <div>
                            <h6>未来的：</h6>
                            {{row.n_code}}
                        </div>
                    </div>
                    <Input placeholder="将要修改的 HTML代码"/>
                </Poptip>
            </template>
            <template slot-scope="{ row }" slot="n_intro">
                <Poptip title="广告简介"  word-wrap width="500">

                    <div slot="content" class="hj-poptip-cnt">
                        <div>
                            <h6>当前的：</h6>
                            {{row.intro}}
                        </div>
                        <div>
                            <h6>未来的：</h6>
                            {{row.n_intro}}
                        </div>
                    </div>
                    <Input placeholder="将要修改的 广告简介"/>
                </Poptip>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary"
                        size="small"
                        @click="show(index)">提交
                </Button>
            </template>
        </Table>
    </div>
</template>

<script>
    export default {
        name: "AD",
        data() {
            return {
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '广告简介',
                        key: 'intro'

                    },
                    {
                        title: '新[HTML代码]',
                        slot: 'n_code'

                    },
                    {
                        title: '新[广告简介]',
                        slot: 'n_intro'

                    },
                    {
                        title: '操作',
                        width: 80,
                        slot: 'action'

                    }
                ],
                datas: [],
                kw: ''
            }
        },
        methods: {

            deleteAction(){

            },
            searchAction(kw) {
                this.kw = kw;
                this.adlist();

            },
            adlist() {

                let params = {r: 'Wap/Advert/adList', page: 1};
                if (this.kw) {
                    params.kw = this.kw;
                }
                this.$api.get('', {params}).then(data => {

                    this.datas = data.list;

                });
            }
        },
        created() {

            this.adlist();
        }
    }
</script>

<style scoped>
    .ad {
        margin: 15px;
    }

    .hj-search {
        margin: 15px 0;
        display: flex;
    }

    .hj-toolbar {
        margin: 15px 0;
        display: flex;

    }
    .hj-poptip-cnt{
        display: flex;
    }
    .hj-poptip-cnt >>> div{
        width: 45%;
        padding: 5px;
        border-right: solid #eeeeee 1px;
    }
</style>