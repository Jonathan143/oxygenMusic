<template>
  <div class="list-container">
    <div
      class="item"
      v-for="item in list"
      :key="item.id"
      @click="toDetail(item)"
    >
      <div class="bg">
        <img
          class="img"
          v-lazy="item.picUrl"
          alt=""
          :class="{ circle: circle }"
        />
        <img
          class="item-img"
          v-lazy="item.picUrl"
          alt=""
          :class="{ circle: circle }"
        />
      </div>
      <p class="item-title" :class="[multi ? 'multi-ellipsis' : 'ellipsis']">
        {{ item.songName }}
      </p>
      <p class="item-sub-title">{{ item.singer }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    circle: {
      type: Boolean,
      default: false
    },
    multi: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toDetail(item) {
      if (item.type == `playlist`) {
        this.$router.push({
          path: `/playlistdetail`,
          query: { id: item.id, title: item.songName }
        })
      } else {
        this.$router.push({
          path: `/artist/detail`,
          query: { id: item.id, name: item.songName }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';

.list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
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
