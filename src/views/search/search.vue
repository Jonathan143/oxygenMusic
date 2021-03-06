<template>
  <div class="search-container">
    <back-nav :title="title"></back-nav>
    <div class="search-input">
      <md-input-item v-model="searchValue"
        ref="search"
        title="search"
        placeholder="音乐/视频/电台/用户"
        is-title-latent
        clearable
        :is-highlight="highlight"
        @focus="onSearchFocus"
        @blur="onSearchBlur"
        @keyup="onEnter">
        <i class="iconfont icon-sousuo1"
          slot="left"
          :class="{ 'high-light': highlight }"></i>
      </md-input-item>
    </div>
    <div class="search">
      <div class="search-tags"
        v-show="!hasResult">
        <tags class="hot-tags"
          title="热门搜索"
          :tags="hotTags"
          @click-tag="onTagClick"></tags>
        <transition name="loading-transition"
          leave-active-class="animated fadeOutRight"
          enter-active-class="animated bounceIn">
          <tags class="history-tags"
            title="历史搜索"
            :tags="historyTags"
            deleicon
            v-show="showHistory"
            @cleartags="clearTags"
            @click-tag="onTagClick"></tags>
        </transition>
      </div>
      <transition name="loading-transition"
        enter-active-class="animated bounceIn">
        <song-list class="search-content"
          v-show="hasResult"
          :listdata="searchResult"></song-list>
      </transition>
    </div>
    <div class="search-loading"
      v-show="isLoading">
      <md-activity-indicator :size="56"
        :text-size="36"
        text-color="#9025fc"
        color="#9025fc"
        vertical>loading</md-activity-indicator>
    </div>
  </div>
</template>

<script>
import BackNav from '@/components/backNav'
import SongList from '@/components/songList'
import Tags from './components/tags'
import { InputItem, ActivityIndicator } from 'mand-mobile'
import { getHotSearch, getSearchResult } from '@/untils'
export default {
  components: {
    BackNav,
    Tags,
    SongList,
    'md-input-item': InputItem,
    'md-activity-indicator': ActivityIndicator
  },
  data() {
    return {
      title: '搜索',
      hasResult: false,
      searchValue: '',
      highlight: true,
      hotTags: [],
      historyTags: [],
      searchResult: [],
      isLoading: false,
      oldSearchValue: ''
    }
  },
  computed: {
    showHistory() {
      if (this.historyTags.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onSearchFocus() {
      this.highlight = true
    },
    onSearchBlur() {
      this.highlight = false
    },
    onEnter(n, e) {
      if (
        e.keyCode == 13 &&
        this.searchValue &&
        this.searchValue != this.oldSearchValue
      ) {
        this.isLoading = true
        this.getSearch(this.searchValue)
        this.oldSearchValue = this.searchValue
        this.$refs.search.blur()
        this.searchValue = ''
      }
    },
    getSearch(searchValue) {
      this.axios(`search?keywords=${searchValue}`).then(res => {
        this.searchResult = getSearchResult(res.result.songs)
        this.hasResult = true
        this.isLoading = false
      })
      this.title = `搜索 - ${searchValue}`
      let tags = []
      if (localStorage.historyTags) {
        tags = JSON.parse(localStorage.historyTags)
      }
      if (!tags.includes(searchValue)) {
        tags.unshift(searchValue)
        if (tags.length > 10) {
          tags.splice(-1, tags.length - 10)
        }
        localStorage.setItem(`historyTags`, JSON.stringify(tags))
      }
    },
    setHotTags() {
      this.axios(`search/hot`).then(res => {
        this.hotTags = getHotSearch(res.result.hots)

        this.$refs.search.focus()
      })
    },
    getHistoryTags() {
      if (localStorage.historyTags) {
        this.historyTags = JSON.parse(localStorage.historyTags)
      }
    },
    clearTags() {
      localStorage.removeItem(`historyTags`)
      this.historyTags = []
    },
    onTagClick(tagValue) {
      this.isLoading = true
      this.getSearch(tagValue)
      this.oldSearchValue = tagValue
    }
  },
  created() {
    this.setHotTags()
    this.getHistoryTags()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';
@import '~styles/varibles.styl';

.search-container {
  background-color: #fff;

  .search-input {
    width: 90%;
    margin: 0 auto;

    >>>.md-field-item-content {
      &::before {
        background-color: $themeColor !important;
      }

      .md-field-item-title {
        color: $themeColor;
      }

      .md-input-item-input {
        font-size: 28px;
        font-weight: normal;
        color: $titleColor;
      }

      .icon-sousuo1 {
        font-size: 32px;
        font-weight: 600;
        color: $themeColor;
      }
    }
  }

  .search {
    .search-tags {
      padding: 0 20px;

      .hot-tags, .history-tags {
        margin-top: 32px;
      }
    }
  }

  .search-content {
    >>>.collection {
      display: none;
    }
  }
}

.high-light {
  color: $themeColor;
}

.search-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.6);
}
</style>
