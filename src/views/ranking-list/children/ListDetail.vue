<template>
  <div>
    detail
  </div>
</template>

<script>
import { findRankinglistIdx } from "@/untils";
export default {
  methods: {
    
  },
  created() {
    let idx = findRankinglistIdx(this.$route.query.name);
  }
};
</script>

<style scoped>
</style>