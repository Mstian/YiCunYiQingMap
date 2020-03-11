<template>
  <div>
    <wait v-if="isShare && showWait" />
    <toast />
    <sharemask />
    <sharebtn v-if="txt.length > 0" :txt="txt" :shareMsg="shareMsg" />
    <detail />
    <div class="top">
      <div v-if="isShare" class="downbar">
        <div class="head_logo">
          <img src="http://device.ybhealth.com/toutiao/share/static/img/logo.62d15a6.png" alt />
        </div>
        <div class="openApp" @click="opApp()">打开</div>
      </div>
      <tab
        :line-width="2"
        active-color="#66CBE6"
        default-color="#333"
        custom-bar-width="0px"
        v-model="index"
      >
        <tab-item class="vux-center" v-for="(item, index) in list2" :key="index">{{item.title}}</tab-item>
      </tab>
    </div>
    <div :class="['bot', isShare ? 'AddMargin' : '']">
      <swiper v-model="index" height="93vh" :show-dots="false" @on-index-change="changeIndex">
        <swiper-item>
          <ymap />
        </swiper-item>
        <swiper-item>
          <kepu />
        </swiper-item>
        <swiper-item>
          <piyao />
        </swiper-item>
        <swiper-item>
          <bobao />
        </swiper-item>
        <swiper-item>
          <fanghu />
        </swiper-item>
        <swiper-item>
          <chaxun />
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import wait from "../components/wait";
import ymap from "../components/map";
import kepu from "../components/kepu";
import piyao from "../components/piyao";
import bobao from "../components/bobao";
import fanghu from "../components/fanghu";
import chaxun from "../components/chaxun";
import toast from "../components/toast";
import { isShare } from "../utils/tools";
import detail from "../components/fanghu_detail";
import sharemask from "../components/sharemask";
export default {
  data() {
    return {
      shareMsg: {},
      list2: [
        "疫情地图",
        "疾病科普",
        "鉴真辟谣",
        "最新播报",
        "个人防护",
        "同城查询"
      ],
      index:0,
      txt: "",
      isShare: isShare,
      detailShow: false,
      showWait: true
    };
  },
  beforeMount() {
    if (isShare) {
      this.index = parseInt(this.$route.query.tabIndex);
    }
  },
  methods: {
    opApp() {
      window.location.href = "http://download.ybhealth.com/app/index.html";
    },
    changeIndex(index) {
      var link =
        "http://toutiao.ybhealth.com/yiqing_share/index.html#/?tabIndex=" + index;
      if (index == 0) {
        this.txt = "分享疫情实时数据";
        this.shareMsg = {
          title: "新型肺炎疫情实时更新",
          desc: "各地疫情现状一览。及时分享，了解各地疫情传播。",
          link: link,
          pic:
            "https://ae01.alicdn.com/kf/H73183f051fd64c01912a38cce16f5156L.png",
          cid: "650"
        };
      }
      if (index == 1) {
        this.txt = "分享疾病科普";
        this.shareMsg = {
          title: "科普在这！正确应对武汉新型肺炎",
          desc:
            "新型肺炎来势汹汹，和过去的疾病有何不同之处？我们应该如何做好防治工作？",
          link: link,
          pic:
            "https://ae01.alicdn.com/kf/H73183f051fd64c01912a38cce16f5156L.png",
          cid: "650"
        };
      }
      if (index == 2) {
        this.txt = "分享辟谣信息";
        this.shareMsg = {
          title: "辟谣！关于新冠肺炎，这些说法不可信。",
          desc: "不让谣言主力疫情，及时分享，识真断假科学防疫。",
          link: link,
          pic:
            "https://ae01.alicdn.com/kf/H73183f051fd64c01912a38cce16f5156L.png",
          cid: "650"
        };
      }
      if (index == 3) {
        this.txt = "分享疫情最新播报";
        this.shareMsg = {
          title: "最新肺炎疫情最新播报",
          desc: "追踪各地疫情动态。及时分享，掌握疫情传播过程。",
          link: link,
          pic:
            "https://ae01.alicdn.com/kf/H73183f051fd64c01912a38cce16f5156L.png",
          cid: "650"
        };
      }
      if (index == 4) {
        this.txt = "分享防护信息";
        this.shareMsg = {
          title: "个人疫情防护信息",
          desc: "个人如何避免感染疫情，及时分享，掌握科学防疫知识。",
          link: link,
          pic:
            "https://ae01.alicdn.com/kf/H73183f051fd64c01912a38cce16f5156L.png",
          cid: "650"
        };
      }
      if (index == 5) {
        this.txt = "分享同程查询";
        this.shareMsg = {
          title: "新型肺炎确诊患者相同行程查询工具",
          desc: "“新型肺炎患者同程查询系统”专注疫情信息服务。",
          link: link,
          pic:
            "https://ae01.alicdn.com/kf/H73183f051fd64c01912a38cce16f5156L.png",
          cid: "650"
        };
      }
    },
    getTabs() {
      this.axios.get(this.$urls.url_tabs).then(({ data }) => {
        if (data) {
          this.list2 = data;
          var mapitem = {
            title: "疫情地图"
          };
          this.list2.unshift(mapitem);
        }
      });
    },
    testIndex() {
      if(isShare){
        this.index = parseInt(this.$route.query.tabIndex);
      }
      var index = this.index;
      // console.log(index,'11111')
      var link =
        "http://toutiao.ybhealth.com/yiqing_share/index.html#/?tabIndex=" + index;
      if (index == 0) {
        this.txt = "分享疫情实时数据";
        this.shareMsg = {
          title: "新型肺炎疫情实时更新",
          desc: "各地疫情现状一览。及时分享，了解各地疫情传播。",
          link: link,
          pic:
            "https://ae01.alicdn.com/kf/H73183f051fd64c01912a38cce16f5156L.png",
          cid: "650"
        };
      }
      if (index == 1) {
        this.txt = "分享疾病科普";
        this.shareMsg = {
          title: "科普在这！正确应对武汉新型肺炎",
          desc:
            "新型肺炎来势汹汹，和过去的疾病有何不同之处？我们应该如何做好防治工作？",
          link: link,
          pic:
            "https://ae01.alicdn.com/kf/H73183f051fd64c01912a38cce16f5156L.png",
          cid: "650"
        };
      }
      if (index == 2) {
        this.txt = "分享辟谣信息";
        this.shareMsg = {
          title: "辟谣！关于新冠肺炎，这些说法不可信。",
          desc: "不让谣言主力疫情，及时分享，识真断假科学防疫。",
          link: link,
          pic:
            "https://ae01.alicdn.com/kf/H73183f051fd64c01912a38cce16f5156L.png",
          cid: "650"
        };
      }
      if (index == 3) {
        this.txt = "分享疫情最新播报";
        this.shareMsg = {
          title: "最新肺炎疫情最新播报",
          desc: "追踪各地疫情动态。及时分享，掌握疫情传播过程。",
          link: link,
          pic:
            "https://ae01.alicdn.com/kf/H73183f051fd64c01912a38cce16f5156L.png",
          cid: "650"
        };
      }
      if (index == 4) {
        this.txt = "分享防护信息";
        this.shareMsg = {
          title: "个人疫情防护信息",
          desc: "个人如何避免感染疫情，及时分享，掌握科学防疫知识。",
          link: link,
          pic:
            "https://ae01.alicdn.com/kf/H73183f051fd64c01912a38cce16f5156L.png",
          cid: "650"
        };
      }
      if (index == 5) {
        this.txt = "分享同程查询";
        this.shareMsg = {
          title: "新型肺炎确诊患者相同形成查询工具",
          desc: "“新型肺炎患者同程查询系统”专注疫情信息服务。",
          link: link,
          pic:
            "https://ae01.alicdn.com/kf/H73183f051fd64c01912a38cce16f5156L.png",
          cid: "650"
        };
      }
    }
  },
  components: {
    ymap,
    kepu,
    piyao,
    bobao,
    fanghu,
    chaxun,
    toast,
    detail,
    sharemask,
    wait
  },
  mounted() {
    this.getTabs();
    this.testIndex();
    var _this = this;
    setTimeout(() => {
      _this.showWait = false;
    }, 3000);
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
.top {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  /* background; */
  z-index: 99999;
}
.bot {
  padding-top: 44px;
}
.vux-slider > .vux-swiper > .vux-swiper-item {
  overflow-y: scroll;
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
.AddMargin {
  padding-top: 94px;
}
.scrollable .vux-tab-item {
  flex: 0 0 19%;
}
.vux-tab .vux-tab-item.vux-tab-selected {
  position: relative;
}
.vux-tab .vux-tab-item.vux-tab-selected::before {
  content: "";
  width: 30px;
  height: 2px;
  background: #68dbed;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -15px;
}
</style>