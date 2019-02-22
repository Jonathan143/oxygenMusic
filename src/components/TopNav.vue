<template>
  <div class="tab-bar">
    <i class="iconfont icon icon-menuon"></i>
    <md-tab-bar
      v-model="current"
      :items="items"
      :has-ink="false"
      @change="tabBarChange"
    >
      <template slot="item" slot-scope="{ item }">
        <div class="custom-item">
          <i class="iconfont icon" :class="item.icon"></i>
        </div>
      </template>
    </md-tab-bar>
    <i @click="toSearch" class="iconfont icon icon-sousuo1"></i>
  </div>
</template>

<script>
import { TabBar } from "mand-mobile";
import { mapMutations } from "vuex";
export default {
  components: {
    "md-tab-bar": TabBar
  },
  data() {
    return {
      current: "home",
      items: [
        { name: "personal", icon: "icon-wo1" },
        { name: "home", icon: "icon-yinle" },
        { name: "find", icon: "icon-faxian" }
      ]
    };
  },
  computed: {
    path() {
      return this.$route.path;
    }
  },
  watch: {
    path(v) {
      let p = ``;
      v == `/` ? (p = `home`) : (p = v.slice(1));
      this.current = p;
    }
  },
  methods: {
    ...mapMutations([`OPEN_LOADING`]),
    tabBarChange(item) {
      this.$router.push({ name: item.name });
    },
    toSearch() {
      this.$router.push(`/search`);
      this.OPEN_LOADING();
    }
  }
};
</script>

<style lang="stylus" scope>
.is-active {
  .icon {
    opacity: 1 !important;
  }
}

.tab-bar {
  display: flex;
  background-color: #928ffa;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 999;

  .md-tab-bar {
    width: 50%;
    padding: 0;
    background-color: #928ffa;

    .icon {
      opacity: 0.7;
    }
  }
}

.icon {
  font-size: 46px;
  color: #fff;
  font-weight: 600;
}
</style>
