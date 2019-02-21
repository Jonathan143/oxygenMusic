<template>
  <div class="personal-container">
    <div class="info">
      <div class="name-box">
        <h2 class="name">Oxygen Music</h2>
        <p class="indicator-text">一个基于vue.js音乐播放器</p>
      </div>
      <div class="avatar">
        <img
          class="av-img"
          src="https://img-1256555015.file.myqcloud.com/2019/01/25/5c4a704d05904.png"
          alt="Oxygen Music"
        />
      </div>
    </div>
    <div class="list-box">
      <div class="list" v-for="i in list" :key="i.id" @click="tolist(i.id)">
        <div class="icon-count">
          <i class="iconfont" :class="i.icon"></i>
          <span class="count">{{ i.count }}</span>
        </div>
        <p class="title">{{ i.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getPersonalList } from "@/untils";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    ...mapMutations(["closeLoading"]),
    tolist(name) {
      this.$router.push({ name: "musiclist", query: { name: name } });
    }
  },
  mounted() {
    this.closeLoading();
  },
  activated() {
    this.list = getPersonalList();
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';

.personal-container {
  padding: 20px;
  box-sizing: border-box;

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 20px 20px 0 #eee;
    box-sizing: border-box;

    .name-box {
      .name {
        font-size: 46px;
        font-weight: 500;
        color: $titleColor;
      }

      .indicator-text {
        color: #71819B;
        line-height: 32px;
        margin-top: 12px;
        width: 400px;
        multiEllipsis();
      }
    }

    .avatar {
      .av-img {
        width: 148px;
        height: 148px;
        border-radius: 50%;
      }
    }
  }

  .list-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px;

    .list {
      width: 320px;
      height: 180px;
      background-color: #fff;
      margin: 20px 0;
      padding: 20px 60px;
      border-radius: 16px;
      box-shadow: 0 20px 20px 0 #eee;
      box-sizing: border-box;

      .icon-count {
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .iconfont {
          font-size: 48px;
          color: #928ffa;
        }

        .count {
          font-size: 36px;
          color: #928ffa;
        }
      }

      .title {
        font-size: 26px;
        margin-top: 12px;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
