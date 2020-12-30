$(function () {
  // 调用 getUserInfo 获取用户信息
  getUserInfo();

  $("#btnLogout").on("click", function () {
    // 提示用户是否退出
    layer.confirm(
      "确定是否退出?",
      { icon: 3, title: "提示" },
      function (index) {
        //do something
        // 1.清空 token
        localStorage.removeItem("token");
        // 2.回到登录页面
        location.href = "/login.html";
        // 3.关闭询问弹框
        layer.close(index);
      }
    );
  });
});

// 获取用户信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers 就是请求头配置对象
    headers: {
      Authorization: localStorage.getItem("token") || "",
    },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败！");
      }
      // 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data);
    },
    // // 无论成功或者失败都会调用 complete 函数
    // complete: function (res) {
    //   console.log(res);
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === "身份认证失败"
    //   ) {
    //     // 1.强制清空 token
    //     localStorage.removeItem("token");
    //     // 2.强制跳转到 login 页面
    //     location.href = "/login.html";
    //   }
    // },
  });
}

// 渲染用户的头像
function renderAvatar(user) {
  var name = user.nickname || user.username;
  $("#welcome").html("欢迎&nbsp;&nbsp" + name);
  //   按需渲染用户的头像
  if (user.user_pic !== null) {
    // 渲染图片头像
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $("text-avatar").hide();
  } else {
    // 渲染文本图像
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $("text-avatar").html(first).show();
  }
}
