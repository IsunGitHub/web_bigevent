$(function() {
  //获取文章类别
  function getArtCate() {
    $.ajax({
      method:"GET",
      url:"/my/article/cates",
      success(res) {
        if(res.status !== 0) {
          return layer.msg(res.message)
        }
        var artCateHtml = template("tpl-artCate",res)
        $("[name=city]").html(artCateHtml)
        layui.form.render()
      }
    })
  }
  getArtCate()
  //富文本
  initEditor()

  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  
  // 3. 初始化裁剪区域
  $image.cropper(options)

  //点击选择封面
  $("#chooseCover").on("click",function() {
    $("#coverFile").click()
  })

  $("#coverFile").on("change",function(e){
    var files = e.target.files
    if(files.length <= 0) {
      return layer.msg("请选择图片")
    }
    var file = e.target.files[0]
    var newImgURL = URL.createObjectURL(file)
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
  })

})