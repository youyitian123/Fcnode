<template>
  <div>
    <div class="loading" v-if="isLoading">
      <img src="../assets/puff.svg" alt="123">
    </div>

    <div class="userinfo_panel" v-else>
      <div>
        <section class="userInfoMation">
          <div class="header">
            <a href="/" class="breadcrumb">主页</a>
            <span class="divider">/</span>
          </div>
          <div class="userinfo">
            <img :src="post.avatar_url" alt class="user_avatar">
            <span>{{post.loginname}}</span>
            <div class="user_profile">
              <p class="big">{{post.score}} 积分</p>
              <p>
                <a href>
                  <i class="fab fa-github"></i>
                  @{{post.loginname}}
                </a>
              </p>
            </div>
            <p class="col_fade">注册时间 {{post.create_at | formaDate}}</p>
          </div>
        </section>

        <section class="recent_topics_list">
          <div class="header">
            <span>最近创建的话题</span>
          </div>
          <div v-if="post.recent_topics.length == 0" class="recent_topics_item">无话题</div>
          <div
            v-else
            v-for="(recent,index) in post.recent_topics"
            :key="index"
            class="recent_topics_item"
          >
            <div class="call">
              <!--头像-->
              <img :src="recent.author.avatar_url" alt="头像" class="user_avatar">
              <!--回复/浏览-->
              <span class="reply_count"></span>

              <!--标题-->
              <span class="title">
                <router-link
                  :to="{
                  name:'articleMsg',
                  params:{
                    id:recent.id
                  }
                  }"
                >
                  <a href="javascript:void(0)">{{recent.title}}</a>
                </router-link>
              </span>

              <!--最后回复时间-->
              <span class="last_active_time">{{recent.last_reply_at | formaDate }}</span>
            </div>
          </div>
        </section>

        <section class="recent_replies_list">
          <div class="header">
            <span>最近参与的话题</span>
          </div>

          <div v-if="post.recent_replies.length == 0" class="recent_replies_item">无话题</div>
          <div
            v-else
            v-for="(recent,index) in post.recent_replies"
            :key="index"
            class="recent_replies_item"
          >
            <div class="call">
              <!--头像-->
              <img :src="recent.author.avatar_url" alt="头像" class="user_avatar">
              <!--标题-->
              <span class="title">
                <router-link
                  :to="{
                  name:'articleMsg',
                  params:{
                    id:recent.id
                  }
                  }"
                >
                  <a href="javascript:void(0)">{{recent.title}}</a>
                </router-link>
              </span>

              <!--最后回复时间-->
              <span class="last_active_time">{{recent.last_reply_at | formaDate }}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "UerInfo",
  data() {
    return {
      post: {},
      isLoading: true
    };
  },
  methods: {
    getData() {
      this.$http(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          if (res.status == 200) {
            this.isLoading = false;
            this.post = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.getData();
  },
  filters: {
    messageFormatter: function(value) {
      if (value.length != 0) {
        return value;
      } else {
        return "无话题";
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.loading {
  max-width: 960px;
  padding-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.userinfo_panel {
  max-width: 906px;
  margin: 10px auto;
  .userInfoMation {
    background: #fff;
    .header {
      border-radius: 3px 0;
      background: #f5f5f5;
      padding: 10px;
    }
    .userinfo {
      padding: 10px;
      line-height: 2em;
      color: #778087;
      border-top: 1px solid #e5e5e5;
      .user_avatar {
        width: 30px;
        height: 30px;
      }
    }
  }
  .recent_topics_list,
  .recent_replies_list {
    background: #fff;
    margin-top: 10px;
    .header {
      border-radius: 3px 0;
      background: #f5f5f5;
      padding: 10px;
    }
    .recent_topics_item,
    .recent_replies_item {
      position: relative;
      border-top: 1px solid #e5e5e5;
      padding: 5px;
      .user_avatar {
        width: 30px;
        height: 30px;
      }
      .last_active_time {
        position: absolute;
        right: 10px;
        font-size: 12px;
        top: 2px;
        color: #999;
      }
    }
  }
}
</style>
