<template>
  <div class="seller" ref="sellerview">
    <div>
      <!-- 收藏和送达时间 -->
      <div class="seller-header">
        <div class="header-top">
          <div class="seller-content">
            <div class="seller-name title-label">{{seller.name}}</div>
            <div class="content-desc">
              <Star :size="36" :score="seller.score" class="star" />
              <span class="ratingCount">({{seller.ratingCount}})</span>
              <span class="sellCount">月售{{seller.sellCount}}单</span>
            </div>
          </div>
          <div class="seller-right" @click="favorite = !favorite">
            <div class="icon-favorite" :class="{favorite}"></div>
            <div class="favorite-status">{{favorite ? '已收藏' : '未收藏'}}</div>
          </div>
        </div>
        <div class="header-bottom">
          <div class="seller-score-item">
            <div class="seller-score-title">起送价</div>
            <div class="seller-score-desc">
              {{seller.minPrice}}
              <span class="small-letter">元</span>
            </div>
          </div>
          <div class="seller-score-item">
            <div class="seller-score-title">商家配送</div>
            <div class="seller-score-desc">
              {{seller.deliveryPrice}}
              <span class="small-letter">元</span>
            </div>
          </div>
          <div class="seller-score-item">
            <div class="seller-score-title">平均配送时间</div>
            <div class="seller-score-desc">
              {{seller.deliveryTime}}
              <span class="small-letter">分钟</span>
            </div>
          </div>
        </div>
      </div>

      <WhiteSpace />
      <!-- 2.0公告优惠活动 -->
      <div class="seller-bulletin">
        <div class="title-label">公告与活动</div>
        <div class="bulletin-content">{{seller.bulletin}}</div>
        <ul class="supports">
          <li class="supports-item" v-for="(support,i) in seller.supports" :key="i">
            <span class="elm-supports" :class="supportsClassMap[support.type]"></span>
            {{support.description}}
          </li>
        </ul>
      </div>
      <!-- 3.0商家实景 -->
      <WhiteSpace />
      <div class="seller-pics">
        <div class="title-label">商家实景</div>
        <div class="pis-wrapper" ref="picsWrapper">
          <ul ref="picUl">
            <li class="pic" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" alt="pic无法显示" height="100px" width="100%" />
            </li>
          </ul>
        </div>
      </div>

      <WhiteSpace />
      <!-- 商家信息 -->
      <div class="seller-desc">
        <div class="title-label">商家信息</div>
        <ul class="info-container">
          <li v-for="(info , i) in seller.infos" :key="i" class="list-item">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import Star from "../components/star/star";
import WhiteSpace from "../components/whiteSpace/whiteSpace";
export default {
  data: () => ({
    favorite: true,
  }),
  props: ["seller", "supportsClassMap"],
  components: {
    Star,
    WhiteSpace,
  },
  methods: {
    sellerPicsScroll() {
      // 强撑开内容区域的宽度,让内容区域超过 Bseller容器大小，
      // 才可以滑动
      // 注意为什么是126px
      let offsetWidth = this.seller.pics.length * 126;
      // 让ul的宽度等于offsetwidth
      this.$refs.picUl.style.width = offsetWidth + "px";
      if (!this.picsScroll) {
        this.picsScroll = new BScroll(this.$refs.picsWrapper, {
          scrollX: true, //左右滚动
        });
      } else {
        this.picsScroll.refresh();
      }
    },
    inisScroll(){
      if(this.Scroll){
        this.Scroll.refresh();
      }else{
        this.Scroll = new BScroll(this.$refs.sellerview,{
          scrollY:true,
          click:true,
        })
      }
    }
  },
  mounted() {
    // 等数据获取后再执行
    // if (this.seller.pics.length) {
    //   this.$nextTick(() => {
    //     this.sellerPicsScroll();
    //   });
    // }
    if (this.seller.pics) {
      this.$nextTick(() => {
        this.sellerPicsScroll();
        this.inisScroll();
      });
    }
  },
  // 等数据获取后再执行
  watch: {
    seller(newValue, oldValue) {
      if (newValue !== oldValue && newValue.pics.length) {
        this.$nextTick(() => {
          this.sellerPicsScroll();
          console.log("watch");
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// 标题所有类引用
.title-label {
  margin: 18px 0 8px;
  font-size: $md-size;
  line-height: 14px;
  color: eleblack(1);
}
.seller{
  position: fixed;
  top: 177px;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  overflow: hidden;
}
.seller-header {
  padding: 0 18px;
  .header-top {
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid eleblack(0.2);
    .seller-content {
      flex: 1;
      .seller-name {
        margin-top: 0px;
      }
      .star {
        vertical-align: top;
        display: inline-block;
      }
      .content-desc {
        //   display: flex;
        .sellCount {
          font-size: $xm-size;
          line-height: 18px;
          color: $e-gray;
        }
        .ratingCount {
          margin: 0 12px 0 8px;
          font-size: $xm-size;
          line-height: 18px;
          color: $e-gray;
        }
      }
    }
    .seller-right {
      flex: 0 0 50px;
      //   width: 50px;
      text-align: center;
      .icon-favorite {
        font-size: 24px;
        color: #ccc;
        line-height: 24px;
        margin-bottom: 8px;

        &.favorite {
          color: $e-red;
        }
      }
      .favorite-status {
        font-size: $sm-size;
        color: $e-gray;
      }
    }
  }
  .header-bottom {
    text-align: center;
    padding: 18px 0;
    display: flex;
    .seller-score-item {
      flex: 1;
      border-right: 1px solid eleblack(0.1);
      &:last-child {
        border-right: none;
      }
      .seller-score-title {
        font-size: $xm-size;
        line-height: 10px;
        color: rgb(147, 153, 159);
      }
      .seller-score-desc {
        margin-top: 4px;
        font-size: 24px;
        line-height: 24px;
        color: eleblack(1);
        .small-letter {
          font-size: $xm-size;
          font-weight: 200;
        }
      }
    }
  }
}
.seller-bulletin {
  padding: 0 18px;
  .bulletin-content {
    font-size: $sm-size;
    line-height: 24px;
    color: $e-red;
    padding: 0 12px;
    margin-bottom: 18px;
  }
  .supports {
    // height: 16px;
    margin: 0 12px;
    .elm-supports {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin: 16px 6px 16px 0;

      vertical-align: middle;
      @include suports(4, 16px 16px);
    }
    .supports-item {
      font-size: $xm-size;
      font-weight: 200px;
      line-height: 16px;
      color: eleblack(1);
    }
  }
}
.seller-pics {
  padding: 0 18px 18px;
  .pis-wrapper {
    width: 100%;
    overflow: hidden;
    ul {
      .pic {
        display: inline-block;
        margin-right: 6px;
        width: 120px;
        height: 90px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
.seller-desc {
  padding: 0 18px;
  .info-container {
    margin-top: 4px;
    .list-item {
      padding: 16px 12px;
      border-top: 1px solid eleblack(0.2);
      font-size: $xm-size;
      line-height: 16px;
      font-weight: 200;
      color: eleblack(0.7);
    }
  }
}
</style>