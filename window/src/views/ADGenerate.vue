<template>
    <div class="ADGenerate">
        <Row :gutter="16">

            <Col span="12">
                <Select v-model="platform" >
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
                dfsa
            </Col>

        </Row>
        <Row>
            <Button @click="createAction" type="primary">创建</Button>
                <Radio label="add">
                    <span>追加</span>
                </Radio>
                <Radio label="cover">
                    <span>覆盖</span>
                </Radio>
            <Button @click="createAction" type="primary">获取</Button>
            <Button @click="sqlAdd" type="primary">测试数据库添加数据上限</Button>
            <Button @click="sqlDel" type="primary">删除</Button>

        </Row>
    </div>
</template>

<script>
    import ADLocation from "../components/ADLocation";
    import {clipboard, ipcRenderer} from "electron";
    import Config from "../components/Config";

    export default {
        name: "ADGenerate",
        components: {Config, ADLocation},
        data() {
            return {
                drawerFlag: false,
                platform: 'adnet',
                placementName: '',
                prepareStr: '',
                adLocs: [],
                account: '',
                appId:''
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

            sqlAdd(){
                this.$db.transaction(function (tx) {
                    for (let num = 0; num < 10000; num++){
                        tx.executeSql('INSERT INTO adnet2 (placement_id,app_id, name1,whj,ui,qwer,account,app_name,yiu) ' +
                            'VALUES ("jdslkfjasdfuiosfkj", "菜鸟教程", "菜鸟教程", "菜鸟教程", "菜鸟教程", "菜鸟教程", "菜鸟教程", "菜鸟教程", "菜鸟教程")',null,
                            (t,s)=>{
                                // console.log(t);
                                // console.log(s);
                            },(t,s)=>{
                            console.log(t);
                            console.log(s);
                        });
                    }
                });

                this.$db.transaction(function (tx) {
                    tx.executeSql('SELECT placement_id FROM adnet2', [],  (tx, results) =>{
                        let len = results.rows.length, i;
                        console.log(len+'条');

                    }, (tx, results) =>{
                        console.log(tx);
                        console.log(results);

                    });
                });
            }
        },
        created() {
            this.errorNum = 0;
            this.closeNum = 0;

            this.$db.transaction((tx) => {
                // tx.executeSql('DROP TABLE adnet2 ');

                tx.executeSql('CREATE TABLE IF NOT EXISTS adnet ' +
                    '(aapid,placement_id,type,placement_name,app_name,app_id,account)');
            });

            ipcRenderer.on('asynchronous-reply', (event, arg) => {
              console.log(arg);
            })

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