<template>
    <div class="ADGenerate">
        <Row :gutter="16">

            <Col span="12">
                <Input v-model="account">
                    <span slot="prepend">账号</span>
                </Input>
                <Input v-model="pwd">
                    <span slot="prepend">密码</span>
                </Input>
                <Input v-model="channelName" placeholder="广告名称前缀（或是渠道名）">
                    <Select v-model="platform" slot="prepend" style="width: 80px">
                        <Option value="adnet">优亮汇</Option>
                        <Option value="baidu">百度</Option>
                        <Option value="sogou">搜狗</Option>

                    </Select>

                    <Button slot="append" @click="prepareAction" type="primary">预创建</Button>

                </Input>


            </Col>
            <Col span="12">

                <ADLocation v-model="adLocs"></ADLocation>

            </Col>

        </Row>
        <Row>
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
            <RadioGroup v-model="model">
                <Radio label="add">
                    <span>追加</span>
                </Radio>
                <Radio label="cover">
                    <span>覆盖</span>
                </Radio>
            </RadioGroup>
            <Button @click="createAction" type="primary">获取</Button>
            <Button @click="sqlAdd" type="primary">测试数据库添加数据上限</Button>
            <Button @click="sqlDel" type="primary">删除</Button>

        </Row>
    </div>
</template>

<script>
    import ADLocation from "../components/ADLocation";
    import {clipboard, ipcRenderer} from "electron";

    export default {
        name: "ADGenerate",
        components: {ADLocation},
        data() {
            return {
                platform: 'adnet',
                channelName: '',
                prepareStr: '',
                adLocs: [],
                account: '1241554103',
                pwd: 'gdcm84479855',
                model: null,
                mtid: null

            }
        },
        methods: {
            createAction() {

                if (!this.model) {
                    this.$Message.warning('请选择创建模式（追加/覆盖）');
                    return;
                }

                let obj = {};
                obj.platform = this.platform;
                obj.account = this.account;
                obj.pwd = this.pwd;
                obj.model = this.model;
                obj.adnames = this.prepareStr.split('\n');

                obj.mtid = this.mtid;
                console.log(obj);
                clipboard.writeText(JSON.stringify(obj));
                ipcRenderer.send('asynchronous-message', obj);

                this.model = null;

            },

            prepareAction() {
                if (!this.channelName) return;
                this.prepareStr = "";
                let prepareArr = [];
                this.adLocs.forEach(obj => {
                    for (let num = obj.start; num <= obj.stop; num++) {
                        let type = '';
                        if (this.platform === 'adnet') {
                            type = ',' + this.adnetType(num, obj.seg);
                        }
                        type += ',1';
                        prepareArr.push(this.channelName + obj.text + num + type);
                    }
                });
                this.prepareStr = prepareArr.join('\n')

            },
            adnetType(num, seg) {
                if (num <= seg) {
                    return 10;
                }
                let r = Math.floor(Math.random() * 3);
                if (r === 0) {
                    return 4;
                }
                if (r === 1) {
                    return 10;
                }
                if (r === 2) {
                    return 9;
                }
            },
            sqlDel(){
                this.$db.transaction(function (tx) {
                    tx.executeSql('DELETE FROM adnet2  WHERE placement_id="jdslkfjasdfuiosfkj"');

                    tx.executeSql('SELECT placement_id FROM adnet2', [],  (tx, results) =>{
                        let len = results.rows.length, i;
                        console.log(len+'条');

                    }, (tx, results) =>{
                        console.log(tx);
                        console.log(results);

                    });
                });
            },
            sqlAdd(){
                console.log('添加数据');
                this.$db.transaction(function (tx) {
                    console.log('执行 添加数据');
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
                    console.log('执行 添加数据 完毕');
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

                tx.executeSql('CREATE TABLE IF NOT EXISTS adnet2 (placement_id, app_id, name1,whj,ui,qwer,account,app_name,yiu)');
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
</style>