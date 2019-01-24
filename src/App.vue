<template>
  <div id="app">
    <topNav></topNav>
    <main class="clearfix">
      <router-view name="sidebar"></router-view>
      <router-view name="main"></router-view>
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
#app {
  background: #e1e1e1;
  main {
    max-width: 1400px;
    margin: 0 auto;
  }
}
</style>

