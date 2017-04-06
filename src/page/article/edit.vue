<template>
  <div>
    <section class="main">
      <header class="header_bar">
        <div class="goback">
          <router-link :to="'/article'">
            <el-button type="primary" size="mini"><i class="fa fa-chevron-left"></i> 返回上一页</el-button>
          </router-link>
        </div>
        <div class="save">
          <el-button type="primary" size="mini" @click="goSave"><i class="fa fa-save"></i>  保存</el-button>
        </div>
        <div class="current">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">管理后台</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/article' }">文章列表</el-breadcrumb-item>
            <el-breadcrumb-item v-if="id">编辑文章</el-breadcrumb-item>
            <el-breadcrumb-item v-else>添加文章</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </header>
      <el-form ref="list" :rules="rules" :model="list" label-width="85px" class="article_edit">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="list.title"></el-input>
        </el-form-item>
        <el-form-item label="归属栏目" >
          <el-select v-model="list.channel_id">
            <el-option v-for="i in channel" :value="i.id" :label="i.name"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="作者" prop="author">
           <el-input v-model="list.author"></el-input>
         </el-form-item>
         <el-form-item label="来源" prop="origin">
           <el-input v-model="list.origin"></el-input>
         </el-form-item>
         <el-form-item label="编辑" prop="editor">
           <el-input v-model="list.editor"></el-input>
         </el-form-item>
         <el-form-item label="内容" prop="content">
           <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" v-model="list.content" class="textarea"></el-input>
         </el-form-item>
      </el-form>
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
        title: '',
        channel_id: null, // 标题
        author: '', // 作者
        origin: '', // 来源
        editor: '', // 编辑
        content: '' // 内容
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        author: [
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        origin: [
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        editor: [
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getChannel()
  },
  methods: {
    getData () {
      this.$api.get('article/' + this.id, null, r => {
        this.list = r.data
      })
    },
    data (t) {
      this.list.content = t
    },
    getChannel () {
      this.$api.get('channel', null, r => {
        this.channel = r.data.list
        if (!this.id) {
          // 如果没有id，就显示栏目第一个
          this.list.channel_id = this.channel[0].id
        } else {
          // 否则，就去获取文章信息
          this.getData()
        }
      })
    },
    goSave () {
      // 校验数据是否符合规则
      this.$refs.list.validate((valid) => {
        // 符合规则
        if (valid) {
          if (this.id) {
            this.$api.put('article/' + this.id, this.list, r => {
              window.alert('编辑成功')
              this.$router.go(-1)
            })
          } else {
            this.$api.post('article', this.list, r => {
              window.alert('添加成功')
              this.$router.go(-1)
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
