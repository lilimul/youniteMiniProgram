const app = getApp();

async function login() {
	wx.showLoading({
		mask: true,
		title: '正在登陆中'
	});
	console.log('start login---');
	wx.login({
		success: function (res) {
			console.log('JSCODE', res)
			wx.request({
				url: app.globalData.apiLogin,
				data: {JSCODE: res.code},
				method: 'POST',
				header: {'content-type': 'application/json'},
				success: function (res) {
					console.log('openid', res);
					if (res.statusCode == 200) {
						console.log(typeof res.data);
						console.log(res.data.data);
						app.globalData.openid = res.data.data;
					} else {
						console.log(res.errMsg);
					}
				},
				
			})
		}
	});
	wx.hideLoading();
}

module.exports = {
	login
}