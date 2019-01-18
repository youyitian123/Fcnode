import Vue from 'vue'
import Router from 'vue-router'
import article from '@/components/article'
import postList from '@/components/postList'
import userInfo from '@/components/userInfo'
import sideBar from '@/components/sideBar'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'postList',
    components: {
      main: postList
    }
  }, {
    path: '/topic/:id&:name',
    name: 'articleMsg',
    components: {
      main: article,
      sidebar: sideBar
    }
  }, {
    path: '/user/:name',
    name: 'userInfo',
    components: {
      main: userInfo,
    }
  }]
})
