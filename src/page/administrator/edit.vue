<template lang="html">
  <div>
    <section class="main">
      <header class="header_bar">
        <div class="goback">
          <router-link :to="'/administrator'">
            <el-button type="primary" size="mini"><i class="fa fa-chevron-left"></i> 返回上一页</el-button>
          </router-link>
        </div>
        <div class="save">
          <el-button type="primary" size="mini" @click="goSave"><i class="fa fa-save"></i>  保存管理员</el-button>
        </div>
        <div class="current">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">管理后台</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/administrator' }">管理员列表</el-breadcrumb-item>
            <el-breadcrumb-item v-if="id">编辑管理员</el-breadcrumb-item>
            <el-breadcrumb-item v-else>添加管理员</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </header>
        <el-form :model="list" :rules="rules" ref="list" label-width="100px" class="article_edit">
          <el-form-item label="管理员名称" prop="username">
            <el-input v-model="list.username"></el-input>
          </el-form-item>
          <template v-if="id">
            <el-form-item label="原密码" prop="old_password">
              <el-input v-model="list.old_password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_password">
              <el-input v-model="list.new_password"></el-input>
            </el-form-item>
            <el-form-item label="重复新密码" prop="re_password">
              <el-input v-model="list.re_password"></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="密码" prop="password">
              <el-input v-model="list.password"></el-input>
            </el-form-item>
          </template>
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
        username: '',
        old_password: '',
        new_password: '',
        re_password: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        old_password: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
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
      this.$api.get('manage/' + this.id, null, r => {
        this.list = r.data
      })
    },
    goSave () {
      if (this.id) {
        let shu = this.list
        if (!shu.old_password || !shu.new_password || !shu.re_password) {
          window.alert('密码不能为空')
          return
        }
        //
        if (shu.old_password === shu.new_password) {
          window.alert('新密码和原密码不能相同')
          return
        }
        if (shu.new_password !== shu.re_password) {
          window.alert('重复新密码和新密码必须一致')
          return
        }
        this.$api.put('manage/' + this.id, shu, r => {
          window.alert('恭喜您，编辑成功！')
          this.$router.go(-1)
        })
      } else {
        this.$api.post('manage', this.list, r => {
          window.alert('恭喜您，添加成功！')
          this.$router.go(-1)
        })
      }
    }
  }
}
</script>

<style lang="css">
</style>
