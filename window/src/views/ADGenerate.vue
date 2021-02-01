<template>
    <div class="ADGenerate">
        <Row :gutter="16">

            <Col span="12">
                <Select v-model="platform" @on-change="loadAdList">
                    <Option v-for="item in platforms" :value="item.key">{{item.name}}</Option>
                </Select>
                <Select v-model="account" placeholder="选择账号">
                    <Option v-for="item in accounts" :value="item.account+','+item.pwd">{{item.account+','+item.pwd}}
                    </Option>
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
                <RadioGroup v-model="tianChongAction">
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
    import {ipcRenderer} from "electron";
    import Config from "../components/Config";
    import cache from "../lib/cache";
    import template from "../lib/template";
    import axios from 'axios';

    export default {
        name: "ADGenerate",
        components: {Config, ADLocation},
        data() {
            return {
                tianChongAction: null,
                adList: [],
                currentPage: 1,
                adTotal: 0,
                adCols: [
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
                appId: '',
                placementNameSearch: 'kh渠道1',
                adName: '酷划渠道1'
            }
        },
        computed: {
            accounts() {
                return this.$store.state.config.accounts.filter((obj, index) => {
                    return obj.platform === this.platform;
                });
            },
            platforms() {
                return this.$store.state.config.platforms;
            }
        },
        methods: {
            tianChongClick() {
                if (this.tianChongAction == null) {
                    this.$Message.warning('选择追加/覆盖');
                    return;
                }
                if (this.adName && this.placementNameSearch) {
                    this.getAdListAllForName(this.adName).then(allAds=>{
                        allAds.forEach(obj => {
                            this.tianChongReq(obj);
                        });
                    },error=>{
                        this.$Message.warning(error);
                    });
                } else {
                    this.$Message.warning('平台/公司广告名 必填');
                }

            },
            getAdListAllForName(adName){
               return new Promise((resolve, reject)=>{
                   let allAds = [];
                   this.adListReq(1,adName).then(data => {

                       if (data.stat === false || data.list.length === 0) {
                           reject('公司广告中`不存在`此名称的广告');
                           return;
                       }
                       allAds = allAds.concat(data.list);
                       if (parseInt(data.count) > 10) {
                           let arr = [];
                           for (let num = 1; num < Math.ceil(data.count/10.0); num++) {
                               arr.push(this.adListReq(num+1,this.adName));
                           }

                           axios.all(arr).then(axios.spread(function () {
                                   let datas = arguments;
                                   for (let num = 0; num < datas.length; num++) {
                                       if (datas[num]['stat']) {
                                           allAds = allAds.concat(datas[num]['list']);
                                       }
                                   }
                                   resolve(allAds);
                               }));
                       }else {
                           resolve(allAds);
                       }
                   });
               });

            },
            adListReq(page,adName){
                let params = {r: 'Wap/Advert/adList', page};
                params.kw = adName;
                return  this.$api.get('', {params});
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
                    "number": obj.number
                };
                this.$api.post('', {data}, {params}).then(resp=>{
                    console.log(resp);
                });
            },
            tianChongReq(adObj) {
                let adName = adObj.name.replace(this.adName, this.placementNameSearch);
                cache.findAdnet(adName).then(obj => {
                    if (obj) {
                        let code = template.adnet_native
                            .replace(/adID/g, obj.placement_id)
                            .replace(/appID/g, obj.app_id)
                        if (this.tianChongAction === 'add') {
                            adObj.code = adObj.code + '\n\n\n' + code;
                            adObj.intro = adObj.intro + '\n' + obj.placement_id;
                        } else {
                            adObj.code = code;
                            adObj.intro = obj.placement_id;
                        }
                        this.updateAdReq(adObj);
                    } else {
                        this.$Message.warning({
                            duration: 5,
                            content: "[" + adObj.name + '] 未在本地找到对应的'
                        });
                    }
                });
            },
            createAction() {
                console.log(this.account);
                if (!this.placementName) {
                    this.$Message.warning('请填写广告');
                    return;
                }
                let [account, pwd] = this.account.split(',');
                let obj = {};
                obj.platform = this.platform;
                obj.account = account;
                obj.pwd = pwd;
                obj.adnames = this.prepareStr.split('\n');

                console.log(obj);
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
                        let appName = separator + '北京广典';
                        let scenario = separator + '动态信息流';//插屏
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
            loadAdList() {
                cache.loadAdnetList(this.placementNameSearch, this.currentPage).then(obj => {
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

    .ADGenerate > div {
        margin-bottom: 10px;
    }
</style>