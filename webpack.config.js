/**
 * 1.webpack的加载方式
 * 2.多入口的处理问题
 * 3.配置输出文件 a)多个js输出多个;b)js配置文件到指定的js文件夹下
 * 4.全局引入jquery 模块化引入
 * 5.样式的引入 a) 用什么引擎加载cssloader b)打包到单独的文件中
 * 6.图片和字体的处理 a)使用loader ;b)
 * @type {{entry: string, output: {path: string, filename: string}}}
 */

var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');//HTML插件
var path              = require("path");
// var ExtractImgPlugin  = require('url-loader')

//配置函数 获取html-webpack-plugin所有参数的
var getHtmlConfig =function (name) {
    return {
        template : './src/view/'+name+'.html',//HTML原始模板
        filename : 'view/'+name+'.html',//目标文件的位置
        inject:true,//指定HTML中插入js文件的位置，true->body底部；head->head中....
        hash:true,
        chunks:['common',name]//指定引入的css或者js文件，如果不指定，则默认引入所有的js文件
    }
}

var config = {
    // entry: "./src/page/index/index.js",
    entry:{
                                                //后面的这部分内容在打包的时候需要去掉，否则会一直报错
        'common': ['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088/'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js']
    },
    output:{
        // path:'./dist',//跟
        path:path.resolve(__dirname, './dist'),//文件目录
        filename:'js/[name].js',
        publicPath:'../'//访问文件地址

    },
    devServer: {
        publicPath: '/dist',//这里有个问题啊，为什么../改成这个之后就不能热更，只能读取dist文件中的目录，但是改成/dist之后就可以了
        //我猜测原因是因为 ../读取的是真是的文件目录下的index.html的文件，而/dist读取得失webpack-dev-server编译之后的文件
        inline: true,
        hot: true,
        port: 8088,
    },
    //引入外部模块
    externals:{
        'jquery':'window.$'//这个是个问题，无法引入
    },
    //提取公共模块 通用模块 全局

    //css文件的引入loader方式
    module:{
        loaders:[
            {test:/\.css$/,loader:ExtractTextPlugin.extract("style-loader",'css-loader')},//以 ！ 连接，会从左到右依次加载
            {test:/\.(gif|png|woff|jpg|svg|eot|ttf)\??.*$/,loader:'url-loader?limit=100&name=images/[hash:8].[name].[ext]'}//limit 限制图片的大小，如果大于100,则以文件的形式存放，否则以base64存放在js文件中

        ],
    },
    plugins:[
        //独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js'
        }),
        new webpack.HotModuleReplacementPlugin(),
        //将css文件打包到指定的文件中
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin(
            // template : './src/view/index.html',//HTML原始模板
            // filename : 'view/index.html',//目标文件的位置
            // inject:true,//指定HTML中插入js文件的位置，true->body底部；head->head中....
            // hash:true,
            // trunks:['common','index']//指定引入的css或者js文件，如果不指定，则默认引入所有的js文件
            getHtmlConfig('index')
        ),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ],

};
module.exports = config;