<template>
  <div class="seller-tabs">
    <router-link to="/" tag="div" class="tab-item" exact>商品</router-link>
    <router-link to="/ratings" tag="div" class="tab-item">评价</router-link>
    <router-link to="/seller" tag="div" class="tab-item">商家</router-link>
  </div>
</template>

<script>
export default {
  name: "SellerTabs",
};
</script>

<style lang="scss" scoped>
.seller-tabs {
  display: flex;
  text-align: center;
  height: 40px;
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid eleblack(0.1);
  .tab-item {
    flex: 1;
    line-height: 40px;
    font-size: $md-size;
    text-align: center;
    color: rgb(77, 85, 93);
    &.link-active {
      color: $e-red;
    }
  }
}
</style>