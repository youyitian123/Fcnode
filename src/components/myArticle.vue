<template>
  <div class="loading" v-if="isLoading">
    <img src="../assets/puff.svg" alt="123">
  </div>

  <div v-else class="myArticle_panel">
    <section class="content">
      <div class="header">
        <div class="topic_title">
          <span
            :class="[{put_good:(post.good == true),put_top:(post.top == true),topiclist_tab:(post.good != true && post.top != true )}]"
          >{{post | tabFormatter}}</span>
          
          <span class="topic_title_content">{{post.title}}</span>
        </div>
        <div class="changes">
          <span>发布于{{post.create_at | formaDate}}</span>
          <span>作者 {{post.author.loginname}}</span>
          <span>{{post.visit_count}} 次浏览</span>
          <span>来自 {{post | tabFormatter}}</span>
        </div>
      </div>

      <div class="markdofn_area">
        <div v-html="post.content" class="markdown-body"></div>
      </div>
    </section>

    <section class="reply_list">
      <div class="header">
        <span>{{sumIndex}} 回复</span>
      </div>

      <div v-for="(reply,index) in post.replies" :key="index" class="reply_list_item">
        <div class="author_content">
          <router-link
            :to="{
                  name:'userInfo',
                  params:{
                    name:reply.author.loginname
                  }
                  }"
          >
            <img :src="reply.author.avatar_url" alt class="user_avatar">
          </router-link>
          <div class="user_info">
            <router-link
              :to="{
                  name:'userInfo',
                  params:{
                    name:reply.author.loginname
                  }
                  }"
            >
              <span>{{reply.author.loginname}}</span>
            </router-link>
            <span class="reply_time">{{index +1}}楼 {{reply.create_at | formaDate}}</span>
          </div>
        </div>
        <div class="reply_content">
          <p v-html="reply.content" class="markdown-body"></p>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  name: "articleMsg",
  data() {
    return {
      isLoading: true,
      post: {}, //代表页面的所有属性
      sumIndex: 0
    };
  },
  methods: {
    getData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          if (res.data.success == true) {
            this.isLoading = false;
            this.post = res.data.data;
            this.sumIndex = this.post.replies.length;
            this.$bus.$emit("msg", true);
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
  watch: {
    $route(to, from) {
      this.getData();
    }
  }
};
</script>


<style lang="scss">
@import url("../assets/github-markdown.css"); //引入markdown样式

.loading {
  max-width: 960px;
  padding-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.myArticle_panel {
  float: left;
  margin-top: 10px;
  margin-right: 20px;
  max-width: 960px;
  border-radius: 3px;

  .content {
    border-radius: 3px;

    background: #fff;
    .header {
      border-radius: 3px;
      padding: 10px;
      border-bottom: 1px solid #e5e5e5;

      .topic_title {
        font-size: 22px;
        font-weight: 700;
        line-height: 130%;
        margin: 8px 0;
      }
      .changes {
        font-size: 12px;
        color: #838383;
        span:before {
          content: "•";
          margin: 0 4px;
        }
      }
    }
    .markdofn_area {
      padding: 10px;
    }
  }

  .reply_list {
    border-radius: 3px 0;
    background: #fff;
    margin-top: 10px;
    .header {
      background: #f5f5f5;
      padding: 10px;
    }
    .reply_list_item {
      border-top: 1px solid #e5e5e5;
      padding: 5px;
      .author_content {
        display: flex;
      }
      .user_info {
        margin-left: 10px;

        .reply_time {
          font-size: 11px;
          color: #08c;
        }
      }
      .user_avatar {
        width: 30px;
        height: 30px;
      }
      .reply_content {
        margin-left: 50px;
      }
    }
  }
}
</style>

