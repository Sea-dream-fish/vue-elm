<template>
  <div class="btn-control">
    <span @click="dec" class="btn icon-remove_circle_outline" v-show="num > 0"></span>
    <span class="count" v-show="num > 0">{{num}}</span>
    <span @click="add" class="btn icon-add_circle"></span>
  </div>
</template>

<script>
export default {
  name: "BtnControl",
  props: ["count", "name"],
  computed: {
    num() {
      if (this.count) {
        return this.count;
      }
      return 0;
    },
  },
  methods: {
    add() {
      // console.log(this.name)
      this.$emit("add", { num: this.num + 1, name: this.name });
    },
    dec() {
      this.$emit("dec", { num: this.num - 1, name: this.name });
    },
  },
  mounted(){
    // console.log(this.name)
  }
};
</script>

<style lang="scss" scoped>
.btn-control {
  .btn {
    display: inline-block;
    font-size: 24px;
    color: rgb(0, 160, 220);
    line-height: 24px;
    vertical-align: top;
  }
  .count {
    display: inline-block;
    width: 24px;
    font-size: $xm-size;
    line-height: 24px;
    color: #00a0dc;
    text-align: center;
  }
}
</style>