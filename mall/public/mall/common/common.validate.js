$.validator.setDefaults({
    errorElement: 'p'
});

// 电话或手机验证规则
jQuery.validator.addMethod("tm", function (value, element) {
    var tm = /(^1[3|4|5|7|8]\d{9}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)|(^\d{3,4}-\d{7,8}-\d{1,4}$)|(^\d{7,8}-\d{1,4}$)/;
    return this.optional(element) || (tm.test(value));
}, "格式不对");
jQuery.validator.addMethod("mobile", function (value, element) {
    var tm = /(^1[3|4|5|7|8]\d{9}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)|(^\d{3,4}-\d{7,8}-\d{1,4}$)|(^\d{7,8}-\d{1,4}$)/;
    return this.optional(element) || (tm.test(value));
}, "号码格式不对");
// 汉字
jQuery.validator.addMethod("chinese", function (value, element) {
    var chinese = /^[\u4e00-\u9fa5]+$/;
    return this.optional(element) || (chinese.test(value));
}, "只能输入中文");
//发货地址
jQuery.validator.addMethod("senderAdd", function (value, element) {
    var val = value || '';
    var latitude = $(element).siblings('input[name="latitude"]').val();
    var longitude = $(element).siblings('input[name="longitude"]').val();

    if (!ServiceUtils.isEmpty(val) && !ServiceUtils.isEmpty(latitude) && !ServiceUtils.isEmpty(longitude)) {
        return true;
    }
    return false;
}, "输入有误");
//收货地址
jQuery.validator.addMethod("receiverAdd", function (value, element) {
    var val = value || '';
    var rLatitudeList = $(element).siblings('input[name="rLatitudeList"]').val();
    var rLongitudeList = $(element).siblings('input[name="rLongitudeList"]').val();

    if (!ServiceUtils.isEmpty(val) && !ServiceUtils.isEmpty(rLatitudeList) && !ServiceUtils.isEmpty(rLongitudeList)) {
        return true;
    }
    return false;
}, "输入有误");
jQuery.validator.addMethod("password", function (value, element) {
    var reg = /^[\w]{6,12}$/;
    return this.optional(element) || (reg.test(value));
}, "密码格式不正确!");