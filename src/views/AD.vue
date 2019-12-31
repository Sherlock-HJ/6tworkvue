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
                    title="Are you sure you want to delete this item?"
                    @on-ok="deleteAction">
                <Button>删除</Button>
            </Poptip>
        </div>
        <Page :total="total"
              :page-size-opts="[10,20,50]"
              @on-change="adlist"
              @on-page-size-change="pageSizeChange"
              show-sizer />
        <br/>
        <Table border ref="selection" :columns="columns" :data="datas">
            <template slot-scope="{ row }" slot="n_code">
                <Poptip title="HTML代码"  transfer
                        word-wrap width="500">
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
                    <Input placeholder="将要修改的 HTML代码"
                           v-model="row.n_code"/>
                </Poptip>
            </template>
            <template slot-scope="{ row }" slot="n_intro">
                <Poptip title="广告简介" transfer
                        word-wrap width="500">

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
                    <Input placeholder="将要修改的 广告简介"
                           v-model="row.n_intro"/>

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
                datas: {},
                kw: '',
                total:0,
                pageSize:10
            }
        },
        computed:{

        },
        methods: {
            pageSizeChange(pageSize){
                this.pageSize = pageSize;
                this.adlist(1);

            },
            deleteAction(){

            },
            searchAction(kw) {
                this.kw = kw;
                this.adlist(1);

            },
            adlist(upage) {
                let ci =Math.floor(this.pageSize/10);
                let page = (upage-1)*ci +1;

                // console.log(upage);
                // return;
                let arr = [];
                for (let num = 0; num < ci ; num++){

                   arr.push(this.loadAdList(page+num));
                }
                console.log(arr);
                let that = this;
                axios.all(arr)
                    .then(axios.spread(function () {
                        let datas = arguments;
                    for (let num=0 ; num < datas.length; num++){
                        that.datas = that.datas.concat(datas[num])
                    }
                }));
              
            },
            loadAdList(page){
                let params = {r: 'Wap/Advert/adList', page: page};
                if (this.kw) {
                    params.kw = this.kw;
                }

                return this.$api.get('', {params});
            // .then(data => {
            //
            //         this.dataObj[page] = data.list;
            //         this.total = parseInt(data.count);
            //
            //     })
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
    .hj-poptip-cnt{
        display: flex;
    }
    .hj-poptip-cnt >>> div{
        width: 45%;
        padding: 5px;
        border-right: solid #eeeeee 1px;
    }
</style>