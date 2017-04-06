<template lang="html">
    <div class="fy">
      <span v-if="page > 1">
        <a @click="goto(1)">首页</a>
        <a @click="goto(page-1)">上一页</a>
      </span>
      <span v-else>
        <a class="disabled">首页</a>
        <a class="disabled">上一页</a>
      </span>
      <a v-for="index in indexs()" @click="goto(index)" v-text="index" :class="{'active' : index === page}" class="num"></a>
      <span v-if="page < totalPage()">
        <a @click="goto(page+1)">下一页</a>
        <a @click="goto(totalPage())">尾页</a>
      </span>
      <span v-else>
        <a class="disabled">下一页</a>
        <a class="disabled">尾页</a>
      </span>
    </div>
</template>

<script>
export default {
  props: {
    total: '', // 总条数
    current: '' // 当前页
  },
  data () {
    return {
      pagesize: 10, // 每页的信息条数
      page: 1 // 当前页
    }
  },
  created () {
    this.page = this.current
  },
  methods: {
    goto (index) {
      if (index === this.page) return
      this.page = index
      this.$emit('gotoPage', index)
    },
    totalPage () {
      return Math.ceil(this.total / this.pagesize)
    },
    indexs () {
      var left = 1
      var right = this.totalPage()
      var ar = []
      if (this.totalPage() >= 11) { // 数字页数是1-10
        if (this.page > 5 && this.page < this.totalPage() - 4) {
          left = this.page - 5
          right = this.page + 4
        } else {
          if (this.page <= 5) {
            left = 1
            right = 10
          } else {
            right = this.totalPage()
            left = this.totalPage() - 9
          }
        }
      }
      // if (this.totalPage() >= 4) { // // 数字页数是1-3
      //   if (this.page > 1 && this.page < this.totalPage() - 1) {
      //     left = this.page - 1
      //     right = this.page + 1
      //   } else {
      //     if (this.page <= 2) {
      //       left = 1
      //       right = 3
      //     } else {
      //       right = this.totalPage()
      //       left = this.totalPage() - 2
      //     }
      //   }
      // }
      while (left <= right) {
        ar.push(left)
        left++
      }
      return ar
    }
  }
}
</script>

<style lang="css">
</style>
