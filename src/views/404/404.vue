<template>
  <div class="result-page">
    <md-result-page
      type="lost"
      text="您要访问的页面已丢失"
      subtext="3秒后跳转首页"
    >
    </md-result-page>
  </div>
</template>

<script>
import { ResultPage } from 'mand-mobile'
export default {
  components: {
    [ResultPage.name]: ResultPage
  },
  methods: {
    goHome() {
      setTimeout(() => {
        this.$router.push('/')
      }, 3000)
    }
  },
  mounted() {
    this.goHome()
  }
}
</script>

<style lang="stylus" scoped>
.result-page {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #FFF;
}
</style>
