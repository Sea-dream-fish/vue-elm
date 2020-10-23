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
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #d6d6d6;
  .tab-item {
    flex: 1;
    line-height: 40px;
    font-size: 18px;

    &.link-active {
      color: $e-red;
      border-bottom: 2px solid $e-red;
    }
  }
}
</style>