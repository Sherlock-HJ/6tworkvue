<template>
    <div>
        <input type="file" @change="changeFile($event)"></input>
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
                platform: 'adnet'
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
            changeFile(e) {
                console.log(e.target.files[0]);
                let reader = new FileReader();
                reader.onloadend = () => {
                    let arr = reader.result.split('\n');
                    arr.forEach(obj => {
                        cache.cacheFile(obj.split(','));
                    });

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