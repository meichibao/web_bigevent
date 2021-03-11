$(function () {
    // 点击注册账号
    $("#link_reg").click(() => {
        // console.log(234);
        $(".login-box").hide();
        $(".reg-box").show();

    })
    // 点击登录
    $("#link_login").click(() => {
        // console.log(2324);
        $(".login-box").show();
        $(".reg-box").hide();
    })


    // 自定义表单检验规则
    // 从layui 中获取 form对象
    let form = layui.form;

    // 通过 form.verify()函数自定义校验规则
    form.verify({
        // 自定义密码校验  
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 注册界面两次密码一致校验
        //value形参  可以拿到确认密码框中的内容
        rpswd: function (value) {
            //拿到第一个密码框的值   同过属性选择器
            const psd = $(".reg-box [name=password]").val();
            //判断第一个密码框的值是否与确认密码框的值相同
            if (psd !== value) {
                return '两次填写的密码不一致'
            }
        }
    });


    // 监听表单提交事件---注册
    // 从layui 中获取 layer对象
    let layer = layui.layer;

    $("#form_reg").on('submit', function (e) {
        //阻止表单默认事件
        e.preventDefault();
        const name1 = $("#form_reg [name=username]").val();
        const pass1 = $("#form_reg [name=password]").val();
        // console.log(name1, pass1);
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: {
                username: name1,
                password: pass1
            },
            // dataType: 'json',
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录!');
                $("#link_login").click();

            }
        })

    })


    // 监听表单提交事件---登录
    $("#form_login").on("submit", function (e) {
        //阻止默认事件
        e.preventDefault();

        //serialize()方法代替
        // const name = $("#form_login [name=username]").val();
        // const pass = $("#form_login [name=password]").val();
        // console.log(name, pass);
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(),
            // dataType: 'json',
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功!!');
                // 将登录成功得到的token字符串,保存到localStorage(本地储存)中
                localStorage.setItem('token', res.token);
                //跳转到后台主页
                location.href = '/code2/index.html'
            }
        })

    })
});