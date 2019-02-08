<template>
  <div class="collection-container">
    <md-tabs>
      <md-tab-pane class="content" name="p1" label="歌单">
        <list :list="playlist" multi></list>
      </md-tab-pane>
      <md-tab-pane class="content" name="p2" label="歌手">
        <list :list="artist" circle></list>
      </md-tab-pane>
    </md-tabs>
    
  </div>
</template>

<script>
import { Tabs, TabPane, Icon } from 'mand-mobile';
import List from './List.vue';
export default {
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Icon.name]: Icon,
    List
  },
  data() {
    return {
      playlist: [],
      artist: []
    }
  },
  methods: {
    getlist() {
      let collection = localStorage.myCollection;
      let list = [];
      if (collection) {
        list = JSON.parse(collection);
        for (const item of list) {
          if(item.type == 'playlist'){
            this.playlist.push(item);
          } else {
            this.artist.push(item);
          }
        }
      }
    }
  },
  created() {
    this.getlist();
  }
};
</script>

<style lang="stylus" scoped>
.collection-container
  width 100%
  padding 20px
  background #FFF
  box-sizing border-box
  .content
    padding 12px 0
    font-size 28px
    background #FFF
    padding 20px
    line-height 1.5
    box-sizing border-box
</style>