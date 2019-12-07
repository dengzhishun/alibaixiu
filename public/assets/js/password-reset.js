$('#reseForm').on('submit', function () {
	var formData = $(this).serialize();
	$.ajax({
		url: '/users/password',
		type: 'put',
		data: formData,
		success: function () {
            alert('修改密码成功,请重新登录');
			location.href = "/admin/login.html"
        }
	})
	return false;
});