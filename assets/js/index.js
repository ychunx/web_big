$(function() {
    getUserinfo()

    var layer = layui.layer
    $('#btnLogout').on('click', () => {
        layer.confirm('确定注销？', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
          });
    })
})

function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}