<template>
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
            <el-breadcrumb-item :to="{ path: '/article' }">文章列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </header>
      <el-form ref="param"  :inline="true" :model="param" class="search">
        <el-form-item label="标题">
          <el-input v-model="param.title" size="small" class="search_title_title"></el-input>
        </el-form-item>
        <el-form-item label="栏目名称">
          <el-select v-model="channel_id" clearable placeholder="请选择" class="search_title_id" size="small">
            <el-option v-for="i in channel" :value="i.id" :label="i.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" class="search_title_button" @click="goSearch">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list" style="width: 96.5%;margin-left:20px;"  border>
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="channel.name" label="栏目名称" width="160"></el-table-column>
        <el-table-column label="时间" width="180" inline-template>
          <span v-text="$utils.formatDate(row.time)"></span>
        </el-table-column>
        <el-table-column label="操作" width="220" inline-template>
          <template>
            <router-link :to="'/article/detail/'+row.id">
              <el-button type="info" size="mini">查看</el-button>
            </router-link>
            <router-link :to="'/article/edit/'+row.id">
              <el-button type="primary" size="mini">编辑</el-button>
            </router-link>
            <el-button type="danger" @click="del(row.id)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <paging :total="total" :current="param.page" @gotoPage="goPage"></paging> -->
      <div class="fy">
        <el-pagination :total="total" @current-change="goPage" :page-size="10" layout="prev, pager, next"></el-pagination>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        list: [],
        channel: [],
        channel_id: null,
        param: {
          title: '',
          channel_id: null,
          page: 1
        },
        total: null
      }
    },
    watch: {
      channel_id: function () {
        this.param.channel_id = this.channel_id
        console.log(this.param.channel_id)
      }
    },
    created () {
      this.getChannel()
      this.getData()
    },
    methods: {
      getData () {
        this.$api.get('article', this.param, r => {
          this.list = r.data.list
          this.total = r.data.total
        })
      },
      getChannel () {
        this.$api.get('channel', null, r => {
          this.channel = r.data.list
        })
      },
      goSearch () {
        this.getData()
      },
      del (id) {
        if (window.confirm('确定删除该文章吗？')) {
          this.$api.delete('article/' + id, null, r => {
            window.alert('删除成功！')
            this.getData()
          })
        }
      },
      goPage (i) {
        this.param.page = i
        this.getData()
      }
      // look () {
      //   window.sessionStorage.ff = this.channel.name
      //   console.log(window.sessionStorage.ff)
      // }
    }
  }
</script>
