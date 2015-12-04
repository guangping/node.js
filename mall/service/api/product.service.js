/**
 * 产品搜索
 * **/

function ProductService() {
};
module.exports = ProductService;


var request = require('request');
ProductService.prototype.queryList = function (callback) {
    var params = {
        customerCode: '00004',
        address: '',
        page: 0,
        size: 20
    }

    request.post('http://115.29.242.114:30026//api/product/list',function (err, response, body) {
/*        if (!err && response.statusCode == 200) {
            console.log(body) // 打印google首页
        }*/
        callback(err,body);
    }).form(params);
}





