<template>
  <div class="artist-list-container">
    <div
      class="artist-item"
      v-for="art in artistlist"
      :key="art.id"
      @click="onArtist(art)"
    >
      <div class="art-img">
        <img class="avatar" v-lazy="art.picUrl" alt="" />
      </div>
      <div class="right-box">
        <div class="info">
          <p class="name">
            {{ art.name }}
            <span class="art-alias" v-if="art.alias != ''"
              >({{ art.alias }})</span
            >
          </p>
          <p class="score">
            <i class="iconfont icon-hot-fire"></i>{{ art.score }}
          </p>
        </div>
        <i class="iconfont icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    artistlist: Array
  },
  methods: {
    onArtist(art) {
      this.$emit(`onartist`, art)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.iconfont {
  font-size: 32px;
}

.artist-list-container {
  font-size: 24px;
  padding: 20px;
  box-sizing: border-box;

  .artist-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background-color: #eee;
    border-radius: 12px;
    padding: 8px;
    box-sizing: border-box;
    box-shadow: inset 0 0.12rem 0.3rem 0 rgba(55, 56, 56, 0.2);

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      z-index: 1;
      margin-right: 12px;
      box-shadow: 0 0.2rem 0.5rem 0 rgba(55, 56, 56, 0.5);
    }

    .right-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .name {
        max-width: 560px;
        font-size: 26px;
        margin-bottom: 8px;
        margin-left: 4px;
        ellipsis();

        .art-alias {
          font-size: 22px;
        }
      }

      .icon-hot-fire {
        color: #ff3d00;
        margin-right: 4px;
      }
    }
  }
}
</style>
