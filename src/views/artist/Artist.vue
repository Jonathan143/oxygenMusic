<template>
  <div class="artist-container">
    <back-nav title="热门歌手"></back-nav>
    <div class="artist-list">
      <artist-list> </artist-list>
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
  methods: {
    ...mapMutations(['closeLoading']),

  },
  created() {
    this.closeLoading();
  }
}
</script>

<style lang="stylus" scoped>
@import "~styles/mixins.styl";
.artist-container
  flex-container()
  .artist-list
    flex-content()
</style>