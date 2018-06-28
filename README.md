# vue-douban

# vue2.0 豆瓣电影WebApp

## 线上体验

#### PC访问

[豆瓣电影webapp](http://59.110.140.119:8080)

打开浏览器进入开发者模式，选择移动端视口

chrome浏览器下的iphone5/6/6 plus体验效果更佳

#### 移动端访问

打开手机浏览器扫描下方二维码或访问上面的地址，推荐全屏模式下体验

![image](https://github.com/centersxy/vue-douban/tree/master/qrcode/douban.png)

### 技术栈
- vue2.0 + vue-router + vuex：vue全家桶
- axios：用于ajax请求
- vue-lazyload：用于图片懒加载
- better-scroll：移动端滚动库，优化移动端滚动效果
- webpack： 构建工具
- es6: 使用es6语法
- stylus: css预处理

### 关于浏览器跨域
#### 开发环境
项目通过vue脚手架vue-cli进行配置，可在'config/index'目录下进行如下配置
```
proxyTable: {
      '/v2': {
        target: 'http://api.douban.com',
        changeOrigin: true,
        pathRewrite: {
          '^/v2': '/v2'
        }
      }
    }
```
参数里中的changeOrigin，接收一个布尔值，如果设置为true,那么本地会虚拟一个服务端接收你的请求并代你发送该请求，这样就不会有跨域问题了
vue-cli的这个设置来自于其使用的插件http-proxy-middleware
#### 生产环境
服务器端配置
```
const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();
app.use('/static', express.static(`${__dirname}/static`));
app.use('/v2', proxy({
  target: 'http://api.douban.com',
  changeOrigin: true,
}));

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.listen(8000);
```
本质上都是通过使用'http-proxy-middleware'中间件实现代理
