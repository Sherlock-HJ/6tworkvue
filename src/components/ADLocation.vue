<template>
    <div style="display: flex;">
        <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll">全选
        </Checkbox>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
            <div v-for="key in boxKeys" :key="key">
                <Checkbox :label="key">{{boxs[key].text}}</Checkbox>
                <InputNumber :min="1" :max="boxs[key].stop"
                             v-model="boxs[key].start"
                             size="small" ></InputNumber>
                -
                <InputNumber :max="30" :min="1"
                             v-model="boxs[key].stop"
                             size="small"></InputNumber>
            </div>

        </CheckboxGroup>
    </div>
</template>

<script>
    export default {
        name: "ADLocation",
        data() {
            return {
                indeterminate: false,
                checkAll: true,
                checkAllGroup: [],
                boxs: {
                    shou: {
                        text: '首页',
                        start: 1,
                        stop: 16
                    },
                    lie: {
                        text: '列表页',
                        start: 1,
                        stop: 9
                    },
                    nei: {
                        text: '内容页',
                        start: 1,
                        stop: 26
                    }
                }
            }
        },
        computed: {
            boxKeys() {
                return Object.keys(this.boxs);
            }
        },
        watch: {
            checkAllGroup(nVal) {
                let arr = [];
                nVal.forEach(key => {
                    if (this.boxs[key].start &&  this.boxs[key].stop) {
                        arr.push(this.boxs[key]);
                    }
                });

                this.$emit('input', arr);
            }
        },
        methods: {
            handleCheckAll() {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = Object.keys(this.boxs);
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

            }
        },
        created() {

            this.checkAllGroup = Object.keys(this.boxs);
        }
    }
</script>

<style scoped>

</style>