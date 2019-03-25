// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit: function (e) {
    // console.log(e.detail.value);
    wx.request({
      url: 'https://zhuzhujiang.xin/WX/user-login-controller.php', //服务器地址
      method: "post",
      data: {
        username: e.detail.value.username,
        userpwd: e.detail.value.userpwd
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(e.detail.value.userpwd);
        if (res.statusCode == 200) {
          //访问正常
          if (res.data.state == 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000,
            })
          } else {
            //缓存
            wx.setStorage({
              key: "id",
              data: e.detail.value.username
            });
            wx.showToast({
              title: "登陆成功",
              icon: 'success',
              duration: 20000,
              success: function () {
                setTimeout(function () {
                  wx.switchTab({
                    url: '../index/index',
                  })
                }, 2000)
              }
            })
          }
        }
      }
    });
  }
})