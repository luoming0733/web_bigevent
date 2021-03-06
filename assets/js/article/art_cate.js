$(function () {
  var layer = layui.layer;
  var form = layui.form;

  initArtCateList();

  // 获取文章分类列表
  function initArtCateList() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        var htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
      },
    });
  }

  // 为添加按钮绑定点击事件
  var indexAdd = null;
  $("#btnAddCate").on("click", function () {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章类别",
      content: $("#dialog-add").html(), //这里content是一个普通的String
    });
  });

  //通过代理的形式,为 form-add 表单绑定 submit 事件
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("新增分类失败!");
        }
        layer.msg("新增分类成功!");
        initArtCateList();
        // 根据索引,关闭弹出层
        layer.close(indexAdd);
      },
    });
  });

  // 通过代理的形式，为 btn-edit 按钮绑定点击事件
  var indexEdit = null;
  $("tbody").on("click", ".btn-edit", function () {
    // 弹出一个修改文章的信息层
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章类别",
      content: $("#dialog-edit").html(), //这里content是一个普通的String
    });
    var id = $(this).attr("data-id");
    // 发起请求获取对应分类的数据
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        form.val("form-edit", res.data);
        console.log(res.data);
      },
    });
  });

  // 通过代理的形式，为修改分类的表单绑定 submit 事件
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新数据分类失败!");
        }
        layer.msg("更新数据分类成功!");
        layer.close(indexEdit);
        initArtCateList();
      },
    });
  });

  // 通过代理的形式，为删除按钮绑定 click 事件
  $("tbody").on("click", ".btn-delete", function () {
    var id = $(this).attr("data-id");
    // 提示是否删除
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          console.log(res);
          if (res.status !== 0) {
            return layer.msg("删除分类失败！");
          }
          layer.msg("删除分类成功！");
          layer.close(index);
          initArtCateList();
        },
      });
    });
  });
});
