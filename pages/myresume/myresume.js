const app = getApp()

Page({
  data: {
    "currentModal": null, //modal type
    "showModal": false, //show modal
    "deleteDate": '',
    "lastEditDate": '',

  },
  //confirm Dele Modal
  confirmDeleResume: function () {
    this.setData({
      "currentModal": "ModalDeleResume",
      "showModal": true
    });
  },
  //Start dele
  startDeleResume: function () {
    var date = new Date()
    var deleteDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()


    wx.setStorageSync('deleteDate', deleteDate);
    console.log("[Todo] Here will dele current resume.");
    //回调this.hidemodal();
  },
  //hide all modal
  hideModal: function () {
    this.setData({
      "currentModal": null,
      "showModal": false
    });
  },
  onLoad: function () { },
  onShow: function () {
    this.setData({
      lastEditDate: wx.getStorageSync('editDate')
    })
  },


  navToEditResume: function () {
    wx.navigateTo({
      url: '../editResume/editResume',
    })
  },

  navToHistory: function () {
    wx.navigateTo({
      url: '../history/history',
    })
  }
})