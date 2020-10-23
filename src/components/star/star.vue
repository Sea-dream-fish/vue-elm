<template>
  <div class="star-content" :class="`size-${size}`">
    <span v-for="(star,index) in staritems" :key="index" :class="[`stars-${size}`,`stars-${star}`]"></span>
  </div>
</template>
<script>
const starCount = 5;
export default {
  name: "star",
  props: {
    score: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 48,
    },
  },
  computed: {
    staritems() {
      // 把数向下取整得到整数，4.3*2=8.6/2=4
      let num = Math.floor(this.score * 2) / 2;
      // 数组存储
      let result = [];
      // 循环星填充
      for (var i = 0; i < starCount; i++) {
        // 小于整填充on
        if (i < Math.floor(num)) {
          result.push("on");
        }
        // 判锻
        else if (i === Math.floor(num) && i < num) {
          result.push("half");
        } else {
          result.push("off");
        }
      }
      return result;
    },
  },
};
</script>
<style lang="scss" scoped>
.star-content {
  &.size-48 {
    height: 24px;
  }
  &.size-36 {
    height: 18px;
  }
  &.size-24 {
    height: 12px;
  }
}
@include stars(48, 24);
@include stars(36, 8);
@include stars(24, 2);
@media screen and(max-width: 360px) {
  
  @include stars(36, 3);
}
</style>