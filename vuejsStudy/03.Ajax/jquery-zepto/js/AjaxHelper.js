/**
 * Created by phantom on 2017/5/9.
 */
/**
 *
 * 基于$.ajax声明一个简单的AjaxHelper构造器，
 * AjaxHelper构造器的原型对象包含5个方法，
 * 分别用于处理GET, POST, PUT, DELETE和JSONP请求。
 *
 */
function AjaxHelper() {
    this.ajax = function (url, type, dataType, data, callback) {
        $.ajax({
            url: url,
            type: type,
            dataType: dataType,
            data: data,
            success: callback,
            error: function (xhr, errorType, error) {
                alert('Ajax request error, errorType: ' + errorType + ', error: '+ error);
            }
        })
    };
};

AjaxHelper.prototype.get = function (url, data, callback) {
    this.ajax(url, 'GET', 'json', data, callback);
};

AjaxHelper.prototype.post = function (url, data, callback) {
    this.ajax(url, 'POST', 'json', data, callback);
};

AjaxHelper.prototype.put =  function (url, data, callback) {
    this.ajax(url, 'PUT', 'json', data, callback);
};

AjaxHelper.prototype.delete = function (url, data, callback) {
    this.ajax(url, 'DELETE', 'json', data, callback);
};

AjaxHelper.prototype.jsonp =function (url, data, callback) {
    this.ajax(url, 'GET', 'jsonp', data, callback);
};

AjaxHelper.prototype.constructor = AjaxHelper;