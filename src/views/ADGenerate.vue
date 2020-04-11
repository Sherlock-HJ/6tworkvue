<template>
    <div class="ADGenerate">
        <button @click="send()">dafdfa</button>
        <Row :gutter="16">

            <Col span="12">
            <Input v-model="channelName"  placeholder="广告名称前缀（或是渠道名）" >
            <Select v-model="platform" slot="prepend" style="width: 80px">
                <Option value="adnet">优亮汇</Option>
                <Option value="x5">TBS</Option>
                <Option value="sougou">搜狗</Option>

            </Select>


            <Button slot="append" @click="prepareAction">预创建</Button>

            </Input>
            </Col>
            <Col span="12">

            <Checkbox
                    :indeterminate="indeterminate"
                    :value="checkAll"
                    @click.prevent.native="handleCheckAll">全选
            </Checkbox>
            <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                <Checkbox label="首页"></Checkbox>
                <Checkbox label="列表页"></Checkbox>
                <Checkbox label="内容页"></Checkbox>
                <InputNumber :min="1" :max="numScopeMax" v-model="numScopeMin" size="small" ></InputNumber>
                -
                <InputNumber :max="30" :min="1" v-model="numScopeMax" size="small"></InputNumber>

            </CheckboxGroup>
            </Col>

        </Row>
        <Row>
            <Input type="textarea"
                   :rows="20"
                   v-model="prepareStr" />
        </Row>
        <Row>
            <Button  @click="createAction" >创建</Button>

        </Row>
    </div>
</template>

<script>
    export default {
        name: "ADGenerate",
        data() {
            return {
                ws: null,
                platform: '',
                channelName:'',
                prepareStr:'',
                indeterminate: false,
                checkAll: true,
                checkAllGroup: ['首页', '列表页', '内容页']

            }
        },
        methods: {
            send() {
                let obj = {func: 'whj'};
                this.ws.send(JSON.stringify(obj));

            },
            handleCheckAll() {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['首页', '列表页', '内容页'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange(data) {
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            },
            prepareAction(){
                if (!this.channelName) return;
                this.prepareStr = "";
                let prepareArr = [];
                this.checkAllGroup.forEach(str=>{
                    for (let num = 1 ; num <= 16; num++) {
                        prepareArr.push( this.channelName + str + num );
                    }
                });
                this.prepareStr = prepareArr.join('\n')

            }
        },
        created() {
            this.ws = new WebSocket('ws://localhost:8765');
            this.ws.onopen = () => {

            };
            this.ws.onmessage = ev => {
                let obj = JSON.parse(ev.data);
            };
            this.ws.onclose = ev => {
                console.log(ev);
            };
            this.ws.onerror = ev => {
                console.log(ev);
            };
        },
        destroyed() {
            this.ws.close();
        }
    }
</script>

<style scoped>
.ADGenerate{
    margin: 10px;
}
</style>