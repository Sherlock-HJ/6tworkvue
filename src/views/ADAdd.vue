<template>
    <div class="ad-add">

        <div class="row">
            <Select placeholder="广告模式"
                    v-model="model"
                    style="width:200px">
                <Option :value="1">HTML广告</Option>
                <Option :value="2">文字广告</Option>
                <Option :value="3">图片/FLASH广告</Option>
                <Option :value="4">弹出广告</Option>

            </Select>
            &nbsp;
            <Select placeholder="广告分类"
                    filterable
                    label-in-value
                    v-model="classid"
                    @on-change="classOnChange"
                    style="width:200px">
                <Option v-for="item in classList"
                        :key="item.classid"
                        :value="item.classid">{{item.classname}}
                </Option>

            </Select>
        </div>
        <div class="row">
            <Input placeholder="广告名"
                   style="width: 300px"
                   v-model="name"/>
            &nbsp;
            <RadioGroup v-model="numScope" @on-change="numScopeOnChange">
                <Radio label="1-11"></Radio>
                <Radio label="1-9"></Radio>
                <Radio label="1-21"></Radio>
            </RadioGroup>
            <InputNumber :min="1" v-model="numScopeMin" size="small" @on-focus="numScope=''"></InputNumber>
            -
            <InputNumber :max="30" :min="1" v-model="numScopeMax" size="small" @on-focus="numScope=''"></InputNumber>

        </div>
        <div class="row">
            是否启用
            <RadioGroup v-model="isRev">
                <Radio :label="1">是</Radio>
                <Radio :label="0">否</Radio>
            </RadioGroup>
        </div>
        <div class="row">
            <Button @click="createAd">创建</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ADAdd",
        data() {
            return {
                isRev: 1,
                numScopeMin: 1,
                numScopeMax: 11,
                numScope: '1-11',
                classid: '',
                name: '',
                ecode: '',
                code: '',
                intro: '',
                model: 1,
                status: '',
                classList: []
            }
        },
        methods: {
            numScopeOnChange(obj) {
                if (obj === '1-11') {
                    this.numScopeMin = 1;
                    this.numScopeMax = 11;
                } else if (obj === '1-9') {
                    this.numScopeMin = 1;
                    this.numScopeMax = 9;
                } else if (obj === '1-21') {
                    this.numScopeMin = 1;
                    this.numScopeMax = 21;
                } else {
                    this.numScopeMin = 1;
                    this.numScopeMax = 1;
                }
            },
            classOnChange(obj) {
                this.name = obj.label;
            },
            getAllClassList() {
                let params = {r: 'Wap/AdClass/getAllList'};
                this.$api.get('', {params}).then(data => {

                    this.classList = data.list;
                })
            },
            createAd() {
                for (let n = this.numScopeMin; n <= this.numScopeMax; n++) {
                    let data = {
                        "name": this.name + n,
                        "ecode": "",
                        "etime": "",
                        "stime": "",
                        "code": "",
                        "intro": "",
                        "model": "1",
                        "status": "1",
                        "classid": "534",
                        "number": ""
                    };
                    this.creatADReq(data);
                }
            },
            creatADReq(data) {
                let params = {r: 'Wap/Advert/addAd'};
                this.$api.post('', {data}, {params}).then(data => {

                    console.log(data);
                })
            }
        },
        mounted() {
            this.getAllClassList();
        }

    }
</script>

<style scoped>
    .ad-add {
        margin: 5px;
    }

    .row {
        margin: 5px 0;
    }
</style>