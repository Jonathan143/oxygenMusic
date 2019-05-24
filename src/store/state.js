const isLoading = false
const isPlay = false
const currentIcon = `home`
let playList = []
if (localStorage.playList) {
  playList = JSON.parse(localStorage.playList)
}
let isPlayerShow = false
if (playList.length) {
  isPlayerShow = true
}

const onPlaying = 0 //添加歌曲时列表有相同歌曲时的index
const playingId = 0

const isLogin = !!localStorage.userInfo
export default {
  isLoading,
  isPlay,
  currentIcon,
  playList,
  isPlayerShow,
  onPlaying,
  playingId,
  isLogin
}
