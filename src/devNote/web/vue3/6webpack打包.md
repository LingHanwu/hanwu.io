---
icon: edit
date: 2022-10-20
---



# webpack打包

---

[webpack (docschina.org)](https://webpack.docschina.org/)

webpack 是**前端项目工程化的具体解决方案**

主要功能：他提供了友好的**前端模块化的支持**，**代码压缩**，**处理浏览器兼容性**，性能优化等功能

```sh
npm init -y
```
**安装webpack**

```sh
 npm install webpack webpack-cli -D
```

通过`npmjs.com`查看安装时选择-S还是-D

---

### 项目配置webpack

1.创建webpack.config.js配置文件并初始化

```js
module.exports = {
    // 代表webpack运行模式，可选值 development  production
    mode:'development'
}
```

2.在package.json的stript节点，新增dev脚本

```cmd
  "scripts": {
    "build":"webpack"
  },
```

3.在终端中运行npm run build命令，启动webpack项目的打包构建

4.生成dist文件

5.修改index.html下 js引入路径

**webpack可选值应用场景**

```js
module.exports = {
    // 代表webpack运行模式，可选值 development  production
    mode:'production'
}
```

```js
const path = require('path');

module.exports = {
  entry: "./src/main.js",
  mode: 'development',
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js"
  }
}

```



---

### 指定配置文件

假设配置文件名为`wk.config.js`

```sh
webpack --config wk.config.js
```



---

## loader概述

webpack处理不了非.js后缀的模块
需要调用loader加载器才可以正常打包

loader加载器的作用给：==协助webpack打包处理器特定的文件模块==

- css-loader  处理css
- less-loader  处理.less
- babel-loader  处理webpack无法处理的高级JS语法

### 打包处理css文件

```sh
npm i style-loader css-loader -D
```

2.在webpack.config.js  的module->rules数组中，添加loader

```js
    module:{//所有第三方文件模块的匹配机制
        rules:[
            {
                test:/\.css$/,user:['style-loader','css-loader']
            }
        ]
    }
```

test标识匹配的文件类型
user标识要调用的loader  

- user数组中指定的loader==顺序是固定的==
- 多个loader的调用顺序是==从后往前调==


### 打包处理less文件

1、运行安装命令

```
npm i less-loader less -D
```

2、在webpack.config.js  的module->rules数组中，添加loader

```js
    module:{//所有第三方文件模块的匹配机制
        rules:[
            {
                test:/\.css$/,use:['style-loader','css-loader']
            },
            {
                test:/\.less$/,use:['style-loader','css-loader','less-loader']
            }
        ]
    }
```



### 处理url路径相关的文件

```
npm i url-loader file-loader
```

index.html

```html
    <!-- 需求把/src/images/bg.jpg设置给src属性 -->
    <img src="" alt="" class="box">
```

index.js

```js
// 导入图片，得到图片文件
// 导入图片，得到图片文件
import bg from './images/bg.jpg'
$('.box').attr('src',bg)
```

webpack.config.js

```js
    module:{//所有第三方文件模块的匹配机制
        rules:[
            {
                test:/\.css$/,use:['style-loader','css-loader']
            },
            {
                test:/\.less$/,use:['style-loader','css-loader','less-loader']
            },{
                test:/.jpg|png|gif$/,use:['url-loader?limit-22229']
            }
        ]
    }
```

 limit用来指定图片的大小，单位是字节
 只有≤limit大小的图片，才会被转为base64格式的图片

### 处理js文件的高级语法babel-loader

index.js

```js
// 定义装饰器函数
function info(target){
    target.info = 'Person info'
}

// 定义一个普通的类
@info
class Person{}

console.log(Person.info)
```

1.安装babel-loader相关包

```
npm install -D babel-loader @babel/core @babel/preset-env @babel/plugin-proposal-decorators 
```

2.在webpack.config.js添加规则

```js
{
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/, // 排除不需要打包的目录
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
      
    }
  }
}
```

3.在根目录创建babel.config.js

```js
module.exports = {
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }]
      ]
  }
```

注：[babel插件文档](https://babeljs.io/docs/en/)
    [webpack安装babel-loader文档](





---

## 打包发布

1.开发环境下，打包生成的文件==存放在内存中==
2.开发环境下，打包生成的文件==不会进行代码压缩和性能化==

### 配置webpack打包发布

在package.json在scripts节点下，新增build命令

```json
"build":"webpack --mode production"
```

--mode是用来指定webpack的==运行模式==
production代表生产环境，会对代码进行代码压缩和性能优化

注意：--model指定的参数项会==覆盖==webpack.config.js中的model选项

### 优化图片和文件的存放目录

在webpack.config.js中output模块下指定js存放目录

```js
    output:{
        filename:'js/bundle.js'
    }
```

在webpack.config.js中module模块rules下指图片存放目录

```js
 {
     test:/.jpg|png|gif$/,use:{
         loader:'url-loader',
         options:{
             limit:22228,
             // 明确指定打包生成的图片文件存储到dist目录下的images文件夹
             outputPath:'image'
         }
 }
```

### 自动清理dist目录下的旧文件

1.安装`clean-webpack-plugin`

```cmd
npm install clean-webpack-plugin -D
```

2.在webpack.config.js中按需导入插件，得到插件的构造函数之后，创建插件的实例对象

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
```

3.把创建的cleanPlugin的插件实例对象，挂载到plugins节点上

```js
plugins: [htmlPlugin,new CleanWebpackPlugin()]
```

4.webpack5.x之后，需要在output中配置path路径

```js
output: {
    filename: 'js/bundle.js',
    path: path.resolve(process.cwd(), 'dist')
}
```

## source Map

<span style="color:red">Source Map 就是一个信息文件，里面存储着位置信息</span>。也就是说，Source Map文件中存储着压缩混淆后的代码==所对应的位置==

出错的时候，除错工具将<span style="color:red">直接显示原始代码，而不是转换后的代码</span>

在开发调试的时候，建议将值设为eval-source-map

开发环境下，webpack默认启动了Source Map功能，当程序运行出错的时候，可以直接通过控制台提示错误行位置定位到具体的源代码，开发环境下添加以下代码，能保证报错代码与源代码行数保持一致

在webpack.config.js中添加

```js
devtool:'eval-source-map'
```

在生产环境下，如果省略了devtool选项，则最终生成的未见不包含Source Map 这能防止源码泄露
在生产环境下，如果想定位报错的具体行数，而不暴露源代码，可以将devtool的值设置为`nosources-source-map`


实际开发中，我们不需要自己配置webpack
  会使用CLI 一键生成带有webpack的项目
  开箱即用，我们只需知道webpack的基本概念即可

## 总结

1.能够掌握webpack的基本使用
  安装、webpack。config.js  修改打包入口
2.了解常用的plugin的基本使用
  webpack-dev-server  html-webpack-plugin
3.了解常用的loader的基本使用
  loader的作用 loader的调用过程
4.能够说出Source Map的作用
  精准定位到错误行并显示对应的源码
  方便开发者调试源码中的错误


## 补充 webpack 路径别名

webpack.config.js添加与module同级模块resolve

```js
    resolve: {   //路径起别名
        alias: {
          '@': path.resolve(__dirname, './src/'),
        },
      },
```

使用@表示 src目录





## webpack插件



### 认识PostCSS工具









### 插件autoprefixer

```sh
npm install autoprefixer -D
```

 直接使用使用postcss工具，并且制定使用autoprefixer

```sh
npx postcss --use autoprefixer -o end.css ./src/css/style.css
```





























