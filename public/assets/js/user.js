// function serializeObj(form){
//     var arr = form.serializeArray(); //提交表单数据转换为数组
//     var obj={};
//     arr.forEach((item)=>{
//         obj[item.name] = item.value  //这条数据的name = 这条数据的内容
//     })
//     console.log(obj)
// }
$('#userForm').on('submit', function () {
    var formData = $(this).serialize()
    console.log(formData);
    $.ajax({
        type: 'POST',
        url: '/users',
        data: formData,//email=wqeqwe%40qq.com&nickName=1231&password=13123&status=0&role=admin
        success: function () {
            location.reload()
        },
        error: function () {
            alert('用户添加失败')
        }
    })
    //组织表单的默认提交行为
    return false;
})
$('#avatar').on('change', function () {
    //this.files[0]   files 选中文件组 目前只能选一个 所以选取第一个
    var formData = new FormData();
    formData.append('avatar', this.files[0]); //第一个参数是图片的url取名  第二个是文件
    //console.log(formData);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData, //上传的文件
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response)
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    })
})
$.ajax({
    type: 'GET',
    url: '/users',
    success: function (data) {
        console.log(data)
        var html = template('wokao', {data:data}) 
         //template的第二个参数必须是对象  $data是原数据 如写data则模板只能写$data
         //{data:data}这样写 则模板里data是循环是找到了data这个属性是一个数组
        $('#tpl').html(html)
    }
})
$('#tpl').on('click', '.edit', function () {
    // 获取被点击用户的id值
    var id = $(this).attr('data-id');
    // 根据id获取用户的详细信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            console.log(response)
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    })
});
$('#modifyBox').on('submit', '#modifyForm', function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的那个用户的id值
    var id = $(this).attr('data-id');
    // 发送请求 修改用户信息
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            // 修改用户信息成功 重新加载页面
            location.reload()
        }
    })

    // 阻止表单默认提交
    return false;
});
$('#tpl').on('click', '.delete', function () {
    var id = $(this).attr('data-id');
    if (confirm('您确定要删除吗')) {
        $.ajax({
            type: 'DELETE',
            url: '/users/' + id,
            success:function(){
                location.reload()
            }
        })
    }
})
var selectAll = $('#selectAll');
var deleteMany = $('#deleteMany');
selectAll.on('change', function () {
	// 获取到全选按钮当前的状态
	var status = $(this).prop('checked');

	if (status) {
		// 显示批量删除按钮
		deleteMany.show();
	}else {
		// 隐藏批量删除按钮
		deleteMany.hide();
	}

	// 获取到所有的用户并将用户的状态和全选按钮保持一致
	$('#tpl').find('input').prop('checked', status);
});
$('#tpl').on('change','.userStatus',function(){
    var inputs = $('#tpl').find('input');
    if(inputs.length == inputs.filter(':checked').length){
        selectAll.prop('checked',true)
    }else{
        selectAll.prop('checked',false)
    };
    if( inputs.filter(':checked').length>0){
        deleteMany.show();
    }else{
        deleteMany.hide();
    }
});
deleteMany.on('click',function(){
    var ids = [];
    var checkedUser = $('#tpl').find('input').filter(':checked');
    checkedUser.each(function(index,element){
        ids.push($(element).attr('data-id')); //element是原生js要转换成jqurey模式
    })
    if(confirm('您真的确定要删除吗')){
        $.ajax({
            type:'DELETE',
            url:'/users/'+ids.join('-'),
            success:function(){
                location.reload();
            }
        })
    }
})
