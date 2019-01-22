<template>
  <div class="swp">
    <md-swiper
      transition="fade"
    >
      <md-swiper-item
        :key="idx"
        v-for="(item, idx) in banner"
      >
        <div class="banner-item">
          <img
            :src="item.imageUrl"
            alt=""
          >
        </div>
      </md-swiper-item>
    </md-swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "mand-mobile";

export default {
  name: "swiper",
  components: {
    [Swiper.name]: Swiper,
    [SwiperItem.name]: SwiperItem
  },
  data() {
    return {
      banner: []
    };
  },
  created() {
    this.axios("banner").then(res => {
      let imgs = [];
      let banner = {};
      for (const item of res.data.banners) {
        banner = {
          imageUrl: item.imageUrl,
          targetId: item.targetId
        };
        imgs.push(banner);
      }
      this.banner = imgs;
    });
  },
  methods: {}
};
</script>

<style lang="stylus">
.swp
  width 100%
  height 320px
  .md-swiper-item 
    width 750px
  .banner-item
    float left
    width 100%
    height 320px
    img
      width 100%
      height 320px
</style>
