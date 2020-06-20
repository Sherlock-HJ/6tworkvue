<template>
    <div class="ADGenerate">
        <!--<button @click="send()">dafdfa</button>-->
        <Row :gutter="16">

            <Col span="12">
                <Input v-model="channelName" placeholder="广告名称前缀（或是渠道名）">
                <Select v-model="platform" slot="prepend" style="width: 80px">
                    <Option value="adnet">优亮汇</Option>
                    <Option value="baidu">百度</Option>
                    <Option value="sogou">搜狗</Option>

                </Select>

                <Button slot="append" @click="prepareAction" type="primary">预创建</Button>

                </Input>
                <Button :type="wsStatus" :loading="wsLoading" @click="wsAction">
                    <span v-if="!wsLoading">{{wsStatus}}!</span>
                    <span v-else>连接中...</span>
                </Button>
                <Select v-model="account"  style="width: 180px">
                    <Option value="shanglujunshi">shanglujunshi</Option>
                    <Option value="zizaiyangsheng">zizaiyangsheng</Option>
                    <Option value="nanxunwang">nanxunwang</Option>

                </Select>
            </Col>
            <Col span="12">

                <ADLocation v-model="adLocs"></ADLocation>

            </Col>

        </Row>
        <Row>
            <Input type="textarea"
                   :rows="20"
                   v-model="prepareStr"/>
        </Row>
        <Row>
            <Button @click="createAction" type="primary">创建</Button>

        </Row>
    </div>
</template>

<script>
    import ADLocation from "../components/ADLocation";

    export default {
        name: "ADGenerate",
        components: {ADLocation},
        data() {
            return {
                ws: null,
                platform: '',
                channelName: '',
                prepareStr: '',
                adLocs: [],
                wsLoading: false,
                wsStatus: 'dashed',
                account:''
            }
        },
        methods: {
            createAction() {

                if (this.wsStatus !== 'success') {
                    this.$Message.warning('服务已经断开！请重连');
                    return null;
                }

                this.send(this.platform+'Add');

            },
            send(func) {
                let body = {names:this.prepareStr.split('\n'),account:this.account};
                let obj = {func,body};
                this.ws.send(JSON.stringify(obj));

            },
            wsAction() {
                if (this.wsStatus !== 'success') {
                    this.openWs();
                }
            },
            prepareAction() {
                if (!this.channelName) return;
                this.prepareStr = "";
                let prepareArr = [];
                this.adLocs.forEach(obj => {
                    for (let num = obj.start; num <= obj.stop; num++) {
                        let type = '';
                        if (this.platform === 'adnet') {
                            type = ','+this.adnetType(num,obj.seg);
                        }
                        prepareArr.push(this.channelName + obj.text + num +type);
                    }
                });
                this.prepareStr = prepareArr.join('\n')

            },
            adnetType(num,seg){
                if (num <= seg){
                    return 10;
                }
                let r = Math.floor(Math.random() * 3);
                if (r === 0){
                    return 4;
                }
                if (r === 1){
                    return 10;
                }
                if (r === 2){
                    return 9;
                }
            },
            openWs() {
                this.wsLoading = true;
                this.ws = new WebSocket('ws://6twork/websocket');
                this.ws.onopen = () => {
                    this.wsLoading = false;
                    this.wsStatus = 'success'
                };
                this.ws.onclose = ev => {
                    console.log(ev);
                    this.wsStatus = 'warning';
                    if (this.closeNum<3){
                        this.openWs();
                    }
                    this.closeNum++;
                };
                this.ws.onerror = ev => {
                    console.log(ev);
                    this.wsStatus = 'error'
                    if (this.errorNum<3){
                        this.openWs();
                    }
                    this.errorNum++;
                };
                this.ws.onmessage = ev => {
                    console.log(ev.data);
                    // let obj = JSON.parse(ev.data);

                };
            }
        },
        created() {
            this.errorNum = 0;
            this.closeNum = 0;

            this.openWs();

        },
        destroyed() {
            this.ws.close();
        }
    }
</script>

<style scoped>
    .ADGenerate {
        margin: 10px;
    }
</style>