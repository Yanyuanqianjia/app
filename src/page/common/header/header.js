/**
 * Author: lj
 * Date: 2018/3/26
 * Time: 22:22
 * 
 */


require('./header.css')
var _mm = require('util/mm.js');

//导航

var header={
    init:function () {
        this.bindEvent()
    },
    //回填
    onLoad:function () {
        var keyword = _mm.getUrlParam('keyword');
        if(keyword) {
            $('#search-input').val(keyword)
        }
    },
    bindEvent:function () {
        var _this=this
        $('#search-button').click(function () {
           _this.searchSubmit()
        });
        //输入回车提交 13为回车键
        $('#search-input').keyup(function (e) {
            if(e.keyCode==13) {
                _this.searchSubmit()
            }
        })
    },
    searchSubmit:function () {
        var keyword = $.trim($('#search-input').val());
        //点击搜索返回到list页面
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        }else {
            //如果为空返回首页
            _mm.goHome()
        }
    }
}
header.init()