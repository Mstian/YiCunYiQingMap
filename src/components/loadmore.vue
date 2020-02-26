<template>
  <div class="load">
      <img src="../assets/load.png" alt="">
      <div>点击查看更多</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lan='scss' scoped>
.load{
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
    padding: 10px 20px;
    border-radius: 99999px;
    background: #fff;
    width: 60%;
    margin: 0 auto;
    text-align: center;
    justify-content: center;
    box-shadow: 1px 1px #eee;
}
.load img{
    width: 14px;
    height: 14px;
    margin-right: 5px;
}
</style>