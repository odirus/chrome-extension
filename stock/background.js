/**
 * 显示系统消息
 */
function showPrice(id, price) {
    var notificationId = String(Date.now());

    chrome.notifications.create(notificationId, {
	type: 'basic',
	iconUrl: '32.png',
	title: String(id),
	message: String(price)
    }, function () {});

    setTimeout(function () {
	chrome.notifications.clear(notificationId, function() {});
    }, 1000);
}

var apiUrl = 'http://hq.sinajs.cn/list=',
    stockId = 'sz002024';

$(document).ready(function () {
    $.ajax({
	type: 'GET',
	url: apiUrl + stockId,
	success: function (data, status) {
	    if(chrome.notifications) {
		var id = '002024',
		    price = 10;

		setInterval(function() {
		    showPrice(stockId, data.split(',')[3]);
		}, 1000 * 10);
	    }
	}
    });
});


