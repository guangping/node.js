var redis = require("redis");
var  RedisClient = redis.createClient(6379, '192.168.1.10', {connect_timeout: 5});
RedisClient.on('error', function (error) {
    console.log(error);
});


module.exports=RedisClient;




