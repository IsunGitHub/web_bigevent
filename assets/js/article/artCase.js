$(function() {
  //获取数据并渲染
  getArtCates()
  var addCateIndex
  //点击添加分类
  $("#addCate").on("click",function(){
    addCateIndex = layer.open({
      type:1,
      title: '添加文章分类'
      ,content: $("#popups").html(),
      area: ['500px', '250px']
    }); 
  })

  //确认添加分类数据(修改数据并渲染)
  $("body").on("submit","#popupsForm",function (e){
    e.preventDefault()
    setArtCates()
  })

  //获取数据并渲染
  function getArtCates() {
  $.ajax({
    method:"GET",
    url:"/my/article/cates",
    success(res) {
      if(res.status !== 0) {
        return layer.msg(res.message)
      }
      var artCaseHtml = template("tplArtCate",res)
      $("tbody").html(artCaseHtml)
    }
  })
  }

  //修改数据并渲染
  function setArtCates() {
  $.ajax({
    method:"POST",
    url:"/my/article/addcates",
    data:$(".layui-form").serialize(),
    success(res) {
      if(res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg("添加分类成功")
      getArtCates()
      layer.close(addCateIndex)
    }
  })
  }

  //点击编辑按钮
  var editForm
  $("tbody").on("click","#editCate",function(e){
    var id = $(this)[0].dataset.id
    $.ajax({
      method:"GET",
      url:"/my/article/cates/" + id,
      success(res) {
        if(res.status !== 0) {
          return layer.msg(res.message)
        }
        editForm = layer.open({
          type:1,
          title: '修改文章分类'
          ,content: $("#edit").html(),
          area: ['500px', '250px']
        }); 
        layui.form.val("editForm",res.data)
      }
    })
    
  }) 

  //点击编辑按钮里面修改按钮
  $("body").on("submit","#confirmEdit",function(e){
    e.preventDefault()
    $.ajax({
      method:"POST",
      url:"/my/article/updatecate",
      data:$("#confirmEdit").serialize(),
      success(res) {
        console.log(res);
        if(res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg("修改数据成功")
        getArtCates()
        layer.close(editForm);
      }
    })
  })

  //点击删除按钮
  $("tbody").on("click","#deleteBtn",function(e){
    var id = $(this).siblings("#editCate")[0].dataset.id
    $.ajax({
      method:"GET",
      url:"/my/article/deletecate/" + id,
      success(res) {
        if(res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg("删除文章分类成功")
        getArtCates()
      }
    })
  })

})
