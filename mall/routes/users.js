var express = require('express');
var router = express.Router();

var mysql = require('../mysql');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.get('/query', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
