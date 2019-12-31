const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',     //指定采用开发模式
  entry: './src/main.js',   //要使用webpack打包的文件
  output: {
    filename: 'bundle.js',   //指定打包好的文件，输出到哪个目录中去
    path: path.resolve(__dirname, 'dist')      //指定输出的文件名称
  },
  devServer: {
    open: true,  //自动打开浏览器
    port: 3000,  //设置启动时运行的端口
    hot: true               //启动热更新
  },
  plugins: [  //这个模块用于配置所有的webpack插件
    new htmlWebpackPlugin({//创建一个在内存中生成html页面的插件
      template: './src/index.html',   //指定要在内存中生成的页面模板，将来会根据这个指定的路径去生成内存中的页面
      filename: 'index.html'         //输出（生成）的html的名称
    }),
    new VueLoaderPlugin(),
  ],
  module: {  //这个模块，用于配置所有的第三方模块加载器
    rules: [  //所有第三方模块的匹配规则   
      { test: /\.css$/, use: ['style-loader','css-loader']},  //test: /\.css$/  用正则表达式来匹配文件类型  use: ['style-loader','css-loader']使用哪一种第三方loader进行处理   这是配置.css文件的第三方loader规则
      { test: /\.less$/, use: ['style-loader','css-loader','less-loader'] },
      { test: /\.scss$/, use: ['style-loader','css-loader','sass-loader'] },
      { test: /\.(jpg|png|gif|bmp|jpeg|svg)$/ , 
        use: [
          {
            loader:'url-loader',
            options:{
              limit:7631,
              name: '[hash:8]-[name].[ext]'
            }
          }
        ]
      },   
      //?limit=7631 代表可以传递参数，规定最小字节为7631，如果图片比规定字节小，则转为Base64编码，如果比规定字节大或者等于给定字节的大小，则不会被转为base64格式的编码
      //name = [name].[ext] 如果比规定的字节大，则会将文件名变为其图片内容的hash值，为的是避免图片重名，但对于我们一般不易理解，所以我们想让编译后的图片的名字还是等于图片自己的名字，后缀名不要改变
      //我们在引用不同文件夹下的不同文件内容时，因为两个文件采用了相同的文件名，而出现了替换的现象，所以我们可以在name后面加上图片对应的hash值，默认32位，我们需要8位即可
      { test: /\.(eot|ttf|svg|woff|woff2)$/, 
        use: [
          {
            loader: 'url-loader'
          }
        ] 
      },
      { //配置Bable来转换高级的ES语法
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime','@babel/plugin-proposal-class-properties',
            ['component',{
              libraryName: 'mint-ui',
              style:true
            }]]
          }
        }
      },
      { //配置.vue文件的loader
        test: /\.vue$/,
        use: [
          { loader: 'vue-loader' }
        ]
      }
    ]
  },
  resolve: {
    alias: { //修改vue被导入时候的包的路径
      // 'vue$': 'vue/dist/vue.js'
    }
  }
};

/*
 * 当我们在控制台直接输入webpack命令执行的时候，webpack做了以下几步：
 * 1、首先，webpack发现，我们并没有通过命令的形式，指定入口和出口
 * 2、webpack就会到项目的根目录下，查找一个叫做“webpack.config.js”的配置文件
 * 3、当找到配置文件后，webpack会去解析执行这个配置文件，当解析执行完这个配置文件以后，就会得到了一个配置文件中导出的配置对象
 * 4、当webpack拿到配置对象以后，就拿到了配置文件中指定的入口和出口，然后进行打包构建
*/

/* 在本地安装使用webpack-dev-server这个工具来实现自动打包编译的功能
 * 1、运行npm i webpack-dev-server -D 把这个工具安装到项目的本地开发依赖 
 * 2、安装完毕后，这个工具的用法和webpack命令的用法完全一样
 * 3、由于我们是在项目本地安装的webpack-dev-server,所以无法把它当做脚本命令去执行，不能直接在终端内直接运行（只有那些安装到全局的工具，才能在终端内正常运行）
 * 4、注意：webpack-dev-server这个工具，如果想要正常运行，要求：在本地项目中，必须安装webpack
 * 5、在package.json中的添加“dev”这行代码
 *       "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --open --port 3000 --contentBase src --hot",    后面的--open 表示自动打开浏览器    --port 3000 修改打开的端口号为3000     --contentBase src  默认打开src目录下的文件
            --hot 启动热更新  作用：1、打补丁 2、网页样式不重载，实现局部刷新
  },
  * 6、在终端内输入 npm run dev
  *    此时：我们可以看到控制台输入这个项目正在http：//localhost:8080/端口上运行（以localhost服务器的形式运行起来了，可以直接通过这个端口打开这个项目） webpack的输出文件正被托管到根路径 / 
  * 7、修改页面内引入文件的路径，不要再引入本地路径生成的这个bundle.js   而是要引用那个自动编译生成的托管到项目根路径的bundle.js（http://localhost:8080/bundle.js）,这样就可以实现实时更新代码最新的运行结果
  * 8、webpack-dev-server帮我们打包生成的bundle.js文件，并没有存放到实际的本地磁盘上，而是直接托管到电脑的内存中，所以我们在访问项目的根目录中（http：//localhost:8080/），根本找不到这个打包好的
  *    bundle.js
  * 9、我们可以认为，webpack-dev-server把打包好的文件，以一种虚拟的形式，托管到了我们的项目的根目录，虽然我们看不到他，但是，可以认为bundle.js和dist、src、node_modules
  *    平级，有一个看不到的文件，叫做bundle.js
  * 还可以使用第二种方式来配置dev-server，在package.json中添加"dev": "webpack-dev-server"      在webpack.config.js中，添加devServer配置对象
*/

/* 页面存在于本地磁盘中，但引用的文件却在电脑的内存中，现在我们想要的是将页面内容也放到电脑内存中去，借助webpack的一个插件（根据index模板页面在内存中生成html的插件）
 * 1、终端内运行npm i html-webpack-plugin -D （本地安装html-webpack-plugin）
 * 2、在webpack.config.js中导入这个插件,注意：只要是插件就一定要放到plugins节点中去
 * 3、浏览器一打开，默认就要访问index.html
 * 当使用html-webpack-plugin之后，我们就不再需要手动的处理bundle.js的引用路径了，因为这个插件，已经帮我们自动创建了一个合适的script标签，并且引用上了正确的路径
 * 这个插件的两个作用：
 * 1）自动在内存中根据指定的页面模板生成一个新的页面
 * 2）自动把打包好的bundle.js 追加到生成的页面中去
*/

/* 默认情况下，webpack没有办法处理css文件中的url地址，不管是图片还是字体库，只要是url地址，都处理不了
 * 这是就需要安装第三方模块的loader    npm i url-loader file-loader -D
 * 在webpack.config.js中添加匹配图片的后缀名和规则
*/