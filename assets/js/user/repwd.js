$(function() {
  //表单验证
  layui.form.verify({
    pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
    samePwd:function(value) {
      if(value === $("[name=oldPwd]").val()) {
        return '新旧密码不能相同'
      }
    },
    rePwd:function(value) {
      if(value !== $("[name=newPwd]").val()) {
        return '两次密码输入不一致'
      }
    }
  })

  //提交修改
  $(".layui-form").on("submit",function(e){
    e.preventDefault()
    $.ajax({
      method:"POST",
      url:"/my/updatepwd",
      data:$(this).serialize(),
      success(res) {
        if(res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg("修改密码成功")
        $(".layui-form")[0].reset()
      }
    })
  })
})