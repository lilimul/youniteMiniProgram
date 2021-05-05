const app = getApp();

async function login() {
	wx.showLoading({
		mask: true,
		title: '正在登陆中'
	});
	console.log('start login---');
	wx.login({
		success: function (res) {
			console.log(res)
			wx.request({
				url: app.globalData.apiLogin,
				data: {JSCODE: res.code},
				method: 'POST',
				header: {'content-type': 'application/json'},
				success: function (res) {
					console.log(res);
					if (res.statusCode == 200) {
						console.log(res.data.openid);
						app.globalData.openid = res.data.openid;
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