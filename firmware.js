/* ES5, intentionally usable by the PS4 browser and by the firmware tests. */
(function (root) {
    var modern = ['13.02', '13.04', '13.50', '13.52'];
    var slop = ['11.00', '11.50', '11.52', '12.00', '12.02', '12.50', '12.52', '13.00'];
    var nine = ['9.00', '9.03', '9.04', '9.50', '9.51', '9.60'];
    var seven = ['7.00', '7.01', '7.02', '7.50', '7.51', '7.55', '8.00', '8.01', '8.03', '8.50', '8.52'];
    var css = ['6.00', '6.02', '6.10', '6.20', '6.50', '6.51', '6.70', '6.71', '6.72', '7.00', '7.01', '7.02', '7.50', '7.51', '7.55', '8.00', '8.01', '8.03', '8.50', '8.52', '9.00', '9.03', '9.04', '9.50', '9.51', '9.60', '10.00', '10.01', '10.50', '10.70', '10.71', '11.00', '11.01', '11.02'];
    function detect(ua) {
        var match = /PlayStation\s+4[\/ ](\d{1,2})\.(\d{1,2})(?=[;\s\)\/]|$)/i.exec(ua || '');
        return match ? String(parseInt(match[1], 10)) + '.' + (match[2].length === 1 ? '0' : '') + match[2] : null;
    }
    function route(fw) {
        if (modern.indexOf(fw) !== -1) return '1352/index.html';
        if (slop.indexOf(fw) !== -1) return '1300/index.html';
        if (fw === '5.05') return '505/index.html';
        if (fw === '6.72') return '672/index.html';
        if (nine.indexOf(fw) !== -1) return '900/version-selector.html';
        if (seven.indexOf(fw) !== -1) return '700/version-selector.html';
        if (css.indexOf(fw) !== -1) return 'css/version-selector.html';
        return null;
    }
    root.Retr0Firmware = { detect: detect, route: route, versions: ['5.05'].concat(css, slop, modern).filter(function (v, i, all) { return all.indexOf(v) === i; }).sort(function (a, b) { return parseFloat(a) - parseFloat(b); }) };
}(typeof window !== 'undefined' ? window : globalThis));