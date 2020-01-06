# 这是一个用Vue实现的商城项目

## 制作首页app组件
1. 完成Header区域，使用的是Mint-ui中的header组件
2. 制作底部的Tabbar区域，使用的是mui中的tabbar区域
   + 在制作购物车小图标的时候操作可能会多一些：
   + 先把拓展图标的css样式，拷贝到目录中
   + 拷贝拓展字体库ttf文件，到项目目录中
   + 为购物车小图标，添加如下样式： 'mui-icon mui-icon-extra mui-icon-extra-cart'
3. 要在中间区域放置一个router-view来展示路由匹配到的组件

## 改造tabbar为router-link

## 设置路由高亮

## 点击tabbar中的路透链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据

## 加载首页轮播图数据
1. 获取数据，如何获取呢？ 使用vue-resource
2. 导入vue-resource
3. 安装vue-resource
4. 在对应组件中发送数据请求
   1. 使用vue-resource的this.$http.get方法获取数据
   2. 将获取到的数据，保存到data身上
   3. 使用v-for 循环渲染每个item项

## 改造首页九宫格
1. 从MUI中获取九宫格布局
2. 从九宫格中选取6个
3. 取消九宫格布局中的背景色和边框（直接使用原有样式的样式名进行覆盖）
4. 将九宫格小图标新建一个文件夹，引入到原本九宫格中放入字体图标的地方进行替换
   1. 注意：可能会出现以下问题
      问题：网页中加载图片出不来，并且在右键检查网页源代码时，<img src="[object Module]">,但我们在代码中引入图片的路径却为,<img src='../../imaged/menu1.png'>
      解决办法： 在webpack.config.js中,配置url-loader时，添加一个option，在option中加入{ esModule: false }重新运行项目就可以解决了
5. 修改图片大小，一般移动端与网页图片比例为1:2，所以按照这个比例进行缩小即可
6. 修改图片底部文字大小




