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