<template>
  <div class="rating-view" ref="rating">
    <div> 
      <!-- 1.0评分模块 -->
      <div class="rating-rank">
        <div class="rating-score">
          <h2 class="score">{{seller.score}}</h2>
          <div class="name">综合评分</div>
          <div class="rate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="rating-desc">
          <div class="rating-item">
            <span class="name">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore" />
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="rating-item">
            <span class="name">商品评分</span>
            <star class="star" :size="36" :score="seller.foodScore" />
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="rating-item">
            <span class="name">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <whiteSpace />
      <RatingFilter :ratings="ratings" :selected.sync="selected" :onlyContent.sync="onlyContent" />
      <!-- 评价列表 -->
      <div class="rating-list">
        <div class="rating-list-item" v-for="(r,i) in ratingsList" :key="i">
          <img :src="r.avatar" alt="头像无法显示" />
          <div class="rating-content">
            <div class="rating-name">{{r.username}}</div>
            <div class="rating-desc">
              <star class="star" :size="24" :score="r.score" />
              <span class="delivery" v-show="r.deliveryTime">{{r.deliveryTime}}分钟送达</span>
            </div>
            <div class="rating-text">{{r.text}}</div>
            <div class="rating-recomment" v-show="r.recommend.length">
              <Recommend :recommend="r.recommend" :type="r.rateType" />
            </div>
          </div>
          <div class="rating-time">{{r.rateTime | getTemplateDate}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import star from "../components/star/star";
import whiteSpace from "../components/whiteSpace/whiteSpace";
import RatingFilter from "../components/RatingFilter/RatingFilter";
import Recommend from "../components/Recommend/Recommend";
// 引入时间戳函数
import { getTemplateDate } from "../js/tool";
// 引入滑动
import BScroll from "better-scroll";
export default {
  name: "RatingView",
  data: () => ({
    ratings: [],
    onlyContent: true,
    selected: 2,
  }),
  props: ["seller"],
  components: {
    star,
    whiteSpace,
    RatingFilter,
    Recommend,
  },
  methods: {
    async getRatingFrom() {
      let res = await this.axios("/api/ratings");
      this.ratings = res.data;
      // console.log(this.ratings);
      // 请求到数据才能滚动
      this.$nextTick(() => {
        this.inisBetterScroll();
      });
    },
    // 滑动效果
    inisBetterScroll() {
      if (this.Scroll) {
        this.Scroll.refresh();
      } else {
        this.Scroll = new BScroll(this.$refs.rating, {
          scrollY: true,
          click:true,
        });
      }
    },
  },
  mounted() {
    this.getRatingFrom();
  },
  //   过滤器
  filters: {
    getTemplateDate,
  },
  computed: {
    ratingsList() {
      let result = this.ratings;
      if (this.selected == 0) {
        result = result.filter((item) => item.rateType == 0);
      }
      if (this.selected == 1) {
        result = result.filter((item) => item.rateType == 1);
      }
      if (this.onlyContent) {
        result = result.filter((item) => item.text);
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
// 滑动范围
.rating-view{
  position: fixed;
  top: 177px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  z-index: -1;
}
.rating-rank {
  display: flex;
  padding: 18px 0;
  .rating-score {
    flex: 0 0 137px;
    width: 137px;
    text-align: center;
    @media screen and(max-width:365px) {
      float: 0 0 120px;
      width: 120px;
    }
    .score {
      font-size: 24px;
      line-height: 28px;
      color: $e-yellow;
    }
    .name {
      font-size: $sm-size;
      line-height: 12px;
      color: eleblack(1);
      margin: 6px 0 8px;
    }
    .rate {
      font-size: $xm-size;
      color: $e-hui;
      line-height: 10px;
      margin-bottom: 6px;
    }
  }
  .rating-desc {
    flex: 1;
    padding: 0 24px;
    @media screen and(max-width:400px) {
      padding: 0 12px;
    }
    @media screen and(max-width: 360px) {
      padding: 0 8px;
    }
    .rating-item {
      display: flex;
      margin-bottom: 8px;
      .name {
        font-size: $xm-size;
        line-height: 18px;
      }
      .star,
      .time {
        margin: 0 12px;
        @media screen and(max-width: 380px) {
          margin: 0 6px;
        }
        @media screen and(max-width: 360px) {
          margin: 0 3px;
        }
      }
      .star {
        @media screen and(max-width: 360px) {
          @include stars(24, 1);
        }
      }
      .score {
        font-size: $xm-size;
        color: $e-yellow;
        line-height: 18px;
      }
      .time {
        font-size: $xm-size;
        color: $e-hui;
        line-height: 18px;
      }
    }
  }
}
.rating-list {
  padding: 0 18px;
  .rating-list-item {
    position: relative;
    padding: 18px 0;
    display: flex;
    border-bottom: 1px solid eleblack(0.2);
    img {
      height: 28px;
      width: 28px;
      border-radius: 50%;
      margin-right: 15px;
      flex: 0 0 28px;
    }
    .rating-content {
      flex: 1;
      .rating-name {
        font-size: $xm-size;
        color: eleblack(1);
        line-height: 12px;
        display: flex;
      }
      .rating-desc {
        .star {
          display: inline-block;
          margin: 4px 6px 6px 0;
        }
        .delivery {
          font-size: $xm-size;
          font-weight: 200;
          color: $e-hui;
        }
      }
      .rating-text {
        font-size: $sm-size;
        color: eleblack(1);
        line-height: 18px;
      }
      .rating-recomment {
        margin-top: 8px;
      }
    }
    .rating-time {
      position: absolute;
      right: 18px;
      font-size: $xm-size;
      font-weight: 200;
      color: $e-hui;
      line-height: 12px;
      top: 18px;
    }
  }
}
</style>