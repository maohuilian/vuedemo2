<template lang="html">
  <div>
    <section class="main">
      <header class="header_bar">
        <div class="goback">
          <router-link :to="'/channel'">
            <el-button type="primary" size="mini"><i class="fa fa-chevron-left"></i> 返回上一页</el-button>
          </router-link>
        </div>
        <div class="save">
          <el-button type="primary" size="mini" @click="goSave"><i class="fa fa-save"></i>  保存</el-button>
        </div>
        <div class="current">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">管理后台</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/channel' }">栏目列表</el-breadcrumb-item>
            <el-breadcrumb-item v-if="id">编辑栏目</el-breadcrumb-item>
            <el-breadcrumb-item v-else>添加栏目</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </header>
      <el-form :model="list" :rules="rules" ref="list" label-width="100px" class="article_edit">
        <el-form-item label="栏目名称" prop="name">
          <el-input v-model="list.name" class="search_title_title"></el-input>
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
      list: {
        name: '' // 栏目名称
      },
      rules: {
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.id) {
      this.getData()
    }
  },
  methods: {
    getData () {
      this.$api.get('channel/' + this.id, null, r => {
        this.list = r.data
      })
    },
    goSave () {
      this.$refs.list.validate((valid) => {
        // 符合规则
        if (valid) {
          if (this.id) {
            this.$api.put('channel/' + this.id, this.list, r => {
              window.alert('恭喜您，编辑成功!')
              this.$router.go(-1)
            })
          } else {
            this.$api.post('channel', this.list, r => {
              window.alert('恭喜您，添加成功')
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

<style lang="css">
</style>
