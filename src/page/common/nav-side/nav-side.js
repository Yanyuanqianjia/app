/**
 *
 * Author: lj
 * Date: 2018/3/26
 * Time: 21:56
 *
 */


require('./nav-side.css')
var _mm = require('util/mm');
var navSideTemplateHTML = require('./nav-side.string')
//侧边导航 需要功能

var navSide = {
    option: {
        name: '',
        navList:[
            {name:'user-center',desc:'个人中心',href:'./user-center.html'},
            {name:'order-list',desc:'我的订单',href:'./order-list.html'},
            {name:'pass-update',desc:'修改密码',href:'./pass-update.html'},
            {name:'about',desc:'关于mmal',href:'./about.html'},
        ]
    },
    init: function (option) {
        //合并选项
        $.extend(this.option,option)
        this.renderNav()
    },
    //渲染导航菜单 根据所选的侧边导航栏的不同更换颜色
    renderNav: function () {
        for(var i=0,iLength=this.option.navList.length;i<iLength;i++){
            if(this.option.navList[i].name===this.option.name) {
                this.option.navList[i].isActive = true;
            }
        }
        var navHtml = _mm.renderHtml(navSideTemplateHTML, {
            navList: this.option.navList
        });
        //把html放入容器中
        $('.nav-side').html(navHtml)
    }
};

module.exports = navSide;