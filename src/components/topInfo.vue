<template>
  <div class="top-bg-container">
    <div
      class="bg-img"
      :style="{ backgroundImage: `url(${list.coverImgUrl})` }"
    ></div>
    <div class="list-info">
      <img class="list-img" :src="list.coverImgUrl" alt="" />
      <div class="right">
        <p class="title">{{ list.listName }}</p>
        <div class="ar">
          <img class="nick-img" :src="list.avatarUrl" alt="" />
          <p class="nick-name">{{ list.nickname }}</p>
          <icon name="arrow-right" color="#fff" size="sm"></icon>
        </div>
        <ul class="tags" v-if="tags.length != 0">
          <li>#</li>
          <li v-for="(tag, idx) in tags" :key="idx">{{ tag }}</li>
        </ul>
      </div>
      <div class="operating">
        <div class="operat-item">
          <i class="iconfont icon-tingge"></i>
          <p class="opeart-count">{{ list.playCount }}</p>
        </div>
        <div class="operat-item">
          <i class="iconfont icon-pinglun"></i>
          <p class="opeart-count">{{ list.commentCount }}</p>
        </div>
        <div class="operat-item">
          <i class="iconfont icon-feiji"></i>
          <p class="opeart-count">{{ list.shareCount }}</p>
        </div>
        <div class="operat-item">
          <i class="iconfont icon-comment"></i>
          <p class="opeart-count">{{ list.subscribedCount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "mand-mobile";
export default {
  props: ["list"],
  components: {
    Icon
  },
  computed: {
    tags() {
      let tags = Array.of(this.list.tags);
      return tags.join(`.`);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.top-bg-container {
  width: 100%;
  height: 420px;
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 24px;
  position: relative;

  .bg-img {
    width: 100%;
    height: 420px;
    position: absolute;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(16px);
    opacity: 0.8;
  }

  .list-info {
    width: 100%;
    padding: 120px 20px 0 20px;
    display: flex;
    box-sizing: border-box;

    .list-img {
      width: 200px;
      height: 200px;
      border-radius: 16px;
      margin-right: 20px;
      z-index: 1;
    }

    .right {
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      z-index: 1;
      padding-left: 20px;
      border-radius: 16px;
      background: rgba(66, 66, 66, 0.2);

      .title {
        width: 430px;
        color: #fff;
      }

      .ar {
        display: flex;
        align-items: center;

        .nick-img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .nick-name {
          font-size: 24px;
          color: #fff;
          margin-right: 2px;
        }
      }

      .tags {
        display: flex;

        li {
          color: #fff;
          font-size: 24px;
        }
      }
    }

    .operating {
      position: absolute;
      width: 640px;
      height: 140px;
      background-color: #fff;
      bottom: -70px;
      left: calc(50% - 320px);
      border-radius: 8px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-s();

      .operat-item {
        text-align: center;

        .iconfont {
          font-size: 60px;
          color: #928ffa;
        }

        .opeart-count {
          color: #928ffa;
        }
      }
    }
  }
}
</style>
