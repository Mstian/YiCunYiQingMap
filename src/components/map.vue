<template>
  <div class="map" v-cloak>
    <banner :src="bannerSrc" />
    <div class="main">
      <div class="count">
        <div class="datebar">
          <div>截至{{updateTime(countryCount.modifyTime)}}</div>
          <div @click="opendialog()">
            <span>
              <img src="../assets/shuoming.png" alt />
            </span>
            <span>数据说明</span>
          </div>
        </div>
        <div class="count_detail">
          <div>
            <div class="count_num confirm_color">{{countryCount.confirmedCount}}</div>
            <div class="count_title">确诊人数</div>
            <div class="count_add">
              <span>昨日</span>
              <span class="confirm_color">+{{countryCount.confirmedIncr}}</span>
            </div>
          </div>
          <div>
            <div class="count_num suspect_color">{{countryCount.suspectedCount}}</div>
            <div class="count_title">疑似病例</div>
            <div class="count_add">
              <span>昨日</span>
              <span class="suspect_color">+{{countryCount.suspectedIncr}}</span>
            </div>
          </div>
          <div>
            <div class="count_num dead_color">{{countryCount.deadCount}}</div>
            <div class="count_title">死亡人数</div>
            <div class="count_add">
              <span>昨日</span>
              <span class="dead_color">+{{countryCount.deadIncr}}</span>
            </div>
          </div>
          <div>
            <div class="count_num cure_color">{{countryCount.curedCount}}</div>
            <div class="count_title">治愈人数</div>
            <div class="count_add">
              <span>昨日</span>
              <span class="cure_color">+{{countryCount.curedIncr}}</span>
            </div>
          </div>
        </div>
        <div class="wholeMap">
          <div class="wholeMap_title">全国疫情地图</div>
          <div id="map_content" style="width: 100%;height:340px; position: relative;"></div>
          <div class="data_from">以上数字均来自官方通报</div>
          <div class="data_click">点击省份可查看病例数</div>
        </div>
        <div class="linecharts">
          <!-- <div class="linecharts_title">全国疫情趋势图</div> -->
          <div id="tendays" style="width: 100%;height: 400px;"></div>
        </div>
      </div>
      <div class="province_data">
        <div class="country_yiqing_title">国内省市疫情</div>
        <div class="instrustion">7点-11点是数据发布高峰期，更新如有滞后敬请谅解。</div>
        <div class="instruction_bar">
          <div class="area_guard">地区</div>
          <div class="add_guard">新增确诊</div>
          <div class="total_guard">累计确诊</div>
          <div class="dead_guard">死亡</div>
          <div class="cure_guard">治愈</div>
        </div>
        <el-menu
          v-if="province_data.length > 0"
          class="el-menu-vertical-demo"
          background-color="#eee"
          :default-active="defaultMenuIndex"
          :defaultOpeneds="defaultMenuArray"
        >
          <el-submenu
            v-for="(item,index_i) in province_data"
            :key="item.locationId"
            :index="index_i.toString()"
          >
            <template slot="title">
              <div class="region_detail">
                <div class="region_name">{{item.provinceShortName}}</div>
                <div class="add_guard">{{item.confirmedIncr}}</div>
                <div>{{item.confirmedCount}}</div>
                <div>{{item.deadCount}}</div>
                <div>{{item.curedCount}}</div>
              </div>
            </template>
            <el-menu-item-group>
              <div
                v-for="(item_city,index_city) in item.cities"
                :key="index_city"
                class="region_child"
              >
                <div>{{item_city.cityName}}</div>
                <div class="add_guard">{{item_city.confirmedIncr}}</div>
                <div>{{item_city.confirmedCount}}</div>
                <div>{{item_city.deadCount}}</div>
                <div>{{item_city.curedCount}}</div>
              </div>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="forien_yiqin">
        <div class="for_top">
          <div class="for_tip">国外疫情</div>
          <div
            class="for_confirm"
          >确诊{{world_data.confirmedCount}}例，死亡{{world_data.deadCount}}例，治愈{{world_data.curedCount}}例</div>
        </div>
        <div class="cate">
          <div class="gray">地区</div>
          <div class="gray">累计确诊</div>
          <div class="dead_color">死亡</div>
          <div class="cure_color">治愈</div>
        </div>
        <div class="for_rigion" v-for="(item,index) in world_data.lists" :key="index">
          <div class="for_name">{{item.provinceName}}</div>
          <div class="gray">{{item.confirmedCount}}</div>
          <div class="gray">{{item.deadCount}}</div>
          <div class="gray">{{item.curedCount}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import banner from "../components/banner";
import "../../node_modules/echarts/map/js/china.js"; // 引入中国地图数据
import { formatDate } from "../utils/tools";
import { isShare } from "../utils/tools";
export default {
  data() {
    return {
      defaultMenuIndex: "0",
      countryCount: {},
      province_data: [],
      world_data: [],
      defaultMenuArray: ["0"],
      bannerSrc:
        "https://ae01.alicdn.com/kf/Hcfe9982116714a2c81c03639278af6d1R.png"
    };
  },
  components: {
    banner
  },
  methods: {
    updateTime(timestamp) {
      return formatDate(timestamp);
    },
    opendialog() {
      this.$store.dispatch("patch_changetoast");
    },
    //定位
    getRegion() {
      // console.log(BMap);
      if (isShare) {
        //分享h5定位
        var geolocation = new BMap.Geolocation();
        var _this = this;
        geolocation.getCurrentPosition(function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var lat = r.address.lat; //当前经度
            var lng = r.address.lng; //当前纬度
            var province = r.address.province; //返回当前省份
            var city = r.address.city; //返回当前城市
            // _this.region = province;
            // console.log(province, "province");
            _this.getdata(province);
          }
        });
      } else {
        if(this.$route.query.province){
          this.getdata(this.$route.query.province);
        }else{
          this.getdata('湖北');
        }
        //app内原生定位
      }
    },
    //渲染地图
    setMap(mydata, province_index) {
      var mapContent = document.getElementById("map_content");
      mapContent.style.width=window.innerWidth - 30 +'px'
      var myChart = this.$echarts.init(mapContent);
      var optionMap = {
        backgroundColor: "#fff",
        tooltip: {
          trigger: "item",
          textStyle: {
            fontSize: 14
          },
          formatter: function(val) {
            return (
              "省份：" +
              val.data.name +
              "<br/>" +
              "确诊人数：" +
              val.data.value +
              "<br/>" +
              "死亡人数：" +
              val.data.deadCount
            );
          }
        },
        //左侧小导航图标
        visualMap: {
          show: true,
          left: 0,
          bottom: 0,
          pieces: [
            {
              gt: 1000
            },
            {
              min: 1,
              max: 9
            },
            {
              min: 10,
              max: 99
            },
            {
              min: 100,
              max: 499
            },
            {
              min: 500,
              max: 1000
            },
            {
              min: 1000,
              max: 5000
            }
          ],
          textStyle: {
            fontSize: 8
          },
          inverse: true,
          itemWidth: 20,
          itemHeight: 10,
          padding: 3,
          color: [
            "#79360d",
            "#b25014",
            "#e58221",
            "#ffab78",
            "#fbc9aa",
            "#fae3cf"
          ],
          formatter: function(value) {
            // console.log(value);
            if (value == 100) {
              return value + "-" + 499 + "人";
            } else if (value == 500) {
              return value + "-" + 999 + "人";
            } else if (value == 1000) {
              return value + "-" + 4999 + "人";
            } else if (value == 5000) {
              return "5000人以上";
            } else {
              return value + "-" + (value * 10 - 1) + "人";
            }
          }
        },
        geo: {
          show: true,
          roam: "false",
          center: [115.97, 29.71]
        },

        //配置属性
        series: [
          {
            name: "省份",
            type: "map",
            mapType: "china",
            roam: false,
            zoom: 1.2,

            label: {
              show: true,
              textStyle: {
                fontWeight: 400,
                fontSize: 20, //文字的字体大小
                color: "#000"
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  fontSize: 8
                }
              },
              emphasis: {
                areaColor: "#68dbed",
                borderColor: "#999",
                shadowColor: "rgba(0, 0, 0, 0.5)",
                shadowBlur: 10,
                label: {
                  show: true,
                  fontSize: 8
                }
              }
            },
            data: mydata //数据
          }
        ]
      };
      myChart.setOption(optionMap);
      myChart.dispatchAction({
        type: "showTip", // 根据 tooltip 的配置项显示提示框。
        seriesIndex: 0,
        dataIndex: province_index
      });
      myChart.on("mouseover", function(e) {
        if (e.dataIndex != province_index) {
          myChart.dispatchAction({
            type: "downplay", // 根据 tooltip 的配置项显示提示框。
            seriesIndex: 0,
            dataIndex: province_index
          });
        }
      });
   
    },
    //地图数据
    getdata(region) {
      // console.log(region, 333);
      if (!region) {
        region = "湖北省";
      }
      // console.log(region,'235')
      this.axios.get(this.$urls.url_map).then(data => {
        var data = data.data;
        var loc = region;
        // console.log(data);
        // console.log(loc, "444");
        //将本地数据放在最前面;
        var j = 0;
        if (isShare) {
          var localMap = data.find(i => {
            return i.provinceName == region;
          });
          var result = data.map(o => {
            return {
              name: o.provinceShortName,
              wholeName: o.provinceName,
              value: o.confirmedCount,
              deadCount: o.deadCount,
              selected: o.provinceName == loc ? true : false
            };
          });

          for (var i in result) {
            if (result[i].wholeName == loc) {
              j = i;
            }
          }
        } else {
          var localMap = data.find(i => {
            return i.provinceShortName == region;
          });
          var result = data.map(o => {
            return {
              name: o.provinceShortName,
              wholeName: o.provinceName,
              value: o.confirmedCount,
              deadCount: o.deadCount,
              selected: o.provinceShortName == loc ? true : false
            };
          });

          for (var i in result) {
            if (result[i].name == loc) {
              j = i;
            }
          }
        }
        var local_index = data.indexOf(localMap);
        data.splice(local_index, 1);
        data.unshift(localMap);
        this.province_data = data;
        this.setMap(result, j);
      });
    },
    //获取图表数据
    getchartsData() {
      this.axios.get(this.$urls.url_charts).then(data => {
        if (data != null && data != "" && data != undefined) {
          var value = data.data.tendays;
          this.drawLine(value);
        }
      });
    },
    //渲染图表
    drawLine(val) {
      // console.log(val, "289");
      // 基于准备好的dom，初始化echarts图表
      // var dates = getTendays();
      var dates = [];
      for (var i = 10; i > 0; i--) {
        var day = this.getDay(-i);
        dates.push(day);
      }
      var confirmedCount = [],
        suspectedCount = [],
        curedCount = [],
        deadCount = [];

      var tendays = val;

      for (var j in tendays) {
        confirmedCount.push(tendays[j].confirmedCount);
        suspectedCount.push(tendays[j].suspectedCount);
        curedCount.push(tendays[j].curedCount);
        deadCount.push(tendays[j].deadCount);
      }
      var getChartId = document.getElementById("tendays");
      getChartId.style.width=window.innerWidth -20 +'px'
      var myChart = this.$echarts.init(getChartId);
      var option = {
        title: {
          text: "全国疫情趋势图",
          textStyle: {
            fontWeight: 500,
            fontSize: 16
          }
        },
        color: ["#CA6935", "#E7A63F", "#7FBC7E", "#939494"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            label: {
              show: true
            },
            lineStyle: {
              type: "dotted",
              color: "#999"
            }
          },
          backgroundColor: "#ffffff",
          borderColor: "#eee",
          borderWidth: 1,
          padding: 10,
          textStyle: {
            color: "#000"
          },
          formatter: function(val) {
            return (
              "确诊：" +
              val[0].data +
              "<br/>" +
              "疑似：" +
              val[1].data +
              "<br/>" +
              "治愈：" +
              val[2].data +
              "<br/>" +
              "死亡：" +
              val[3].data +
              "<br/>"
            );
          }
        },
        legend: {
          x: "45px",
          y: "360px",
          data: [
            {
              name: "确诊",
              icon: "square",
              left: "15%"
            },
            {
              name: "疑似",
              icon: "square",
              left: "15%"
            },
            {
              name: "死亡",
              icon: "square",
              left: "15%"
            },
            {
              name: "治愈",
              icon: "square",
              left: "15%"
            }
          ]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "13%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: dates,
          splitLine: {
            show: false
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#999",
              fontSize: 12
            }
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#f0f0f0"],
              width: 1,
              type: "solid"
            }
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#666",
              fontSize: 12
            }
          }
        },
        series: [
          {
            name: "确诊",
            type: "line",
            data: confirmedCount
          },
          {
            name: "疑似",
            type: "line",
            data: suspectedCount
          },
          {
            name: "治愈",
            type: "line",
            data: curedCount
          },
          {
            name: "死亡",
            type: "line",
            data: deadCount
          }
        ]
      };

      // 为echarts对象加载数据
      myChart.setOption(option);
      
    },
    //坐标信息
    getDay(day) {
      var today = new Date();
      var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tMonth + "." + tDate;
    },
    doHandleMonth(month) {
      var m = month;
      if (month.toString().length == 1) {
        m = month;
      }
      return m;
    },
    //获取全国统计信息
    getCountryCount() {
      this.axios.get(this.$urls.url_count).then(({ data }) => {
        // console.log(data);
        if (data) {
          this.countryCount = data;
        }
      });
    },
    //获取世界数据
    getWorldCount() {
      this.axios.get(this.$urls.url_world).then(({ data }) => {
        if (data) {
          this.world_data = data;
        }
        // console.log(data);
      });
    },
    openMenu(index) {
      // console.log(index);
    }
  },
  mounted() {
    this.getRegion();
    this.getchartsData();
    this.getCountryCount();
    this.getWorldCount();
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
.main {
  padding: 20px 15px;
}
.count img {
  width: 10px;
  height: 10px;
  margin-right: 2px;
}
.datebar {
  display: flex;
  justify-content: space-between;
  color: #666;
  align-items: center;
}
.count_detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 20px;
}
.count_num {
  font-size: 22px;
  font-weight: bold;
}
.count_title {
  font-size: 13px;
  font-weight: 400;
  color: #0d0d0d;
  background: #f3f3f3;
  border-radius: 3px;
  padding: 2px 3px;
}
.count_add span:nth-child(1) {
  color: #8f8f8f;
  font-size: 12px;
}
.count_detail > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}
.confirm_color {
  color: #ca4b21;
}
.suspect_color {
  color: #ef8858;
}
.dead_color {
  color: #183045;
}
.cure_color {
  color: #64c2c1;
}
.wholeMap_title {
  font-size: 18px;
  color: #242424;
  font-weight: bold;
  text-align: left;
}
.data_from {
  text-align: left;
  font-size: 7px;
  color: #6d6d6d;
  margin: 3px 0;
}
.data_click {
  text-align: left;
  font-size: 10px;
  padding-bottom: 20px;
  color: #333333;
}
.linecharts {
  width: 100%;
}
.linecharts_title {
  font-size: 15px;
  color: #333;
  font-weight: 500;
  text-align: left;
  padding-top: 30px;
  border-top: 1px solid #eee;
}
.el-submenu__title {
  background: #eee !important;
}
.el-submenu__title.is-active {
  background: #fff !important;
}
.el-submenu.is-active .el-submenu__title {
  border-bottom: none;
}
.country_yiqing_title {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  text-align: left;
  padding: 20px 0 10px 0;
  border-top: 1px solid #eee;
}
.instrustion {
  font-size: 12px;
  color: #999999;
  text-align: left;
}
.instruction_bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 13px;
  width: 100%;
  height: 60px;
  background: #fff;
  box-sizing: border-box;
  padding-right: 20px;
}
.instruction_bar > div {
  width: 20%;
  text-align: center;
}
.area_guard {
  color: #333;
}
.add_guard {
  color: #ca6935;
}
.total_guard {
  color: #333;
}
.dead_guard {
  color: #a52727;
}
.cure_guard {
  color: #0b8148;
}
.region_detail {
  color: #333333;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.region_detail > div {
  width: 20%;
  text-align: center;
}
.region_name {
  font-size: 16px;
}
.el-submenu__title {
  padding-left: 0 !important;
}
.region_child {
  color: #333333;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 15px;
  padding-right: 20px;
  height: 60px;
  border-bottom: 1px solid #e8e8e8;
}
.region_child > div {
  width: 20%;
  text-align: center;
}
.el-menu-item-group {
  background: #fff;
}
.el-submenu {
  background: #fff !important;
  margin-bottom: 10px;
}
.el-menu {
  border-right: none;
  background: #fff !important;
}
.el-submenu__title {
  border-radius: 8px;
}
.el-menu-item-group__title {
  padding: 0;
}
.el-submenu .el-menu {
  background: #fff !important;
}
.for_tip {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  text-align: left;
  padding: 20px 0 10px 0;
  /* border-top: 1px solid #eee; */
  margin-right: 16px;
}
.for_top {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.for_confirm {
  color: #333333;
  font-size: 12px;
  padding: 20px 0 10px 0;
}
.forien_yiqin {
  /* margin-top: 20px; */
}
.gray {
  color: #333;
}
.dead_color {
  color: #a52727;
}
.cure_color {
  color: #0b8148;
}
.cate {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
}
.cate div {
  width: 20%;
  text-align: center;
}
.for_rigion {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  background: #eee;
  border-radius: 8px;
  margin: 5px 0px;
}
.for_rigion div {
  width: 25%;
  text-align: center;
  font-size: 13px;
}
.for_rigion .for_name {
  font-size: 14px;
  color: #333333;
  /* font-weight: bold; */
}
</style>