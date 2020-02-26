<template>
  <div class="fanghu">
    <img :src="bgImg" alt />
    <div class="btn" @click="tocheck()">立即查询</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgImg: "",
      link:'',
    };
  },
  methods: {
    getdata() {
      this.axios.get(this.$urls.url_chaxun).then(({ data }) => {
        if (data) {
          this.bgImg = data.topimage;
          this.link = data.link;
        }
      });
    },
    tocheck(){
      // window.location.href=this.link;
      window.location.href = 'https://h5.peopleapp.com/txcx/index.html?from=singlemessage&isappinstalled=0'
    }
  },
  mounted() {
    this.getdata();
  }
};
</script>

<style lan='scss' scoped>
.fanghu {
  width: 100vw;
  height: 93vh;
}
.fanghu img {
  width: 100%;
  height: 100%;
}
.btn {
  width: 340px;
  height: 45px;
  background: #66cbe6;
  border-radius: 999999px;
  text-align: center;
  line-height: 45px;
  color: #fff;
  font-size: 14px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  margin-left: -170px;
}
</style>