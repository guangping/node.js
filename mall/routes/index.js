var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var obj = {};
    obj.title = '测试1';
    obj.city = ['上海', '北京', '南京', '山东'];

    res.render('index', obj);
});

module.exports = router;
