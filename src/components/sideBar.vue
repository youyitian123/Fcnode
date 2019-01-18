<template>
  <div id="sidebar" v-if="isLoading">
    <div class="user_card wallpaper">
      <div class="header">作者</div>
      <div class="userinfo">
        <router-link
          :to="{
                  name:'userInfo',
                  params:{
                    name:post.loginname
                  }
                  }"
        >
          <img :src="post.avatar_url" alt class="user_avatar">
          <span>{{post.loginname}}</span>
        </router-link>
        <p class="big">积分: {{post.score}}</p>
      </div>
    </div>

    <div class="other_topic wallpaper">
      <div class="header">作者最近创建的话题</div>
      <ul>
        <li v-for="(item,index) in post.recent_topics" class="topic_title" :key="index">
          <router-link
            :to="{
                  name:'articleMsg',
                  params:{
                    id:item.id,
                    name:item.author.loginname
                  }
                  }"
          >{{item.title}}</router-link>
        </li>
      </ul>
    </div>
    <div class="noreply_topic wallpaper">
      <div class="header">作者最近参与的话题</div>
      <ul>
        <li v-for="(item,index) in post.recent_replies" class="topic_title" :key="index">
          <router-link
            :to="{
                  name:'articleMsg',
                  params:{
                    id:item.id,
                    name:item.author.loginname
                  }
                  }"
          >{{item.title}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// @import url("../assets/default.scss"); // 引入共有scss属性
#sidebar{
  max-width: 390px;;
}
.user_card {
  .userinfo {
    font-size: 14px;
    padding: 10px;
    color: #778087;
    line-height: 2em;
    .big {
      color: #333;
    }
    .user_avatar {
      width: 40px;
      height: 40px;
      border-radius: 3px;
    }
  }
}
.other_topic {
  color: #778087;
}
.noreply_topic {
  color: #778087;
}
.topic_title {
  padding: 5px;
}
</style>

<script>
export default {
  name: "sideBar",
  data() {
    return {
      isLoading: false,
      post: []
    };
  },
  methods: {
    getData() {
      this.$http(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          this.post = res.data.data;
          this.isLoading = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getData();
  }
};
</script>


