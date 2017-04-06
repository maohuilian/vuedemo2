<template lang="html">
  <div>
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
            <el-breadcrumb-item >栏目列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </header>
      <el-table :data="dat" style="width: 96.5%;margin-left:20px;margin-top:20px;"  border>
        <el-table-column prop="id" label="栏目编号" width="100"></el-table-column>
        <el-table-column prop="name" label="栏目名称"></el-table-column>
        <el-table-column label="操作" width="220" inline-template>
          <template>
            <router-link :to="'/channel/edit/'+row.id" class="channel_edit">
              <el-button type="primary" size="mini">编辑</el-button>
            </router-link>
            <el-button type="danger" class="channel_del" @click="channel_del(row.id)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="fy">
        <el-pagination :total="total" @current-change="goPage" :page-size="10" layout="prev, pager, next"></el-pagination>
      </div>
      <!-- <paging :total="total" :current="param.page" @gotoPage="goPage"></paging> -->
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dat: [],
      param: {
        page: 1
      },
      total: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('channel', this.param, r => {
        this.dat = r.data.list
        this.total = r.data.total
      })
    },
    channel_del (id) {
      if (window.confirm('确定删除该栏目吗？')) {
        this.$api.delete('channel/' + id, null, r => {
          window.alert('恭喜您，删除成功！')
          this.getData()
        })
      }
    },
    goPage (current) {
      this.param.page = current
      this.getData()
    }
  }
}
</script>

<style lang="css">
</style>
