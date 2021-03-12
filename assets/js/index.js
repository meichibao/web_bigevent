$(function () {
    // 调用函数,获取用户基本信息
    getUserinfo();

    // 获取layer
    let layer = layui.layer;
    //退出按钮点击事件
    $("#btnLogout").click(function () {
        // console.log(11);
        //layer.confirm   询问框
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //用户点击确定之后执行本回调函数
            //退出需要将本地储存的token清除
            localStorage.removeItem('token');
            //重新跳转到登录页面
            location.href = '/code2/login.html'

            // 关闭confirm询问框
            layer.close(index);
        });
    })

})

//获取用户基本信息
function getUserinfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        //请求头配置对象  由于每个有权限的接口都需要添加这个请求头,所以将他放入到baseAPI文件中
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: (res) => {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用 renderAvatar渲染用户头像
            renderAvatar(res.data)
        }
    })
}

//渲染用户头像
function renderAvatar(user) {
    //获取用户名称
    const name = user.nickname || user.username
    // 设置欢迎文本
    $("#welcome").html('欢迎 &nbsp;' + name);

    //按需渲染用户头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        //渲染文本头像
        $(".layui-nav-img").hide();
        //拿出第一个字符且转换成大写
        let first = name[0].toUpperCase();
        $(".text-avatar").html(first).show()
    }
}