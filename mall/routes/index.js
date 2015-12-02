var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var obj = {};

    res.render('index', obj);
});

module.exports = router;
