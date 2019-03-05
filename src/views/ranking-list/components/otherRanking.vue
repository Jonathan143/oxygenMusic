<template>
  <div class="othere-container">
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
      <p class="list-name">{{ rank.name }}</p>
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

.othere-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .list {
    margin-bottom: 32px;

    .cover-img-box {
      width: 226px;
      height: 226px;
      position: relative;

      .cover-img {
        width: 226px;
        height: 226px;
        border-radius: 8px;
      }

      .up-time {
        font-size: 20px;
        position: absolute;
        left: 0;
        bottom: 0;
        color: #fff;
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        border-radius: 0 0 8px 8px;
        background-color: rgba(66, 66, 66, 0.2);
      }
    }

    .list-name {
      margin-top: 12px;
      width: 226px;
      font-size: 22px;
      ellipsis();
    }
  }
}
</style>
