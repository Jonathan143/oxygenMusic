<template>
  <div class="artist-container">
    <back-nav title="热门歌手"></back-nav>
    <router-view></router-view>
    <div class="artist-list">
      <artist-list :artistlist="artistList"
        @onartist="toArtistDetail"></artist-list>
    </div>
  </div>
</template>

<script>
import BackNav from '@/components/backNav'
import ArtistList from '../components/artistList'
import { getArtists } from '@/untils'
export default {
  components: {
    BackNav,
    ArtistList
  },
  data() {
    return {
      artistList: []
    }
  },
  methods: {
    getArtistList() {
      this.axios(`toplist/artist`).then(res => {
        this.artistList = getArtists(res.list.artists)

        sessionStorage.setItem('isArtLoading', true)
      })
    },
    toArtistDetail(art) {
      this.$router.push({
        path: `/artist/detail`,
        query: { id: art.id, name: art.name }
      })
    }
  },
  created() {
    this.getArtistList()
  },
  activated() {
    if (sessionStorage.isArtLoading) {
    }
  }
}
</script>

<style lang="stylus" scoped></style>
