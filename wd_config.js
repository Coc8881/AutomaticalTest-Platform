'use strict'
const browser = 'electron'
const wdOjb = {
    host: 'localhost',
    port: process.env.MACACA_SERVER_PORT || 3456
}
const platform = {
    platformName: 'desktop',
    browserName: browser,
    userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0 Safari/537.36 Macaca Custom UserAgent',
    deviceScaleFactor: 2
}
exports.wdOjb = wdOjb
exports.platform = platform
