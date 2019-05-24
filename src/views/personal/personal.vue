<template>
  <div class="personal">
    <md-scroll-view class="scroll-view"
      ref="scrollView"
      :scrolling-x="false"
      @refreshing="$_onRefresh">
      <md-scroll-view-refresh slot="refresh"
        slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
        :scroll-top="scrollTop"
        :is-refreshing="isRefreshing"
        :is-refresh-active="isRefreshActive"></md-scroll-view-refresh>
      <a class="info"
        target="_blank"
        href="https://github.com/Jonathan143/oxygenMusic">
        <div class="name-box">
          <h2 class="name__wrap">
            <span class="name">{{ userInfo.name }}</span>
            <i class="info__level">Lv.{{userInfo.level}}</i>
          </h2>
          <p class="indicator-text">{{ userInfo.signature }}</p>
        </div>
        <div class="avatar">
          <img class="av-img"
            :src="userInfo.avatarUrl"
            alt="Oxygen Music" />
        </div>
      </a>
      <div class="list-box">
        <div class="list"
          v-for="i in list"
          :key="i.id"
          @click="tolist(i.id)">
          <div class="icon-count">
            <i class="iconfont"
              :class="i.icon"></i>
            <span class="count">{{ i.count }}</span>
          </div>
          <p class="title">{{ i.title }}</p>
        </div>
      </div>
      <div class="sign-out">
        <md-button class="sign-out__btn"
          round
          size="small"
          @click="signOut">
          {{ signText }}
        </md-button>
      </div>
    </md-scroll-view>
    <md-dialog :closable="true"
      v-model="login.open"
      :btns="login.btns">
      <md-tabs v-model="loginMode">
        <md-tab-pane name="verify"
          label="验证码登录">
          <md-input-item v-model="userID"
            ref="login"
            title="手机号码"
            type="phone"
            placeholder="输入手机号码"
            is-title-latent
            clearable
            is-highlight></md-input-item>
        </md-tab-pane>
        <md-tab-pane name="tel"
          label="账号密码登录">
          <md-input-item v-model="userID"
            ref="login"
            title="手机号"
            type="digit"
            placeholder="请输入手机号"
            is-title-latent
            clearable
            is-highlight></md-input-item>
          <md-input-item v-model="password"
            ref="login"
            title="密码"
            type="password"
            placeholder="密码"
            is-title-latent
            clearable
            is-highlight></md-input-item>
        </md-tab-pane>
      </md-tabs>
    </md-dialog>

    <md-captcha v-model="isCaptchaShow"
      :maxlength="4"
      brief="最新验证码依然有效，请勿重发"
      @send="reCaptchSend"
      @submit="onCaptchaSubmit">
      验证码已发送至{{telTxt}}
    </md-captcha>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getPersonalList, playListDetail } from '@/untils'
