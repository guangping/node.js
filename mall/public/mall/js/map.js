/**
 * Created by lance on 10/12/2015.
 */
var local = null, searchRs = new Array();
if (!local) {
    local = new BMap.LocalSearch($('#cityName').val(), {
        onSearchComplete: searchComplete
    });
    local.setLocation($('#cityName').val());
}

function get_geo_Address(address, callback) {
    var myGeo = new BMap.Geocoder();
    myGeo.getPoint(address, function (point) {
        callback(point);
        //if (point) {}
    }, $('#cityName').val());
}

function reloadPopup() {
    if (window.currentTypeahead) {
        if (window.lastRefreshPopupTimer) {
            clearTimeout(window.lastRefreshPopupTimer);
        }
        window.lastRefreshPopupTimer = setTimeout(function () {
            window.currentTypeahead.process(searchRs);
        }, 200);
    }
}

function searchComplete(rs) {
    searchRs.length = 0;
    if (local.getStatus() == BMAP_STATUS_SUCCESS) {
        var size = rs.getCurrentNumPois() > 50 ? 50 : rs.getCurrentNumPois();
        for (j = 0; j < size; j++) {
            addResult(rs.getPoi(j));
        }
    }
    reloadPopup();
}
function get_geo_info(lng, lat, callback) {
    var myGeo = new BMap.Geocoder();
    myGeo.getLocation(new BMap.Point(lng, lat), function (res) {
        callback && callback(res["addressComponents"]);
        reloadPopup();
    });
}
function addResult(position) {
    var me = this;
    var title = position.title;
    var address = position.address || "";
    var lat = position.point.lat;
    var lng = position.point.lng;
    var province = position.province;
    var city = position.city;
    var obj = {};
    obj.title = title;
    obj.city = city;
    obj.province = province;
    obj.lat = lat;
    obj.lng = lng;

    switch (position.type) {
        case BMAP_POI_TYPE_NORMAL : // 一般位置点
            if (!address) {
                me.get_geo_info(lng, lat, function (res) {
                    if (null != res) {
                        var str = res["city"] + res["district"] + res["street"] + res["streetNumber"];
                        obj.address = str;

                        searchRs.push(obj);
                    }
                });
            } else if (new RegExp("^(.*市)(.*[区县])$").test(address)) {
                me.get_geo_info(lng, lat, function (res) {
                    if (null != res) {
                        var str = res["city"] + res["district"] + res["street"] + res["streetNumber"];
                        obj.address = str;

                        searchRs.push(obj);
                    }
                });
            } else if (new RegExp("^(.*市)(.*[区县]).+").test(address)) {
                obj.address = address;
                searchRs.push(obj);
            } else if (new RegExp(".*(?!市).*[区县]").test(address)) {
                me.get_geo_info(lng, lat, function (res) {
                    if (null != res) {
                        obj.address = res["city"] + address;

                        searchRs.push(obj);
                    }
                });
            } else if (!(new RegExp("^(.*市).*[区县]").test(address))) {
                me.get_geo_info(lng, lat, function (res) {
                    if (null != res) {
                        obj.address = res["city"] + res["district"] + address;

                        searchRs.push(obj);
                    }
                });
            } else {
                obj.address = address;

                searchRs.push(obj);
            }
            break;
        case BMAP_POI_TYPE_BUSSTOP : // 公交车站位置点
            me.get_geo_info(lng, lat, function (res) {
                if (null != res) {
                    var str = res["city"] + res["district"] + res["street"] + res["streetNumber"];
                    obj.address = str;

                    searchRs.push(obj);
                }
            });
            break;
        case BMAP_POI_TYPE_SUBSTOP : // 地铁车站位置点
            me.get_geo_info(lng, lat, function (res) {
                if (null != res) {
                    obj.address = res["city"] + res["district"] + address + title + '地铁站';

                    searchRs.push(obj);
                }
            });
            break;
    }
}

