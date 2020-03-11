<template>
  <div v-if="$store.state.detailShow" class="fanghu_detail">
    <div class="header">
      <div @click="back()">
        <img src="../assets/header_back.png" alt />
      </div>
      <!-- <div><img src="../assets/header_name.png" alt=""></div> -->
      <div></div>
      <div @click="openShare()">
        <img src="../assets/header_share.png" alt />
      </div>
      <!-- <div></div> -->
    </div>
    <div class="main">
      <div class="title">{{detail_data.title}}</div>
      <div class="author">
        <div class="left">
          <img :src="detail_data.userImg" alt />
        </div>
        <div class="right" @click="share()">
          <div class="author_name">{{detail_data.userUsername}}</div>
          <div class="uptime">{{detail_data.update_time}}</div>
        </div>
      </div>
      <div class="content" v-html="detail_data.content"></div>
    </div>
  </div>
</template>

<script>
 const regex = new RegExp("<img", "gi");
export default {
  // props:['detail_data'],
  data() {
    return {
      detail_data: {},
    };
  },
  methods: {
    back() {
      var _this = this;
      setTimeout(()=>{
        _this.detail_data = {};
      },500)
      this.$store.dispatch("patch_change_detail");
    },
    share() {},
    openShare() {
      var id = this.detail_data.id;
      var u = navigator.userAgent;
      if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        AndroidJs.toShare(
          "个人疫情防护信息",
          "个人如何避免感染疫情，及时分享，掌握科学防疫知识。",
          "http://toutiao.ybhealth.com/yiqing_share/index.html#/fanghushare/?id=" +
            id,
          "http://newyibangshop.oss-cn-beijing.aliyuncs.com/images/202002/thumb_img/3470_thumb_P_1580864691314.jpg",
          "650"
        );
      } else if (u.indexOf("iPhone") > -1) {
        window.webkit.messageHandlers.toTopNewShare.postMessage({
          title: "个人疫情防护信息",
          desc: "个人如何避免感染疫情，及时分享，掌握科学防疫知识。",
          link:
            "http://toutiao.ybhealth.com/yiqing_share/index.html#/fanghushare/?id=" +
            id,
          pic:
            "https://ae01.alicdn.com/kf/H73183f051fd64c01912a38cce16f5156L.png",
          cid: "650"
        });
      }
    }
  },
  updated() {
    // console.log(this.$store.state.detailData,'111');
    var datas = this.$store.state.detailData;
    this.axios
        .post(this.$urls.url_protect_detail, this.$qs.stringify({ id: datas.id }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(({ data }) => {
          if (data) {
            const regex = new RegExp("<img", "gi");
            data.content = data.content.replace(
              regex,
              `<img style="max-width: 100%; height: auto"`
            );
            this.detail_data = data;
          }
        });
    },
  mounted() {},
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
  margin-top: 69px;
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
.content img {
  width: 100%;
}
</style>