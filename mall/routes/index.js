var express = require('express');
var router = express.Router();

/* GET home page. */
var ConstantService = require('../config/constant/constant');
router.get('/', function (req, res, next) {
    var obj = {};
    obj.ctx = req.baseUrl;
    obj.customerCode = req.baseUrl.replace('/', '');

    res.setHeader("Set-Cookie", [ConstantService.CUSTOMER_CODE + '=' + obj.customerCode]);

    res.render('index', obj);
});


module.exports = router;
