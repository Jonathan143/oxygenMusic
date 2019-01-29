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
    ...mapMutations(['closeLoading','openLoading']),
    getArtistList() {
      this.axios('toplist/artist').then(res => {
        this.artistList = getArtists(res.data.list.artists);
        this.closeLoading();
        sessionStorage.setItem('isArtLoading',true);
      })
    },
    toArtistDetail(art) {
      this.openLoading();
      this.$router.push({ name: 'artistdetail', query: { id: art.id, name: art.name }})
    }
  },
  created() {
    this.getArtistList();
  },
  activated() {
    if(sessionStorage.isArtLoading){
      this.closeLoading();
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>