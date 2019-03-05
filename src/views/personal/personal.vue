<template>
  <div class="personal-container">
    <a class="info" href="https://github.com/Jonathan143/oxygenMusic">
      <div class="name-box">
        <h2 class="name">{{ userInfo.name }}</h2>
        <p class="indicator-text">{{ userInfo.signature }}</p>
      </div>
      <div class="avatar">
        <img class="av-img" :src="userInfo.avatarUrl" alt="Oxygen Music" />
      </div>
    </a>
    <div class="list-box">
      <div class="list" v-for="i in list" :key="i.id" @click="tolist(i.id)">
        <div class="icon-count">
          <i class="iconfont" :class="i.icon"></i>
          <span class="count">{{ i.count }}</span>
        </div>
        <p class="title">{{ i.title }}</p>
      </div>
    </div>

    <md-dialog :closable="true" v-model="login.open" :btns="login.btns">
      <md-tabs v-model="loginMode">
        <md-tab-pane name="tel" label="账号密码登录">
          <md-input-item
            v-model="userID"
            ref="login"
            title="手机号"
            type="digit"
            placeholder="请输入手机号"
            is-title-latent
            clearable
            is-highlight
          ></md-input-item>
          <md-input-item
            v-model="password"
            ref="login"
            title="密码"
            type="password"
            placeholder="密码"
            is-title-latent
            clearable
            is-highlight
          ></md-input-item>
        </md-tab-pane>
        <md-tab-pane name="userId" label="userID登录">
          <md-input-item
            v-model="userID"
            ref="login"
            title="userid"
            type="digit"
            placeholder="输入userID登录"
            is-title-latent
            clearable
            is-highlight
          ></md-input-item>
        </md-tab-pane>
      </md-tabs>
    </md-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getPersonalList, playListDetail } from "@/untils";
import { Dialog, InputItem, Toast, Tabs, TabPane } from "mand-mobile";
export default {
  data() {
    return {
      userID: "",
      password: "",
      loginMode: "tel",
      list: [],
      login: {
        open: false,
        btns: [
          {
            text: "取消",
            handler: () => {
              this.login.open = false;
            }
          },
          {
            text: "登录",
            handler: this.onLoginConfirm
          }
        ]
      },
      userInfo: {
        name: `Oxygen Music`,
        signature: `一个基于vue.js音乐播放器`,
        avatarUrl: `https://img-1256555015.file.myqcloud.com/2019/01/25/5c4a704d05904.png`
      }
    };
  },
  components: {
    "md-dialog": Dialog,
    "md-input-item": InputItem,
    "md-tabs": Tabs,
    "md-tab-pane": TabPane
  },
  methods: {
    ...mapMutations(["CLOSE_LOADING"]),
    tolist(name) {
      this.$router.push({ name: `musiclist`, query: { name: name } });
    },
    onLoginConfirm() {
      let userID = this.userID;
      if (userID) {
        if (this.loginMode === "tel" && this.password) {
          this.loginModeTel();
        } else {
          this.loginModeUserID();
        }
        Toast.loading("登录中...");
      } else {
        Toast.failed("登录失败");
      }
    },
    getPlaylist() {
      this.axios(`/user/playlist?uid=${JSON.parse(localStorage.userID)}`).then(
        res => {
          let list = res.data.playlist;
          let listInfo = {};
          let playlist = [];
          for (const item of list) {
            listInfo = {
              id: item.id,
              picUrl: item.coverImgUrl,
              songName: item.name,
              type: "playlist"
            };
            playlist.push(listInfo);
          }
          let myCollection = [];
          let ls = localStorage.getItem("myCollection");

          if (ls) {
            myCollection = JSON.parse(ls);
          }
          myCollection = [...playlist, ...myCollection];
          localStorage.setItem("myCollection", JSON.stringify(myCollection));
          this.list = getPersonalList();
        }
      );
    },
    getlikeMusic() {
      this.axios(`/playlist/detail?id=326709783`).then(res => {
        let likeMusic = playListDetail(res.data.playlist).tracks;
        localStorage.setItem("likeMusic", JSON.stringify(likeMusic));
        this.list = getPersonalList();
      });
    },
    loginModeTel() {
      this.axios({
        method: "post",
        url: `/login/cellphone`,
        params: {
          phone: "18270487784",
          password: "yj143143"
        }
      }).then(res => {
        this.userID = res.data.account.id;
        this.loginModeUserID();
      });
    },
    loginModeUserID() {
      this.axios(`/user/detail?uid=${this.userID}`)
        .then(res => {
          this.userInfo = {
            id: res.data.userPoint.userId,
            name: res.data.profile.nickname,
            signature: res.data.profile.signature,
            avatarUrl: res.data.profile.avatarUrl
          };
          this.login.open = false;
          localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
          localStorage.setItem("userID", JSON.stringify(this.userInfo.id));
          Toast.hide();
          this.getPlaylist();
        })
        .catch(() => {
          Toast.hide();
          setTimeout(() => {
            Toast.failed("登录失败");
            this.userID = "";
            this.$refs.login.focus();
          }, 10);
        });
    }
  },
  mounted() {
    this.CLOSE_LOADING();
    let user = localStorage.userInfo;
    if (user) {
      this.userInfo = JSON.parse(user);
    } else {
      this.login.open = true;
    }
    this.getlikeMusic();
  },
  activated() {
    this.list = getPersonalList();
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';

.personal-container {
  padding: 20px;
  box-sizing: border-box;

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 20px 20px 0 #eee;
    box-sizing: border-box;
    text-decoration: none;

    .name-box {
      .name {
        font-size: 46px;
        font-weight: 500;
        color: $titleColor;
      }

      .indicator-text {
        color: #71819B;
        line-height: 32px;
        margin-top: 12px;
        width: 400px;
        multiEllipsis();
      }
    }

    .avatar {
      .av-img {
        width: 148px;
        height: 148px;
        border-radius: 50%;
      }
    }
  }

  .list-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px;

    .list {
      width: 320px;
      height: 180px;
      background-color: #fff;
      margin: 20px 0;
      padding: 20px 60px;
      border-radius: 16px;
      box-shadow: 0 20px 20px 0 #eee;
      box-sizing: border-box;

      .icon-count {
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .iconfont {
          font-size: 48px;
          color: #928ffa;
        }

        .count {
          font-size: 36px;
          color: #928ffa;
        }
      }

      .title {
        font-size: 26px;
        margin-top: 12px;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
