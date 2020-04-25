<template>
    <div class="ADGenerate">
        <!--<button @click="send()">dafdfa</button>-->
        <Row :gutter="16">

            <Col span="12">
                <Input v-model="channelName" placeholder="广告名称前缀（或是渠道名）">
                <Select v-model="platform" slot="prepend" style="width: 80px">
                    <Option value="adnet">优亮汇</Option>
                    <Option value="x5">TBS</Option>
                    <Option value="sougou">搜狗</Option>

                </Select>

                <Button slot="append" @click="prepareAction">预创建</Button>

                </Input>
                <Button :type="wsStatus" :loading="wsLoading" @click="wsAction">
                    <span v-if="!wsLoading">{{wsStatus}}!</span>
                    <span v-else>连接中...</span>
                </Button>
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
            <Button @click="createAction">创建</Button>

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
                wsStatus: 'dashed'
            }
        },
        methods: {
            createAction() {

                if (this.wsStatus !== 'success') {
                    this.$Message.warning('服务已经断开！请重连');
                    return null;
                }
                this.send('create1');
                this.send('create');

            },
            send(func) {
                let obj = {func,body:'hello'};
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
                        prepareArr.push(this.channelName + obj.text + num);
                    }
                });
                this.prepareStr = prepareArr.join('\n')

            },
            openWs() {
                this.wsLoading = true;
                this.ws = new WebSocket('ws://localhost:8765');
                this.ws.onopen = () => {
                    this.wsLoading = false;
                    this.wsStatus = 'success'
                };
                this.ws.onclose = ev => {
                    console.log(ev);
                    this.wsStatus = 'warning'
                };
                this.ws.onerror = ev => {
                    console.log(ev);
                    this.wsStatus = 'error'
                };
                this.ws.onmessage = ev => {
                    let obj = JSON.parse(ev.data);
                };
            }
        },
        created() {
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