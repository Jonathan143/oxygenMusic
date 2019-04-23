<template>
  <div class="scroll-view">
    <div class="top-container">
      <h2 class="title" @click="loadMore">{{ title }}</h2>
      <md-icon
        name="arrow-right"
        class="arrow-icon"
        @click="loadMore"
      ></md-icon>
    </div>
    <div class="scroll-view-list">
      <div
        class="scroll-view-item"
        v-for="song in musicData"
        :key="song.id"
        @click="playMusic(song)"
      >
        <div class="bg">
          <img
            class="img"
            v-lazy="song.picUrl"
            alt=""
            :class="{ circle: circle }"
          />
          <img
            class="item-img"
            v-lazy="song.picUrl"
            alt=""
            :class="{ circle: circle }"
          />
        </div>
        <p class="item-title" :class="[multi ? 'multi-ellipsis' : 'ellipsis']">
          {{ song.songName }}
        </p>
        <p class="item-sub-title">{{ song.singer }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'mand-mobile'
import { mapMutations } from 'vuex'
import { setMusic, lisenMusicAdd } from '@/untils'
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    musicData: {
      type: Array,
      required: true
    },
    multi: {
      type: Boolean,
      default: false
    },
    hasDetails: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'md-icon': Icon
  },
  methods: {
    ...mapMutations(['ADD_MUSIC']),
    playMusic(song) {
      if (this.hasDetails) {
        this.$router.push({
          path: '/playlistdetail',
          query: { id: song.id, title: song.songName }
        })
      } else {
        let playList = setMusic(song)
        this.ADD_MUSIC(playList)
        lisenMusicAdd(song)
      }
    },
    loadMore() {
      this.$router.push({ path: '/moremusic', query: { title: this.title } })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';

.scroll-view {
  width: 100%;
  padding: 20px;
  background: #FFF;
  box-sizing: border-box;

  .top-container {
    display: flex;
    justify-content: space-between;

    .title {
      color: $titleColor;
      font-size: 30px;
      font-weight: 500;
      padding: 10px 0;
    }

    .arrow-icon {
      padding: 10px 0;
    }
  }

  .scroll-view-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .scroll-view-item {
      margin-top: 20px;
      font-size: 22px;

      .bg {
        position: relative;
        width: 180px;
        height: 180px;

        .item-img {
          width: 180px;
          height: 180px;
          border-radius: 8px;
          bg-filter();
        }

        .img {
          f-filter();
        }
      }

      .item-title {
        width: 180px;
        margin-top: 20px;
        color: $titleColor;
        line-height: 36px;
        text-align: center;
      }

      .item-sub-title {
        ellipsis();
        width: 180px;
        font-size: 18px;
        color: $subColor;
        text-align: center;
      }
    }
  }
}

.multi-ellipsis {
  multiEllipsis();
}

.ellipsis {
  ellipsis();
}

.circle {
  border-radius: 50% !important;
}
</style>
