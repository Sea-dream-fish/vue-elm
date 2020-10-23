<template>
  <div class="cover-title">
      <div class="title-line"></div>
      <div class="title text">{{title}}</div>
      <div class="title-line"></div>
  </div>
  
</template>
<script>
export default {
    props:['title']
};
</script>
<style lang="scss" scoped>
.cover-title{
    display: flex;
    margin: 28px 0 24px;
    width: 100%;
    .title-line{
        flex: 1;
        transform: translateY(7px);
        border-top: 1px solid rgba(255,255,255,0.2);
    }
    .title-text{
        margin: 0 12px;
        font-size: $sm-size;
        font-weight: 700;
        line-height: 14px;;
    }
}
</style>