!function ($) {
    "use strict"; // jshint ;_;
    var TypeaheadAddress = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, $.fn.typeaheadaddress.defaults, options)
        this.updater = this.options.updater || this.updater
        this.source = this.options.source
        this.$menu = $(this.options.menu)
        this.shown = false
        this.listen()
    }

    TypeaheadAddress.prototype = {
        constructor: TypeaheadAddress
        , select: function () {
            localStorage.removeItem('address');
            sessionStorage.removeItem('address');

            var val = this.$menu.find('.active').attr('data-value');
            var lat = this.$menu.find('.active').attr('lat');
            var lng = this.$menu.find('.active').attr('lng');
            this.$element.val(this.updater(val)).change();
            this.$element.siblings('input[name="latitude"]').val(lat);
            this.$element.siblings('input[name="longitude"]').val(lng);
            this.$element.siblings('input[name="rLatitudeList"]').val(lat);
            this.$element.siblings('input[name="rLongitudeList"]').val(lng);

            if (localStorage) {
                localStorage.setItem("address", val);
            }
            if (sessionStorage) {
                sessionStorage.setItem("address", val);
            }
            if ((window.redirectUrl || '') != '') {
                window.location.href = window.redirectUrl + '?address=' + val;
            }
            return this.hide()
        }

        , updater: function (item) {
            return item
        }

        , show: function () {
            var pos = $.extend({}, this.$element.position(), {
                height: this.$element[0].offsetHeight
            })

            this.$menu.insertAfter(this.$element).css({top: pos.top + pos.height, left: pos.left}).show()

            this.shown = true
            return this
        }

        , hide: function () {
            this.$menu.hide()
            this.shown = false
            return this
        }

        , lookup: function (event) {
            var items

            this.query = this.$element.val()

            if (!this.query || this.query.length < this.options.minLength) {
                return this.shown ? this.hide() : this
            }

            return items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source
            //return items ? this.process(items) : this
        }

        , process: function (items) {
            var that = this

            if (!items.length) {
                return this.shown ? this.hide() : this
            }

            return this.render(items.slice(0, this.options.items)).show()
        }
        , render: function (items) {
            var that = this

            items = $(items).map(function (i, item) {
                i = $(that.options.item).attr('data-value', item.address)
                    .attr('lat', item.lat).attr('lng', item.lng).attr('province', item.province)
                    .attr('city', item.city);
                i.find('a').html(item.title + '<span style="color: gray;">' + item.address + '</span>')
                return i[0]
            })

            items.first().addClass('active')
            this.$menu.html(items)
            return this
        }

        , next: function (event) {
            var active = this.$menu.find('.active').removeClass('active')
                , next = active.next()

            if (!next.length) {
                next = $(this.$menu.find('li')[0])
            }

            next.addClass('active')
        }

        , prev: function (event) {
            var active = this.$menu.find('.active').removeClass('active')
                , prev = active.prev()

            if (!prev.length) {
                prev = this.$menu.find('li').last()
            }

            prev.addClass('active')
        }

        , listen: function () {
            this.$element
                .on('focus', $.proxy(this.focus, this))
                .on('blur', $.proxy(this.blur, this))
                .on('keypress', $.proxy(this.keypress, this))
                .on('keyup', $.proxy(this.keyup, this))

            if (this.eventSupported('keydown')) {
                this.$element.on('keydown', $.proxy(this.keydown, this))
            }

            this.$menu
                .on('click', $.proxy(this.click, this))
                .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
                .on('mouseleave', 'li', $.proxy(this.mouseleave, this))
        }

        , eventSupported: function (eventName) {
            var isSupported = eventName in this.$element
            if (!isSupported) {
                this.$element.setAttribute(eventName, 'return;')
                isSupported = typeof this.$element[eventName] === 'function'
            }
            return isSupported
        }

        , move: function (e) {
            if (!this.shown) return

            switch (e.keyCode) {
                case 9: // tab
                case 13: // enter
                case 27: // escape
                    e.preventDefault()
                    break

                case 38: // up arrow
                    e.preventDefault()
                    this.prev()
                    break

                case 40: // down arrow
                    e.preventDefault()
                    this.next()
                    break
            }

            e.stopPropagation()
        }

        , keydown: function (e) {
            window.currentTypeahead = this;
            this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40, 38, 9, 13, 27])
            this.move(e)
        }

        , keypress: function (e) {
            if (this.suppressKeyPressRepeat) return
            this.move(e)
        }

        , keyup: function (e) {
            switch (e.keyCode) {
                case 40: // down arrow
                case 38: // up arrow
                case 16: // shift
                case 17: // ctrl
                case 18: // alt
                    break

                case 9: // tab
                case 13: // enter
                    if (!this.shown) return
                    this.select()
                    break

                case 27: // escape
                    if (!this.shown) return
                    this.hide()
                    break

                default:
                    this.lookup()
            }

            e.stopPropagation()
            e.preventDefault()
        }
        , focus: function (e) {
            this.focused = true
        }
        , blur: function (e) {
            this.focused = false
            if (!this.mousedover && this.shown) this.hide()
        }
        , click: function (e) {
            e.stopPropagation()
            e.preventDefault()
            this.select()
            this.$element.focus()
        }
        , mouseenter: function (e) {
            this.mousedover = true
            this.$menu.find('.active').removeClass('active')
            $(e.currentTarget).addClass('active')
        }
        , mouseleave: function (e) {
            this.mousedover = false
            if (!this.focused && this.shown) this.hide()
        }
    }
    var old = $.fn.typeaheadaddress
    $.fn.typeaheadaddress = function (option) {
        return this.each(function () {
            var $this = $(this)
                , data = $this.data('typeahead')
                , options = typeof option == 'object' && option
            if (!data) $this.data('typeahead', (data = new TypeaheadAddress(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.typeaheadaddress.defaults = {
        source: []
        , items: 10
        , menu: '<ul class="typeahead dropdown-menu"></ul>'
        , item: '<li><a href="javascript:void(0);"></a></li>'
        , minLength: 1
    }

    $.fn.typeaheadaddress.Constructor = TypeaheadAddress
    $.fn.typeaheadaddress.noConflict = function () {
        $.fn.typeaheadaddress = old
        return this
    }
    $(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
        var $this = $(this)
        if ($this.data('typeahead')) return
        $this.typeaheadaddress($this.data())
    })
}(window.jQuery);