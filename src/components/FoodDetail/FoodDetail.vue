<template>
  <div class="food-detail" ref="foodsDetail">
    <div>
      <div class="food-title">
        <span class="icon-arrow_lift"></span>
        <img :src="goodsData.image" alt width="100%" height="325px" class="food-image" />
        <div class="food-conten">
          <h2 class="name">{{goodsData.name}}</h2>
          <span class="span">月售{{goodsData.sellCount}}份</span>
          <span class="span">好评率{{goodsData.rating}}%</span>
          <div class="price">
            <span class="span newPrice">￥{{goodsData.price}}</span>
            <span class="span oldPrice" v-show="goodsData.oldPrice">￥{{goodsData.oldPrice}}</span>
            <span class="addGoods">加入购物车</span>
          </div>
        </div>
      </div>
      <WhiteSpace />

      <div class="food-info">
        <h2 class="name">商品介绍</h2>
        <div class="info">{{goodsData.info}}</div>
      </div>
      <WhiteSpace />
      <div class="food-filter">
        <h2 class="name">商品评价</h2>
        <div class="rating-filter">
          <div class="filter-btn">
            <span class="btn-item">
              全部
              <span class="count">3</span>
            </span>
            <span class="btn-item">
              推荐
              <span class="count">2</span>
            </span>
            <span class="btn-item">
              吐槽
              <span class="count">0</span>
            </span>
          </div>
          <div class="only-content">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
          </div>
        </div>
      </div>
      <div class="food-list">
        <div class="list-item" v-for="(r,i) in goodsData.ratings" :key="i">
          <div class="item-top">
            <span class="time">{{r.rateTime | getTemplateDate}}</span>
            <span class="username">
              {{r.username }}
              <img :src="r.avatar" alt width="12px" />
            </span>
          </div>
          <div class="item-text">
            <Recommend :type="r.rateType" />
            <span>{{r.text}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import WhiteSpace from "../whiteSpace/whiteSpace";
import { getTemplateDate } from "../../js/tool";
import BScroll from "better-scroll";
import Recommend from "../Recommend/Recommend";
export default {
  name: "foodDetail",
  data: () => ({
    foods: [],
  }),
  props: ["goodsData"],
  mounted() {
    // console.log(this.goodsData)
  },
  beforeUpdate() {
    this.$nextTick(() => {
      this.inisScroll();
    });
  },
  filters: {
    getTemplateDate,
  },
  methods: {
    inisScroll() {
      if (this.Scroll) {
        this.Scroll.refresh();
      } else {
        this.Scroll = new BScroll(this.$refs.foodsDetail, {
          scrollY: true,
          click: true,
        });
      }
    },
  },
  computed: {},
  components: {
    WhiteSpace,
    Recommend,
  },
};
</script>
<style lang="scss" scoped>
.food-detail {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $e-white;
  .food-title {
    position: relative;
    .icon-arrow_lift{
      position: absolute;
      float: left;
      color: #fff;
      top: 20px;
      left: 20px;
    }
    .food-conten {
      margin: 18px;
      .name {
        font-size: $md-size;
        font-weight: 700;
        color: eleblack(1);
        line-height: 14px;
        margin-bottom: 8px;
      }
      .span {
        font-size: $xm-size;
        line-height: 20px;
        color: $e-hui;
        margin-right: 12px;
      }
      .price {
        margin: 18px 0;
        .oldPrice {
          font-weight: 700;
          text-decoration: line-through;
        }
        .newPrice {
          font-size: $md-size;
          line-height: 24px;
          color: $e-red;
          font-weight: 700;
        }
        .addGoods {
          float: right;
          font-size: $xm-size;
          padding: 6px 8px;
          color: $e-white;
          line-height: 12px;
          width: 74px;
          height: 14px;
          text-align: center;
          background: $e-blue;
          border-radius: 24px;
        }
      }
    }
  }
  .food-info {
    padding: 18px;
    .name {
      font-size: $md-size;
      color: eleblack(1);
    }
    .info {
      margin: 6px 0 0 8px;
      font-size: $sm-size;
      font-weight: 200;
      color: $e-gray;
      line-height: 24px;
    }
  }
  .food-filter {
    padding: 18px;
    padding-bottom: 0px;
    border-bottom: 1.2px solid eleblack(0.1);
    // .name {
    // }
    .rating-filter {
      .filter-btn {
        padding: 18px 0;
        border-bottom: 1px solid eleblack(0.2);
        .btn-item {
          display: inline-block;
          background: rgba(0, 160, 220, 0.2);
          border-radius: 1px;
          color: $e-gray;
          font-size: $md-size;
          line-height: 16px;
          padding: 8px 12px;
          margin-right: 8px;

          .count {
            font-size: $xm-size;
          }
        }
        .positive {
          background: rgba(0, 160, 220, 0.2);
          &.active {
            color: $e-white;
            background: $e-blue;
          }
        }
        .negative {
          background: rgba(77, 85, 93, 0.2);
          &.active {
            color: $e-white;
            background: #666666;
          }
        }
      }
    }
    .only-content {
      margin: 12px 0;
      line-height: 24px;

      &.active {
        .icon-check_circle {
          color: #00b43c;
        }
      }

      .text {
        font-size: $xm-size;
        color: #999;
        vertical-align: top;
      }
      .icon-check_circle {
        font-size: 24px;
        margin-right: 4px;
        color: eleblack(0.5);
      }
    }
  }
  .food-list {
    padding: 0 18px;
    .list-item {
      padding: 16px 0;
      border-bottom: 1px solid eleblack(0.1);
      .item-top {
        margin-bottom: 6px;
        font-size: $xm-size;
        color: $e-hui;
        line-height: 12px;
        .username {
          float: right;

          img {
            border-radius: 50%;
            width: 12px;
            height: 12px;
            margin-left: 6px;
          }
        }
      }
      .item-text {
        font-size: $md-size;
        color: eleblack(1);
        line-height: 16px;
        display: flex;

        span {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
