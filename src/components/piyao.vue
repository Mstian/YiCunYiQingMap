<template>
  <div class="piyao">
    <banner v-if="bannerSrc.length > 0" :src="bannerSrc" />
    <div class="main">
      <div v-for="(item,index) in piyao_data" :key="index" class="list">
        <div v-if="item.right == 0" class="icon">
          <img src="../assets/true.png" alt />
        </div>
        <div v-if="item.right == 1" class="icon">
          <img src="../assets/false.png" alt />
        </div>
        <div class="title">{{item.title}}</div>
        <div class="content" v-html="item.content"></div>
      </div>
      <load v-if="piyao_data.length > 0" @click.native="loadMore()" />
    </div>
  </div>
</template>

<script>
import banner from "../components/banner";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      page: 1,
      bannerSrc: "",
      piyao_data: []
    };
  },
  methods: {
    loadMore() {
      //加载更多
      this.page++;
      this.getdata(this.page);
    },
    getdata(pageindex = this.page) {
      this.axios
        .post(this.$urls.url_piyao, this.$qs.stringify({ page: pageindex }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(({ data }) => {
          if (data) {
            // console.log(data)
            this.bannerSrc = data.topimage;
            if (data.lists.length <= 0) {
              Toast({
                message: "暂无更多...",
                position: "bottom",
                duration: 2000
              });
              return;
            }
            this.piyao_data = this.piyao_data.concat(data.lists);
          }
        });
    }
  },
  mounted() {
    this.getdata(this.page);
  },
  components: {
    banner
  }
};
</script>

<style lan='scss' scoped>
.main {
  padding: 10px 15px;
  background: #f8f8f8;
}
.list {
  position: relative;
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  text-align: left;
  margin-bottom: 10px;
}
.list .title {
  font-size: 18px;
  color: #181818;
  width: 262px;
  margin-top: 20px;
}
.content {
  font-size: 14px;
  color: #515151;
  margin-top: 30px;
}
.list .icon {
  width: 80px;
  height: 80px;
  position: absolute;
  top: 0px;
  right: 0;
}
.list .icon img {
  width: 100%;
  height: 100%;
}
</style>