//配置基本信息
var stockId = 'sz002024';

//配置显示
var showPeriodTime = 60,
    showTime = 5;
//配置数据源
var apiUrl = 'http://hq.sinajs.cn/list=';

function showNotice (title, content) {
    var notificationId = String(Date.now());

    chrome.notifications.create(notificationId, {
	type: 'basic',
	iconUrl: '48.png',
	title: title,
	message: content
    }, function () {});

    setTimeout(function () {
	chrome.notifications.clear(notificationId, function() {});
    }, 1000 * showTime);
}

function getCurrentPrice (stockId, callback) {
    $.ajax({
	type: 'GET',
	url: apiUrl + stockId,
	success: function (data, status) {
	    callback(null, data.split(',')[3]);
	}
    });
}

$(document).ready(function () {
    setInterval(function () {
	getCurrentPrice(stockId, function (err, price) {
	    if (err) {
		showNotice('遇到错误', '...');
	    } else {
		showNotice(String(stockId), String(price));
	    }
	});
    }, 1000 * showPeriodTime);
});


