import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/home/Home.vue"),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/playlistdetail",
      name: "playlistdetail",
      component: () => import("./views/playlistdetail/PlayListDetail.vue")
    },
    {
      path: "/moremusic",
      name: "moremusic",
      component: () => import("./views/moremusic/MoreMusic.vue")
    },
    {
      path: "/search",
      name: "search",
      component: () => import("./views/search/Search.vue")
    },
    {
      path: "/playlist",
      name: "playlist",
      component: () => import("./views/playlist/PlayList.vue"),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/artist",
      component: () => import("./views/artist"),
      children: [{
          path: "/",
          component: () => import("./views/artist/children/Artist.vue"),
          meta: {
            keepAlive: true
          }
        },
        {
          path: "detail",
          component: () => import("./views/artist/children/ArtistDetail.vue")
        }
      ]
    },
    {
      path: "/rankinglist",
      component: () => import("./views/ranking-list/Ranking.vue"),
      children: [{
          path: "/",
          component: () => import("./views/ranking-list/children/AllList.vue"),
          meta: {
            keepAlive: true
          }
        },
        {
          path: "detail",
          name: "rankingDetail",
          component: () => import("./views/ranking-list/children/ListDetail.vue")
        }
      ]
    },
    {
      path: "/personal",
      name: "personal",
      component: () => import("./views/personal/Personal.vue"),
      // meta: {
      //   keepAlive: true
      // }
    }
  ]
});
