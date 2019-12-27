<template>

    <div  v-show="isShow">
        <div class="drop-down" @click="cancelAction">
        </div>
        <transition name="drop-down">
            <div class="frostedglass-inner" v-show="slide">

                <div v-for="(item,index) in datas" :key="index" class="cell" @click="didSelectRowAction(index,item)">
                   <div class="cnt">
                       <i class="ico " :class="item.img" ></i>
                       <p>{{item.title}}</p>
                   </div>
                    <div class="gray-line"></div>
                </div>


            </div>
        </transition>
    </div>

</template>

<script>
  export default {
    name: "drop-down",
    data() {
      return {
        isShow: false,
        slide: false,
        datas:[],
        sure: null,
        cancel: null
      }
    },
    watch: {
      isShow(newValue, oldValue) {
        if (newValue) {
          setTimeout(() => {
            this.slide = newValue;
          }, 1);
        }

      }
    },
    methods: {
      didSelectRowAction(index,item){

        if(this.sure){
          this.sure(index,item);
        }
        this.cancelAction();
      },
      showAction(obj){

        this.datas = obj.datas;

        if (obj.sure){
          this.sure = obj.sure;

        }
        if (obj.cancel){
          this.cancel = obj.cancel;

        }

        this.isShow = true;
      },
      cancelAction() {

        this.slide = false;

        setTimeout(() => {
          this.isShow = false;

        }, 200);

        if(this.cancel){
          this.cancel(1);
        }

      }
    },
    mounted() {


      // document.body.setAttribute('style','filter: blur(1px)');
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .drop-down-enter, .drop-down-leave-active
        transform: translate(0, -100%)

    .drop-down-enter-active, .drop-down-leave-active
        transition: transform .2s

    .drop-down
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: transparent;
        z-index: 1000;

    .frostedglass-inner
        position: absolute;
        top: 50px;
        right: 30px;
        width: 150px;
        background: white;
        z-index: 1000;
        box-shadow 0 0 5px #a1a1a1
        border-radius 3px
        border 1px solid #eeeeee
    .drop-down-bg
        filter: blur(5px);

    .cell:hover
        background-color #eeeeee
    .cell
        padding  0 14px
        .cnt
            display flex
            align-items center
            .ico
                color  $color-secondary
                padding 14px 0
            p
                color $color-main
                margin-left  14px
                white-space nowrap
                text-overflow  ellipsis
                overflow hidden
        .gray-line
            height 1px
            background-color #f2f2f2

</style>