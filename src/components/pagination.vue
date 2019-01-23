<template>
  <div class="btn_list">
    <div class="btn" @click="changeBtn">首页</div>
    <div class="btn" @click="changeBtn">上一页</div>
    <div
      v-for="(numbtn,index) in btnpage"
      :key="index"
      @click="changcurrentstyle(numbtn)"
      :class="[{currentpage:numbtn == currentpage},'btn']"
    >{{numbtn}}</div>
    <div class="btn" @click="changeBtn">下一页</div>
  </div>
</template>

<style lang="scss" scoped>
.btn_list {
  display: flex;
  background: #fff;
  padding: 10px;
  .btn {
    color: #778087;
    // border-radius: 3px 0;
    padding: 4px 12px;
    line-height: 20px;
    border: 1px solid #ddd;
    cursor: pointer;
  }

  .currentpage {
    color: #80bd01;
  }
}
</style>

<script>
export default {
  name: "pagination",
  data() {
    return {
      btnpage: [1, 2, 3],
      currentpage: 1
    };
  },
  methods: {
    changeBtn(value) {
      switch (value.target.innerText) {
        case "下一页":
          document.querySelector(".currentpage").nextElementSibling.click();
          break;
        case "上一页":
          document.querySelector(".currentpage").previousElementSibling.click();
          break;
        case "首页":
          this.btnpage = [1, 2, 3];
          this.changcurrentstyle(1);
        // document.querySelector(".currentpage").click();
        default:
          break;
      }
    },
    changcurrentstyle(page) {
      this.currentpage = page;
      if (page === this.btnpage[2]) {
        this.btnpage.shift();
        this.btnpage.splice(2, 0, this.btnpage[1] + 1);
      }
      if (page === this.btnpage[0] && this.btnpage[0] !== 1) {
        this.btnpage.unshift(this.btnpage[0] - 1);
        this.btnpage.splice(3, 1);
      }
      this.$emit("handle", this.currentpage);
    }
  }
};
</script>


