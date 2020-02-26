<template>
  <div class="share_btn" @click="toShare()">
    <div class="icon">
      <img src="../assets/fenxiang.png" alt />
    </div>
    <div class="txt">{{txt}}</div>
  </div>
</template>

<script>
import { isShare } from "../utils/tools";
export default {
  props: ["txt", "shareMsg"],
  data() {
    return {};
  },
  methods: {
    toShare() {
    //   console.log(this.shareMsg);
      var shareMsg = this.shareMsg;
      if (!isShare) {
        var u = navigator.userAgent;
          if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
            AndroidJs.toShare(
              shareMsg.title,
              shareMsg.desc,
              shareMsg.link,
              "http://newyibangshop.oss-cn-beijing.aliyuncs.com/images/202002/thumb_img/3470_thumb_P_1580864691314.jpg",
              "650"
            );
          } else if (u.indexOf("iPhone") > -1) {
            window.webkit.messageHandlers.toTopNewShare.postMessage({
              title: shareMsg.title,
              desc: shareMsg.desc,
              link: shareMsg.link,
              pic:"https://ae01.alicdn.com/kf/H73183f051fd64c01912a38cce16f5156L.png",
              cid: "650"
            });
          }
      }else{
          this.$store.dispatch('patch_change_mask');
      }
     
    }
  },
  mounted() {
    // console.log(this.txt);
  }
};
</script>

<style lan='scss' scoped>
.share_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #fff;
  padding: 13px 21px;
  border-radius: 9999999px;
  background-image: linear-gradient(to right, #66cbe6, #87def5);
  position: absolute;
  bottom: 80px;
  right: 15px;
  z-index: 90;
}
.icon {
  margin-right: 5px;
  width: 16px;
  height: 16px;
}
.icon img {
  width: 100%;
  height: 100%;
}
</style>