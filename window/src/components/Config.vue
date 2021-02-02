<template>
    <div>
        <input type="file" @change="changeFile($event)"></input>
        <Button @click="outClick" type="primary">导出</Button>
        <Button @click="delTableClick" type="primary">删除</Button>

        <Select v-model="platform">
            <Option v-for="item in platforms" :value="item.key">{{item.name}}</Option>
        </Select>
        <Input v-model="account">
            <span slot="prepend">账号</span>
        </Input>
        <Input v-model="pwd">
            <span slot="prepend">密码</span>
        </Input>
        <Button @click="addAccountClick" type="primary">添加</Button>

        <CellGroup>
            <Cell v-for="(item,idx) in accountShows" :title="item.account"
                  :label="item.pwd">
                <Button @click="delAccountClick(item)"
                        type="error"
                        size="small"
                        slot="extra">删除
                </Button>
            </Cell>
        </CellGroup>


    </div>
</template>

<script>
    import cache from "../lib/cache";

    export default {
        name: "Config",
        data() {
            return {
                pwd: '',
                account: '',
                platform: 'adnet',
                inTotal:0
            };
        },
        computed: {
            accounts: {
                get() {
                    return this.$store.state.config.accounts;
                },
                set(newValue) {
                    this.$store.commit('config/setAccounts', newValue);
                }
            },
            accountShows() {
                return this.accounts.filter((obj) => {
                    return obj.platform === this.platform;
                });
            },
            platforms() {
                return this.$store.state.config.platforms;
            }
        },
        methods: {
            delTableClick() {

                cache.delTable().then(resp => {
                    console.log(resp);
                });
            },
            outClick() {
                cache.outData().then(str => {
                    let a = document.createElement("a");
                    a.setAttribute('download', 'out.txt');
                    a.href = "data:text/plain," + str;
                    a.click();
                });
            },
            changeFile(e) {
                console.log(e.target.files[0]);
                let reader = new FileReader();
                reader.onloadend = () => {
                    let arr = reader.result.split('\n');
                    console.log('dsfa');
                    let num = 0;
                    let len = arr.length;
                    this.$Spin.show({
                        render: (h) => {
                            return h('div', [
                                    h('div', this.inTotal+"/"+len),
                                    h('div', '导入中...')
                                ]
                            )
                        }
                    });
                    arr.forEach(obj => {
                        cache.insertAdnet(obj.split(','), () => {
                            num++;
                            this.inTotal = num;
                            if (num === len) {
                                this.$Spin.hide();
                            }
                        });
                    });
                    console.log('dsfa1223');

                };
                reader.readAsText(e.target.files[0]);

            },
            delAccountClick(obj1) {
                this.accounts = this.accounts.filter((obj) => {
                    return obj1.id !== obj.id;
                });
            },
            addAccountClick() {
                let tmp = this.accounts.filter((obj) => {
                    return obj.account === this.account && obj.platform === this.platform;
                });
                if (tmp && tmp.length > 0) {
                    this.$Message.warning('账号已存在！');
                    return;
                }
                let len = this.accounts.length;
                let arr = [];
                arr.push({
                    pwd: this.pwd,
                    account: this.account,
                    platform: this.platform,
                    id: len + 1
                });
                this.accounts = arr.concat(this.accounts);
            }

        },
        created() {

        }
    }
</script>

<style scoped>

</style>