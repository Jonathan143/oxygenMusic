<template>
  <div class="hot-container">
    <div class="title-container">
      <h2 class="title">{{ title }}</h2>
      <i class="iconfont icon-lajitong" @click="clearTag" v-if="deleicon"></i>
    </div>
    <div class="tags">
      <md-tag
        size="large"
        shape="circle"
        sharp="bottom-left"
        type="fill"
        fill-color="linear-gradient(90deg, #25C1FF 0%, #0F77FF 100%)"
        font-color="#fff"
        v-for="(tag, idx) in tags"
        :key="idx"
        @click.native="onClickTag(tag)"
        >{{ tag }}</md-tag
      >
    </div>
  </div>
</template>

<script>
import { Tag } from 'mand-mobile'
export default {
  props: {
    title: String,
    tags: Array,
    deleicon: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'md-tag': Tag
  },
  methods: {
    clearTag() {
      this.$emit(`cleartags`)
    },
    onClickTag(tag) {
      this.$emit(`click-tag`, tag)
    }
  }
}
</script>

<style lang="stylus" scoped>
.hot-container {
  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46px;

    .title {
      font-size: 26px;
      font-weight: 600;
    }

    .icon-lajitong {
      font-size: 32px;
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;

    >>>.md-tag {
      margin: 20px 24px 0 0;

      .default {
        padding: 8px 12px !important;
      }
    }
  }
}
</style>
