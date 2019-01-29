//首页新歌速递
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

//首页个性推荐列表
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

//歌单详情列表
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

//格式化数字
let checkCount = v => {
  if (v > 10000) {
    let sv = v.toString();
    return sv.substring(0, sv.length - 4) + `万`;
  } else {
    return v;
  }
};

//设置播放器音乐源
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

//热搜标签
let getHotSearch = data => {
  let hotTags = [];
  for (const tag of data) {
    hotTags.push(tag.first)
  }
  return hotTags;
};

//获取搜索结果
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

//歌单分类列表
let getCatlist = data => {
  let categoryArry = [
    [],
    [],
    [],
    [],
    []
  ];
  let item = {};
  for (const cate of data.sub) {
    item = {
      name: cate.name,
      hot: cate.hot
    }
    categoryArry[cate.category].push(item);
  }
  let allCategory = {
    categories: data.categories,
    categoryArry: categoryArry,
  }
  return allCategory;
};

//获取歌手榜
let getArtists = data => {
  let artists = [];
  let art = {};
  for (const i of data) {
    let alias = ``;
    let picUrl = `${i.picUrl}?param=180y180`;
    if (i.alias.length != 0) {
      alias = i.alias[0];
    }
    art = {
      id: i.id,
      name: i.name,
      alias: alias,
      picUrl: picUrl,
      score: i.score
    };
    artists.push(art);
  }
  return artists;
};

//获取歌手部分信息和热门歌曲
let getArtistDetail = data => {
  let alias = ``;
  if (data.artist.alias.length != 0) {
    alias = data.artist.alias[0];
  }
  let picUrl = `${data.artist.picUrl}?param=400y400`;
  let artist = {
    alias: alias,
    picUrl: picUrl,
    id: data.artist.id,
    name: data.artist.name,
    albumSize: data.artist.albumSize,
    musicSize: data.artist.musicSize,
    briefDesc: data.artist.briefDesc
  }
  let hotSongs = [];
  let item = {};
  for (const i of data.hotSongs) {
    let picUrl = `${i.al.picUrl}?param=180y180`;
    item = {
      songName: i.name,
      id: i.id,
      singer: i.ar[0].name,
      alName: i.al.name,
      picUrl: picUrl
    };
    hotSongs.push(item);
  }
  let artDetail = {
    artist: artist,
    hotSongs: hotSongs
  };
  return artDetail;
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
  getSearchResult,
  getCatlist,
  getArtists,
  getArtistDetail
};