<template>
    <div class="ad-add">

        <div class="row">
            <Input placeholder="添加广告分类"
                   search
                   enter-button="添加"
                   style="width: 300px"
                   @on-search="addAdClass"/>
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
                        :value="item.classid">{{item.classname}}</Option>

            </Select>
        </div>
        <div class="row">
            <Input placeholder="广告名"
                   style="width: 300px"
                   v-model="name"/>
            &nbsp;
            <RadioGroup v-model="numScope" @on-change="numScopeOnChange">
                <Radio label="1-16"></Radio>
                <Radio label="1-9"></Radio>
                <Radio label="1-26"></Radio>
            </RadioGroup>
            <InputNumber :min="1" v-model="numScopeMin" size="small" @on-focus="numScope=''"></InputNumber>
            -
            <InputNumber :max="30" :min="1" v-model="numScopeMax" size="small" @on-focus="numScope=''"></InputNumber>

        </div>
        <div class="row">
            是否启用
            <RadioGroup v-model="status">
                <Radio :label="'1'">是</Radio>
                <Radio :label="'0'">否</Radio>
            </RadioGroup>
        </div>
        <div class="row">
            <Button @click="createAd" :loading="createLoading">创建</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ADAdd",
        data() {
            return {
                numScopeMin: 1,
                numScopeMax: 16,
                numScope: '1-16',
                classid: '',
                name: '',
                ecode: '',
                code: '',
                intro: '',
                model: 1,
                status: '1',
                classList: [],
                createLoading: false
            }
        },
        methods: {
            numScopeOnChange(obj) {
                if (obj === '1-16') {
                    this.numScopeMin = 1;
                    this.numScopeMax = 16;
                } else if (obj === '1-9') {
                    this.numScopeMin = 1;
                    this.numScopeMax = 9;
                } else if (obj === '1-26') {
                    this.numScopeMin = 1;
                    this.numScopeMax = 26;
                } else {
                    this.numScopeMin = 1;
                    this.numScopeMax = 1;
                }
            },
            classOnChange(obj) {
                console.log(obj.label + 1);
                this.name = obj.label;
            },
            addAdClass(classname) {
                let params = {r: 'Wap/AdClass/addAdClass'};
                let data = {classname};
                this.$api.post('', {data}, {params}).then(data => {
                    if (data.stat) {
                        this.$Message.success(`成功！`);
                        this.getAllClassList();
                    } else {
                        this.$Message.warning(`失败！`);

                    }
                })
            },
            getAllClassList() {
                let params = {r: 'Wap/AdClass/getAllList'};
                this.$api.get('', {params}).then(data => {

                    this.classList = data.list;
                });
            },
            createAd() {
                this.createLoading = true;
                this.creatADReq(this.numScopeMin);
            },
            creatADReq(n) {
                let data = {
                    "name": this.name + n,
                    "ecode": "",
                    "etime": "",
                    "stime": "",
                    "code": "",
                    "intro": "",
                    "model": this.model,
                    "status": this.status,
                    "classid": this.classid,
                    "number": ""
                };
                let params = {r: 'Wap/Advert/addAd'};
                this.$api.post('', {data}, {params}).then(data => {
                    if (data.stat) {
                        n = n + 1;
                        if (n <= this.numScopeMax) {
                            this.creatADReq(n);
                        } else {
                            this.$Message.success(`${this.numScopeMin} - ${this.numScopeMax} 全部成功！`);
                            this.createLoading = false;
                        }
                    } else {
                        this.$Message.warning(`${n} -  ${this.numScopeMax} 失败！`);
                        this.createLoading = false;
                    }

                }).catch(() => {
                    this.$Message.error(`${n} -  ${this.numScopeMax} 失败！`);
                    this.createLoading = false;

                });
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