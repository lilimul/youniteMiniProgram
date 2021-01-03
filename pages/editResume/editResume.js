// pages/editResume/editResume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeInfo: {
      resumeTitle: '',
      yiyuan1: '',
      yiyuan2: '',
      yiyuan3: '',
      shetuanExperience: '',
      projectExperience: '',
      shixiExperience: ''
    },
    editDate:''

  },

  formSubmit: function (e) {
    var that = this;
    var resumeInformation = e.detail.value;
    var date = new Date()
    var editDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()+' '+date.getHours()+':'+date.getMinutes()

    wx.setStorageSync('resumeInformation', resumeInformation);
    wx.setStorageSync('editDate', editDate);

    that.setData({
      resumeInfo:resumeInformation,
      editDate:editDate,
    })

    wx.request({
      method: "POST",
      url: "http://byu7983780001.my3w.com/phalapi/public/?s=App.SPAPI.CreatNewPersonCV",
      data: {
        'CV_title': resumeInformation.resumeTitle,
        'CV_Wish1': resumeInformation.yiyuan1,
        'CV_Wish2': resumeInformation.yiyuan2,
        'CV_Wish3': resumeInformation.yiyuan3,
        // 'shetuanExperience':resumeInformation.shetuanExperience,
        'CV_Pexperience': resumeInformation.projectExperience,
        'CV_Iexperience': resumeInformation.shixiExperience,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      // 下方的头部信息会导致后台得不到参数
      // header: {
      //   'content-type': 'application/json'
      // },
      success: function (res) {
        wx.showToast({
          title: '保存成功',
          duration: 2000
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},


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
      resumeInfo: wx.getStorageSync('resumeInformation')
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