  export default {
    formatDate (time) {
      if (!time) { return '-' }
      let t = new Date(time)
      let y = t.getFullYear()
      let m = t.getMonth() + 1
      let d = t.getDate()
      return y + '-' + m + '-' + d
    }
  }
