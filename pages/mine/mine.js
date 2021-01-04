// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // information:{
    //   'name':'姓名',
    //   'college':'学院',
    //   'grade':'年级',
    //   'count':'0',
    //   'selfIntroduction':'自我介绍'
    // },
    name: '姓名',
    college: '学院',
    grade: '年级',
    count: '0',
    selfIntroduction: '自我介绍',
    avatarUrl:null
  },
  navToMe: function () {
    wx.navigateTo({
      url: '../Me/Me',
    })
  },
  navToResume: function () {
    wx.navigateTo({
      url: '../myresume/myresume',
    })
  },

  navToMyTeam: function () {
    wx.navigateTo({
      url: '../myteam/myteam',
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
  onShow: function () {
    var myInfo = wx.getStorageSync('myInfo')
    this.setData({
      name:myInfo.name,
      grade:myInfo.grade,
      college:myInfo.college,
      selfIntroduction:myInfo.selfIntroduction,
      avatarUrl:wx.getStorageSync('imgUrl')
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

  },
  login:function(){
    wx.login().then(sus=>{
      if(sus.code){
        wx.request({
          url: 'https://migu.plus/api/dicHot.php',
          data:{
            wxLoginCode:sus.code
          },
          success:function(res){
            console.log(res.data);
            
          }
        })
      }
      console.log(sus)
    }).catch(err=>{console.log(err)});
  }
})