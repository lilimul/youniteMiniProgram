//app.js
App({
  onLaunch: function () {
    wx.getSystemInfo({//获得手机高度以计算导航栏高度
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    });
  console.log("Hi!");
  },
  globalData: {
    userInfo: null
  }
})