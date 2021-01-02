$(function () {
  var layer = layui.layer;
  // 定义一个查询的参数对象q
  let q = {
    pagenum: 1, // 页码值
    pagesize: 2, //
    cate_id: "", //文章分类的 ID
    state: "已发布", //文章的
  };

  initTable();

  // 获取文章列表数据的方法
  function initTable() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("获取文章列表失败");
        }
        $("tbody").html(htmlStr);
        var htmlStr = template("tpl-table", res);
      },
    });
  }
});
