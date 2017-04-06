<template>
  <div>
    <section class="main">
      <h1 class="title">简单文章系统</h1>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.get_data()
  },
  methods: {
    get_data: function (params) {
      var v = this
      if (!params)params = {}
      v.$api.get('article', params, function (r) {
        v.list = r.data.list
      })
    }
  }
}
</script>
