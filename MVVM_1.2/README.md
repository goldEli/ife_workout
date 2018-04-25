# 1.2 用webpack4 / parcel快速搭建开发san helloworld

## 任务描述

webpack / parcel 搭建开发环境

* 支持js、css格式的解析
* 区分 development / production 环境
* 使用npm scripts设罝dev、test、build命令
* 写一个san组件并在浏览器中显示hello world
* 使用babel-loader进行js代码转换

## 开始

### 安装 webpack4

初始化 parkage.json 文件

```
yarn init -y
```

安装 webpack4，在 webpack 4 中，如果要使用 webpack cli 命令，需要单独再安装 webpack-cli

```
yarn add webpack webpack-cli
```

### 使用npm scripts设罝dev、test、build命令

在 webpack4 之前，通常会有两个配置文件来区分 development 和 production 模式：

* development 模式的配置文件，用于定义 webpack-dev-server 等等
* production 模式的配置文件，用于定义 UglifyJSPlugin，sourcemaps等等

在 webpack4 中，这两个文件可以省略了，一句命令行就可以替代。

```
"scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
}

```

**添加测试**

全局安装 mocha

```
cnpm install mocha -g
```

新建测试文件 `./__test__/test.js`

```
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

```

在 npm script 中设置命令：

```
"scripts": {
    "test": "mocha __test__",
    ...
}
```

### 配置 webpack.config.js 文件

```
module.exports = {
    module: {
      rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader" // 将 ES6 编译成 ES5
            }
        },
        {
            test: /\.san$/,
            exclude: /node_modules/,
            use: {
                loader: "san-loader" // 编译 san 语法
            }
        },
        {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [ 'style-loader', 'css-loader' ] // 将编译完成的css插入html中
        }
      ]
    }
};
```

由于用了 Babel，下一步需要新建一个 .babelrc 文件

```
    {
        "presets": [
            "env"
        ]
    }
```

### 写一个san组件

```
import san from 'san'
var MyApp = san.defineComponent({
    template: '<p>Hello {{name}}!</p>',

    initData: function () {
        return {
            name: 'San'
        };
    }
});

var myApp = new MyApp();
myApp.attach(document.body);
```

## 参考

* [Webpack 4 Tutorial: from 0 Conf to Production Mode](https://www.valentinog.com/blog/webpack-4-tutorial/)
* [san官方文档](https://baidu.github.io/san/)