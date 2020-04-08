<template>
    <div>
        <button @click="send()">dafdfa</button>
    </div>
</template>

<script>
    export default {
        name: "ADGenerate",
        data(){
            return {
                ws:null,

            }
        },
        methods:{
            send(){
                let obj = {func:'whj'};
                this.ws.send(JSON.stringify(obj));

            }
        },
        created() {
            this.ws = new WebSocket('ws://localhost:8765');
            this.ws.onopen = () =>{

            };
            this.ws.onmessage = function (ev) {
                let obj = JSON.parse(ev.data);
            };
            this.ws.onclose = function (ev) {
                console.log(ev);
            };
            this.ws.onerror = function (ev) {
                console.log(ev);
            };
        },
        destroyed() {
            this.ws.close();
        }
    }
</script>

<style scoped>

</style>