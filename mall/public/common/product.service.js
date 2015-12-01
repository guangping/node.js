var ProductService = ProductService || {};
ProductService = {
    init: function () {
        var me = this;
        //加载商品数据
        Service.execute('${ctx}/resources/json/1.json', null, function (cb) {
            if (cb.code == 0) {
                var data = cb.result;
                me.showProduct(data);
            } else {
                $('.no_goods').show();
            }
        })
    },
    showProduct: function (data) {
        var html = '';
        $.each(data, function (index, val) {
            html += '<section>';
            html += '<div class="lf">';
            html += '<a href="${ctx}/goods/info/' + val.id + '.html">';
            html += '<img src="${ctx}/resources/mall/img/index_pic1.png" alt="">';
            html += '<p>' + val.title + '</p>';
            html += '<p><span>￥' + val.price + '</span> / ' + val.unit + '</p>';
            if ((val.discount || '') != '') {
                html += '<p>￥' + val.discount + '</p>';
            }
            html += '</a>';
            html += '</div>';
            html += ' <div class="rg">';
            html += '<a data-id="' + val.id + '" href="javascript:void (0);;">立即购买</a>';
            html += ' </div>';
            html += ' </section>';
        })
        $('.cont').append(html);
    }
}

