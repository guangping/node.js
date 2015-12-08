var express = require('express');
var router = express.Router();

var ConstantService = require('../config/constant/constant');
var ProductServiceV2 = require('../service/api/product.service.v2');
var HttpCookie = require('../config/common/http.cookie.js');


router.post('/', function (req, res, next) {
    var httpCookie = new HttpCookie(req.headers.cookie);

    var params = {
        customerCode: httpCookie.get(ConstantService.CUSTOMER_CODE),
        address: req.param('address') || '',
        page: req.param('page') || 0,
        size: req.param('size') || 20
    }
    ProductServiceV2.queryList(params, function (err, result) {
        if (!err) {
            res.send(result);
        }
    });
});

module.exports = router;




























