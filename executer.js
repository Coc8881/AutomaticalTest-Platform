'use strict'
const express = require('express')
const fs = require('fs')
const qs = require('url')
const func = require('./func.js')
const log4js = require('log4js')
var schedule = require('node-schedule')
var logger = log4js.getLogger()
logger.level = 'info'
const reportdir = 'reports/'

var app = express()

app.all("*", (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	next()
})
//
app.get('/Reports', (req, res) => {
	var parseURL = qs.parse(req.url, true, true)
	var pageNum = parseURL.query.pageNum
	func.getReports(pageNum).then((result) => {
		res.end(JSON.stringify(result))
	})
})
//搜索报告
app.get('/Search', (req, res) => {
	var parseURL = qs.parse(req.url, true, true)
	var keyword = parseURL.query.keyword
	func.searchReport(keyword).then((result) => {
		res.end(JSON.stringify(result))
	})
})

//统计报告数量
app.get('/AllReportsCount', (req, res) => {
	func.getAllReportsCount().then((result) => {
		res.end(JSON.stringify(result[0]))
	})
})

app.get('/getAllReportsCountFromMemory', (req, res) => {
	func.getAllReportsCountFromMemory().then((result) => {
		res.end(result)
	})
})

//将reports的文件路径同步到数据库
app.get('/Import', (req, res) => {
	func.clearReport()
	logger.info(JSON.stringify('Clear All Reports'))
	fs.readdir(reportdir, (err, files) => {
		if (err) {
			return console.error(err)
		}
		var reports = []
		for (var i = 0; i < files.length; i++) {
			var reportURL = 'http://47.106.85.62:8880/' + reportdir + files[i]
			reports.push(reportURL)
		}
		for (var i = 0; i < reports.length; i++) {
			func.Import(reports[i])
		}
		res.end(JSON.stringify('Import Compelete'))
		logger.info(JSON.stringify('Import Compelete'))
	})
})

//触发浏览器启动&执行测试用例
app.get('/AutomaticalTest', (req, res) => {
	res.writeHeader(200, {
		'Content-Type': 'application/json;charset=utf-8'
	})
	var parseURL = qs.parse(req.url, true, true)
	var systemName = parseURL.query.systemName
	var setRunTimes = parseURL.query.setRunTimes
	if (setRunTimes == undefined) {
		func.exec(systemName)
		logger.info(JSON.stringify('Excute testcase for one time'))
		logger.info(JSON.stringify('Testcase excuting....'))
	} else {
		func.runMoreTime(setRunTimes)
		logger.info(JSON.stringify('Testcase is excuting for ' + setRunTimes + ' times'))
		logger.info(JSON.stringify('Testcase excuting....'))
	}
	var compeleteTime = new Date()
	var y = compeleteTime.getFullYear()
	var m = compeleteTime.getMonth() + 1
	var d = compeleteTime.getDate()
	var h = compeleteTime.getHours()
	var min = compeleteTime.getMinutes()
	var time = y + '-' + m + '-' + d + '  ' + h + ':' + min
	var result = {
		message: '测试用例执行中,结果将于十分钟后生成',
		time: time,
		reportdir: 'http://47.106.85.62:8880/pages/'
	}
	res.end(JSON.stringify(result))
})

app.get('/saveTask', (req, res) => {
	res.writeHeader(200, {
		'Content-Type': 'application/json;charset=utf-8'
	})
	var parseURL = qs.parse(req.url, true, true)
	var stime = parseURL.query.stime
	var etime = parseURL.query.etime
	var timesOfDay = parseURL.query.timesOfDay
	func.clearTask()
	func.saveTask(stime, etime, timesOfDay).then((info) => {
		res.end(JSON.stringify('任务保存成功！'))
	})
})

app.get('/getTask', (req, res) => {
	func.getTask().then((result) => {
		res.end(JSON.stringify(result))
	})
})


app.get('/clearTask', (req, res) => {
	func.clearTask().then((info) => {
		res.end(JSON.stringify(info))
	})
})


app.use('/reports', express.static(reportdir))
app.use('/pages', express.static('pages'))
app.listen(8880, () => {
	console.log('This program is listening on 8880.....')
	logger.info('Server is started')
})