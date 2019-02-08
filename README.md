<p align="center"><a href="http://sioxas.github.io/" target="_blank"><img width="200" src="https://img-1256555015.file.myqcloud.com/2019/01/25/5c4a704d05904.png"></a></p>
  <h1 align="center">Oxygen Music</h1>
  <h4 align="center">基于vue.js的音乐播放器,资源来至于网易云音乐</h4>
  <p align="center">
    <a href="https://github.com/vuejs/vue"><img src="https://img.shields.io/badge/vue-2.5.21-blue.svg" alt="Vue"></a>
    <a href="https://github.com/vuejs/vue-cli"><img src="https://img.shields.io/badge/vue--cli-3.3.0-green.svg" alt="vue-cli"></a>
    <a href="https://github.com/vuejs/vue-routeri"><img src="https://img.shields.io/badge/vue--router-3.0.1-red.svg" alt="vue-router"></a>
    <a href="https://github.com/vuejs/vuex"><img src="https://img.shields.io/badge/vuex-3.0.1-success.svg" alt="vuex"></a>
    <a href="https://github.com/didi/mand-mobile"><img src="https://img.shields.io/badge/mand--mobile-2.0.0-blue.svg" alt="mand-mobile"></a>
    <a href="https://github.com/axios/axios"><img src="https://img.shields.io/badge/axios-0.18.0-blue.svg" alt="axios"></a>
    <a href="https://github.com/necolas/normalize.css"><img src="https://img.shields.io/badge/normalize.css-8.0.0-green.svg" alt="normalize.css"></a>
    <a href="https://github.com/hilongjw/vue-lazyload"><img src="https://img.shields.io/badge/vue--lazyload-1.2.6-red.svg" alt="vue-lazyload"></a>
  </p>
  <p align="center">Demo:<a href="https://yun.yang143.cn">https://yun.yang143.cn</a>,在手机上效果更好，扫一扫体验</p>
  <p align="center"> <a href="https://yun.yang143.cn"><img width="200" src="https://img.yang143.cn/2019/02/08/5c5d35b667608.png" alt="Oxygen Music"></a></p>


## 目标功能
- [x] 音乐播放、暂停 -- 完成
- [x] 播放列表、添加到播放列表、清空播放列表 -- 完成
- [x] 榜单 -- 完成
- [x] 歌手Top100、歌手详情页面 -- 完成
- [x] 搜索单曲、歌手、专辑 -- 完成
- [x] 热门搜索、搜索历史记录 -- 完成
- [x] 首页推荐(歌曲、歌单) -- 完成
- [x] 歌单 -- 完成
- [x] 我的收藏(歌单,歌手) -- 完成
- [x] 最近播放 -- 完成
- [] 搜索结果分类显示 
- [] 切换播放模式 
- [] 歌词 
- [] 喜欢音乐
- [] 发现页面
- [] 侧边弹窗

## 截图


## 联系我
---
- QQ：1439821144
- Email: QQ：1439821144@qq.com
- Blog：[https://www.yang143.cn](https://www.yang143.cn)

## 鸣谢
---
- Vue全家桶
- Axios
- Vue-LazyLoad
- stylus
- postcss-pxtorem
- fastclick
- mand-mobile
- [Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi) (网易云音乐 Node.js API service)

###目录结构
<pre>
.
├── public             // 构建服务和webpack配置
│  ├── index.html         // 项目入口文件
├── src                // 生产目录
│   ├── assets         // css js 和图片资源
│   ├── components     // 各种组件
│   ├── views          // 各种页面
│   ├── store          // vuex状态管理器
│   ├── untils         // 代码模块
│   ├── filters.js     // 各种过滤器
│   └── main.js        // Webpack 预编译入口
│   └── router.js      // 路由文件
├── package.json       // 项目配置文件
├── README.md
</pre>

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 开源许可
---
[GPL 3.0](https://opensource.org/licenses/GPL-3.0)

Copyright (c) 2018 Wisp X.
