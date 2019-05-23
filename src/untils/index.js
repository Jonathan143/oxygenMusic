function setPicUrl(params) {
  if (params) return `${params.slice(5)}?param=180y180`
}
//首页新歌速递
let getSongs = data => {
  let songs = []
  let item = {}
  for (const i of data) {
    item = {
      songName: i.name,
      id: i.id,
      singer: i.song.artists[0].name,
      picUrl: setPicUrl(i.song.album.picUrl),
      alName: i.song.album.name
    }
    songs.push(item)
  }
  return songs
}

//首页个性推荐列表
let getpersonalizList = data => {
  let list = []
  let item = {}
  for (const i of data) {
    item = {
      songName: i.name,
      id: i.id,
      picUrl: setPicUrl(i.picUrl)
    }
    list.push(item)
  }
  return list
}

let getPlayList = data => {
  let playList = []
  let item = {}
  for (const i of data) {
    item = {
      songName: i.name,
      id: i.id,
      picUrl: setPicUrl(i.coverImgUrl)
    }
    playList.push(item)
  }
  return playList
}

let getsinger = data => {
  let singer = []
  let item = {}
  let alias = ``
  if (data.alias) {
    alias = data.alias
  }
  for (const i of data) {
    item = {
      name: i.name,
      id: i.id,
      picUrl: setPicUrl(i.imglvUrl),
      alias: alias
    }
    singer.push(item)
  }
  return singer
}

//歌单详情列表
let playListDetail = data => {
  let playList = {}
  let item = {}
  let tracks = []
  for (const t of data.tracks) {
    item = {
      songName: t.name, //歌名
      id: t.id,
      singer: t.ar[0].name, //歌手
      alName: t.al.name, //专辑名
      picUrl: setPicUrl(t.al.picUrl) //歌曲图片
    }
    tracks.push(item)
  }
  let playCount = checkCount(data.playCount)
  let commentCount = checkCount(data.commentCount)
  let shareCount = checkCount(data.shareCount)
  let subscribedCount = checkCount(data.subscribedCount)
  let coverImgUrl = setPicUrl(data.coverImgUrl)
  playList = {
    listName: data.name, //歌单名
    commentCount: commentCount, //评论数
    playCount: playCount, //播放量
    shareCount: shareCount, //分享数
    subscribedCount: subscribedCount, //收藏数
    trackCount: data.trackCount, //歌曲数量
    coverImgUrl: coverImgUrl, //歌单封面
    description: data.description, //歌单简介
    tags: data.tags, //标签数组
    avatarUrl: data.creator.avatarUrl, //创建者头像
    nickname: data.creator.nickname, //创建者名
    tracks: tracks
  }
  return playList
}

//格式化数字
let checkCount = v => {
  if (v > 100000000) {
    let sv = v.toString()
    return sv.substring(0, sv.length - 8) + `亿`
  } else if (v > 10000) {
    let sv = v.toString()
    return sv.substring(0, sv.length - 4) + `万`
  } else {
    return v
  }
}

//设置播放器音乐源
let setMusic = song => {
  let music = {}
  let url = `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
  music = {
    id: song.id,
    url: url,
    cover: song.picUrl,
    artist: song.singer,
    name: song.songName
  }
  return music
}

let getMusicList = data => {
  let songs = []
  let item = {}
  for (const i of data) {
    item = {
      songName: i.name,
      id: i.id,
      singer: i.artists[0].name,
      picUrl: setPicUrl(i.album.picUrl)
    }
    songs.push(item)
  }
  return songs
}

//热搜标签
let getHotSearch = data => {
  let hotTags = []
  for (const tag of data) {
    hotTags.push(tag.first)
  }
  return hotTags
}

//获取搜索结果
let getSearchResult = data => {
  let item = {}
  let tracks = []
  for (const t of data) {
    let picUrl = `https://img-1256555015.file.myqcloud.com/2019/01/25/5c4a704d05904.png`
    item = {
      songName: t.name, //歌名
      id: t.id,
      singer: t.artists[0].name, //歌手
      alName: t.album.name, //专辑名
      picUrl: picUrl //歌曲图片
    }
    tracks.push(item)
  }
  return tracks
}

//歌单分类列表
let getCatlist = data => {
  let categoryArry = [[], [], [], [], []]
  let item = {}
  for (const cate of data.sub) {
    item = {
      name: cate.name,
      hot: cate.hot
    }
    categoryArry[cate.category].push(item)
  }
  let allCategory = {
    categories: data.categories,
    categoryArry: categoryArry
  }
  return allCategory
}

//获取歌手榜
let getArtists = data => {
  let artists = []
  let art = {}
  for (const i of data) {
    let alias = ``
    let picUrl = `${i.picUrl}?param=180y180`
    if (i.alias.length != 0) {
      alias = i.alias[0]
    }
    art = {
      id: i.id,
      name: i.name,
      alias: alias,
      picUrl: picUrl,
      score: i.score
    }
    artists.push(art)
  }
  return artists
}

//获取歌手部分信息和热门歌曲
let getArtistDetail = data => {
  let alias = ``
  if (data.artist.alias.length != 0) {
    alias = data.artist.alias[0]
  }
  let artist = {
    alias: alias,
    picUrl: setPicUrl(data.artist.picUrl),
    id: data.artist.id,
    name: data.artist.name,
    albumSize: data.artist.albumSize,
    musicSize: data.artist.musicSize,
    briefDesc: data.artist.briefDesc
  }
  let hotSongs = []
  let item = {}
  for (const i of data.hotSongs) {
    item = {
      songName: i.name,
      id: i.id,
      singer: i.ar[0].name,
      alName: i.al.name,
      picUrl: setPicUrl(i.al.picUrl)
    }
    hotSongs.push(item)
  }
  let artDetail = {
    artist: artist,
    hotSongs: hotSongs
  }
  return artDetail
}

