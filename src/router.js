import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: `/`,
      name: `home`,
      component: () => import(`./views/home/home.vue`),
      meta: {
        keepAlive: true
      }
    },
    {
      path: `/playlistdetail`,
      name: `playlistdetail`,
      component: () => import(`./views/play-list-detail/playListDetail.vue`)
    },
    {
      path: `/moremusic`,
      name: `moremusic`,
      component: () => import(`./views/more-music/moreMusic.vue`)
    },
    {
      path: `/search`,
      name: `search`,
      component: () => import(`./views/search/search.vue`)
    },
    {
      path: `/playlist`,
      name: `playlist`,
      component: () => import(`./views/play-list/playList.vue`),
      meta: {
        keepAlive: true
      }
    },
    {
      path: `/artist`,
      component: () => import(`./views/artist`),
      children: [
        {
          path: `/`,
          component: () => import(`./views/artist/children/artist.vue`),
          meta: {
            keepAlive: true
          }
        },
        {
          path: `detail`,
          component: () => import(`./views/artist/children/artistDetail.vue`)
        }
      ]
    },
    {
      path: `/rankinglist`,
      component: () => import(`./views/ranking-list/ranking.vue`),
      children: [
        {
          path: `/`,
          component: () => import(`./views/ranking-list/children/allList.vue`),
          meta: {
            keepAlive: true
          }
        },
        {
          path: `detail`,
          name: `rankingDetail`,
          component: () =>
            import(`./views/ranking-list/children/listDetail.vue`)
        }
      ]
    },
    {
      path: `/personal`,
      name: `personal`,
      component: () => import(`./views/personal/personal.vue`),
      meta: {
        keepAlive: true
      }
    },
    {
      path: `/musiclist`,
      name: `musiclist`,
      component: () => import(`./views/music-list/musicList.vue`)
    },
    {
      path: `/find`,
      name: `find`,
      component: () => import(`./views/find/find.vue`)
    },
    {
      path: `*`,
      name: `notfont`,
      component: () => import(`./views/404/404.vue`)
    }
  ]
});
