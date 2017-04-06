<template lang="html">
  <section class="main">
    <header class="header_bar">
      <div class="goback">
        <router-link :to="'/'">
          <el-button type="primary" size="mini"><i class="fa fa-chevron-left"></i> 返回上一页</el-button>
        </router-link>
      </div>
      <div class="current">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">管理后台</el-breadcrumb-item>
          <el-breadcrumb-item >管理员列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </header>
    <el-table :data="list" style="width: 96.5%;margin-left:20px;margin-top:20px;"  border>
      <el-table-column prop="id" label="管理员编号" width="150"></el-table-column>
      <el-table-column prop="username" label="管理员姓名"></el-table-column>
      <el-table-column label="管理员添加时间" width="180" inline-template>
        <span v-text="$utils.formatDate(row.time)"></span>
      </el-table-column>
      <el-table-column label="操作" width="220" inline-template>
        <template>
          <router-link :to="'/administrator/edit/'+row.id">
            <el-button type="primary" size="mini">编辑</el-button>
          </router-link>
          <el-button type="danger" @click="del(row.id)" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('manage', this.list, r => {
        this.list = r.data.list
      })
    },
    del (id) {
      if (window.confirm('您确定要删除此管理员吗？')) {
        this.$api.delete('manage/' + id, null, r => {
          window.alert('恭喜您，删除成功！')
          this.getData()
        })
      }
    }
  }
}
</script>

<style lang="css">
</style>
