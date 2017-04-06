<template lang="html">
  <div>
    <div class="login">
      <section class="login_box">
        <input type="text" name="username" v-model="dat.account" placeholder="用户名" class="username">
        <input type="password" name="password" v-model="dat.password" placeholder="密码" class="password">
        <input type="button" value="登 陆" @click="goSubmit" class="log">
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dat: {
        account: '',
        password: ''
      }
    }
  },
  created () {

  },
  methods: {
    goSubmit () {
      this.$api.post('login', this.dat, r => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="css">
</style>
