<template>
  <div id="postlist">
    <!--加载动画-->
    <div class="loading" v-if="isLoading">
      <img src="../assets/puff.svg" alt="加载动画">
    </div>

    <div v-else class="panel">
      <!--主题帖子列表-->
      <div class="header">
        <a href="#" class="topic-tab">全部</a>
        <a href="#" class="topic-tab">精华</a>
        <a href="#" class="topic-tab">分享</a>
        <a href="#" class="topic-tab">问答</a>
        <a href="#" class="topic-tab">招聘</a>
        <a href="#" class="topic-tab">客户端测试</a>
      </div>

      <div class="topic_list">
        <div v-for="post in posts" :key="post.id" class="topic_list_item inner">
          <!--头像-->
          <img :src="post.author.avatar_url" alt="头像" class="user_avatar">
          <!--回复/浏览-->
          <span class="reply_count">
            <span class="count_of_replies">{{post.reply_count}}</span>
            <span class="count_seperator">/</span>
            <span class="count_of_visits">{{post.visit_count}}</span>
          </span>
          <!--分类-->
          <span
            :class="[{put_good:(post.good == true),put_top:(post.top == true),topiclist_tab:(post.good != true && post.top != true )}]"
          >{{post | tabFormatter}}</span>
          <!--标题-->
          <span class="title">
            <router-link
              :to="{
                  name:'articleMsg',
                  params:{
                    id:post.id,
                    name:post.author.loginname
                  }
                  }"
            >
              <a href="javascript:void(0)">{{post.title}}</a>
            </router-link>
          </span>

          <!--最后回复时间-->
          <span class="last_active_time">{{post.create_at | formaDate }}</span>
        </div>
      </div>
      <pagination @handle="renderlist"></pagination>
    </div>
  </div>
</template>



<script>
import pagination from "./pagination";

export default {
  name: "postList",
  data() {
    return {
      isLoading: true,
      posts: [],
      postpage: 1
    };
  },
  methods: {
    getData() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics/", {
          params: {
            page: this.postpage,
            limit: 20
          }
        })
        .then(res => {
          ``;
          this.isLoading = false;
          this.posts = res.data.data;
          console.log(this.posts);
          // console.log(res.data.data[0].author);
        })
        .catch(err => {
          console.log(err);
        });
    },
    renderlist(page) {
      this.postpage = page;
      console.log(this.postpage);
      this.getData();
    }
  },
  beforeMount() {
    this.getData();
  },
  components: {
    pagination
  }
};
</script>


<style lang="scss" scoped>
@import url("../assets/default.scss"); // 引入共有scss属性
@import url("../assets/github-markdown.css"); //引入markdown样式

.panel {
  background: #fff;

  /**
 * 分类栏
 */
  .header {
    border-radius: 3px 3px 0 0;
    padding: 15px;
    background: #f6f6f6;
    font-size: 14px;
    .topic-tab {
      color: #80bd01;
      margin: 0 10px;
    }
    a:nth-child(1) {
      background-color: #80bd01;
      color: #fff;
      padding: 3px 4px;
      border-radius: 3px;
    }
  }

  /**
 * 内容
 */
  .topic_list {
    .topic_list_item {
      position: relative;
      color: #333;
      padding: 10px;
      .user_avatar {
        width: 30px;
        height: 30px;
      }
      .reply_count {
        .count_of_replies {
          color: #9e78c0;
        }
        .count_of_visits {
          font-size: 10px;
          color: #b4b4b4;
        }
      }
      .last_active_time {
        position: absolute;
        right: 10px;
        top: 5px;
        font-size: 11px;
        color: #778087;
      }
    }
  }
}
</style>


