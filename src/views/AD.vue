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
              :page-size="pageSize"
              :page-size-opts="[10,20,50]"
              :current.sync="cpage"
              @on-change="adlist"
              @on-page-size-change="pageSizeChange"
              show-sizer/>
        <br/>
        <Table border ref="selection" :columns="columns"
               @on-select="tableSelect"
               @on-select-cancel="tableSelectCancel"
               @on-select-all="tableSelectAll"
               @on-select-all-cancel="tableSelectAllCancel"
               @on-row-click="tableOnRowClick"
               :data="datas">
            <template slot-scope="{ row }" slot="name">
                <div class="adNameCopy" :data-clipboard-text="row.name">{{row.name}}</div>
            </template>
            <template slot-scope="{ row }" slot="intro">
                <Input placeholder="广告简介"
                       type="textarea"
                       :rows="10"
                       @on-change="introChange"
                       v-model="row.intro"/>
            </template>
            <template slot-scope="{ row }" slot="code">
                    <Input placeholder="将要修改的 HTML代码"
                           type="textarea"
                           :rows="15"
                           @on-change="codeChange"
                           v-model="row.code"/>
            </template>
            <template slot-scope="{ row }" slot="ecode">
                <Input placeholder="过期的 HTML代码"
                       type="textarea"
                       :rows="9"
                       @on-change="eCodeChange"
                       v-model="row.ecode"/>
            </template>
            <template slot-scope="{ row }" slot="action">
                <Button type="primary"
                        size="small"
                        @click="updateOneAd(row)">提交
                </Button>
            </template>
        </Table>
        <br/>
        <Page :total="total"
              :page-size="pageSize"
              :page-size-opts="[10,20,50]"
              :current.sync="cpage"
              @on-change="adlist"
              @on-page-size-change="pageSizeChange"
              show-sizer/>
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

    </div>
</template>

<script>
    import axios from 'axios'
    import Clipboard from 'clipboard'

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
                        title: 'id',
                        key: 'id',
                        width: 70
                    },
                    {
                        title: '名称',
                        slot: 'name'
                    },
                    {
                        title: '广告简介',
                        slot: 'intro'

                    },
                    {
                        title: '新[HTML代码]',
                        slot: 'code'

                    },
                    {
                        title: '过期[HTML代码]',
                        slot: 'ecode'

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
                updateTitle: '',
                clipboard: null,
                tableCurrentIndex:null,
                cpage:1

            }
        },
        computed: {},
        methods: {
            introChange(event){
                console.log(event.target.value);
                this.datas[this.tableCurrentIndex].intro = event.target.value;
            },
            codeChange(event){
                this.datas[this.tableCurrentIndex].code = event.target.value;

            },
            eCodeChange(event){
                this.datas[this.tableCurrentIndex].ecode = event.target.value;

            },
            tableOnRowClick(row, index) {
                console.log(row);
                console.log(index);
                this.tableCurrentIndex = index;
                // adNameCopy

            },
            updateOneAd(row) {
                this.updateAdReq(row).then(data => {
                    if (data.stat) {
                        this.$Message.success('广告编辑成功');
                    } else {
                        this.$Message.warning('广告编辑失败');
                    }
                });
            },
            updateAction() {
                let arr = [];
                for (let num = 0; num < this.tableSelection.length; num++) {
                    console.log(this.tableSelection[num]);
                    arr.push(this.updateAdReq(this.tableSelection[num]));
                }

                let that = this;
                axios.all(arr)
                    .then(axios.spread(function () {
                        let datas = arguments;
                        console.log(datas);
                        ///添加成功提示
                        that.adlist(that.cpage);

                    }));
            },
            updateAd() {
                this.updateTitle = `确定提交这${this.tableSelection.length}条吗？`;
            },
            updateAdReq(obj) {
                let params = {r: 'Wap/Advert/updateAd'};
                let data = {
                    "ecode": obj.ecode,
                    "etime": '',
                    "stime": '',
                    "code": obj.code,
                    "intro": obj.intro,
                    "navid": obj.id,
                };
                return this.$api.post('', {data}, {params});
            },
            tableSelect(selection, row) {
                this.tableSelection = selection;

            },
            tableSelectCancel(selection, row){
                this.tableSelection = selection;

            },
            tableSelectAll(selection) {
                this.tableSelection = selection;

            },
            tableSelectAllCancel(selection){
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
                this.cpage = upage;
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

            this.clipboard = new Clipboard('.adNameCopy');

            this.clipboard.on('success', (e) => {
                this.$Message.success('广告名称复制成功！');
                e.clearSelection();
            });

            this.clipboard.on('error', () => {
                this.$Message.error('广告名称复制失败');
            });

            this.adlist(1);
        },
        destroyed() {
            this.clipboard.destroy();
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
    .adNameCopy{
        height: 200px;
        width: 100%;
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