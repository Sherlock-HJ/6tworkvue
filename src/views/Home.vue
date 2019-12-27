<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">

    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'home',

        methods:{
            login(){
                let params = {r:'Wap/Login/Login'};
                let  json={"username": "zxw", "wapcode": "", "password": "2e1f17104fbb36b97b96229daeb4251c"};

                this.$api.post('/api',json,{params}).then(resp=>{
                    console.log(resp);
                });
            }
        },
        created(){
            alert('dfd123');

            this.login();
        }
    }
</script>
