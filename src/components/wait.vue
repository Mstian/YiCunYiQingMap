<template>
  <div class="wait">
    <div class="trans">
        <img src="../assets/rotate.png" alt="">
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.wait {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999999999999;
}
.trans {
  display: inline-block;
  width: 50px;
  height: 50px;
  /* border:1px solid red; */
  border-radius: 50%;
  overflow: hidden;
  animation: rotate 3s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -25px;
  margin-left: -25px;
}
.trans img{
    width: 100%;
    height: 100%;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>