<template>
  <div id="app">
    <Vheader :seller="seller" :supportsClassMap="supportsClassMap" :index="index" />
    <SellerTabs />
    <!-- 一级路由显示放在这里 -->
    <router-view :seller="seller" :supportsClassMap="supportsClassMap"></router-view>
  </div>
</template>
<script>
// 引入组件
import SellerTabs from "./components/SellerTabs/SellerTabs";
import Vheader from "./components/v-header/Vheader";
export default {
  name: "App",
  data: () => ({
    seller: {},
    supportsClassMap: [
      "decrease",
      "discount",
      "special",
      "invoice",
      "guarantee",
    ],
    // 定义轮播图的索引值变量和定时器
    index:0,
    timer:null,
  }),
  methods: {
    // ES7
    async getSellerData() {
      try {
        let res = await this.axios("/api/seller");
        this.seller = res.data;
        // console.log(this.seller);
        this.startSlider(this.seller.supports);
      } catch (e) {
        console.error(e);
      }
    },

    // 轮播图逻辑
    startSlider(arr){
      // console.log(arr.length)
      // 获取商家优惠信息，优惠信息有两个以上才能轮播
      if(arr && arr.length>1){
        // this.timer = setInterval(function(){
        //   // 用function的写法导致this指向window对象，而使this找不到对象
        //   this.index ++;
        //   // 如果优惠轮播到底，就会返回第一章
        //   if(this.index>=arr.length){
        //     this.index =0;
        //   }
        //   console.log(this.index)
        // },1500);
        this.timer  = setInterval(() => {
          this.index ++;
          if(this.index>=arr.length){
            this.index =0;
          }
          // console.log(this.index)
        }, 1500);
      }
    }
  },
  components: {
    SellerTabs,
    Vheader,
  },
  mounted() {
    this.getSellerData();
  
  },
};
</script>
<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
</style>
