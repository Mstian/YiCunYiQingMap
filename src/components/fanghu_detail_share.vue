<template>
  <div class="fanghu_detail">
    <div class="downbar">
      <div class="head_logo">
        <img src="http://device.ybhealth.com/toutiao/share/static/img/logo.62d15a6.png" alt />
      </div>
      <div class="openApp" @click="opApp()">打开</div>
    </div>
    <div class="main">
      <div class="title">{{detail_data.title}}</div>
      <div class="author">
        <div class="left">
          <img :src="detail_data.userImg" alt />
        </div>
        <div class="right" @click="share()">
          <div class="author_name">{{detail_data.source}}</div>
          <div class="uptime">{{detail_data.update_time}}</div>
        </div>
      </div>
      <div id="content" class="content" v-html="detail_data.content"></div>
    </div>
  </div>
</template>

<script>
// import
export default {
  // props:['detail_data'],
  data() {
    return {
      detail_data: {}
    };
  },
  methods: {
    setImgSize() {},
    opApp() {
      window.location.href = "http://download.ybhealth.com/app/index.html";
    },
    share() {},
    getdata(id) {
      this.axios
        .post(this.$urls.url_protect_detail, this.$qs.stringify({ id: id }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(({ data }) => {
          if (data) {
            console.log(data, "share");

            const regex = new RegExp("<img", "gi");
            data.content = data.content.replace(
              regex,
              `<img style="max-width: 100%; height: auto"`
            );
            this.detail_data = data;
          }
          //   console.log(data,'123');
        });
    }
  },
  updated() {
    // console.log(this.$store.state.detailData,'111');
    // this.detail_data = this.$store.state.detailData;
  },
  mounted() {
    const id = this.$route.query.id;
    this.getdata(id);
  }
};
</script>

<style lan='scss' scoped>
* {
  padding: 0;
  margin: 0;
}
.fanghu_detail {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999999999;
  background: #fff;
  overflow-y: scroll;
}
.main {
  padding: 15px;
  text-align: left;
  margin-top: 56px;
}
.title {
  font-size: 22px;
  font-weight: 500;
  color: #333;
}
.header {
  box-sizing: border-box;
  display: flex;
  padding: 0 15px;
  height: 69px;
  background: #fff;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  position: fixed;
  width: 100%;
}
.header div {
  height: 17px;
}
.header div img {
  height: 100%;
}
.author {
  /* height: 36px; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 0;
}
.author .right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
}
.author_name {
  font-size: 14px;
  color: #333;
}
.uptime {
  font-size: 12px;
  color: #666;
}
.left {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
}
.left img {
  width: 100%;
  height: 100%;
}
.content {
  color: #333;
  font-size: 17px;
  text-align: justify;
  line-height: 25px;
}
.downbar {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background: #fff;
  padding: 0 15px;
  height: 60px;
  box-shadow: 0 0.4vw 0.933vw rgba(119, 119, 119, 0.35);
  position: fixed;
  top: 0;
  left: 0;
}
.head_logo {
  height: 9.867vw;
}
.head_logo img {
  /* width: 100%; */
  height: 100%;
}
.openApp {
  width: 20.8vw;
  height: 7.4vw;
  background: #68dbed;
  border-radius: 9999px;
  font-size: 3.7vw;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content img {
  width: 100%;
}
#content img {
  width: 100%;
}
</style>