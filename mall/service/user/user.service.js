var pool = require('../../config/db/dbconfig');

function  UserService(){};
module.exports = UserService;

var sql = "select * from sd_express_user limit 5";
pool.getConnection(function (err, connection) {
    UserService.prototype.queryList = function (callback) {
        connection.query(sql, function (err, result) {
            if (err) console.log("POOL ==> " + err);

            callback(err, result);
        });
    }
});

