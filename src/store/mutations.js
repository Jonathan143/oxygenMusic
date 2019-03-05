let CLEAR_PLAY_LIST = state => {
  state.playList = []
  state.isPlayerShow = false
  localStorage.removeItem(`playList`)
}

let ADD_MUSIC = (state, item) => {
  for (const i of state.playList) {
    if (item.id == i.id) {
      state.onPlaying = state.playList.indexOf(i)
      return
    }
  }
  state.playList.unshift(item)
  if (state.playList.length) {
    state.isPlayerShow = true
  }
  localStorage.setItem(`playList`, JSON.stringify(state.playList))
}

let DEL_MUSIC = (state, id) => {
  let items = state.playList
  for (let i = 0; i < items.length; i++) {
    if (items[i].id == id) {
      items.splice(i, 1)
      state.playList = items
    }
  }
  localStorage.setItem(`playList`, JSON.stringify(state.playList))
}

let CHANGE_PLAYING_ID = (state, id) => {
  state.playingId = id
}

let CHANGE_PLAYING_LIST = (state, list) => {
  state.playList = list
  localStorage.setItem(`playList`, JSON.stringify(state.playList))
}

let CLOSE_LOADING = state => {
  state.isLoading = false
}
let OPEN_LOADING = state => {
  state.isLoading = true
}

let changeUserStatus = state => {
  state.isLogin = !state.isLogin
}
export default {
  CLEAR_PLAY_LIST,
  ADD_MUSIC,
  DEL_MUSIC,
  CHANGE_PLAYING_ID,
  CHANGE_PLAYING_LIST,
  CLOSE_LOADING,
  OPEN_LOADING,
  changeUserStatus
}
