<template>
  <div class="recommned">
    <span class="thumb" :class="type ===0 ? 'icon-thumb_up':'icon-thumb_down'"></span>
    <span class="recommned-item" v-for="(r,i) in recommend" :key="i">{{r}}</span>
  </div>
</template>
<script>
export default {
  name: "Recommend",
  props: ["recommend", "type"],
};
</script>
<style lang="scss" scoped>
.recommned {
  .thumb {
    
    font-size: $sm-size;
    line-height: 16px;
    &.icon-thumb_up {
      color: rgb(0, 160, 220);
    }
    &.icon-thumb_down {
      color: rgb(183, 187, 191);
    }
  }
  .recommned-item {
    font-size: 9px;
    color: $e-hui;
    line-height: 16px;
    display: inline-block;
    border-width: 1px;
    border-color: eleblack(0.1);
    border-radius: 2px;
    background-color: #fff;
    margin: 0 8px  5px 8px;
    padding: 0 6px;
    text-align: center;
    
  }
  
}
</style>