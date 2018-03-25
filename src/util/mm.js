/**
 * Author: lj
 * Date: 2018/3/25
 * Time: 23:47
 * 通用工具类的实现
 */

var config = {
    serverHost: " "
};
var hogan = require('hogan.js')
var _mm = {
    //请求后端数据
    request:function (param) {
        var _this = this;
        $.ajax({
            type        : param.method || 'get',
            url         : param.url    || '',
            dataType    : param.type   || 'json',
            data        : param.data   || '',
            success: function (res) {
                if(res.status == 0) {//请求成功
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }else if (res.status == 10) {//没有登录 ，需要强制登录
                    _this.doLogin()
                }else if (res.status == 1) {//请求数据错误
                    param.error === 'function' && param.error(res.msg);
                }
            },
            error : function (res) {//403 500等错误
                typeof param.error === 'function' && param.error(res.status);
            }
        });
    },
    //获取服务器地址
    getServerUrl:function (path) {
        return config.serverHost + path;
    },
    //获取url参数
    getUrlParam : function (name) {
        var reg = new RegExp('(^|&)'+ name + '=([^&]*)(&|$)')
        var result = window.location.search.substr(1).match(reg);//url?后面的参数 包括?
        return result ? decodeURIComponent(result[2]) : null;//result 有结果返回匹配的第二个 没有返回null
    },
    //登录功能
    doLogin:function () {
        window.location.href = './login.html?redirect=' + encodeURI( window.location.href);

    },
    //渲染hTml 传入模板 和 数据 hogan组件 hogan 先编译 后渲染
    renderHtml : function (htmlTemplate,data) {
        var template = hogan.compile(htmlTemplate),
            result   = template.render(data);//这里是如何运算的？TODO
        return result;
    },
    //提示
    successTips : function (msg) {
        alert(msg || '操作成功！')
    },
    errorTips   : function (msg) {
        alert( msg || '哪里不对了呢！')
    },
    //字段验证 非空 手机 邮箱
    validate : function (value, type) {
        var value = $.trim(value);//非字符串经过trim会变成字符
        if ('require' === type) {
            return !!value;
        }else if ('phone' === type){
            return /^1d{10}$/.test(value)//$匹配字符串的结尾部分
        } else if('email' === type) {
            return /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(value)
        }else {
            return false;//如果所有都不匹配
        }
    },
    //返回主页
    goHome  : function () {
        window.location.href='./index.html'

    }



};

module.exports=_mm;

