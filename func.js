'use strict'
const child_process = require('child_process')
const log4js = require('log4js')
var logger = log4js.getLogger()
var connection = require('./dbLink/mysqlconnection.js')
var redispool = require('./dbLink/redisPool.js')
var pool = require('./dbLink/dbPool.js')

//单次开启数据库连接
// connection.handleDisconnection()

//将报告路径导入数据库
var Import = (url) => {
	const sql = 'insert into testreports (url) values("' + url + '")'
	pool.db_query(sql, (err, info) => {
		if (err) {
			console.error(err)
			return
		} else {
			logger.trace('Import:'+JSON.stringify(sql))
			logger.info('Import:'+JSON.stringify(info))
		}
	})
}

//统计报告份数
var getAllReportsCount = () => {
	return new Promise((reslove, reject) => {
		const sql = 'select count(*) as count from testreports'
		pool.db_query(sql, (err, result) => {
			if (err) {
				console.error(err)
				reject(err)
				return
			} else {
				logger.trace('getAllReportsCount:'+JSON.stringify(sql))
				logger.info('getAllReportsCount:'+JSON.stringify(result))
				redispool.redisPool.set('count', result[0].count)
				reslove(result)
			}
		})
	})
}

var getAllReportsCountFromMemory = ()=>{
	return new Promise((reslove,reject)=>{
		redispool.redisPool.get('count',(err,result)=>{
			if (err) {
				reject(err)
				logger.error('getAllReportsCountFromMemory:'+JSON.stringify(err))
				return
			}else{
				reslove(result)
				logger.info('getAllReportsCountFromMemory'+JSON.stringify(result))
			}
		})
	})
}

//按页数取报告
var getReports = (pageNumStr) => {
	var pageSize = 10
	var pageNum = parseInt(pageNumStr)
	return new Promise((reslove, reject) => {
		const sql = 'select * from testreports order by rid desc limit ' + ((pageNum - 1) * pageSize) + ',' + pageSize
		pool.db_query(sql, (err, result) => {
			if (err) {
				logger.error(err)
				reject(err)
			} else {
				reslove(result)
				logger.trace('getReports:'+JSON.stringify(sql))
				logger.info('getReports:'+JSON.stringify(result))	
			}
		})
	})
}

//搜索方法
var searchReport = (keyword) => {
	return new Promise((reslove, reject) => {
		const sql = 'select * from testreports where url like "%' + keyword + '%"'
		pool.db_query(sql, (err, result) => {
			if (err) {
				console.error(err)
				reject(err)
			} else {
				logger.trace('searchReport:'+JSON.stringify(sql))
				logger.info('searchReport:'+JSON.stringify(result))
				reslove(result)
			}
		})
	})
}
//清除报告库
var clearReport = () => {
	return new Promise((reslove, reject) => {
		const sql = 'truncate table testreports'
		pool.db_query(sql, (err, info) => {
			if (err) {
				console.error(err)
				reject(err)
			} else {
				reslove(info)
				logger.trace('clearReport:'+JSON.stringify(sql))
				logger.info('clearReport:'+JSON.stringify(info))	
			}
		})
	})
}

var saveTask = (stime, etime, timesOfDay) => {
	return new Promise((reslove, reject) => {
		const sql = 'insert into test_task (stime,etime,timesOfDay) values("' + stime + '","' + etime + '","' + timesOfDay + '")'
		pool.db_query(sql, (err, info) => {
			if (err) {
				console.error(err)
				reject(err)
			} else {
				reslove(info)
				logger.trace('saveTask:'+JSON.stringify(sql))
				logger.info('saveTask:'+JSON.stringify(info))
			}
		})
	})
}

//
var clearTask = () => {
	return new Promise((reslove, reject) => {
		const sql = 'truncate table test_task'
		pool.db_query(sql, (err, info) => {
			if (err) {
				console.error(err)
				reject(err)
			} else {
				reslove(info)
				logger.trace('clearTask:'+JSON.stringify(sql))
				logger.info('clearTask:'+JSON.stringify(info))
			}
		})
	})
}

var getTask = () => {
	return new Promise((reslove, reject) => {
		const sql = 'select * from test_task'
		pool.db_query(sql, (err, result) => {
			if (err) {
				console.error(err)
				reject(err)
			} else {
				reslove(result)
				logger.trace('getTask'+JSON.stringify(sql))
				logger.info('getTask'+JSON.stringify(result))
			}
		})
	})
}
//单次执行
var exec = (systemName) => {
	const url = 'C:/Users/Administrator/Desktop/dist/'+systemName+'.bat'
	child_process.execFile(url, {}, (error, stdout, stderr) => {
		if (error) {
			logger.error('exec:'+JSON.stringify(error))
		}
		logger.info(JSON.stringify('exec info:Testcase excute compelete'))
	})
}
//多次执行
var runMoreTime = (times) => {
	for (let i = 0; i < times; ++i) {
		exec()
	}
}

var generater = (divide) => {
	var secondsOfDay = 10
	var executPoints = []
	var executPoint = Math.ceil(secondsOfDay / divide)
	for (var i = 0; i < divide; i++) {
		executPoints[i] = (executPoint * (i + 1))
	}
	return executPoints
}

exports.generater = generater
exports.Import = Import
exports.getAllReportsCount = getAllReportsCount
exports.getReports = getReports
exports.searchReport = searchReport
exports.clearReport = clearReport
exports.saveTask = saveTask
exports.clearTask = clearTask
exports.exec = exec
exports.runMoreTime = runMoreTime
exports.getTask = getTask
exports.getAllReportsCountFromMemory = getAllReportsCountFromMemory