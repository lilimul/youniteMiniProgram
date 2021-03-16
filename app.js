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
    userInfo: null,
    apiAllContest:'http://byu7983780001.my3w.com/phalapi/public/?s=App.SPAPI.GameALLInfo',
    apiAllTalents:'http://byu7983780001.my3w.com/phalapi/public/?s=App.SPAPI.ALLofperson',
    apiTeamPerson:'http://byu7983780001.my3w.com/phalapi/public/?s=App.SPAPI.TeamPerson',
    apiPallInfo:'http://byu7983780001.my3w.com/phalapi/public/?s=App.SPAPI.PALLInfo',
    apiTeamNum:'http://byu7983780001.my3w.com/phalapi/public/?s=App.SPAPI.Teamnum',
    apiDeleTeam:'http://byu7983780001.my3w.com/phalapi/public/?s=App.SPAPI.ChangeTeamState'
  }
})