import {
  Dialog,
  InputItem,
  Toast,
  Tabs,
  TabPane,
  ScrollView,
  ScrollViewRefresh,
  Button,
  Captcha
} from 'mand-mobile'
import { setTimeout } from 'timers'
export default {
  components: {
    'md-dialog': Dialog,
    'md-input-item': InputItem,
    'md-tabs': Tabs,
    'md-tab-pane': TabPane,
    'md-captcha': Captcha,
    [ScrollView.name]: ScrollView,
    [ScrollViewRefresh.name]: ScrollViewRefresh,
    [Button.name]: Button
  },
  data() {
    return {
      isCaptchaShow: false,
      CanSendCaptcha: true,
      userID: '',
      password: '',
      loginMode: 'verify',
      list: [],
      login: {
        open: false,
        btns: [
          {
            text: '取消',
            handler: () => {
              this.login.open = false
            }
          },
          {
            text: '获取验证码',
            handler: this.onLoginConfirm
          }
        ]
      },
      userInfo: {
        name: `Oxygen Music`,
        signature: `一个基于vue.js音乐播放器`,
        avatarUrl: `https://img-1256555015.file.myqcloud.com/2019/01/25/5c4a704d05904.png`
      }
    }
  },
  computed: {
    ...mapState(['isLogin']),
    signText() {
      return this.isLogin ? '退出登录' : '登录'
    },
    telTxt() {
      const telTxt = String(this.userID)
      return telTxt.substr(0, 3) + '****' + telTxt.substr(7)
    }
  },
  watch: {
    loginMode(value) {
      let txt = ''
      value === 'tel' ? (txt = '登录') : (txt = '获取验证码')
      this.login.btns[1].text = txt
    }
  },
  methods: {
    ...mapMutations(['changeUserStatus']),
    tolist(name) {
      this.$router.push({ name: `musiclist`, query: { name: name } })
    },
    onLoginConfirm() {
      let userID = this.userID
      if (userID) {
        if (this.loginMode === 'tel' && this.password) {
          this.loginModeTel()
          this.password = ''
          Toast.loading('登录中...')
        } else if (this.loginMode === 'verify') {
          // this.loginModeUserID()
          if (userID.length !== 11) {
            Toast.failed('请输入正确的手机号')
            this.userID = ''
            return
          }

          this.isCaptchaShow = true
        } else {
          Toast.failed('请输入密码')
        }
      } else {
        Toast.failed('登录失败')
      }
    },
    // 发送验证码
    reCaptchSend() {
      this.axios(`captch/sent?phone=${this.userID}`)
        .then(data => {
          this.login.open = false
        })
        .catch(error => {
          this.isCaptchaShow = false
          this.userID = ''
        })
    },

    onCaptchaSubmit(code) {
      this.axios(`captch/verify?phone=${this.userID}&captcha=${code}`).then(
        data => {
          this.isCaptchaShow = false
          Toast.succeed('登录成功')
          this.reUserStatus()
        }
      )
    },

    reUserStatus() {
      this.axios('login/status').then(data => {
        this.userID = data.userId
        this.loginModeUserID()
      })
    },

    getPlaylist() {
      const userID = this.userID || JSON.parse(localStorage.userID)
      this.axios(`/user/playlist?uid=${userID}`).then(res => {
        let list = res.playlist
        let listInfo = {}
        let playlist = []
        for (const item of list) {
          listInfo = {
            id: item.id,
            picUrl: item.coverImgUrl,
            songName: item.name,
            type: 'playlist'
          }
          playlist.push(listInfo)
        }
        // 拉去本地存储 我的收藏 数据合并
        // let myCollection = [];
        // let ls = localStorage.getItem("myCollection");

        // if (ls) {
        //   myCollection = JSON.parse(ls);
        // }
        // myCollection = [...playlist, ...myCollection];
        localStorage.setItem('likeListId', JSON.stringify(playlist[0].id))

        localStorage.setItem('myCollection', JSON.stringify(playlist))
        this.getlikeMusic()
      })
    },
    getlikeMusic() {
      this.axios(
        `/playlist/detail?id=${JSON.parse(localStorage.likeListId)}`
      ).then(res => {
        let likeMusic = playListDetail(res.playlist).tracks
        localStorage.setItem('likeMusic', JSON.stringify(likeMusic))

        this.list = getPersonalList()

        this.$refs.scrollView.finishRefresh()
      })
    },
    loginModeTel() {
      this.axios({
        method: 'post',
        url: `/login/cellphone`,
        params: {
          phone: this.userID,
          password: this.password
        }
      }).then(res => {
        this.userID = res.account.id
        this.loginModeUserID()
      })
    },
    loginModeUserID() {
      const userID = this.userID || JSON.parse(localStorage.userID)
      this.axios(`/user/detail?uid=${userID}`)
        .then(res => {
          this.userInfo = {
            id: res.userPoint.userId,
            name: res.profile.nickname,
            signature: res.profile.signature,
            avatarUrl: res.profile.avatarUrl,
            level: res.level
          }
          this.login.open = false
          if (!localStorage.userInfo) {
            this.changeUserStatus()
          }
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
          localStorage.setItem('userID', JSON.stringify(this.userInfo.id))
          Toast.hide()
          this.getPlaylist()
        })
        .catch(() => {
          Toast.hide()
          setTimeout(() => {
            Toast.failed('登录失败')
            this.userID = ''
            this.$refs.login.focus()
          }, 10)
        })
    },
    $_onRefresh() {
      if (localStorage.userInfo) {
        this.loginModeUserID()
      } else {
        this.list = getPersonalList()
        setTimeout(() => {
          this.$refs.scrollView.finishRefresh()
        }, 1000)
      }
    },
    signOut() {
      if (this.isLogin) {
        let removeList = ['userInfo', 'likeMusic', 'myCollection']
        this.removeLS(removeList)

        this.list = getPersonalList()
        this.userInfo = {
          name: `Oxygen Music`,
          signature: `一个基于vue.js音乐播放器`,
          avatarUrl: `https://img-1256555015.file.myqcloud.com/2019/01/25/5c4a704d05904.png`
        }

        this.changeUserStatus()
        this.axios('login/status').then(() => {
          Toast.succeed('已退出登录')
        })
      } else {
        this.login.open = true
      }
    },
    removeLS(removeList) {
      for (const removeItem of removeList) {
        localStorage.removeItem(removeItem)
      }
    }
  },
  mounted() {
    let user = localStorage.userInfo
    if (user) {
      this.userInfo = JSON.parse(user)
      // this.$refs.scrollView.triggerRefresh();
    } else {
      this.login.open = true
    }
  },
  activated() {
    this.list = getPersonalList()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';

.personal {
  position: absolute;
  height: calc(100% - 150px);

  .scroll-view {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;

    .sign-out {
      width: 200px;
      margin: 0 auto;

      &__btn {
        background-color: #928ffa;
      }

      >>>.md-button-content {
        color: #fff;
      }
    }
  }

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

    &__level {
      display: inline-block;
      font-size: 20px;
      padding: 4px 16px;
      background-color: #e8eaec;
      border-radius: 18px;
      margin-left: 8px;
    }

    .name-box {
      .name {
        font-size: 42px;
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
