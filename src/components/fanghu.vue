<template>
  <div class="fanghu">
    <div>
      <banner v-if="bannerSrc.length > 0" :src="bannerSrc" />
      <div class="main">
        <div
          class="list"
          v-for="(item,index) in fanghu_data"
          :key="index"
          @click="jumptodetail(item)"
        >
          <div class="left_list">
            <div class="title_list">{{item.title}}</div>
            <div class="from">{{item.source ? item.source : ''}}</div>
          </div>
          <div class="right_list">
            <img :src="item.image" alt />
          </div>
        </div>
        <load v-if="fanghu_data.length > 0" @click.native="loadMore()" />
      </div>
    </div>
  </div>
</template>
<script>
import banner from "./banner";
import { Toast } from "mint-ui";
import detail from '../components/fanghu_detail';
import {isShare} from '../utils/tools';
export default {
  data() {
    return {
      bannerSrc: "",
      fanghu_data: [],
      page: 1,
      detail_data: {},
    };
  },
  methods: {
    jumptodetail(item) {
      if(isShare){
         window.location.href = 'http://toutiao.ybhealth.com/yiqing_share/index.html#/fanghushare/?id='+item.id
      }else{
        this.$store.dispatch('patch_change_detail',item);
      }
    },
    loadMore() {
      this.page++;
      this.getdata(this.page);
      //加载更多
    },
    getdata(pageindex = this.page) {
      this.axios
        .post(this.$urls.url_fanghu, this.$qs.stringify({ page: pageindex }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(({ data }) => {
          if (data) {
            this.bannerSrc = data.topimage;
            if (data.lists.length <= 0) {
              Toast({
                message: "暂无更多...",
                position: "bottom",
                duration: 2000
              });
              return;
            }
            this.fanghu_data = this.fanghu_data.concat(data.lists);
          }
        });
    }
  },
  mounted() {
    this.getdata(this.page);
  },
  components: {
    banner,
    detail
  }
};
</script>

<style lan="scss" scoped>
.main {
  padding: 15px;
  background: #fff;
  text-align: left;
}
.list {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 75px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 10px;
}
.left_list {
  width: 205px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
.from {
  font-size: 12px;
  color: #999;
}
.title_list {
  font-size: 14px;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.right_list {
  width: 115px;
  background: pink;
  height: 100%;
}
.right_list img {
  width: 100%;
  height: 100%;
}
.fanghu_content {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #eee;
}
* {
  padding: 0;
  margin: 0;
}
.main {
  padding: 15px;
  text-align: left;
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
}
.header div {
  height: 17px;
}
.header div img {
  height: 100%;
}
.author {
  height: 36px;
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
  font-size: 16px;
  text-align: justify;
  line-height: 25px;
}
</style>