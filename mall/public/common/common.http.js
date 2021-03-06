/*通用发送请求*/
var Service = Service || {};
Service = {
    /* 同步 */
    execute: function (url, params, callBack,method,dataType) {
        dataType=dataType || 'json';
        method=method || 'post';
        var data = jQuery.param(params || {});
        $.ajax({
            type: method,
            url: url,
            data: data,
            async: false,
            dataType: 'json',
            success: function (result) {
                callBack(result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status+'==>'+textStatus+'==>'+errorThrown);
            }
        });
    },
    /*异步*/
    executeAsync: function (url, params, callBack) {
        var data = jQuery.param(params || {});
        $.ajax({
            type: "post",
            url: url,
            data: data,
            async: true,
            dataType: 'json',
            success: function (result) {
                callBack(result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status+'==>'+textStatus+'==>'+errorThrown);
            }
        });
    }
}