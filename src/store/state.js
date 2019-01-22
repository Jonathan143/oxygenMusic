let isPlay = false;
let playList = [];
if (localStorage.playList) {
  playList = JSON.parse(localStorage.playList);
}
let isPlayerShow = false;
if (playList.length) {
  isPlayerShow = true;
}

let onPlaying = 0;
export default {
  isPlay,
  playList,
  isPlayerShow,
  onPlaying
};