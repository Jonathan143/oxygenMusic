<template>
  <div class="artist-container">
    <back-nav title="热门歌手"></back-nav>
    <router-view></router-view>
    <div class="artist-list">
      <artist-list :artistlist="artistList" @onartist="toArtistDetail"></artist-list>
    </div>
  </div>
</template>

<script>
import BackNav from '@/components/BackNav';
import ArtistList from './components/ArtistList';
import { getArtists } from '@/untils';
import { mapMutations } from 'vuex';
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
    ...mapMutations(['closeLoading']),
    getArtistList() {
      this.axios('toplist/artist').then(res => {
        this.artistList = getArtists(res.data.list.artists);
        this.closeLoading();
      })
    },
    toArtistDetail(id) {
      this.$router.push({ name: 'artistdetail', query: { id: id }})
    }
  },
  created() {
    this.getArtistList();
  },
  activated() {
    this.closeLoading();
  },
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl";
.artist-container
  flex-container()
  .artist-list
    flex-content()
</style>