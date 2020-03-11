<template>
  <div class="pops" v-show="$store.state.toastShow">
      <div class="wrap_con">
        <div class="men_title">疫情地图数据说明</div>
        <div class="men_list">
          <ul>
            <li>
              <div class="men_p">1.数据来源：</div>
              <div class="men_d">来自国家卫健委、各省市区政府、官方渠道公开数据。</div>
            </li>
            <li>
              <div class="men_p">2.数据更新时间</div>
              <div class="men_d">国家卫健委及各省卫健委公布数据的发布时间和统计时间段各不相同，比如国家卫健委公布了最新全国数据，而各省还没有公布最新数据，故而会在部分时段出现国家总数不等于分等数据之和。</div>
            </li>
            <li>
              <div class="men_p">3.数据统计原则：</div>
              <div class="men_d">亿邦健康努力提供权威、准确、及时的疫情数据，如有任何疑问，欢迎通过亿邦健康APP留言反馈。</div>
            </li>
          </ul>
        </div>
        <div @click="closetoast()" class="close">我知道了</div>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    closetoast() {
      this.$store.dispatch('patch_changetoast')
    },
  }
}
</script>

<style>
.pops {
  position: fixed;
  z-index: 2001;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* opacity: 0.5; */
  background:rgba(0,0,0,.6);
}
.wrap_con{
  border-radius: 8px;
  overflow: hidden;
  text-align: left;
  padding: 10px 0;
  box-sizing: border-box;
  width: 300px;
  /* height: 420px; */
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -210px;
  margin-left: -150px;
}
.men_title {
			font-size: 19px;
			font-weight: 500;
			color: #333;
			text-align: center;
			margin: 10px 0;
		}

		.men_list {
			padding: 15px;
		}
    .men_list ul{
      margin-bottom: 25px;
    }

		.men_p {
			font-size: 15px;
			color: #333;
		}

		.men_d {
			font-size: 14px;
			color: #666;
		}

		.men_list {
			line-height: 24px;
		}

		.close {
			width: 100%;
			height: 45px;
			background: #66CBE6;
			font-size: 14px;
			color: #fff;
			text-align: center;
			line-height: 45px;
      position: absolute;
      bottom: 0;
      left: 0;
		}
</style>