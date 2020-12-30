$(function () {
  // 点击 "去注册"
  $("#reg-link").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  // 点击 "去登录"
  $("#login-link").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  // 从 layui 中获取form 对象
  var form = layui.form;
  var layer = layui.layer;
  // 通过 form.verify() 函数自定义检验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致！";
      }
    },
  });

  // 监听注册表单提交事件
  $("#form-reg").on("submit", function (e) {
    e.preventDefault();
    var data = {
      username: $("#form-reg [name=username]").val(),
      password: $("#form-reg [name=password]").val(),
    };
    $.post("/api/reguser", data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("注册成功,请登录");
      $("#login-link").click();
    });
  });

  // 监听登录表单提交事件
  $("#form-login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        // 登录成功弹出对话框
        layer.msg(res.message);
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});
