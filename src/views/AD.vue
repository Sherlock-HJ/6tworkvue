<template>
    <div class="ad">

        <div class="hj-search">

            <Input search enter-button
                   style="width: 300px"
                   @on-search="searchAction"
                   placeholder="输入广告名（按回车键可搜索）..."/>

        </div>
        <div class="hj-toolbar">
            <Poptip
                    confirm
                    :title="updateTitle"
                    @on-ok="updateAction">
                <Button @click="updateAd()" type="primary">提交</Button>
            </Poptip>

            <Poptip
                    confirm
                    :title="deleteTitle"
                    @on-ok="deleteAction">
                <Button @click="deleteAd()">删除</Button>
            </Poptip>
        </div>
        <Page :total="total"
              :page-size-opts="[10,20,50]"
              @on-change="adlist"
              @on-page-size-change="pageSizeChange"
              show-sizer/>
        <br/>
        <Table border ref="selection" :columns="columns"
               @on-select="tableSelect"
               @on-select-all="tableSelectAll"
               :data="datas">
            <template slot-scope="{ row }" slot="n_code">
                <Poptip title="HTML代码" transfer
                        word-wrap width="1000">
                    <div slot="content" class="hj-poptip-cnt">
                        <div>
                            <h3>当前的：</h3>
                            <pre>{{row.code}}</pre>
                        </div>
                        <div>
                            <h3>未来的：</h3>
                            <pre>{{row.n_code}}</pre>
                        </div>
                    </div>
                    <Input placeholder="将要修改的 HTML代码"
                           type="textarea"
                           :rows="1"
                           v-model="row.n_code"/>
                </Poptip>
            </template>
            <template slot-scope="{ row }" slot="n_intro">
                <Poptip title="广告简介" transfer
                        word-wrap width="1000">

                    <div slot="content" class="hj-poptip-cnt">
                        <div>
                            <h3>当前的：</h3>
                            <pre>{{row.intro}}</pre>
                        </div>
                        <div>
                            <h3>未来的：</h3>
                            <pre>{{row.n_intro}}</pre>
                        </div>
                    </div>
                    <Input placeholder="将要修改的 广告简介"
                           type="textarea"
                           :rows="1"
                           v-model="row.n_intro"/>

                </Poptip>
            </template>
            <template slot-scope="{ row }" slot="action">
                <Button type="primary"
                size="small"
                @click="updateOneAd(row)">提交
                </Button>
            </template>
        </Table>
    </div>
</template>

<script>
    import axios from 'axios'

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
                kw: '',
                total: 0,
                pageSize: 10,
                modal11: true,
                tableSelection: [],
                deleteTitle: '',
                updateTitle: ''
            }
        },
        computed: {},
        methods: {
            updateOneAd(row){
                this.updateAdReq(row).then(data => {
                    console.log(data);
                });
            },
            updateAction() {
                let arr = [];
                for (let num = 0; num < this.tableSelection.length; num++) {

                    arr.push(this.updateAdReq(this.tableSelection[num]));
                }

                let that = this;
                axios.all(arr)
                    .then(axios.spread(function () {
                        let datas = arguments;
                        console.log(datas);
                        that.adlist(1);

                    }));
            },
            updateAd() {
                this.updateTitle = `确定提交这${this.tableSelection.length}条吗？`;
            },
            updateAdReq(obj) {
                console.log(obj);

                let params = {r: 'Wap/Advert/updateAd'};
                let data = {
                    "name": obj.name,
                    "ecode": obj.code +'\n\n'+obj.ecode,
                    "etime": '',
                    "stime": '',
                    "code": obj.n_code,
                    "intro": obj.n_intro,
                    "model": obj.model,
                    "navid": obj.id,
                    "status": obj.status,
                    "classid": obj.classid,
                    "number": ""
                };
                return this.$api.post('', {data}, {params});
            },
            tableSelect(selection, row) {
                this.tableSelection = selection;

            },
            tableSelectAll(selection) {
                this.tableSelection = selection;

            },
            deleteAd() {
                this.deleteTitle = `确定删除这${this.tableSelection.length}条吗？`;

            },
            deleteAdReq(adid) {
                let params = {r: 'Wap/Advert/delAd', adid};
                return this.$api.get('', {params});
            },
            pageSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.adlist(1);

            },
            deleteAction() {
                let arr = [];
                for (let num = 0; num < this.tableSelection.length; num++) {

                    arr.push(this.deleteAdReq(this.tableSelection[num]['id']));
                }

                let that = this;
                axios.all(arr)
                    .then(axios.spread(function () {
                        let datas = arguments;
                        console.log(datas);
                        that.adlist(1);

                    }));
            },
            searchAction(kw) {
                this.kw = kw;
                this.adlist(1);

            },
            adlist(upage) {
                let ci = Math.floor(this.pageSize / 10);
                let page = (upage - 1) * ci + 1;

                // console.log(upage);
                // return;
                let arr = [];
                for (let num = 0; num < ci; num++) {

                    arr.push(this.adListReq(page + num));
                }

                let that = this;
                axios.all(arr)
                    .then(axios.spread(function () {
                        let datas = arguments;
                        let tmp = [];
                        that.total = parseInt(datas[0]['count']);

                        for (let num = 0; num < datas.length; num++) {
                            if (datas[num]['stat']) {
                                tmp = tmp.concat(datas[num]['list']);
                            }

                        }
                        that.datas = tmp;
                    }));

            },
            adListReq(page) {
                let params = {r: 'Wap/Advert/adList', page: page};
                if (this.kw) {
                    params.kw = this.kw;
                }

                return this.$api.get('', {params});
            }
        },
        created() {

            this.adlist(1);
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

    .hj-toolbar >>> div {
        margin-right: 5px;
    }

    .hj-poptip-cnt {
        /*display: flex;*/
        max-height: 500px;
        overflow: auto;
    }

    .hj-poptip-cnt >>> div {
        padding-top: 5px;
        border-top: solid #eeeeee 1px;
    }

    .hj-poptip-cnt h3 {
        color: #8c0776;
    }


</style>

<style>
    .vertical-left-modal {

    }

    .vertical-left-modal .ivu-modal {
        margin: 0;
        float: left;
    }
</style>