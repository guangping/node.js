/**
 * 产品搜索
 * **/

function ProductService() {
};
module.exports = ProductService;


var request = require('request');
ProductService.prototype.queryList = function (callback) {
    var params = {
        customerCode: 'ofwF7WYh',
        address: '',
        page: 0,
        size: 20
    }

    request.post('http://test.h5.sd-faster.com/api/product/list', function (err, response, body) {
        if (!err && response.statusCode == 200) {
            console.log(body) // 打印google首页
        }
        callback(err, response, body);
    }).form(params);
}





