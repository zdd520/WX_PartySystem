// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myinfo: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var id = wx.getStorageSync('id');
    var that = this;
    wx.request({
      url: 'https://zhuzhujiang.xin/WX/exam-get-all-list.php', //服务器地址
      method: "post",
      data: {
        username: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.statusCode == 200) {
          //访问正常
          if (res.data.state == 0) {
            wx.showToast({
              title: "获取信息失败",
              icon: 'none',
              duration: 2000,
            });
          } else {
            /*填入信息 */
            that.setData({ myinfo: res.data });
          }
        }
      }
    });
  },
  /*退出函数-返回登录页 */
  exit: function (e) {
    wx.showModal({
      title: '提示',
      content: '是否确认退出',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.removeStorageSync('id');
          //页面跳转
          wx.redirectTo({
            url: '../login/login',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})