<template>
  <div id="myArticle">
    <div class="loading" v-if="isLoading">
      <img src="../assets/puff.svg" alt="123">
    </div>

    <div class="panel" v-else>
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

        <div class="markdown_area">
          <div v-html="post.content" class="markdown-body"></div>
        </div>
      </section>

      <section class="reply_list">
        <div class="header">
          <span>{{sumIndex}} 回复</span>
        </div>
        <div v-for="(reply,index) in post.replies" :key="index" class="reply_list_item inner">
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
@import url("../assets/default.scss"); // 引入共有scss属性
@import url("../assets/github-markdown.css"); //引入markdown样式

#myArticle{
  max-width: 1440px;
  min-width: 960px;
  margin-right: 20px;
}
  .markdown-body {
    padding: 0 20px;
    background: #fff;
  }

  .content {
    margin-bottom: 10px;
    .header {
      border-bottom: 1px solid #e5e5e5;
      background: #fff;
      .topic_title {
        margin: 8px 0;
        .topic_title_content {
          font-size: 22px;
          font-weight: 700;
        }
      }
      .changes {
        line-height: 20px;
        span {
          font-size: 12px;
          color: #838383;
        }
        span::before {
          content: "•";
          padding: 0 5px;
        }
      }
    }
  }
  .reply_list {
    .reply_list_item {
      padding: 10px;
      background: #fff;
      .author_content {
        display: flex;
        .user_info {
          margin-left: 10px;
          color: #666;
          font-size: 12px;
          font-weight: 700;
          .reply_time {
            color: #005580;
            font-size: 11px;
          }
        }
      }
      .reply_content {
        margin-top: -10px;
        margin-left: 30px;
      }
    }
  }
</style>

