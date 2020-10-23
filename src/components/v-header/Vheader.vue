<template>
  <div class="v-header" @click.stop="openCover">
    <div class="container">
      <img :src="seller.avatar" alt="商家图片" class="avatar" />
      <div class="content">
        <div class="title">
          <span class="elm-brand"></span>
          <!-- 标题头，商家名称 -->
          <span>{{seller.name}}</span>
        </div>
        <div class="desc">
          <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
        </div>
        <ul class="supports">
          <li
            v-show="i===index"
            class="supports-item"
            v-for="(support,i) in seller.supports"
            :key="i"
          >
            <span class="elm-supports" :class="supportsClassMap[support.type]"></span>
            {{support.description}}
          </li>
        </ul>
      </div>

      <div class="supports-count">
        {{isSupports || 0}}个
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>

    <div class="bulletin">
      <span class="bulletin-icon"></span>
      <span class="bulletin_text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>

    <!-- 遮罩组建 -->
    <DescCover :seller="seller" :supportsM="supportsClassMap" @closeDesc="closeDesc" v-if="showDesc" />
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" />
    </div>
  </div>
</template>

<script>
import DescCover from "./DescCover";
export default {
  name: "VHeader",
  props: [
    // 接受App.vue的传值
    "seller",
    "supportsClassMap",
    "index",
  ],
  data: () => ({
    showDesc: false,
  }),
  methods: {
    openCover() {
      this.showDesc = true;
    },
    //  通过子组建关闭遮照尘
    closeDesc() {
      this.showDesc = false;
    },
  },
  computed: {
    isSupports() {
      // 如果数据存在，就显示，如果没有数据，则不显示，默认显示为0
      return this.seller.supports && this.seller.supports.length;
    },
  },

  components: {
    DescCover,
  },

  updated() {
    // console.log(this.seller);
  },
};
</script>
<style lang="scss" scoped>
.v-header {
  color: $e-white;
  background: eleblack(0.5);
  position: relative;

  .container {
    // 弹性布局
    display: flex;
    padding: 24px 12px 18px 24px;

    .avatar {
      flex: 0 0 64px;
      width: 64px;
      height: 64px;
      margin-right: 16px;
      border-radius: 4px;
    }
    .content {
      flex: 1;
      padding: 2px 0;
      .title {
        font-size: $lg-size;
        line-height: 18px;
        font-weight: bold;
        color: $e-white;

        .elm-brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          vertical-align: top;
          @include bg-img("/image/brand", 30px 18px);
          margin-right: 6px;
        }
      }
      .desc {
        font-size: $sm-size;
        color: $e-white;
        font-weight: 200;
        line-height: 12px;
        margin: 8px 0 10px;
      }
      .supports {
        width: 80%;
        height: 14px;
        overflow: hidden;
        .elm-supports {
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-right: 4px;
          margin-bottom: 2px;
          vertical-align: top;
          @include suports(1, 14px 14px);
        }
        .supports-item {
          // font-size: 10px;
          font-size: $xm-size;
          font-weight: 200px;
          line-height: 12px;

          // 只在一行显示，超出的文本用。。。来替代
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .supports-count {
      position: absolute;
      bottom: 40px;
      right: 12px;
      padding: 7px 8px;
      background: rgb(0, 0, 0, 0.2);
      border-radius: 12px;
      font-weight: 200;
      line-height: 12px;
      height: 12px;
      text-align: center;
      font-size: $xm-size;

      .icon-keyboard_arrow_right {
        margin-left: 2px;
        vertical-align: bottom;
      }
    }
  }

  .bulletin {
    height: 28px;
    line-height: 28px;
    padding: 0 18px 0 12px;
    background-color: eleblack(0.2);
    font-size: $xm-size;
    font-weight: 200;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;

    .bulletin-icon {
      display: inline-block;
      width: 22px;
      height: 12px;
      margin-right: 4px;

      vertical-align: middle;
      @include bg-img("/image/bulletin", 22px 12px);
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      // margin-left: 4px;
      right: 12px;
      top: 10px;
    }
  }

  .background {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    // 降低图片标签的层级
    z-index: -1;
    filter: blur(10px);
  }
}
</style>