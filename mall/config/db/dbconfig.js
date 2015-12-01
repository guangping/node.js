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

var mysql = require("mysql");
var pool = mysql.createPool(config);
/*var sql = "select * from sd_express_user limit 5";
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
 });*/


module.exports = pool;




