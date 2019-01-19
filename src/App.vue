<template>
  <div id="app">
    <topNav></topNav>
    <main>
      <router-view name="main"></router-view>
      <router-view name="sidebar"></router-view>
    </main>
  </div>
</template>

<script>
import topNav from "./components/topNav";
import postList from "./components/postList";
import myArticle from "./components/myArticle";

export default {
  name: "App",
  components: {
    topNav,
    postList,
    myArticle
  }
};
</script>


<style lang="scss">
@import url("./assets/default.scss"); // 引入共有scss属性

main {
  width: 90%;
  margin: 15px auto;
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>

