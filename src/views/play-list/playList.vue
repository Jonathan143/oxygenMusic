<template>
  <div class="play-list-container">
    <back-nav title="歌单分类"></back-nav>
    <div class="catlist">
      <div class="list"
        v-for="(item, idx) in catlist.categories"
        :key="idx">
        <catlist :title="item"
          :tags="catlist.categoryArry[idx]"
          @click-tag="clickCate"></catlist>
      </div>
    </div>
  </div>
</template>

<script>
import { getCatlist } from '@/untils'
import Catlist from './components/catList'
import BackNav from '@/components/backNav'
export default {
  components: {
    Catlist,
    BackNav
  },
  data() {
    return {
      catlist: {}
    }
  },
  methods: {
    getData() {
      this.axios(`playlist/catlist`).then(res => {
        this.catlist = getCatlist(res)
      })
    },
    clickCate(v) {
      this.$router.push({ path: `/moremusic`, query: { title: v } })
    }
  },
  created() {
    this.getData()
  },
  activated() {}
}
</script>

<style lang="stylus" scoped></style>
