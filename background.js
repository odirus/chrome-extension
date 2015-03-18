/**
 * 显示系统消息
 */
var count = 0;

function show(price) {
    count++;
    chrome.notifications.create(String(count), {
	type: 'basic',
	iconUrl: '16.png',
	title: 'hello',
	message: 'nihao'
    }, function () {

    });
}

if(chrome.notifications) {
    setInterval(function() {
	show(100);
    }, 1000 * 10);
}