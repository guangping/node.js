var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var orders = require('./routes/app/order');
var search = require('./routes/search.product');
var sr = require('./routes/search.redis');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hjs');
/**
 * 改变模板扩展名
 * */
app.set('view engine', 'html');
app.engine('.html', require('hjs').__express);//两个下划线



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

/*app.use(function (req, res, next) {
    var url = req.originalUrl;
    var user=req.session[user] || '';
    if (url != "/login" && user!='') {
        console.log('login......')
        //return res.redirect("/login");
    }
    next();
});*/

app.use('/', routes);
app.use('/users', users);
app.use('/order', orders);
app.use('/:customerCode/search', search);

/*app.use('/', routes);
app.use('/users', users);
app.use('/order', orders);
app.use('/search', search);
app.use('/sr', sr);*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.log(err);

        res.status(err.status || 500);
        res.render('error', {
            errorCode:500,
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.log(err);

    res.status(err.status || 500);
    res.render('error', {
        errorCode:500,
        message: err.message,
        error: {}
    });
});

module.exports = app;
