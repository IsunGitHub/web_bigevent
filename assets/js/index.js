$(function(){
  getUserInfo()
})

//获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method:"GET",
    url:"/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token")
    },
    success(res) {
      if(res.status !== 0) {
        return layer.msg("获取数据失败")
      }
      var name = res.data.nickname || res.data.username
      $(".welcome").html("欢迎&nbsp;" + name)

      if(res.data.user_pic !== null) {
        $(".layui-nav-img").prop("src",res.data.user_pic).show()
        $(".fontAvatar").hide()
      }else {
        $(".layui-nav-img").hide()
        $(".fontAvatar").html(name[0].toUpperCase()).show()
      }

    }
  })
}

