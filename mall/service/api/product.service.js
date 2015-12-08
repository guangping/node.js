/**
 * 产品搜索
 * **/

function ProductService() {
};
module.exports = ProductService;

var ApiService = require('../../config/api/api.service');

var request = require('request');
ProductService.prototype.queryList = function (callback) {
    var params = {
        customerCode: ApiService.customerCode,
        address: '',
        page: 0,
        size: 20
    }
    var url = ApiService.API_URL + ApiService.PRODUCT_LIST;
    request.post(url, function (err, response, body) {
        callback(err, body);
    }).form(params);
}





