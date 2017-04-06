<template lang="html">
  <div>
    <section class="main">
      <header class="header_bar">
        <div class="goback">
          <router-link :to="'/'">
            <el-button type="primary" size="mini"><i class="fa fa-chevron-left"></i> 返回上一页</el-button>
          </router-link>
        </div>
        <div class="save">
          <el-button type="primary" size="mini" @click="save"><i class="fa fa-save"></i>  保存设置</el-button>
        </div>
        <div class="current">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">管理后台</el-breadcrumb-item>
            <el-breadcrumb-item >系统设置</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </header>
      <el-form ref="list" :model="list" label-width="85px" class="article_edit">
        <el-form-item label="标题">
          <el-input v-model="list.title"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="list.name"></el-input>
        </el-form-item>
        <el-form-item label="版权信息">
          <el-input v-model="list.copyright"></el-input>
        </el-form-item>
      </el-form>
      <!-- <table class="article_edit">
        <tr>
          <th>标题</th>
          <td><el-input v-model="list.title" size="small"></el-input></td>
        </tr>
        <tr>
          <th>名称</th>
          <td><el-input v-model="list.name" size="small"></el-input></td>
        </tr>
        <tr>
          <th>版权信息</th>
          <td><el-input v-model="list.copyright" size="small"></el-input></td>
        </tr>
      </table> -->
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('site', null, r => {
        this.list = r.data
      })
    },
    save () {
      this.$api.put('site', this.list, r => {
        // this.$message('恭喜您，编辑成功')
        this.$alert('恭喜您，编辑成功', '提示')
        this.getData()
      })
    }
  }
}
</script>

<style lang="css">
</style>
