<template>
  <div v-if='$store.state.maskShow' @click="changeMask()" class="share_mask">
      <img src=../assets/mask.png alt="">
  </div>
</template>

<script>
export default {
    methods:{
        changeMask(){
            this.$store.dispatch('patch_change_mask');
        }
    }
}
</script>

<style lan='scss' scoped>
.share_mask{
    width: 100vw;
    height:100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999;
}
.share_mask img{
    width: 100%;
    height: 100%;
}
</style>