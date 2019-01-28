<template>
  <div>
    歌手详情页
  </div>
</template>

<script>
import {mapMutations} from "vuex";
export default {
  methods: {
    ...mapMutations(['closeLoading'])
  },
  created() {
    this.closeLoading();
  }
};
</script>

<style lang="stylus" scoped>
</style>