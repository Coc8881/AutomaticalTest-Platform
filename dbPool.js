var mysql=require('mysql')
const log4js = require('log4js')
var logger = log4js.getLogger()
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sjh',
    port: 3306
});

var db_query = function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            logger.error(err)
            callback(err,null,null)
        }else{
            conn.query(sql,function(err,result,fields){
                //事件驱动回调
                callback(err,result,fields)
            })
            //释放连接
            conn.release()
        }
    })
}

exports.db_query = db_query