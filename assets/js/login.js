$(function(){

  //点击去注册账号
  $("#link_reg").on("click",function() {
    $(".reg-box").show()
    $(".login-box").hide()
  })

  //点击去登录
  $("#link_login").on("click",function() {
    $(".reg-box").hide()
    $(".login-box").show()
  })

})