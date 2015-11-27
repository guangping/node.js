// mysql CRUD
var sqlClient = module.exports;

var _pool = null;

var NND = {};

/*
 * Innit sql connection pool
 * @param {Object} app The app for the server.
 */
NND.init = function () {
    if (!_pool)
        _pool = require('./mysql-pool').createMysqlPool();
};

/**
 * Excute sql statement
 * @param {String} sql Statement The sql need to excute.
 * @param {Object} args The args for the sql.
 * @param {fuction} callback Callback function.
 *
 */
NND.query = function (sql, args, callback) {
    _pool.getConnection(function (err, client) {
        if (!!err) {
            console.error('[sqlqueryErr] ' + err.stack);
            return;
        }
        client.query(sql, args, function (err, res) {
            _pool.releaseConnection(client);
            callback.apply(null, [err, res]);
        });
    });
};

/**
 * Close connection pool.
 */
NND.shutdown = function () {
    _pool.end();
};

/**
 * init database
 */
sqlClient.init = function () {
    if (!!_pool) {
        return sqlClient;
    } else {
        NND.init();
        sqlClient.insert = NND.query;
        sqlClient.update = NND.query;
        //sqlClient.delete = NND.query;
        sqlClient.query = NND.query;
        return sqlClient;
    }
};

/**
 * shutdown database
 */
sqlClient.shutdown = function () {
    NND.shutdown();
};




































