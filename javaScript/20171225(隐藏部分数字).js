/**
 * cardNum
 * @date 2017年12月25日
 * @param str 需要操作字符串
 * @param frontLen 开始节点
 * @param endLen 结束节点
 */
function cardNum(str, frontLen, endLen) {
    const len = str.length - frontLen - endLen;
    let num = '';
    for (let i = 0; i < len; i++) {
        num += '*';
    }
    return str.substring(0, frontLen) + num + str.substring(str.length - endLen);
}