<template>
  <div class="rating-filter">
    <div class="filter-btn">
      <span class="btn-item positive" :class="{active :selected==2}" @click="changeSelected(2)">
        {{filterOptoin.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="btn-item positive" :class="{active :selected==0}" @click="changeSelected(0)">
        {{filterOptoin.postive}}
        <span class="count">{{postiveCount}}</span>
      </span>
      <span class="btn-item negative" :class="{active :selected==1}" @click="changeSelected(1)">
        {{filterOptoin.negative}}
        <span class="count">{{negativeCount}}</span>
      </span>
    </div>
    <div class="only-content" :class="{active:onlyContent}">
      <span class="icon-check_circle" @click="toggleOnlyContent"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
const ALL =2;
const POSTIVE = 0;
const NEGAIVE = 1;
export default {
  props: {
    ratings: {
      type: Array,
    },
    filterOptoin: {
      type: Object,
      default: () => ({
        all: "全部",
        postive: "满意",
        negative: "不满意",
      }),
    },
    onlyContent:{
        type:Boolean,
        default:true,
    },
    selected:{
        type:Number,
        default:ALL,
    },
  },
  computed: {
    postiveCount() {
      let count = 0;
      //   遍历数据，计算过来ragings中的rateType有多少个是0，0代表满意
      this.ratings.forEach((item) => {
        if (item.rateType == POSTIVE) {
          count++;
        }
      });
      // 把计算出来结果返回出去
      return count;
    },
    negativeCount() {
        let count = 0;
        //   遍历数据，计算过来ragings中的rateType有多少个是0，0代表满意
        this.ratings.forEach((item) => {
          if (item.rateType == NEGAIVE) {
            count++;
          }
        });
      // 把计算出来结果返回出去
    //   let count = this.ratings.length - this.postiveCount;
      return count;
    },
  },
  methods:{
      toggleOnlyContent(){
          // this.onlyContent = !this.onlyContent;
          this.$emit("update:onlyContent",!this.onlyContent)
      },
      changeSelected(arg){
          // console.log(arg)
          // this.selected =arg
          this.$emit("update:selected",arg)
      }
  },
  mounted() {
    //   for (let i = 0; i < ratings.length; i++) {
    //       const element = ratings[i];
    //       console.log(element)
    //   }
    // console.log(this.ratings);
  },
};
</script>
<style lang="scss" scoped>
.rating-filter {
  padding: 18px 18px 0;
  border-bottom: 1px solid eleblack(0.2);
  .filter-btn {
    padding-bottom: 18px;
    border-bottom: 0.5px solid eleblack(0.2);
    .btn-item {
      display: inline-block;
      background: rgba(0, 160, 220, 0.2);
      border-radius: 1px;
      color: #666;
      font-size: $md-size;
      line-height: 16px;
      padding: 8px 12px;
      margin-right: 8px;

      .count {
        font-size: $xm-size;
      }
    }
    .positive {
      background: rgb(0, 160, 220, 0.2);
      &.active {
        color: $e-white;
        background: #00a0dc;
      }
    }
    .negative {
      background: #cccccc;
      &.active {
        color: $e-white;
        background: #666666;
      }
    }
  }
  .only-content {
    padding: 12px 0;
    line-height: 24px;
    &.active{
        .icon-check_circle{
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
</style>