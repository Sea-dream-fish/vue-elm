<template>
  <div class="desc-cover">
    <div class="container">
      <h2 class="title">{{seller.name}}</h2>
      <!-- 评星组件 -->
      <div class="star-wrapper">
        <star :score="this.seller.score" />
      </div>
      <!-- 优惠信息 -->
      <div>
          <DescTitle title="优惠信息"/>
          <ul class="supports">
          <li
            class="supports-item"
            v-for="(support,i) in seller.supports"
            :key="i"
          >
            <span class="elm-supports" :class="supportsM[support.type]"></span>
            {{support.description}}
          </li>
        </ul>
      </div>
          <DescTitle title="优惠信息"/>
      <div class="cover-bulletin">
          {{seller.bulletin}}
      </div>

    </div>
    <span class="icon-close" @click.stop="closeDesc"></span>
  </div>
</template>
<script>
import star from "../star/star";
import DescTitle from "./DescTitle"
export default {
  props: ["seller", "supportsM"],
  methods: {
    closeDesc() {
      this.$emit("closeDesc");
    },
  },
  components: {
    star,
    DescTitle
  },
};
</script>


<style lang="scss" scoped>
.desc-cover {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: eleblack(0.7);

  // filter只能模糊容器内部元素   backdrop-filter让元素自身产生毛玻璃效果
  backdrop-filter: blur(10px);

  .container {
    padding: 64px 36px;
    .title {
      text-align: center;
    }
    .star-wrapper{
        margin-top: 28px;
        text-align: center;
    }
    .supports {       
        
        .elm-supports {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 6px;
        //   margin: 0 6px 12px 12px;
          vertical-align: top;
          @include suports(2, 16px 16px);
        }
        .supports-item {
          font-size: $xm-size;
          line-height: 12px;
            margin-left: 12px;
          padding-bottom: 12px;
          &:last-child{
              padding-bottom: 0px;
          }
        }
      }
      .cover-bulletin{
          font-size: $sm-size;
          line-height: 24px;
          font-weight: 200;
          padding: 0 12px;;
      }
  }

  .icon-close {
    position: absolute;
    bottom: 32px;
    left: 50%;
    // 剧中显示
    transform: translateX(-50%);
    font-size: 32px;
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>