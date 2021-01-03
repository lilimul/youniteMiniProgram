// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    picker: ['全部', '我发出的申请', '我收到的申请'],
    messageList: [{
        title: "大广赛找剪视频",
        mode: "等待回复中...",
        information: "时间：2021年1月1日",
        btn1: "查看当前进度",
        btn2: "删除记录",
        received: 0
      },
      {
        title: "大广赛找剪视频",
        mode: "对方已通过！",
        information: "时间：2021年1月1日",
        btn1: "点击查看对方的联系方式",
        btn2: "删除记录",
        received: 0
      },
      {
        title: "大广赛找剪视频",
        mode: "您已同意，组队成功~",
        information: "时间：2021年1月1日",
        btn1: "点击查看对方的联系方式",
        btn2: "删除记录",
        received: 1
      }, {
        title: "大广赛找剪视频",
        mode: "对方请求组队",
        information: "时间：2021年1月1日",
        btn1: "同意",
        btn2: "拒绝",
        received: 1
      },
    ],
  },
  //这里的作用是点击消息卡片查看相应的组队详情
  navToDetail: function () {
    wx.navigateTo({
      url: '../conteDetail/conteDetail',
    })
  },
  click1: function (e) {
    if (e.currentTarget.dataset.text == "查看当前进度") {
      wx.request({
        //发送给服务器的方式：get/post
        method: "GET",
        url: '查看当前进度的接口',
        //发送给服务器的数据
        data: {

        },
        //成功回调函数
        success: res => {
          //服务器返回给你的数据应该在res.data中
          //根据返回给你的数据调整下面的Model内容
          console.log(res)
        },
      })
      wx.showModal({
        title: '当前进度',
        content: '对方尚未响应，请耐心等待',
        confirmColor: '#A9A8EC',
        success: function (response) {
          if (response.confirm) {
            console.log('用户点击确定')
          } else if (response.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (e.currentTarget.dataset.text == "点击查看对方的联系方式") {
      wx.request({
        //发送给服务器的方式：get/post
        method: "GET",
        url: '查看对方联系方式的接口',
        //发送给服务器的数据
        data: {

        },
        //成功回调函数
        success: res => {
          //服务器返回给你的数据应该在res.data中
          //根据返回给你的数据调整下面的Model内容
          console.log(res)
        },
      })
      wx.showModal({
        title: '联系方式',
        content: "姓名：张三 \
      院系：计算机学院 \
      联系电话：88888888",
        confirmColor: '#A9A8EC',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (e.currentTarget.dataset.text == "同意") {
      wx.request({
        //发送给服务器的方式：get/post
        method: "GET",
        url: '同意的接口',
        //发送给服务器的数据
        data: {

        },
        //成功回调函数
        success: res => {
          //服务器返回给你的数据应该在res.data中
          console.log(res)
          e.setData.text = "点击查看对方的联系方式"

        },
      })
      // e.setData.text = "点击查看对方的联系方式"
    }
  },
  click2: function (e) {
    if (e.currentTarget.dataset.text == "删除记录") {
      wx.request({
        //发送给服务器的方式：get/post
        method: "GET",
        url: '删除记录的接口',
        //发送给服务器的数据
        data: {

        },
        //成功回调函数
        success: res => {
          //服务器返回给你的数据应该在res.data中
          //根据返回给你的数据调整下面的内容
          console.log(res)
        },
      })
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      })
    } else if (e.currentTarget.dataset.text == "拒绝") {
      wx.request({
        //发送给服务器的方式：get/post
        method: "GET",
        url: '拒绝的接口',
        //发送给服务器的数据
        data: {

        },
        //成功回调函数
        success: res => {
          //服务器返回给你的数据应该在res.data中
          //根据返回给你的数据调整下面的内容
          console.log(res)
        },
      })
    }
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  //获取当前所有消息的列表
  onShow: function () {
    wx.request({
      //发送给服务器的方式：get/post
      method: "GET",
      url: 'http://byu7983780001.my3w.com/phalapi/public/?s=App.SPAPI.TRSALLInfo',
      //发送给服务器的数据
      data: {
        
      },
      //成功回调函数
      success: res => {
        messageList.received = res.data.data.TA_Received,

        console.log(res)
      },
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