// pages/editTeam/editTeam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // index: null,
    picker: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    // date: '不设定',
    switchChage: wx.getStorageSync('teamInformation').cardOrNot,
    teamInfo: {
      title: '',
      label1: '',
      label2: '',
      label3: '',
      teamDiscription: '',
      teamRequire: '',
      teamNumber: '',
      endDate: '',
      // name: wx.getStorageSync('myInfo').name,
      // grade: wx.getStorageSync('myInfo').grade,
      // college: wx.getStorageSync('myInfo').college,
    },
    imgUrl: wx.getStorageSync('imgUrl'),
    name: wx.getStorageSync('myInfo').name,
    grade: wx.getStorageSync('myInfo').grade,
    college: wx.getStorageSync('myInfo').college,
    editTeamDate: ''
  },
  PickerChange(e) {
    console.log(e);
    var number = "teamInfo.teamNumber"
    this.setData({
      [number]: e.detail.value
    })
  },
  // MultiChange(e) {
  //   this.setData({
  //     multiIndex: e.detail.value
  //   })
  // },
  DateChange(e) {
    console.log(e)
    var date = "teamInfo.endDate"
    this.setData({
      [date]: e.detail.value
    })
  },
  switchChage: function (e) {
    // console.log(e)
    this.setData({
      switchChage: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    var teamInformation = e.detail.value;
    var date = new Date()
    var editTeamDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()

    wx.setStorageSync('teamInformation', teamInformation);
    wx.setStorageSync('editTeamDate', editTeamDate);

    that.setData({
      teamInfo: teamInformation,
      editTeamDate: editTeamDate,
    })

    wx.request({
      method: "POST",
      url: "http://byu7983780001.my3w.com/phalapi/public/?s=App.SPAPI.CreatNewPersonCV",
      data: {

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
  onShow: function () {
    this.setData({
      teamInfo: wx.getStorageSync('teamInformation'),
      switchChage: wx.getStorageSync('teamInformation').cardOrNot,
      name: wx.getStorageSync('myInfo').name,
      grade: wx.getStorageSync('myInfo').grade,
      college: wx.getStorageSync('myInfo').college,
    })
  },
})