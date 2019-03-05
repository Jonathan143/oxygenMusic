<template>
  <div class="offical-container">
    <div
      class="list"
      v-for="rank in rankinglist"
      :key="rank.id"
      @click="onlistClick(rank.name)"
    >
      <div class="cover-img-box">
        <img class="cover-img" v-lazy="rank.picUrl" :alt="rank.name" />
        <span class="up-time">{{ rank.updateFrequency }}</span>
      </div>
      <div class="list-info">
        <p class="music-list" v-for="(task, idx) in rank.tracks" :key="idx">
          {{ idx + 1 }}.{{ task.first }} - {{ task.second }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rankinglist: Array
  },
  methods: {
    onlistClick(name) {
      this.$emit(`list-click`, name);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.offical-container {
  .list {
    display: flex;
    margin-bottom: 20px;

    .cover-img-box {
      width: 200px;
      height: 200px;
      position: relative;

      .cover-img {
        width: 200px;
        height: 200px;
        border-radius: 8px;
      }

      .up-time {
        font-size: 20px;
        position: absolute;
        left: 8px;
        bottom: 8px;
        color: #fff;
      }
    }

    .list-info {
      height: 200px;
      display: flex;
      margin-left: 20px;
      flex-direction: column;
      justify-content: space-around;

      .music-list {
        width: 500px;
        font-size: 24px;
        ellipsis();
      }
    }
  }
}
</style>
