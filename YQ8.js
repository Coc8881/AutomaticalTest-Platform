'use strict'
const wd = require('macaca-wd')
const config = require('../config/YQ8_config/config.js')
const wd_config = require('../config/wd_config.js')
describe('<h2>8.0集群更新测试</h2>', function() {
    this.timeout(5 * 60 * 1000)
    const driver = wd.promiseChainRemote(wd_config.wdOjb)
    before(() => {
        return driver
            .init(wd_config.platform)
            .setWindowSize(1280, 1280)
    })

    describe('<h3>测试套件</h3>', () => {

        it('#1 首页', () => {
            return driver
                .get(config.system.login_url)
                .sleep(2000)
                .elementByClassName('ACP_USR')
                .sendKeys(config.user.username)
                .elementByClassName('ACP_PSW')
                .sendKeys(config.user.password)
                .sleep(1000)
                .elementByCss('input[value]')
                .click()
                .sleep(30000)
                .elementByClassName('alone-txt')
                .click()
                .sleep(5000)
                .then(() => {
                    console.log('首页测试完毕')
                })
        })

        //重点对象
        it('#2 重点对象-网站', () => {
            return driver
                .get(config.system.keyObject_website_url)
                .sleep(25000)
                .elementByLinkText('中央主要新闻报纸')
                .click()
                .sleep(5000)
                .hasElementByClassName('txt')
                .sleep(1000)
                .elementByLinkText('下一页')
                .click()
                .sleep(8000)
                .elementByClassName('txt')
                .click()
                .then(() => {
                    console.log('重点对象-网站测试完毕')
                })
        })

        //重点对象-微博
        it('#3 重点对象-微博', () => {
            return driver
                .get(config.system.keyObject_weibo_url)
                .sleep(20000)
                .elementByLinkText('中国日报社')
                .click()
                .sleep(5000)
                .hasElementByClassName('objDataItem')
                .elementByClassName('nextpage')
                .sleep(5000)
                .then(() => {
                    console.log('重点对象-微博测试完毕')
                })
        })

        //重点对象-微信
        it('#4 重点对象-微信', () => {
            return driver
                .get(config.system.keyObject_weixin_url)
                .sleep(20000)
                .elementByLinkText('人民日报社')
                .click()
                .sleep(5000)
                .hasElementByClassName('tiptd')
                .sleep(1000)
                .elementByClassName('nextpage')
                .click()
                .sleep(8000)
                .hasElementByClassName('tables-bt')
                .sleep(2000)
                .then(() => {
                    console.log('重点对象-微信测试完毕')
                })
        })

        //境外监控
        it('#5 境外监控/浏览', () => {
            return driver
                .get(config.system.oversea_monitor_url)
                .sleep(8000)
                .elementByLinkText('多维新闻网')
                .click()
                .sleep(2000)
                .then(() => {
                    console.log('境外监控/浏览测试完毕')
                })
        })

        //预警
        it('#6 预警', () => {
            return driver
                .get(config.system.alerts_url)
                .sleep(8000)
                .elementByLinkText('敏感预警')
                .click()
                .sleep(5000)
                .hasElementByClassName('tables-bt')
                .sleep(5000)
                .then(() => {
                    console.log('预警测试完毕')
                })
        })

        //检索2.0
        it('#7 检索2.0', () => {
            return driver
                .get(config.system.search2_url)
                .sleep(10000)
                .elementById('keywordsInput')
                .sendKeys('广州')
                .elementByClassName('sech-go')
                .click()
                .sleep(5000)
                .elementByLinkText('论坛')
                .click()
                .sleep(5000)
                .elementByLinkText('博客')
                .click()
                .sleep(5000)
                .elementByLinkText('app')
                .click()
                .sleep(5000)
                .elementByLinkText('微博')
                .click()
                .sleep(3000)
                .elementByLinkText('微信')
                .click()
                .sleep(8000)
                .then(() => {
                    console.log('检索2.0测试完毕')
                })
        })

        //专题监控
        it('#8 专题监控', () => {
            return driver
                .get(config.system.theme_monitor_url)
                .sleep(15000)
                .hasElementByClassName('objDataItem')
                .sleep(2000)
                .elementByLinkText('微博')
                .click()
                .sleep(3000)
                .elementByLinkText('微信')
                .click()
                .sleep(3000)
                .elementByLinkText('app')
                .click()
                .elementByClassName('sortDropBtn')
                .click()
                .sleep(3000)
                .then(() => {
                    console.log('专题监控测试完毕')
                })
        })
        
        //专题分析
        it('#9 专题分析', () => {
            return driver
                .get(config.system.theme_anlysis_url)
                .sleep(20000)
                .elementByLinkText('分析目录')
                .click()
                .sleep(2000)
                .elementByLinkText('案例概况')
                .click()
                .sleep(2000)
                .elementByLinkText('最新消息')
                .click()
                .sleep(2000)
                .elementByLinkText('数据分析')
                .click()
                .sleep(2000)
                .elementByLinkText('网民分析')
                .click()
                .sleep(2000)
                .elementByLinkText('典型观点')
                .click()
                .sleep(2000)
                .elementByLinkText('传播路径')
                .click()
                .sleep(2000)
                .elementByLinkText('源头追溯')
                .click()
                .sleep(8000)
                .then(() => {
                    console.log('专题分析测试完毕')
                })
        })

        //上报下发
        it('#10 上报下发', () => {
            return driver
                .get(config.system.message_push_url)
                .sleep(2000)
                .elementByClassName('leftbar-go')
                .click()
                .sleep(1000)
                .elementByLinkText('收到下发信息')
                .click()
                .sleep(8000)
                .then(() => {
                    console.log('上报下发测试完毕')
                })
        })

        //版权检测
        it('#11 版权检测', () => {
            return driver
                .get(config.system.copyright_check_url)
                .sleep(2000)
                .elementByClassName('cy_searchIpt')
                .sendKeys(config.cy_urls[config.index])
                .sleep(2000)
                .elementByClassName('cy_searchBtn')
                .click()
                .sleep(20000)
                .hasElementByClassName('cy_toDetail')
                .sleep(5000)
                .then(() => {
                    console.log('版权检测测试完毕')
                })
        })

        //检索3.0
        it('#12 检索3.0', () => {
            return driver
                .get(config.system.new_search_url)
                .sleep(10000)
                .elementById('keywordsInput')
                .sendKeys('广州')
                .elementByLinkText('检索')
                .click()
                .sleep(5000)
                .elementByLinkText('论坛')
                .click()
                .sleep(5000)
                .elementByLinkText('博客')
                .click()
                .sleep(5000)
                .elementByLinkText('app')
                .click()
                .sleep(5000)
                .elementByLinkText('微博')
                .click()
                .sleep(3000)
                .elementByLinkText('微信')
                .click()
                .sleep(8000)
                .then(() => {
                    console.log('检索3.0测试完毕')
                })
        })

        //专题分析3.0
        it('#13 专题分析3.0', () => {
            return driver
                .get(config.system.new_theme_anlysis_url)
                .sleep(20000)
                .elementByLinkText('概况')
                .click()
                .sleep(2000)
                .elementByLinkText('舆论数据')
                .click()
                .sleep(2000)
                .elementByLinkText('典型报道')
                .click()
                .sleep(2000)
                .elementByLinkText('网民舆论')
                .click()
                .sleep(2000)
                .elementByLinkText('传播路径')
                .click()
                .sleep(2000)
                .elementByLinkText('源头推测')
                .click()
                .sleep(2000)
                .elementByLinkText('总结')
                .click()
                .sleep(2000)
                .elementByLinkText('最新消息')
                .click()
                .sleep(2000)
                .then(() => {
                    console.log('专题分析3.0测试完毕')
                })
        })

        //音视频中心
        it('#14 音视频中心', () => {
            return driver
                .get(config.system.va_center_url)
                .sleep(15000)
                .hasElementByClassName('video')
                .click()
                .sleep(2000)
                .then(() => {
                    console.log('音视频中心测试完毕')
                })
        })

        after(() => {
            return driver
                .sleep(12000)
                .quit()
                .then(() => {
                    var compeleteTime = new Date()
                    var y = compeleteTime.getFullYear()
                    var m = compeleteTime.getMonth() + 1
                    var d = compeleteTime.getDate()
                    var h = compeleteTime.getHours()
                    var min = compeleteTime.getMinutes()
                    var time = y + '-' + m + '-' + d + '  ' + h + ':' + min
                    var result = {
                        message: '测试完成',
                        time: time
                    }
                    console.log('执行结果:' + result.message + '<br />')
                    console.log('报告生成时间:' + result.time)
                })
        })
    })
})