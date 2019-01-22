<template>
  <div class="tab-bar">
    <i class="iconfont icon icon-menuon"></i>
    <md-tab-bar
      v-model="current"
      :items="items"
      :has-ink="false"
      @change="tabBarChange"
    >
      <template
        slot="item"
        slot-scope="{ item }"
      >
        <div class="custom-item">
          <i
            class="iconfont icon"
            :class="item.icon"
          ></i>
        </div>
      </template>
    </md-tab-bar>
    <i class="iconfont icon icon-sousuo1  "></i>
  </div>
</template>

<script>
import { TabBar, Icon } from "mand-mobile";

export default {
  name: "tab-bar-demo",
  components: {
    "md-tab-bar": TabBar,
    "md-icon": Icon
  },
  data() {
    return {
     current: 'home',
      items: [
        { name: 'user', icon: 'icon-wo1' },
        { name: 'home', icon: 'icon-yinle' },
        { name: 'find', icon: 'icon-faxian' }
      ]
    };
  },
  methods: {
    tabBarChange(item) {
      
    }
  }
};
</script>

<style lang="stylus" scope>
.is-active
  .icon
    opacity 1 !important
.tab-bar
    display flex
    background-color #928ffa
    justify-content space-between
    align-items center
    padding 0 20px
    .md-tab-bar
      width 50%
      padding 0
      background-color #928ffa
      .icon
        opacity 0.7
  .icon
    font-size 46px
    color #fff
    font-weight 600
</style>
