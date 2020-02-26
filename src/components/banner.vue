<template>
  <div class="banner" :style='bg'>
  </div>
</template>

<script>

export default {
    props:['src'],
    data(){
        return{
            bg:{
                backgroundImage:`url(${this.src})`,
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat'
            }
        }
    },
    methods:{

    },
    mounted(){

    }
}
</script>

<style lan='scss' scoped>
.banner{
    width: 100%;
    height: 130px;
    padding: 0 1px;
    box-sizing: border-box;
}
.banner img{
    width: 100%;
    height: 130px;
}
</style>