var express = require('express');
var router = express.Router();

var ProductService = require('../service/api/product.service');


router.post('/', function (req, res, next) {
    var productService = new ProductService();

    res.end(function () {
        productService.queryList(function (err,response, result) {
            console.log('err:' + err + ',result:' + result+",response:"+response);
            if (!err) {
                res.send(result);
            }
        })
    })

});


module.exports = router;




























