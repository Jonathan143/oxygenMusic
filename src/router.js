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
        KeepAlive: true
      }
    },
    {
      path: "/playlistdetail",
      name: "playlistdetail",
      component: () => import("./views/playlistdetail/PlayListDetail.vue"),
      meta: {
        KeepAlive: false
      }
    }
  ]
});