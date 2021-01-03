// pages/Me/Me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myInfo: {
      'id':'',
      'name': '',
      'college': '',
      'grade': '',
      'selfIntroduction': '',
      'wechat': '',
      'QQ': '',
      'phone': ''
    },
    imgUrl:null
  },
  updateAvatar:function(){
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success (res) {
            const savedFilePath = res.savedFilePath
            wx.setStorageSync('imgUrl', savedFilePath)
            that.setData({
                imgUrl:savedFilePath
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

  submitSelfInfo: function (e) {
    console.log(e)
    var mineInfo = e.detail.value
    wx.setStorageSync('myInfo', mineInfo)
    var that = this
    that.setData({
      myInfo: mineInfo
    })
    // console.log(that.data.myInfo)
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
      success: function (res) {
        wx.showToast({
          title: '保存成功',
          duration: 2000
        })
      },
      fail: function (e) {
        console.log('fail')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      // 下方的头部信息会导致后台得不到参数
      // header: {
      //   'content-type': 'application/json'
      // },

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   myInfo: wx.getStorageSync('myInfo')
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      myInfo: wx.getStorageSync('myInfo'),
      imgUrl:wx.getStorageSync('imgUrl')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})