<template>
  <div class="sidebar_panel">
    <div class="user_card">
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

    <div class="other_topic">
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

    <div class="noreply_topic">
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
.sidebar_panel {
  float: right;
  width: 400px;
  background: #e1e1e1;
  margin-top: 10px;

  .noreply_topic,
  .other_topic,
  .user_card {
    border-radius: 3px;
    margin-bottom: 10px;
    background: #fff;
    .topic_title {
      padding: 10px;
    }
    .header {
      border-radius: 3px;
      background: #f5f5f5;
      padding: 10px;
      display: flex;
    }
  }

  .userinfo {
    padding: 10px;
    line-height: 130%;
    .user_avatar {
      width: 30px;
      height: 30px;
    }
  }
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


