var express = require('express');
var router = express.Router();

var UserService = require('../service/user/user.service');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/query', function (req, res, next) {

    var userService = new UserService();
    userService.queryList(function (err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })
    res.send('db');
});

module.exports = router;
