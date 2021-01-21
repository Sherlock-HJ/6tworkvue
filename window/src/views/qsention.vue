<template>
    <div>
        <div>d</div>
        <div v-for="item in datas"  :key="item.iCode">
            <Checkbox v-if="item.dType === 'radio'"  v-model="item.isValue" >{{item.iName}}</Checkbox>
            <Select v-if="item.dType === 'select'" v-model="item.isValue" style="width: 150px" :placeholder="item.iName">
                <Option v-for="obj in item.codeDesc" :key="obj.value" :value ="obj.value">{{obj.desc}}</Option>
            </Select>
        </div>
        <Button @click="log">打印</Button>
    </div>
</template>

<script>
    export default {
        name: "qsention",
        data() {
            return {
                group1: {
                    node: "select",
                    attr: {},
                    childs: [
                        {
                            node: "radio",
                            attr: {q:"万象天引"},
                            childs: [

                            ]
                        },
                        {
                            node: "树界降诞",
                            attr: {},
                            childs: [

                            ]
                        },
                        {
                            node: "须佐能乎",
                            attr: {},
                            childs: [

                            ]
                        }
                    ]

                }
            }
        },
        computed:{
            datas(){
                return this.itemsForGroups([this.group1]);
            }
        },
        methods:{
            itemsForGroups(groups){
                let items = [];

                groups.forEach((group)=>{
                    items = items.concat(group.item);
                    items = items.concat(this.itemsForGroups(group.childGroup));
                });
                return items;
            },
            log(){
                console.log(this.group1);
            }
        }
    }
</script>

<style scoped>

</style>