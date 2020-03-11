<template>
  <div class="kepu">
    <banner v-if="bannerSrc.length > 0" :src="bannerSrc" />
    <div class="main">
      <div class="keputitle">
          <img src="../assets/keputitle.png" alt="">
      </div>
      <div v-for="(item,index) in kepu_data" :key='index' class="content">
          <div class="con_title">{{item.title}}</div>
          <div v-html="item.content" class="list">
          </div>
      </div>
      <load v-if='kepu_data.length > 0' @click.native="loadMore()"/>  
    </div>
  </div>
</template>

<script>
import banner from "../components/banner";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      page:1,
      kepu_data:[],
      bannerSrc:'',
    };
  },
  components: {
    banner,
  },
  methods:{
    loadMore(){
      this.page++;
     //加载更多逻辑，需后台协助
     this.getdata(this.page);
    },
    getdata(pageindex = this.page){
      this.axios.post(this.$urls.url_kepu, this.$qs.stringify({page:pageindex}),{
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        }
      }).then(({data})=>{
        if(data){
          this.bannerSrc = data.topimage;
          if(data.lists.length <=0 ){
            Toast({
              message: '暂无更多...',
              position: 'bottom',
              duration: 2000
            });
            return 
          }
          this.kepu_data = this.kepu_data.concat(data.lists);
        }
      })
    }
  },
  mounted(){
    this.getdata();
  }
};
</script>

<style lan='scss' scoped>
.main{
    background: #F8F8F8;
    padding: 15px;
    /* font-family: "微软雅黑" */
}
.keputitle{
    width: 275px;
    height: 19px;
    margin: 15px auto;
}
.keputitle img{
    width: 100%;
    height: 100%;
}
.content{
    background: #fff;
    padding:15px 20px;
    text-align: left;
    margin-bottom: 15px;
    border-radius: 5px;
}
.con_title{
    color: #66CBE6;
    font-size: 16px;
    font-weight: 500;
    padding-bottom: 15px;
    border-bottom: 1px solid #66CBE6;
}
.list{
  font-size: 14px;
  line-height: 24px;
  margin-top: 15px;
}
.list div{
    font-size: 13px;
    color:#333333;
    margin: 10px 0;
    line-height: 18px;
}
</style>