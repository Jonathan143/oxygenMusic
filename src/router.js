import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/playlistdetail",
      name: "playlistdetail",
      component: () => import("./views/playlistdetail/PlayListDetail.vue"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/moremusic",
      name: "moremusic",
      component: () => import("./views/moremusic/MoreMusic.vue"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/search",
      name: "search",
      component: () => import("./views/search/Search.vue"),
      meta: {
        keepAlive: false
      }
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
      children: [
        {
          path: "/",
          component: () => import("./views/artist/children/Artist.vue"),
          meta: {
            keepAlive: true
          }
        },
        {
          path: "detail",
          component: () => import("./views/artist/children/ArtistDetail.vue"),
        }
      ]
    },
    {
      path: "/rankinglist",
      component: () => import("./views/ranking-list/Ranking.vue"),
      children: [
        {
          path: "/",
          component: () => import("./views/ranking-list/children/AllList.vue")
        },
        {
          path: "detail",
          component: () => import("./views/ranking-list/children/ListDetail.vue")
        }
      ]
    }
  ]
});
