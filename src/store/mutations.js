let clearPlayList = state => {
  state.playList = [];
  state.isPlayerShow = false; 
  localStorage.removeItem(`playList`);
};

let addMusic = (state, item) => {
  for (const i of state.playList) {
    if (item.id == i.id) {
      state.onPlaying = state.playList.indexOf(i);
      return;
    }
  }
  state.playList.unshift(item);
  if (state.playList.length) {
    state.isPlayerShow = true;
  }
  localStorage.setItem(`playList`, JSON.stringify(state.playList));
};

let delMusic = (state, id) => {
  let items = state.playList;
  for (let i = 0; i < items.length; i++) {
    if (items[i].id == id) {
      items.splice(i, 1);
      state.playList = items;
    }
  }
  localStorage.setItem(`playList`, JSON.stringify(state.playList));
};

let changePlayingId = (state, id) => {
  state.playingId = id;
};

let changePlayList = (state, list) => {
  state.playList = list;
  localStorage.setItem(`playList`, JSON.stringify(state.playList));
};

let closeLoading = state => {
  state.isLoading = false;
};
let openLoading = state => {
  state.isLoading = true;
};
export default {
  clearPlayList,
  addMusic,
  delMusic,
  changePlayingId,
  changePlayList,
  closeLoading,
  openLoading
};
