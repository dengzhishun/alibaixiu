$('#addCategory').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
		url: '/categories',
		data: formData,
		success: function () {
			location.reload();
		}
    })
    return false
})

$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        console.log(response)
        var html = template('wodiu', {data:response}) ;
        $('#haha').html(html)
        console.log(html);
        
    }
});
$('#haha').on('click','.edit',function(){
    var id = $(this).attr('data-id')
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(response){
         var html =    template('xinlei',response);
         $('#formbox').html(html)
        }
    })
})
$('#formbox').on('submit','#modifyCategory',function(){
    var formData = $(this).serialize();
    var id = $(this).attr('data-id')
    $.ajax({
        type:'put',
        url:'/categories/'+id,
        data:formData,
        success:function(){
            location.reload()
        }
    })
    return false;
});
$('#haha').on('click','.delete',function(){
    var id = $(this).attr('data-id')
    $.ajax({
        type:'delete',
        url:'/categories/'+id,
        success:function(response){
         location.reload()
        }
    })
})