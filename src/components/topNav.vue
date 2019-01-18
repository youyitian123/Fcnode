<template>
  <div id="topnav">
    <div class="container">
      <img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" alt>
      <ul class="headerList">
        <li>
          <a href="#">首页</a>
        </li>
        <li>
          <a href="#">新手入门</a>
        </li>
        <li>
          <a href="#">API</a>
        </li>
        <li>
          <a href="#">关于</a>
        </li>
        <li>
          <a href="#">注册</a>
        </li>
        <li>
          <a href="#">登陆</a>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  name: "Header"
};
</script>

<style lang="scss" scoped>
ol,
ul {
  li {
    list-style: none;
  }
}

/**
*/

.container {
  background: #444;
  padding: 10px 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    vertical-align: initial;
    height: 34px;
    width: 120px;
  }

  .headerList {
    display: flex;
    li {
      margin-right: 30px;
      a {
        color: #ccc;
        font-size: 13px;
        text-decoration: none;
      }
    }
  }
}
</style>


