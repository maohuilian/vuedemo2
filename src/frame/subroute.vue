<template>
  <div>
    <header class="header">
      <h1 class="logo"><a href="#"><i class="fa fa-list-alt"></i> 简单文章管理系统</a></h1>
      <div class="quit">
        <el-button type="danger" @click="logout" size="small"><i class="fa fa-window-close-o"></i> 退出</el-button>
      </div>
    </header>
    <nav class="menu">
      <dl v-for="i in nav">
        <dt><i class="fa" :class="i.icon"></i> {{i.name}}</dt>
        <dd v-for="ii in i.children">
          <router-link :to="ii.router" v-text="ii.name"></router-link>
        </dd>
      </dl>
    </nav>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        nav: [
          {
            name: '文章管理',
            icon: 'fa-file-text-o',
            children: [
              {name: '文章列表', router: '/article'},
              {name: '添加文章', router: '/article/add'}
            ]
          },
          {
            name: '栏目管理',
            icon: 'fa-list-alt',
            children: [
              {name: '栏目列表', router: '/channel'},
              {name: '添加栏目', router: '/channel/add'}
            ]
          },
          {
            name: '管理员管理',
            icon: 'fa-user-o',
            children: [
              {name: '管理员列表', router: '/administrator'},
              {name: '添加管理员', router: '/administrator/add'}
            ]
          },
          {
            name: '设置',
            icon: 'fa-cog',
            children: [
              {name: '系统设置', router: '/site'}
            ]
          }
        ]
      }
    },
    created () {
      this.getTest()
    },
    methods: {
      logout () {
        this.$api.get('logout', null, r => {
          this.$router.push('/login')
        })
      },
      getTest () {
        this.$api.get('article', null, r => {
        })
      }
    }
  }
</script>
