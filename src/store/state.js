let isLoading = true;
let isPlay = false;
let currentIcon = `home`;
let playList = [];
if (localStorage.playList) {
  playList = JSON.parse(localStorage.playList);
}
let isPlayerShow = false;
if (playList.length) {
  isPlayerShow = true;
}

let onPlaying = 0; //添加歌曲时列表有相同歌曲时的index
let playingId = 0;
export default {
  isLoading,
  isPlay,
  currentIcon,
  playList,
  isPlayerShow,
  onPlaying,
  playingId
};