//所有排行榜名称
const rankinglistName = [
  `云音乐新歌榜`,
  `云音乐热歌榜`,
  `网易原创歌曲榜`,
  `云音乐飙升榜`,
  `云音乐电音榜`,
  `UK排行榜周榜`,
  `美国Billboard周榜`,
  `KTV唛榜`,
  `iTunes榜`,
  `Hit FM Top榜`,
  `日本Oricon周榜`,
  `韩国Melon排行榜周榜`,
  `韩国Mnet排行榜周榜`,
  `韩国Melon原声周榜`,
  `中国TOP排行榜(港台榜)`,
  `中国TOP排行榜(内地榜)`,
  `香港电台中文歌曲龙虎榜`,
  `华语金曲榜`,
  `中国嘻哈榜`,
  `法国 NRJ EuroHot 30周榜`,
  `台湾Hito排行榜`,
  `Beatport全球电子舞曲榜`,
  `云音乐ACG音乐榜`,
  `江小白YOLO云音乐说唱榜`
]

//所有排行榜
let allRankinglist = data => {
  let officalRanking = []
  let otherRanking = []
  let list = {}
  for (const i of data) {
    let picUrl = `${i.coverImgUrl}?param=200y200`
    if (rankinglistName.includes(i.name)) {
      if (i.tracks.length == 0) {
        list = {
          id: i.id,
          name: i.name,
          picUrl: picUrl,
          updateFrequency: i.updateFrequency
        }
        otherRanking.push(list)
      } else {
        list = {
          id: i.id,
          name: i.name,
          picUrl: picUrl,
          tracks: i.tracks,
          updateFrequency: i.updateFrequency
        }
        officalRanking.push(list)
      }
    }
  }
  let rankinglist = {
    officalRanking: officalRanking,
    otherRanking: otherRanking
  }
  return rankinglist
}

//找出排行榜对应的idx
let findRankinglistIdx = name => {
  let idx = [...rankinglistName].findIndex(function(value) {
    return value == name
  })
  return idx
}

let getPersonalList = () => {
  let list = [
    {
      title: `喜欢的音乐`,
      icon: `icon-plove`,
      id: `likeMusic`,
      count: 0
    },
    {
      title: `我的电台`,
      icon: `icon-diantai`,
      id: `myRadio`,
      count: 0
    },
    {
      title: `最近播放`,
      icon: `icon-zuijinbofang`,
      id: `recebtlyPlayed`,
      count: 0
    },
    {
      title: `我的收藏`,
      icon: `icon-wodeshoucang`,
      id: `myCollection`,
      count: 0
    }
  ]
  list[0].count = getListCount(`likeMusic`)
  list[1].count = getListCount(`myRadio`)
  list[2].count = getListCount(`recebtlyPlayed`)
  list[3].count = getListCount(`myCollection`)
  return list
}
let getListCount = data => {
  let ls = localStorage.getItem(data)
  let count = 0
  if (ls) {
    count = JSON.parse(ls).length
  }
  return count
}

// 最近播放
let lisenMusicAdd = music => {
  let list = []
  let recebtlyPlayed = localStorage.recebtlyPlayed
  if (recebtlyPlayed) {
    list = JSON.parse(recebtlyPlayed)
  }
  removeRepeat(list, music.id)
  list.unshift(music)
  localStorage.setItem(`recebtlyPlayed`, JSON.stringify(list))
}
//数组中删除相同项
let removeRepeat = (arr, id) => {
  if (arr.length) {
    let idx = arr.findIndex(value => {
      return value.id == id
    })
    if (idx > -1) {
      arr.splice(idx, 1)
    }
    return arr
  }
}
//本地存储
let lisenAdd = (name, item) => {
  let list = []
  let ls = localStorage.getItem(name)
  if (ls) {
    list = JSON.parse(ls)
    list = removeRepeat(list, item.id)
  }
  if (list.length > 99) {
    list.pop()
  }
  list.unshift(item)
  localStorage.setItem(name, JSON.stringify(list))
}

//查询存储中是否存在数据
let findItem = (name, id) => {
  let ls = localStorage.getItem(name)
  if (ls) {
    ls = JSON.parse(ls)
    let idx = ls.findIndex(value => {
      return value.id == id
    })
    if (idx > -1) {
      return true
    } else {
      return false
    }
  }
}

// 发现页面数据
let dynamic = data => {
  let dynamicList = []
  for (const item of data) {
    let info = JSON.parse(item.json)
    let video = info.video
    if (video) {
      let detail = {
        msg: info.msg,
        coverUrl: video.coverUrl,
        id: video.videoId,
        title: video.title,
        type: video,
        creator: {
          avatarUrl: `${video.creator.avatarUrl}?param=200y200`,
          nickname: video.creator.nickname
        }
      }
      dynamicList.push(detail)
    }
  }
  return dynamicList
}
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
  getArtistDetail,
  allRankinglist,
  findRankinglistIdx,
  getPersonalList,
  lisenMusicAdd,
  removeRepeat,
  lisenAdd,
  findItem,
  dynamic
}
