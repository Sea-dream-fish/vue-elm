<template>
  <div class="btn-control">
    <span @click="dec" class="btn icon-remove_circle_outline" v-show="num >0"></span>
    <span class="count" v-show="num >0">{{num}}</span>
    <span @click="add" class="btn icon-add_circle"></span>
  </div>
</template>
<script>
export default {
  name: "BtnControl",
  props: ["count", "name", "Fname"],
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
      // console.log(this.num+1)
      this.$emit("add", {
        num: this.num + 1,
        name: this.name,
        Fname: this.Fname,
      });
    },
    dec() {
      this.$emit("dex", {
        num: this.num - 1,
        name: this.name,
        Fname: this.Fname,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-control {
  line-height: 24px;
  .btn {
    color: rgb(0, 160, 220);
    font-size: 24px;
  }
  .count {
    vertical-align: top;
    display: inline-block;
    color: $e-hui;
    width: 24px;
    text-align: center;
    font-size: $xm-size;
  }
}
</style>