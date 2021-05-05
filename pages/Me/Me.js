// pages/Me/Me.js
const computedBehavior = require('miniprogram-computed');

Page({
	behaviors: [computedBehavior],
	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: null,
		avatarModified: false,
		hasImg: false
	},
	updateAvatar: function() {
		var that = this
		wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album'],
			success(res) {
				// tempFilePath可以作为img标签的src属性显示图片
				const tempFilePaths = res.tempFilePaths
				wx.saveFile({
					tempFilePath: tempFilePaths[0],
					success(res) {
						const savedFilePath = res.savedFilePath
						wx.setStorageSync('imgUrl', savedFilePath)
						that.setData({
							imgUrl: savedFilePath
						})
					}
				})
				// wx.setStorageSync('imgUrl', tempFilePaths)
				// console.log(tempFilePaths)

				// that.setData({
				//   imgUrl:tempFilePaths[0]
				// })
			}
		})
	},
	uploadAvatar: function() { //上传头像到服务器
		wx.uploadFile({
			filePath: this.data.imgUrl,
			name: 'avatar',
			url: 'url', //服务器接口
			formData: {
				sesssionToken: "demoToken"
			},
			success(res) {
				console.log(res);
				this.setData({
					avatarModified: true
				});
			}
		})
	},
	submitSelfInfo: function(e) {
		console.log(e)
		var mineInfo = e.detail.value
		let tmpInfo = Object.assign(this.data.userInfo, mineInfo);
		this.setData({
			userInfo: tmpInfo
		})
		console.log(this.data.userInfo);
		wx.setStorageSync('userInfo', this.data.userInfo);
		wx.request({
			url: 'http://byu7983780001.my3w.com/phalapi/public/?s=App.SPAPI.CreatNewPerson',
			method: "POST",
			data: {
				P_name: mineInfo.name,
				P_grade: mineInfo.grade,
				P_college: mineInfo.college,
				P_intro: mineInfo.selfIntroduction,
				P_qq: mineInfo.QQ,
				P_wc: mineInfo.wechat
			},
			success: function(res) {
				wx.showToast({
					title: '保存成功',
					duration: 2000
				})
			},
			fail: function(e) {
				console.log('fail')
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			// 下方的头部信息会导致后台得不到参数
			// header: {
			//   'content-type': 'application/json'
			// },
			// if(this.data.avatarModified==true){//如果头像有更改
			//   this.uploadAvatar();
			// }
		})
	},

	authorizeUserInfo: function(res) {
		if (!this.data.userInfo.avatarUrl) {
			wx.getUserProfile({
				desc: '用于完善用户资料',
				success: (res) => {
					console.log(res);
					this.setData({
						userInfo: res.userInfo
					});
					wx.setStorage({
						key: 'userInfo',
						data: res.userInfo
					})
					this.setData({
						['imgUrl']: res.userInfo.avatarUrl,
						['name']: res.userInfo.nickName,
						['userInfo']: res.userInfo,
						['hasImg']: true
					});
				}
			})
		}
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// this.setData({
		//   myInfo: wx.getStorageSync('myInfo')
		// })
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		this.setData({
			userInfo: wx.getStorageSync('userInfo')
			// hasImg: userInfo.avatarUrl === undefined
		});
		let flag = !(this.data.userInfo.avatarUrl === undefined);
		this.setData({
			['hasImg']: flag
		})
		console.log('hasImg', this.data.hasImg);
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
