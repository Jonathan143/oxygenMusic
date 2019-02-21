<template>
  <div class="more-music-container">
    <back-nav :title="this.$route.query.title"></back-nav>
    <load-more class="more-music-loading"
      :dataUrl="url"
      :multi="multi"
      :hasDetails="hasDetails"
      :circle="circle"></load-more>
  </div>
</template>

<script>
import LoadMore from "@/components/LoadMore";
import BackNav from "@/components/BackNav";
export default {
  components: {
    LoadMore,
    BackNav
  },
  data() {
    return {
      url: "",
      multi: true,
      hasDetails: true,
      circle: false
    };
  },
  created() {
    this.getUrl(this.$route.query.title);
  },
  methods: {
    getUrl(key) {
      switch (key) {
        case "热门歌单":
          this.url = "top/playlist?order=hot&limit=";
          break;
        case "新歌速递":
          this.url = "personalized/newsong";
          this.multi = false;
          this.hasDetails = false;
          this.circle = true;
          break;
        case "最新歌单":
          this.url = "top/playlist?order=new&limit=";
          break;
        default:
          this.url = `top/playlist?cat=${this.$route.query.title}&order=hot&limit=`;
          break;
      }
    }
  }
};
</script>
