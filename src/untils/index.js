let getSongs = data => {
  let songs = [];
  let item = {};
  for (const i of data) {
    let picUrl = `${i.song.album.picUrl}?param=180y180`;
    item = {
      songName: i.name,
      id: i.id,
      singer: i.song.artists[0].name,
      picUrl: picUrl
    };
    songs.push(item);
  }
  return songs;
};

let getpersonalizList = data => {
  let list = [];
  let item = {};
  for (const i of data) {
    let picUrl = `${i.picUrl}?param=180y180`;
    item = {
      songName: i.name,
      id: i.id,
      picUrl: picUrl
    };
    list.push(item);
  }
  return list;
};

let getPlayList = data => {
  let playList = [];
  let item = {};
  for (const i of data) {
    let picUrl = `${i.coverImgUrl}?param=180y180`;
    item = {
      songName: i.name,
      id: i.id,
      picUrl: picUrl
    };
    playList.push(item);
  }
  return playList;
};

let getsinger = data => {
  let singer = [];
  let item = {};
  let alias = ``;
  if (data.alias) {
    alias = data.alias;
  }
  for (const i of data) {
    item = {
      name: i.name,
      id: i.id,
      picUrl: i.imglvUrl,
      alias: alias
    };
    singer.push(item);
  }
  return singer;
};

let playListDetail = data => {
  let playList = {};
  let item = {};
  let tracks = [];
  for (const t of data.tracks) {
    let picUrl = `${t.al.picUrl}?param=180y180`;
    item = {
      songName: t.name, //歌名
      id: t.id,
      singer: t.ar[0].name, //歌手
      alName: t.al.name, //专辑名
      picUrl: picUrl //歌曲图片
    };
    tracks.push(item);
  }
  let playCount = checkCount(data.playCount);
  let commentCount = checkCount(data.commentCount);
  let shareCount = checkCount(data.shareCount);
  let subscribedCount = checkCount(data.subscribedCount);
  playList = {
    listName: data.name, //歌单名
    commentCount: commentCount, //评论数
    playCount: playCount, //播放量
    shareCount: shareCount, //分享数
    subscribedCount: subscribedCount, //收藏数
    trackCount: data.trackCount, //歌曲数量
    coverImgUrl: data.coverImgUrl, //歌单封面
    description: data.description, //歌单简介
    tags: data.tags, //标签数组
    creator: {
      avatarUrl: data.creator.avatarUrl, //创建者头像
      nickname: data.creator.nickname //创建者名
    },
    tracks: tracks
  };
  return playList;
};

let checkCount = v => {
  if (v > 10000) {
    let sv = v.toString();
    return sv.substring(0, sv.length - 4) + `万`;
  } else {
    return v;
  }
};
let setMusic = song => {
  let music = {};
  let url = `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`;
  music = {
    id: song.id,
    url: url,
    cover: song.picUrl,
    artist: song.singer,
    name: song.songName
  };
  return music;
};

let getMusicList = data => {
  let songs = [];
  let item = {};
  for (const i of data) {
    let picUrl = `${i.album.picUrl}?param=180y180`;
    item = {
      songName: i.name,
      id: i.id,
      singer: i.artists[0].name,
      picUrl: picUrl
    };
    songs.push(item);
  }
  return songs;
};
let getHotSearch = data => {
  let hotTags = [];
  for (const tag of data) {
    hotTags.push(tag.first)
  }
  return hotTags;
};
let getSearchResult = data => {
  let item = {};
  let tracks = [];
  for (const t of data) {
    let picUrl = `https://img-1256555015.file.myqcloud.com/2019/01/25/5c4a704d05904.png`;
    item = {
      songName: t.name, //歌名
      id: t.id,
      singer: t.artists[0].name, //歌手
      alName: t.album.name, //专辑名
      picUrl: picUrl //歌曲图片
    };
    tracks.push(item);
  }
  return tracks;
};
export {
  getSongs,
  getPlayList,
  getpersonalizList,
  getsinger,
  playListDetail,
  setMusic,
  getMusicList,
  getHotSearch,
  getSearchResult
};