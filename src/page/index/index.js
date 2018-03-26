/**
 * test
 */

// require('./index.css')
console.log("Hello Index")
var _mm = require('util/mm.js');

// var msg= _mm.getUrlParam('test')
// var html = '<div>{{data}}</div>'
// var data = {
//     data : "sadhiashfqweiuryiwq"
// }
// console.log(_mm.renderHtml(html,data))//html中的{{xx}}是提取传入obj.xx的值
// _mm.request({
//     url: './test.do',
//     success:function (res) {
//         console.log("@@@@@@@@@@@@@@@@@@@@@@")
//     },
//     error:function (errorMsg) {
//         console.log(errorMsg)
//     }
// });

// require('page/common/nav-simple/index')
require('page/common/nav/nav')
require('page/common/header/header')
var navSide = require('page/common/nav-side/nav-side')
navSide.init({
    name:'pass-update'
})