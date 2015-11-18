/*
 var mysql = require("mysql");
 var pool = mysql.createPool({
 host: '114.215.210.114',
 user: 'root',
 password: 'shen321dun',
 database: 'shendun_online',
 port: 3306
 });

 var sql = "select * from sd_express_user limit 5";
 pool.getConnection(function (err, conn) {
 if (err) console.log("POOL ==> " + err);

 conn.query(sql, function (err, rows) {
 if (err) console.log(err);
 console.log("SELECT ==> ");
 for (var i in rows) {
 console.log(rows[i]);
 }
 conn.release();
 });
 });
 */

var config = {
    host: '114.215.210.114',
    user: 'root',
    password: 'shen321dun',
    database: 'shendun_online',
    port: 3306,
    connectionLimit: 50,
    useTransaction: {
        connectionLimit: 1
    },
    useCursor: {
        connectionLimit: 1
    }
}

//var mysql = require('node-mysql');
/*var db = require('node-mysql');
var dw = new db.DB(config);
var sql = "select * from sd_express_user limit 5";
dw.connect(function(conn, cb) {
    conn.query(sql, function (err, rows) {
        if (err) console.log(err);
        console.log("SELECT ==> ");

        for (var i in rows) {
            console.log(rows[i]);
        }
    })
})*/


var mysql = require('node-mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'example.org',
    user            : 'bob',
    password        : 'secret'
});

pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution);
});



