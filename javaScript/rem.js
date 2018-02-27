/**
 * 获取屏幕宽度
 * 邢祥超
 * 2018/02/27.
 */
'use strict';
(function (doc, win) {
    const docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        recalc = function () {
            const clientWidth = docEl.clientWidth;
            if (!clientWidth) {
                return;
            }
            docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
        };
    if (!doc.addEventListener) {
        return;
    }
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);