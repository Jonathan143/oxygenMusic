<template>
  <div class="result-page"></div>
</template>

<script>
export default {
  data() {
    return {
      userid: 259801485,
      dynamicList: []
    }
  },
  computed: {},
  methods: {
    reDynamic() {
      this.axios('event').then(data => {
        this.dynamicList = data.event
      })
    }
  },
  mounted() {
    // mock: 'http://10.10.10.11:7300/mock/5cbed8d04641760f22d2ceba/music/event'
    // if (localStorage.userID) this.userid = localStorage.userID
    this.reDynamic()
  }
}
</script>

<style lang="stylus" scoped></style>
