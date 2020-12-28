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
});
