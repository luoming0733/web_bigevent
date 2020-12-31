$(function () {
  var form = layui.form;

  // 验证表单
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6~12位，且不能出现空格!"],
    samePwd: function (value) {
      if (value === $("[name=oldPwd]").val()) {
        return "新旧密码相同，请更改其他密码!";
      }
    },
    rePwd: function (value) {
      if (value !== $("[name=newPwd]").val()) {
        return "两次密码不一致!";
      }
    },
  });

  // 修改密码按钮
  $("#rePwd-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg("更新密码失败！");
        }
        layui.layer.msg("更新密码成功");
        // 修改成功后清空内容
        // $("#rePwd-form")[0].reset();
        $("#btn-re").click();
      },
    });
  });

  // 重置数据
  $("#btn-re").on("click", function (e) {
    e.preventDefault();
    $("#rePwd-form")[0].reset();
  });
});
