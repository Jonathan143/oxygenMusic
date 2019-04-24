<template>
  <div class="home-container">
    <div class="content">
      <banner :banner="banner"></banner>
      <btn-nav></btn-nav>
      <div class="music-content">
        <scroll-view
          class="scroll-view"
          title="新歌速递"
          :musicData="newSong"
          circle
        ></scroll-view>
        <scroll-view
          class="scroll-view"
          title="热门歌单"
          multi
          :hasDetails="true"
          :musicData="hotPlayList"
        ></scroll-view>
        <scroll-view
          class="scroll-view"
          title="最新歌单"
          multi
          :hasDetails="true"
          :musicData="newPlayList"
        ></scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollView from './components/scrollView'
import banner from '@/components/banner'
import BtnNav from './components/btnNav'
import { getSongs, getPlayList } from '@/untils'
export default {
  name: 'home',
  components: {
    ScrollView,
    banner,
    BtnNav
  },
  data() {
    return {
      current: 'home',
      newSong: [],
      newPlayList: [],
      hotPlayList: [],
      banner: []
    }
  },
  created() {
    this.getBanner()
    this.getNewSong()
    this.getNewPlayList()
    this.getHotPlayList()
  },
  methods: {
    getNewSong() {
      this.axios(`personalized/newsong`).then(res => {
        this.newSong = getSongs(res.result).splice(0, 6)
      })
    },
    getNewPlayList() {
      this.axios(`top/playlist?limit=6&order=new`).then(res => {
        this.newPlayList = getPlayList(res.playlists)
      })
    },
    getHotPlayList() {
      this.axios(`top/playlist?limit=6&order=hot`).then(res => {
        this.hotPlayList = getPlayList(res.playlists)
      })
    },
    getBanner() {
      this.axios(`banner`).then(res => {
        let imgs = []
        let banner = {}
        for (const item of res.banners) {
          banner = {
            imageUrl: item.imageUrl,
            targetId: item.targetId
          }
          imgs.push(banner)
        }
        this.banner = imgs
      })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
