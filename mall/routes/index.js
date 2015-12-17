var express = require('express');
var router = express.Router();


router.get('/:customerCode', function (req, res, next) {
    var code=req.param('customerCode');
    console.log(code)

    var obj = {};
    res.render('index', obj);
});


module.exports = router;
