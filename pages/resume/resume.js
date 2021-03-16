const app = getApp()
Page({
  data: {
    eduHistories:[
      {
        id:0,
        start:"2012.9",
        end:"2016.6",
        school:"WHU",
        grade:"本科",
        academy:"新闻与传播专业",
        major:"传播学",
        history:"担任班长"
      }
    ],
    resumeInfo:{
      lastPublishTime:"2020.8.12 13:00",
      viewCount:15,
      inviteCount:8,
      inCommuCount:2,
      status:1//1:发布中
    }
  },
  onLoad: function () {
    wx.request({
      url: app.globalData.apiPallInfo,
      success:res=>{
      //  data = res.data.data
      //   data  = data.map(cont=>{
      //     return {
      //       name:cont.G_name,
      //       discript:cont.G_discript,
      //       type:cont.type,
      //       ddl:cont.time,
      //       time:[1],
      //       hide:false
          }
        })
  }
})