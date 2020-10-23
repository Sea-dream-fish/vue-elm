<template>
  <div class="el-goods">
    <div class="goods-wrapper">
      <!-- 左边菜单模块 -->
      <div class="goods-menu" ref="menu">
        <div>
          <div
            class="menu-item"
            v-for="(g,index) in goods"
            :key="index"
            :class="{active:currentIndex ==index}"
            @click="scrollToCurrentGoods(index)"
          >
            <div class="item-cell">
              <span class="icon" v-if="g.type >= 0" :class="supportsClassMap[g.type]"></span>
              <span class="menu-name">{{g.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 右边菜式模块 -->
      <div class="goods-list" ref="goodsList">
        <div>
          <div class="goods-item" ref="gooditems" v-for="(g,index) in goods" :key="index">
            <h2 class="goods-subtitle">{{g.name}}</h2>
            <!-- 具体食物内容 -->
            <div class="food-wrapper">
              <div class="food-container" v-for="(f,i) in g.foods" :key="i">
                <img :src="f.icon" alt="商品图片" height="57px" width="57px" @click="lookGoods(f)" />
                <div class="food-content" @click="lookGoods(f)">
                  <div class="name">{{f.name}}</div>
                  <div class="food-desc" v-show="f.description">{{f.description}}</div>
                  <div class="food-rating">
                    <span class="left">月售{{f.sellCount}}</span>
                    好评率{{f.rating}}%
                  </div>
                  <div class="food-price">
                    ￥{{f.price}}
                    <span class="old-price" v-show="f.oldPrice">￥{{f.oldPrice}}</span>

                    <!-- <div class="food-circle">
                      <span class="icon-remove_circle_outline"></span>
                      <span class="number">2</span>
                      <span class="icon-add_circle"></span>
                    </div>-->
                  </div>
                </div>
                <div class="btn-wrapper">
                  <BtnComctol
                    :count="f.count"
                    :Fname="g.name"
                    :name="f.name"
                    @add="addFood"
                    @dex="decFood"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 购物车 -->
      <ShopCar
        @add="addFood"
        @dex="decFood"
        @emptyGoods="emptyFgoods"
        :shopCartList="shopCartList"
        :seller="seller"
      />
    </div>
    <div class="detail">
      <FoodDetail v-show="showFoods" :goodsData="foodsData" />
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import BtnComctol from "../components/BtnComctol/BtnComctol";
import ShopCar from "../components/ShopCar/ShopCart";
import FoodDetail from "../components/FoodDetail/FoodDetail";
export default {
  name: "GoodsView",
  props: ["supportsClassMap", "seller"],
  data: () => ({
    goods: [],
    currentIndex: 0,
    gooditemsHeightArr: [0],
    foodsData: [],
    showFoods: false,
  }),
  methods: {
    lookGoods(obj) {
      this.foodsData = obj;
      console.log(this.foodsData);
      this.showFoods = true;
    },
    // 点击按钮添加食物
    addFood(obj) {
      this.goods.forEach((item) => {
        item.foods.forEach((food) => {
          if (item.name == obj.Fname) {
            if (food.name === obj.name) {
              this.$set(food, "count", obj.num);
            }
          }
        });
      });
    },
    // 减少食物数量
    decFood(obj) {
      this.goods.forEach((item) => {
        item.foods.forEach((food) => {
          if (item.name == obj.Fname) {
            if (food.name === obj.name) {
              food.count = obj.num;
            }
          }
        });
      });
    },

    emptyFgoods() {
      this.goods.forEach((item) => {
        item.foods.forEach((food) => {
          if (food.count > 0) {
            food.count = 0;
          }
        });
      });
    },
    async getGoodsData() {
      let res = await this.axios("/api/goods");
      // 请求数据后赋值给本地变量
      this.goods = res.data;
      // console.log(this.goods);
      // 请求到数据后才能产生滚动效果
      this.$nextTick(() => {
        this.initBetterScroll();
        // 初始化高度的同时，直接计算高度，为左右两边联动做好铺垫
        this.calculateGoodItemHeight();
      });
    },

    //计算滚动元素的高度
    calculateGoodItemHeight() {
      // 获得元素
      let items = this.$refs.gooditems;
      // console.log(items);
      // 高度等于零
      let h = 0;
      for (var i = 0; i < items.length; i++) {
        h = h + items[i].offsetHeight;
        this.gooditemsHeightArr.push(h);
      }
      // console.log(this.gooditemsHeightArr);
    },

    // 点击左边主体菜单右边进行滚动
    scrollToCurrentGoods(index) {
      this.currentIndex = index;
      //获取滚动长度，更据点击的index值取到对应的高度
      let offsetY = this.gooditemsHeightArr[index];
      // 商品页面进行偏移,位移取反
      this.goodsList.scrollTo(0, -offsetY, 500);
    },
    // 右边滚动方法
    goodsWrapperScroll({ y }) {
      // y代表Y轴的偏移量
      let num = parseInt(y);
      if (num > 0) {
        this.currentIndex = 0;
      } else {
        // 滑动页面向下的偏移量为负数
        num = Math.abs(num);
        for (var i = 0; i < this.gooditemsHeightArr.length - 1; i++) {
          let h1 = this.gooditemsHeightArr[i];
          let h2 = this.gooditemsHeightArr[i + 1];
          if (num >= h1 && num <= h2) {
            this.currentIndex = i;

            break;
          }
        }
      }
    },
    // 滚动效果
    initBetterScroll() {
      // 左边滚动
      if (this.menuScroll) {
        // 如果存在代表menuScroll已经初始化过一次了
        // 重新计算容器和内容的高度，无需重新实例化新对象
        this.menuScroll.refresh();
      } else {
        this.menuScroll = new Bscroll(this.$refs.menu, {
          scrollY: true,
          click: true,
        });
      }

      // 右边滚动
      if (this.goodsList) {
        // 如果存在代表menuScroll已经初始化过一次了
        // 重新计算容器和内容的高度，无需重新实例化新对象
        this.goodsList.refresh();
      } else {
        this.goodsList = new Bscroll(this.$refs.goodsList, {
          scrollY: true,
          click: true,
          // 滑动探针，在滚动过程中，时时派发onscroll事件
          probeType: 2,
        });
      }
      // 注册商品列表滚动事件监听
      this.goodsList.on("scroll", this.goodsWrapperScroll);
    },
  },
  mounted() {
    this.getGoodsData();
  },
  components: {
    BtnComctol,
    ShopCar,
    FoodDetail,
  },
  // 因为点击添加food数量是子组件，要能够知道数据改变，因此需要用到计算属性
  computed: {
    // 购物车列表
    shopCartList() {
      let result = [];
      this.goods.forEach((g) => {
        g.foods.forEach((f) => {
          if (f.count > 0) {
            let food = result.find((item) => item.namt == f.name);
            if (!food) {
              result.push({ f: f, title: g.name });
            }
          }
        });
      });
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-goods {
  position: fixed;
  top: 177px;
  bottom: 0;
  left: 0;
  width: 100%;
  // z-index: -1;
  .goods-wrapper {
    display: flex;
    position: absolute;
    top: 0;
    bottom: 56px;
    width: 100%;
    .goods-menu {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      overflow: hidden;
      .menu-item {
        display: table;
        height: 54px;
        width: 100%;
        font-size: $xm-size;
        font-weight: 200;

        .menu-name {
          line-height: 14px;
        }

        &.active {
          background: #fff;
          .menu-name {
            font-weight: 700;
          }
        }
        .item-cell {
          padding: 0 12px;
          text-align: center;
          display: table-cell;
          vertical-align: middle;

          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            vertical-align: top;
            margin-right: 4px;
            @include suports(3, 12px 12px);
          }
        }
      }
    }
    .goods-list {
      flex: 1;
      overflow: hidden;
      .goods-item {
        border-bottom: 1px solid eleblack(0.3);
        h2 {
          font-size: $sm-size;
          color: $e-hui;
          line-height: 26px;
        }
        .food-wrapper {
          .food-container {
            padding: 18px;
            display: flex;
            position: relative;
            img {
              flex: 0 0 57px;
              height: 57px;
              width: 57px;
              border-radius: 4px;
              margin-right: 10px;
            }
            .food-content {
              width: 100%;
              .name {
                font-size: $md-size;
                color: eleblack(1);
                line-height: 14px;
                margin-top: 2px;
              }
              .food-desc {
                margin: 8px 0;
                width: 70%;
                padding-bottom: 1.5px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .food-desc,
              .food-rating {
                font-size: $xm-size;
                color: $e-hui;
                line-height: 10px;
              }
              .food-rating {
                margin: 8px 0;
                .left {
                  margin-right: 12px;
                }
              }
              .food-price {
                // width: 70%;
                position: relative;
                font-size: $md-size;
                font-weight: 700;
                font-weight: normal;
                color: $e-red;
                margin-right: 8px;
                line-height: 24px;
                .old-price {
                  color: $e-hui;
                  font-size: $xm-size;
                  // 中间划线
                  text-decoration: line-through;
                }
                .food-circle {
                  position: absolute;
                  right: 0px;
                  top: 0px;
                  color: rgb(0, 160, 220);
                  font-size: $md-size;
                  line-height: 24px;
                  .icon-remove_circle_outline {
                    vertical-align: middle;
                  }
                  .icon-add_circle {
                    vertical-align: middle;
                  }
                  .number {
                    display: inline-block;
                    color: $e-hui;
                    width: 24px;
                    text-align: center;
                    font-size: $xm-size;
                  }
                }
              }
            }
            .btn-wrapper {
              position: absolute;
              right: 18px;
              bottom: 18px;
            }
          }
        }
      }
    }
  }
}
</style>