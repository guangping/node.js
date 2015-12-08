var express = require('express');
var router = express.Router();


var RedisClient = require('../config/redis/redis');
router.get('/', function (req, res, next) {
    RedisClient.keys("*", function (err, reply) {
        console.log(reply.toString());
    });
    var obj = {};
    obj.code = 0;
    obj.message = 'success';
    res.json(obj)
})



module.exports = router;