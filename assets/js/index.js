$(function(){
  getUserInfo()
  //退出功能
  $(".btnLogOut").on("click",function(){
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
      //do something
      localStorage.removeItem("token")
      location.href = "/login.html"

      layer.close(index);
    });
  })

})

//获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method:"GET",
    url:"/my/userinfo",
    success(res) {
      if(res.status !== 0) {
        return layer.msg("获取数据失败")
      }
      renderUserInfo(res.data)
    }
  })
}

//渲染头像和名字
function renderUserInfo(user) {
  var name = user.nickname || user.username
  $(".welcome").html("欢迎&nbsp;" + name)

  if(user.user_pic !== null) {
    $(".layui-nav-img").prop("src",user.user_pic).show()
    $(".fontAvatar").hide()
  }else {
    $(".layui-nav-img").hide()
    $(".fontAvatar").html(name[0].toUpperCase()).show()
  }
}

//跳转到发布文章
function hrefArtPub() {
  $("iframe").prop("src","/article/artPub.html")
}


