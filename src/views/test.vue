<template>
    <div>
        <Table :columns="columns" :data="datas">

            <template slot-scope="{ index,column,row }" slot="code">
                <Input placeholder="将要修改的 HTML代码"
                       type="textarea"
                       @on-change="datas[index][column.slot] = row[column.slot]"
                       v-model="row.code"/>
            </template>
<!--            <template slot-scope="{ row }" slot="ecode">-->
<!--                <Input placeholder="过期的 HTML代码"-->
<!--                       type="textarea"-->
<!--                       v-model="row.ecode"/>-->
<!--            </template>-->

        </Table>
        <Button @click="submit">提交</Button>
    </div>


</template>

<script>
    export default {
        name: "test",
        data(){
            return{
                columns:[
                    {
                        slot: 'code'
                    },
                    {
                        render: (h, params,obj) => {
                            return h('div',[
                                h('Input',{
                                    props: {
                                        placeholder: '过期的 HTML代码',
                                        type: 'textarea',

                                    },
                                    on:{
                                        input:(value)=>{
                                            console.log(value);
                                            console.log(params);

                                            this.datas[params.index].ecode = value;
                                        }
                                    }
                                })
                            ]);
                        }
                    }
                ],
                datas:[
                    {code:'123',ecode:'56'}
                    ]
            }
        },
        methods:{
            submit(){
                console.log(JSON.stringify(this.datas));
            },
            codeChange(i,k,v){
                console.log(k);

                this.datas[i][k] = v;

            }
        }
    }
</script>

<style scoped>

</style>