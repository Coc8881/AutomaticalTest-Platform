const server = 'https://q80py.yunrunyuqing.com:30000/gz_opinion'//'http://www.baidu.com'//''   
const system = {
    login_url: server + '/pc_login', //登陆
    keyObject_website_url: server + '/index?id=599cff399ff6eb07df953d0e', //重点对象-网站
    keyObject_weibo_url: server + '/index?id=58d4e5ff9ff6eb1200ce74b3', //重点对象-微博
    keyObject_weixin_url: server + '/index?id=58d4e8bb9ff6eb1200ce74b6', //重点对象-微信
    oversea_monitor_url: server + '/index?id=58ef14999ff6eb3c178cdf9e', //境外浏览
    alerts_url: server + '/index?id=58ddc99f9ff6eb383589d811', //预警
    search2_url: server + '/index?id=58d4dd929ff6eb1200ce74b2', //检索2.0
    theme_monitor_url: server + '/index?id=5976f98f9ff6eb3336230774', //专题监控
    theme_anlysis_url: server + '/index?id=59a3bd529ff6eb5956578b5b', //专题分析
    message_push_url: server + '/index?id=59edb7359ff6eb358ab1de3d', //上报下发
    search_pic_url: server + '/index?id=5a601720e1382303682223f9',
    copyright_check_url: server + '/index?id=5a7987eee138233fd6b2a58d', //版权检测
    new_search_url: server + '/index?id=5a5c5bb2e138230b876e06c3', //检索3.0
    new_theme_anlysis_url: server + '/index?id=5a65b2fde13823188a7e554a', //新专题分析
    va_center_url: server + '/video_con_audio' //音视频中心
}

//登陆账号
const user = {
    username: 'fudandi',
    password: 'fdd1234'
}

//专题对象
const test_theme = {
    title: '测试专题',
    area: '全国',
    objArea: '广州',
    keyWord: '广州'
}

const cy_urls = ['http://epaper.zgsyb.com/html/2018-08/29/content_25718.htm']
const index = Math.floor((Math.random() * cy_urls.length))

exports.user = user
exports.test_theme = test_theme
exports.cy_urls = cy_urls
exports.system = system
exports.index = index