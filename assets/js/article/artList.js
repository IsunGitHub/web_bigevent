$(function(){
  //获取文章列表
  function getArtList() {
    var q = {
      pagenum:1,
      pagesize:10,
      cate_id:"",
      state:""
    }
    $.ajax({
      method:"GET",
      url:"/my/article/list",
      data:q,
      success(res) {
        if(res.status !== 0) {
          return layer.msg(res.message)
        }
        var artListHtml = template("tpl-artList",res)
        $("tbody").html(artListHtml)
      }
    })
  }
  getArtList()

  //时间过滤器
  template.defaults.imports.dateFormat = function(value) {
    var date = new Date(value)
    var y = date.getFullYear()
    var m = (date.getMonth() + 1).toString().padStart(2,"0")
    var d = date.getDay().toString().padStart(2,"0")

    var hh = date.getHours().toString().padStart(2,"0")
    var mm = date.getMinutes().toString().padStart(2,"0")
    var ss = date.getSeconds().toString().padStart(2,"0")

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`

  }

})