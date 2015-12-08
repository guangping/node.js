var ApiService = require('../../config/api/api.service');
var request = require('request');
var ProductServiceV2 = ProductServiceV2 || {};
ProductServiceV2 = {
    /**
     * 商品搜索
     * */
    queryList: function (param, callback) {
        var url = ApiService.API_URL + ApiService.PRODUCT_LIST;
        request.post(url, function (err, response, body) {
            callback(err, body);
        }).form(param);
    },
    /**
     * 获取商品详情
     * */
    queryProductInfo: function (param, callback) {

    }
}


module.exports = ProductServiceV2;
