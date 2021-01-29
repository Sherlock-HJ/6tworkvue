<template>
    <div class="ADGenerate">
        <Row :gutter="16">

            <Col span="12">
                <Select v-model="platform" @on-change="loadAdList">
                    <Option v-for="item in platforms" :value="item.key">{{item.name}}</Option>
                </Select>
                <Select v-model="account" placeholder="选择账号">
                    <Option v-for="item in accounts" :value="item.account+','+item.pwd">{{item.account+','+item.pwd}}</Option>
                </Select>

                <Input v-model="placementName" placeholder="广告名称前缀（或是渠道名）">
                    <Button slot="append" @click="prepareAction" type="primary">预创建</Button>
                </Input>

            </Col>
            <Col span="10">

                <ADLocation v-model="adLocs"></ADLocation>

            </Col>
            <Col span="2">

                <Button @click="drawerFlag = true" type="primary">配置</Button>
                <Drawer title="Basic Drawer"
                        :width="300"
                        v-model="drawerFlag">
                    <Config></Config>
                </Drawer>
            </Col>

        </Row>
        <Row :gutter="16">
            <Col span="12">
                <Input type="textarea"
                       :rows="20"
                       v-model="prepareStr"/>
            </Col>
            <Col span="12">
                <Input placeholder="平台广告名查询"
                       v-model="placementNameSearch"
                       @on-change="loadAdList"></Input>
                <Table :columns="adCols" :data="adList"></Table>
                <Page :current.sync="currentPage"
                      :page-size="5"
                      :total="adTotal" @on-change="loadAdList"/>

            </Col>

        </Row>
        <Row>
            <Col span="12">

            <Button @click="createAction" type="primary">创建</Button>
            </Col>
            <Col span="12">
                <Input v-model="adName" placeholder="公司广告名查询"></Input>
                <RadioGroup>
                    <Radio label="add">
                        <span>追加</span>
                    </Radio>
                    <Radio label="cover">
                        <span>覆盖</span>
                    </Radio>
                </RadioGroup>
                <Button @click="tianChongClick" type="primary">确定</Button>
            </Col>

        </Row>
    </div>
</template>

<script>
    import ADLocation from "../components/ADLocation";
    import {clipboard, ipcRenderer} from "electron";
    import Config from "../components/Config";
    import cache from "../lib/cache";
    import template from "../lib/template";

    export default {
        name: "ADGenerate",
        components: {Config, ADLocation},
        data() {
            return {
                adList:[],
                currentPage:1,
                adTotal:0,
                adCols:[
                    {
                        title: '广告名',
                        key: 'placement_name'
                    },
                    {
                        title: '媒体名',
                        key: 'app_name',
                        width: 100
                    },
                    {
                        title: '类型',
                        key: 'type',
                        width: 100
                    },
                ],
                drawerFlag: false,
                platform: 'adnet',
                placementName: '',
                prepareStr: '',
                adLocs: [],
                account: '',
                appId:'',
                placementNameSearch:'',
                adName:''
            }
        },
        computed:{
            accounts(){
                return this.$store.state.config.accounts.filter((obj,index)=>{
                    return obj.platform === this.platform;
                });
            },
            platforms(){
                return this.$store.state.config.platforms;
            }
        },
        methods: {
            tianChongClick(){
                let allAds = [];
                let params = {r: 'Wap/Advert/adList', page: 1};
                if (this.adName) {
                    params.kw = this.adName;
                    this.$api.get('', {params}).then(data=>{

                        if (data.stat === false || data.list.length === 0){
                            this.$Message.warning('公司广告中`不存在`此名称的广告');
                            return ;
                        }
                        allAds = allAds.concat(data.list);
                        if(parseInt(data.count) >10){

                        }
                        allAds.forEach(obj=>{
                            this.tianChongReq(obj.name);
                        });

                    });
                }else {
                    this.$Message.warning('必填');
                }

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
                    "number":obj.number
                };
                return this.$api.post('', {data}, {params});
            },
            tianChongReq(name){
                let adName = name.replace(this.adName,this.placementNameSearch);
                cache.findAdnet(adName).then(obj=>{
                    console.log(obj);
                });
            },
            createAction() {
                console.log(this.account);
                if (!this.placementName) {
                    this.$Message.warning('请填写广告');
                    return;
                }
                let [account ,pwd] = this.account.split(',');
                let obj = {};
                obj.platform = this.platform;
                obj.account = account;
                obj.pwd = pwd;
                obj.adnames = this.prepareStr.split('\n');

                console.log(obj);
                clipboard.writeText(JSON.stringify(obj));
                ipcRenderer.send('asynchronous-message', obj);

            },
            prepareAction() {
                if (!this.placementName) return;
                this.prepareStr = "";
                let prepareArr = [];
                this.adLocs.forEach(obj => {
                    for (let num = obj.start; num <= obj.stop; num++) {

                        let separator = '__';
                        let placementName = this.placementName + obj.text + num;
                        let appName = separator+'北京广典';
                        let scenario = separator+'动态信息流';//插屏
                        let style = '';
                        if (this.platform === 'adnet') {
                            style = separator + this.adnetType(num, obj.seg);
                        }

                        prepareArr.push(placementName + appName + scenario + style);
                    }
                });
                this.prepareStr = prepareArr.join('\n')

            },
            adnetType(num, seg) {
                if (num <= seg) {
                    return '三小图双文';
                }
                let r = Math.floor(Math.random() * 3);
                if (r === 0) {
                    return '上文下图';
                }
                if (r === 1) {
                    return '三小图双文';
                }
                if (r === 2) {
                    return '横版纯图片';
                }
            },
            loadAdList(){
                cache.loadAdnetList(this.placementNameSearch,this.currentPage).then(obj=>{
                    this.adList = obj.dataList;
                    this.adTotal = obj.total;
                });
            }
        },
        created() {

            ipcRenderer.on('asynchronous-reply', (event, arg) => {
              console.log(arg);
            });

            this.loadAdList();

        },
        destroyed() {

        }
    }
</script>

<style scoped>
    .ADGenerate {
        margin: 10px;
    }
    .ADGenerate  > div{
        margin-bottom: 10px;
    }
</style>