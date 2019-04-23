<template>
  <div class="msic-list-container">
    <back-nav :title="title"></back-nav>
    <collection-list v-if="this.$route.query.name == 'myCollection'"></collection-list>
    <song-list v-else
      :listdata="list"
      class="list"
      :clear-name="this.$route.query.name"></song-list>
  </div>
</template>

<script>
import BackNav from '@/components/backNav.vue'
import SongList from '@/components/songList.vue'
import CollectionList from './components/collectionList.vue'
export default {
  components: {
    BackNav,
    SongList,
    CollectionList
  },
  data() {
    return {
      list: [],
      title: ''
    }
  },
  methods: {
    getList() {
      let ls = localStorage.getItem(this.$route.query.name)
      if (ls) {
        this.list = JSON.parse(ls)
      }
    },
    setTitle() {
      switch (this.$route.query.name) {
        case `likeMusic`:
          this.title = `喜欢的音乐`
          break
        case `myRadio`:
          this.title = `我的电台`
          break
        case `recebtlyPlayed`:
          this.title = `最近播放`
          break
        case `myCollection`:
          this.title = `我的收藏`
          break
        default:
          this.title = ``
          break
      }
    }
  },
  created() {
    if (this.$route.query.name != `myCollection`) {
      this.getList()
    }
    this.setTitle()
  }
}
</script>

<style lang="stylus" scoped>
.msic-list-container {
  .list {
    // margin-top -20px
    // >>>.collection
    // display none
  }
}
</style>
