import Vue from "vue";
import Router from "vue-router";
import Home from "./views/home/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "home",
      component: Home,
      meta: {
        keepAlive: true
      }
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
    }
  ]
});