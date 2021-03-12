//在每次调用$.get(),$.post(),$.ajax() 请求的时候都会先调用ajaxPrefilter()这个函数
//在这个函数里,我们能拿到我们给ajax提供的配置对象

$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求之前,同意拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // console.log(options.url);

    // 并不是所有的请求都需要这个请求头,多以加一个条件判断
    // 统一为有权限的接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 全局统一挂载complete 回调函数    为了安全让没有注册的用户无法访问有权限的页面
    // complete  函数,不管成功失败都会执行
    options.complete = function (res) {
        // console.log(res);
        // 在complete回调函数中 可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //强制清空本地储存中的token
            localStorage.removeItem('token');
            //强制跳转到登录页面
            location.href = '/code2/login.html';
        }

    }
})