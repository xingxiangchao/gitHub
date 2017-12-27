/**
 * 格式化日期
 *
 * @param seconds 毫秒
 * @param format 格式 年-月-日 时:分:秒:毫秒:季度
 *                   'yy-m-dd h:i:s'    -- 08-8-8 6:1:1
 *                   'yyyy-mm-dd hh:ii:ss' -- 2008-08-08 06:01:01
 * @returns {string}
 */
function dateFormat(seconds, format) {
    const date = new Date(seconds);
    let fmt = format || 'yyyy-MM-dd';
    const o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 时间转秒
function dateMillisecond(starttime) {
    let starttimeHaoMiao = (new Date(starttime.replace(new RegExp("-", "gm"), "/"))).getTime(); //得到毫秒数
    return Math.floor(starttimeHaoMiao / 1000);
}

