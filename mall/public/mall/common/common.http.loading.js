/*通用发送请求*/
var Service = Service || {};
Service = {
    /* 同步 */
    execute: function (url, params, callBack,method,dataType) {
        dataType=dataType || 'json';
        method=method || 'post';
        var data = jQuery.param(params || {});
        $("body").mask("处理中...");
        $.ajax({
            type: method,
            url: url,
            data: data,
            async: false,
            timeout: 2000,
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (result) {
                $("body").unmask();
                callBack(result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("body").unmask();
               // window.location.href='/error/index.htm';
                alert(XMLHttpRequest.status+'==>'+textStatus+'==>'+errorThrown);
            }
        });
    },
    /*异步*/
    executeAsync: function (url, params, callBack) {
        var data = jQuery.param(params || {});
        $("body").mask("处理中...");
        $.ajax({
            type: "post",
            url: url,
            data: data,
            timeout: 2000,
            async: true,
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (result) {
                $("body").unmask();
                callBack(result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("body").unmask();
               // window.location.href='/error/index.htm';
                alert(XMLHttpRequest.status+'==>'+textStatus+'==>'+errorThrown);
            }
        });
    }
}