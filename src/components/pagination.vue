<template>
  <div id="pagination">
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
#pagination {
  border-top: 1px solid #e5e5e5;
  max-width: 1440px;
  min-width: 960px;
  width: 90%;
  padding: 10px;
  background: #fff;
  display: flex;
  color: #999;
  .btn {
    cursor: pointer;
    margin: 3px;
    line-height: 20px;
    padding: 4px 12px;
    border: 1px solid #ddd;
    border-radius: 3px;
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


