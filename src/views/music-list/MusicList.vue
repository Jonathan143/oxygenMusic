<template>
  <div>
    <back-nav :title="this.$route.query.name"></back-nav>
    <song-list :listdata="list"></song-list>
  </div>
</template>

<script>
import BackNav from "@/components/BackNav.vue";
import SongList from "@/components/SongList.vue";
import {mapMutations} from "vuex";
export default {
  components: {
    BackNav,
    SongList
  },
  data() {
    return {
      list: [],
    }
  },
  methods: {
    ...mapMutations(['closeLoading']),
    getList() {
      this.list = JSON.parse(localStorage.getItem(this.$route.query.name));
    }
  },
  created() {
    this.closeLoading();
    this.getList();
  }
};
</script>

<style lang="stylus" scoped>
</style>