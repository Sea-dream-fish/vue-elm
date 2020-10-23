<template>
  <div class="shop-cart">
    <div class="shopcart-content">
      <div class="shopcart-left">
        <span
          class="icon-shopping_cart"
          :class="{active: goodsCount > 0}"
          ref="shopcart"
          @click="toggleGoodsList"
        >
          <span class="cart-badge" v-show="goodsCount >0">{{goodsCount}}</span>
        </span>
        <span class="price">￥{{goodsPrice}}</span>
        <span class="desc">另需配送费￥20元</span>
      </div>
      <div class="shopcart-right" :class="{enough: goodsPrice >= seller.minPrice}">{{buyDesc}}</div>
    </div>
    <div class="shopcart-list" v-show="this.switch">
      <div class="list-header">
        <span class="title">购物车</span>
        <span class="empty" @click="emptyGoodsList" >清空</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <ul>
          <li class="list-item border-1px" v-for="(food,index) in shopCartList" :key="index">
            <div class="list-name">{{food.f.name}}</div>
            <div class="list-price">￥{{food.f.price}}</div>
            <div class="list-btn">
              <BtnControl
                @add="add(index)"
                @dec="dec(index)"
                :Fname="food.title"
                :count="food.f.count"
                :name="food.f.name"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="bg-cover" v-show="showGoodsList" @click="closeGoodsList()"></div>
  </div>
</template>


<script>
import BtnControl from "../BtnComctol/BtnControl";
import BScroll from "better-scroll";
export default {
  props: ["shopCartList", "seller"],
  data: () => ({
    switch: false,
  }),
  mounted() {
    // console.log(this.shopCartList.title);
  },
  components: {
    BtnControl,
  },
  methods: {
    add(index) {
      let obj = this.shopCartList[index];
      this.$emit("add", {
        num: obj.f.count + 1,
        name: obj.f.name,
        Fname: obj.title,
      });
    },
    dec(index) {
      let obj = this.shopCartList[index];
      this.$emit("add", {
        num: obj.f.count - 1,
        name: obj.f.name,
        Fname: obj.title,
      });
    },
    toggleGoodsList() {
      if (this.shopCartList) {
        this.switch = !this.switch;
      }
    },
    closeGoodsList() {
      this.switch = false;
    },
    initShopCartList() {
      if (!this.listScroll) {
        this.listScroll = new BScroll(this.$refs.listWrapper, {
          click: true,
        });
      } else {
        this.listScroll.refresh();
      }
    },
    // 清空购物车
    emptyGoodsList() {
      this.$emit("emptyGoods");
    },
  },

  computed: {
    goodsCount() {
      let count = 0;
      this.shopCartList.forEach((f) => {
        count += f.f.count;
      });
      return count;
    },
    // 购物车当前价格
    goodsPrice() {
      let num = 0;
      this.shopCartList.forEach((f) => {
        num += f.f.count * f.f.price;
      });
      return num;
    },
    // 还差多少钱
    buyDesc() {
      let result = `￥${this.seller.minPrice}元起送`;
      if (this.goodsPrice > 0 && this.goodsPrice < this.seller.minPrice) {
        result = `还差￥${this.seller.minPrice - this.goodsPrice}元起送`;
      } else if (this.goodsPrice >= this.seller.minPrice) {
        result = "立即购买";
      }
      return result;
    },
    showGoodsList() {
      if (!this.switch) {
        return false;
      }
      if (this.shopCartList.length <= 0) {
        // 计算属性一般不要直接修改依赖
        // 如果商品数量为0则关闭列表显示开关
        // eslint-disable-next-line
        this.switch = false;
        return false;
      }
      this.$nextTick(() => {
        this.initShopCartList(); // 页面中跟购物车列表相关的属性发生改变时
      });
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.shop-cart {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;

  .shopcart-content {
    position: relative;
    z-index: 25;
    display: flex;
    height: 56px;
    color: rgba(255, 255, 255, 0.4);
    // background: $e-dark;
    background: #141d27;

    .shopcart-left {
      padding: 12px 0 12px 12px;
      @media screen and (max-width: 360px) {
        padding: 12px 0 12px 6px;
      }
      flex: 1;
    }

    .icon-shopping_cart {
      position: relative;
      top: -28px;
      margin-right: 12px;
      display: inline-block;
      width: 56px;
      height: 56px;
      line-height: 50px;
      // border: 6px solid $e-hui;
      border: 6px solid rgb(0, 0, 0, 0.4);
      border-radius: 50%;
      font-size: 24px;
      text-align: center;
      background: #283338;
      vertical-align: top;
      @media screen and (max-width: 360px) {
        margin-right: 6px;
      }

      &.active {
        // background: $e-blue;
        // color: $e-white;
        background: rgb(0, 160, 220);
        color: #fff;
      }

      .cart-badge {
        position: absolute;
        right: 0;
        top: -6px;
        display: inline-block;
        padding: 0 6px;
        border-radius: 12px;
        font-size: 9px;
        line-height: 16px;
        // background: $e-red;
        // color: $e-white;
        background: rgb(250, 20, 20);
        color: #fff;
      }
    }

    .price {
      display: inline-block;
      margin-right: 10px;
      font-size: $lg-size;
      font-weight: 700;
      line-height: 24px;
      @media screen and (max-width: 360px) {
        margin-right: 6px;
      }
    }

    .desc {
      display: inline-block;
      padding-left: 12px;
      border-left: 1px solid rgba(255, 255, 255, 0.1);
      font-size: $md-size;
      font-weight: 200;
      line-height: 24px;
      @media screen and (max-width: 360px) {
        padding-left: 6px;
      }
    }

    .shopcart-right {
      flex: 0 0 105px;
      padding: 0 8px;
      font-size: $sm-size;
      font-weight: 700;
      line-height: 56px;
      text-align: center;
      background: #283338;

      &.enough {
        color: #fff;
        background: #33b04f;
      }
    }
  }

  .shopcart-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 46px;
    z-index: 20;
    padding-bottom: 20px;
    background: #f3f5f7;
    .list-header {
      padding: 0 18px;
      height: 40px;
      width: 100%;
      line-height: 40px;
      font-size: $md-size;
      font-weight: 200;
      color: eleblack(1);
      background: #f3f5f7;

      .empty {
        float: right;
        margin-right: 30px;
        font-size: $sm-size;
        // color: $e-blue;
        color: rgb(0, 160, 220);
      }
    }

    .list-wrapper {
      padding: 0 18px;
      // background: $e-white;

      background: #fff;
      max-height: 219px;
      overflow: hidden;
    }

    .list-item {
      display: flex;
      padding: 12px 0;
      line-height: 24px;
      font-size: $md-size;
      // @include border-bottom(eleblack(0.1));

      // &:last-child {
      //   @include border-none;
      // }
    }

    .list-name {
      flex: 1;
      color: eleblack(1);
    }

    .list-price {
      margin: 0 12px 0 18px;
      display: inline-block;
      font-weight: 700;
      // color: $e-red;
      color: rgb(250, 20, 20);

      &:first-letter {
        font-size: $xm-size;
        font-weight: normal;
      }
    }

    .list-btn {
      flex: 0 0 72px;
      text-align: right;
    }
  }

  .bg-cover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: eleblack(0.6);
    backdrop-filter: blur(5px);
    z-index: 12;
  }
}
</style>