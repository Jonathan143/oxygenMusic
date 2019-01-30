<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["closeLoading"])
  },
  mounted() {
    this.closeLoading();
  }
};
</script>

<style scoped>
</style>