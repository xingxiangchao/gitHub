/**
 * @Func ajax 封装调用
 * @Author 邢祥超
 * @Date 2018年03月22日
 * 使用requirejs 可自行修改
 */

'use strict';
define(['jquery'], ($) => {

    let i = 0;

    return {
        /**
         * get request
         * @param url 接口地址
         * @param data 参数（可选）
         * @returns {*} 返回一个实现了Promise接口的jqXHR对象
         */
        get: (url, data) => {
            return $.ajax({
                url: url,
                type: 'GET',
                data: data || {},
                contentType: 'text/html;charset=utf-8',
                dataType: 'json',
                error: errorHandler
            });
        },
        /**
         * post request
         *
         * @param url 接口地址
         * @param data 参数（可选）
         * @returns {*} 返回一个实现了Promise接口的jqXHR对象
         */
        post: (url, data) => {
            return $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data || {}),
                dataType: 'json',
                error: errorHandler
            });
        },
        /**
         * put request
         *
         * @param url 接口地址
         * @param data 参数（可选）
         * @returns {*} 返回一个实现了Promise接口的jqXHR对象
         */
        put: (url, data) => {
            return $.ajax({
                url: url,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(data || {}),
                dataType: 'json',
                error: errorHandler
            });
        },
        /**
         * delete request
         *
         * @param url 接口地址
         * @returns {*} 返回一个实现了Promise接口的jqXHR对象
         */
        del: (url) => {
            return $.ajax({
                url: url,
                type: 'DELETE',
                contentType: 'text/html; charset=utf-8',
                dataType: 'json',
                error: errorHandler
            });
        },
        /**
         * 通过php删除服务器文件
         *
         * @param url 接口地址
         * @param data 参数（可选）
         * @returns {*} 返回一个实现了Promise接口的jqXHR对象
         */
        fileDel: (url, data) => {
            return $.ajax({
                url: url,
                type: 'POST',
                data: data,
                cache: false,
                async: false,
                contentType: false, //不可缺
                processData: false, //不可缺
            });
        }
    };

    // 错误处理
    function errorHandler(XMLHttpRequest) {
        // Tomcat session超时，跳转到登录页.
        // 还有种可能是，项目调试时，直接从公司服务器取数据，不是本地起Tomcat，出现401
        const json = JSON.parse(XMLHttpRequest.responseText);
        if (json.code === 401 && json.message !== '用户名或密码不正确') {
            i++;
            if (i === 1) {
                alert('用户信息已过期，请重新登录');
                setTimeout(() => {
                    if (sessionStorage.LOGINSSO === 'true') {
                        window.parent.postMessage('', sessionStorage.PARENT_URL);
                    } else {
                        window.location.href = 'login.html';
                    }
                    sessionStorage.clear();
                },2000);
            } else {
                return false;
            }
        } else if (json.code === 404) {
            console.error('错误定义：', '访问的接口或者资源不存在！');
        } else if (json.code === 405) {
            console.error('错误定义：', '方法类型不正确，一般为Ajax的type使用错误！');
        } else if (json.code === 500) {
            console.error('错误定义：', '服务器内部错误，确认传参准确，确认是否后台出现空指针！');
        } else if (json.code === 432) {
            console.error('错误定义：', '服务器内部错误，确认传参准确，确认是否后台出现空指针！');
        }
    }
});
