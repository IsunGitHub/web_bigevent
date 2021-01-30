$(function(){

  //点击去注册账号
  $(".loginAndRegBox #link_reg").on("click",function() {
    $(".reg-box").show()
    $(".login-box").hide()
  })

  //点击去登录
  $(".loginAndRegBox #link_login").on("click",function() {
    $(".reg-box").hide()
    $(".login-box").show()
  })

  //设置layui的自定义把表单验证
  var form = layui.form
  form.verify({
    pwd:[
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    repwd:function(value) {
      var pwd = $(".reg-box [name=password]").val()
      if(value !== pwd) {
        return '两次密码不一致!'
      } 
    }
  })

  //点击注册
  $("#form_reg").on("submit",function(e) {
    e.preventDefault()
    var data = {username:$("#form_reg [name=username]").val(),password:$("#form_reg [name=password]").val()}
    $.ajax({
      method:"POST",
      url:"http://ajax.frontend.itheima.net/api/reguser",
      data,
      success(res) {
        if(res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message)
        $(".reg-box #link_login").click()
      }
    })
  })

})