<template>
  <div class="result-page"></div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {
    this.axios('event')
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error.message)
      })
  }
}
</script>

<style lang="stylus" scoped></style>
