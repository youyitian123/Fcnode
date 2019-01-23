<template>
  <div>
    <!--加载动画-->
    <div class="loading" v-if="isLoading">
      <img src="../assets/puff.svg" alt="加载动画">
    </div>

    <div class="postList_panel" v-else>
      <div class="content">
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
          <div v-for="post in posts" :key="post.id" class="topic_list_item">
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
.loading {
  min-width: 960px;
  margin-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.postList_panel {
  font-size: 14px;
  border-radius: 3px 0;
  max-width: 960px;
  margin: 20px auto;
  background: #ffffff;

  .content {
    .header {
      border-radius: 3px 0;
      background: #f5f5f5;
      padding: 10px;
      display: flex;
      .topic-tab {
        margin-right: 20px;
        color: #80bd01;
      }
    }

    .topic_list {
      .topic_list_item {
        position: relative;
        border-top: 1px solid #e5e5e5;
        padding: 10px;
        color: #333;

        .user_avatar {
          width: 30px;
          height: 30px;
        }

        .put_good,
        .put_top {
          padding: 1px 3px;
          border-radius: 3px;
          font-size: 12px;
          background: #80bd01;
          color: #fff;
          margin-right: 5px;
        }
        .topiclist_tab {
          background: #e5e5e5;
          padding: 1px 3px;
          border-radius: 3px;
          font-size: 12px;
          color: #999;
          margin-right: 5px;
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
}
</style>


