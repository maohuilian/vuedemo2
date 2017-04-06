<template>
  <div>
    <section class="main">
      <header class="header_bar">
        <div class="goback">
          <router-link :to="'/article'">
            <el-button type="primary" size="mini"><i class="fa fa-chevron-left"></i> 返回上一页</el-button>
          </router-link>
        </div>
        <div class="current">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">管理后台</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/article' }">文章列表</el-breadcrumb-item>
            <el-breadcrumb-item >文章详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </header>
      <el-form ref="list" :model="list" label-width="85px" class="article_edit">
        <el-form-item label="文章标题" prop="title" >
          <el-input v-model="list.title" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="归属栏目" >
          <el-select v-model="list.channel_id" disabled>
            <el-option v-for="i in channel" :value="i.id" :label="i.name"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="作者" prop="author">
           <el-input v-model="list.author" :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label="来源" prop="origin">
           <el-input v-model="list.origin" :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label="编辑" prop="editor">
           <el-input v-model="list.editor" :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label="内容" prop="content">
           <el-input type="textarea" :disabled="true" :autosize="{ minRows: 3, maxRows: 6}" v-model="list.content" class="textarea"></el-input>
         </el-form-item>
      </el-form>
      <!-- <table class="detail">
        <tr>
          <th>编号:</th>
          <td v-text="list.id"></td>
        </tr>
        <tr>
          <th>栏目名称:</th>
          <td v-text="list.channel_id"></td>
          <td v-for="(i,k) in channel">{{i.name}}</td>
        </tr>
        <tr>
          <th>标题:</th>
          <td v-text="list.title"></td>
        </tr>
        <tr>
          <th>作者:</th>
          <td v-text="list.author"></td>
        </tr>
        <tr>
          <th>来源:</th>
          <td v-text="list.origin"></td>
        </tr>
        <tr>
          <th>内容:</th>
          <td v-text="list.content"></td>
        </tr>
        <tr>
          <th>编辑:</th>
          <td v-text="list.editor"></td>
        </tr>
        <tr>
          <th>时间:</th>
          <td v-text="list.time"></td>
        </tr>
      </table> -->
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: this.$route.params.id,
      channel: [],
      list: {
        title: '', // 标题
        author: '', // 作者
        origin: '', // 来源
        editor: '', // 编辑
        content: '' // 内容
      }
    }
  },
  created () {
    this.getChannel()
    this.getData()
    // this.channel_name = window.sessionStorage.ff
    // console.log(this.channel_name)
  },
  methods: {
    getData () {
      this.$api.get('article/' + this.id, null, r => {
        this.list = r.data
        // console.log(this.list)
      })
    },
    getChannel () {
      this.$api.get('channel', null, r => {
        this.channel = r.data.list
      })
    },
    goSave () {
      if (this.id) {
        this.$api.put('article/' + this.id, this.list, r => {
          window.alert('编辑成功！')
          this.$router.go(-1)
        })
      } else {
        this.$api.post('article', this.list, r => {
          window.alter('添加成功！')
          this.$router.go(-1)
        })
      }
    }
  }
}
</script>
