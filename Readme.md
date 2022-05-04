## 安装

```js
// 设置 gyp
yarn run gyp-config

yarn

yarn run rebuild

yarn run start（或F5调试）

yarn run make // 打包
```

在局域网内使用下方 api 调用键盘
http://${host}:3009/api/invoke?key=f11

key 参考 http://robotjs.io/docs/syntax#keys

## 注意

- 打包
  由于使用 electron-forge 打包， 生成的 exe 双击后默认安装在 C 盘
  `C:\Users\[当前用户]\AppData\Local\keyboardcontrol`，可将该 exe 发送到桌面快捷方式

- 安装 electron（注意）
  ```js
  $ npm install --save-dev electron //可能会卡住（https://blog.xenori.com/2019/12/fix-npm-hang-when-install-electron/）
  // 尝试 nrm切淘宝镜像，然后对electron单独设置
  npm config set electron_mirror "https://npm.taobao.org/mirrors/electron/" // 一般此句执行就好了
  ```

## 目的

有个需求是，页面运行过程中，需要使用 websocket 控制页面的 video 全屏，查了资料发现：
全屏 Api 只能被用户动作触发，因此大概有两种解决方案：

1. 想办法关闭此限制（查了很多资料，暂未找到）
2. 想办法触发键盘事件，模拟用户操作

本项目采用第二种方式，简单实现 http 调用键盘按键
原理：本机启动一个 http 服务，调用 robotjs 实现键盘点击
