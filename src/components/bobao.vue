<template>
  <div class="bobao">
   <!-- <Toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="Hello World" position="bottom"></Toast> -->
   <banner v-if="bannerSrc.length > 0" :src="bannerSrc" />
    <div class="bobao_main">
        <div v-for="(item,index) in bobao_data " :key='index' class="content">
            <div class="line"></div>
            <div class="timeline">
                <img src="../assets/circle.png" alt="">
                <span class="timedata">{{item.update_time}}</span>
            </div>
            <div class="con_main">
                <div class="con_main_title">{{item.title}}</div>
                <div class="con_main_con" v-html="item.content"></div>
            </div>
            <div class="source" v-if="item.source">来源：{{item.source}}</div>
        </div>
        <load v-if="bobao_data.length > 0" @click.native="loadMore()"/>  
    </div>
  </div>
</template>

<script>
import banner from "../components/banner";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      bannerSrc: "",
      page:1,
      bobao_data:[],
      // showPositionValue:false,
    };
  },
  methods:{
    loadMore(){
      //加载更多
      this.page++;
      this.getdata(this.page);
    },
    getdata(pageindex = this.page){
      this.axios.post(this.$urls.url_bobao, this.$qs.stringify({page:pageindex}),{
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        }
      }).then(({data})=>{
        if(data){
        //   console.log(data)
          this.bannerSrc = data.topimage;
          if(data.lists.length <= 0){
            Toast({
              message: '暂无更多...',
              position: 'bottom',
              duration: 2000
            });
            return;
          }
          this.bobao_data = this.bobao_data.concat(data.lists);
        }
      })
    }
  },
  mounted(){
     this.getdata(); 
  },
  components: {
    banner,
  }
};
</script>

<style lan='scss' scoped>
.bobao_main{
    padding: 15px;
    text-align: left;
     /* display: flex;
    -ms-flex-wrap: wrap;
     flex-wrap: wrap; */
}
.timeline img{
    width: 15px;
    height: 15px;
}
.timeline{
    display: flex;
    justify-content: left;
    align-items: center;
}
.timedata{
    margin-left: 10px;
    font-size: 14px;
    color: #999999;
}
.content{
    position: relative;
    margin-bottom: 10px;
}
.con_main{
    background: #F8F8F8;
    padding: 20px 15px;
    border-radius: 5px;
    margin-left: 25px;
    margin-top: 10px;
}
.con_main .con_main_title{
    margin-bottom: 25px;
    font-size: 16px;
    color: #333333;
}
.con_main_con{
    font-size: 14px;
    color: #666;
    padding-bottom: 20px;
}
.line{
    width: 1px;
    background: #DBF7FF;
    height: 100%;
    position: absolute;
    left: 7px;
    top: 15px;
}
.source{
  position: absolute;
  right:13px;
  bottom:20px;
  color: #999999;
  font-size: 13px;
}
</style>