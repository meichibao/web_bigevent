//在每次调用$.get(),$.post(),$.ajax() 请求的时候都会先调用ajaxPrefilter()这个函数
//在这个函数里,我们能拿到我们给ajax提供的配置对象

$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求之前,同意拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // console.log(options.url);

})