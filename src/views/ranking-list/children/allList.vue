<template>
  <div>
    <back-nav title="排行榜"></back-nav>
    <div class="rankinglist-content">
      <h2 class="title">官方榜</h2>
      <offical-ranking :rankinglist="rankinglist.officalRanking"
        @list-click="onRanklist"></offical-ranking>
      <h2 class="title other-title">其他排行榜</h2>
      <other-ranking :rankinglist="rankinglist.otherRanking"
        @list-click="onRanklist"></other-ranking>
    </div>
  </div>
</template>

<script>
import BackNav from '@/components/backNav'
import OfficalRanking from '../components/officalRanking'
import OtherRanking from '../components/otherRanking'
import { allRankinglist } from '@/untils'
export default {
  components: {
    BackNav,
    OfficalRanking,
    OtherRanking
  },
  data() {
    return {
      rankinglist: {}
    }
  },
  methods: {
    getRankinglist() {
      this.axios(`toplist/detail`).then(res => {
        this.rankinglist = allRankinglist(res.list)

        sessionStorage.isRanklistLoading = true
      })
    },
    onRanklist(name) {
      this.$router.push({ name: `rankingDetail`, query: { name: name } })
    }
  },
  created() {
    this.getRankinglist()
  },
  activated() {
    if (sessionStorage.isRanklistLoading) {
    }
  }
}
</script>

<style lang="stylus" scoped>
.rankinglist-content {
  font-size: 24px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;

  .title {
    color: #303133;
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  .other-title {
    margin: 40px 0 12px;
  }
}
</style>
