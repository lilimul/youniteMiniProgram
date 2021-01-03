// pages/member/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamId: 0,
    teamInfo: {
      "tName": "大广赛招募队员",
      "tId": 0,
      "tView": 15,
      "tInvite": 8,
      "tContact": 2,
      "tInvited": 3,
      "tRemain": 2,
      "tLastUpdate": "2020.10.16  8:00"
    },
    teamMemberInfos: []
  },
  //Navigate to member info page
  memInfoNavi: function (e) {
    console.log("Navi to User No." + e.currentTarget.dataset.memUid);
    console.log("[Todo] Here will navi to member info page.");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tInvited = "teamInfo.tInvited"
    var tRemain = "teamInfo.tRemain"
    this.setData({
      [tInvited]: options.tInvited,
      [tRemain]: options.tRemain?options.tRemain:0,
    })
    for(var i=0;i<this.data.teamInfo.tInvited;i++){
      this.setData({
        teamMemberInfos: this.data.teamMemberInfos.concat({
          "memName": "小U",
          "memId": 1,
          "memGrade": "2018",
          "memMajor": "新闻传播学院/广告学",
          "memIcon": "https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg"
        })
      })
    }

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