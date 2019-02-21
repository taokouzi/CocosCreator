"use strict";
cc._RF.push(module, '021616saVZENJ/7kPccaIyc', 'config');
// StickHero/Scripts/config.js

'use strict';

// 全局变量

window.Win_Global = {
    // 选中队伍后的id
    select_team_id: 0,

    // 选中队伍后的名称
    select_team_name: null,

    // 我当前最大关卡
    myMaxLv: 3,

    // 我选择的关卡
    mySelectLv: 1,

    // 过关需要走的步数
    run_num: {
        '1': 3, //简单 15步
        '2': 5, //一般 25步
        '3': 9 //困难 40步
    },
    // 柱子宽度（闯关模式）
    rand: {
        '1': 0.5,
        '2': 0.3,
        '3': 0.22
    },
    // 柱子宽度（无尽模式）
    rand_en: 0.4,

    // 用户选择的难度   1简单  2一般 3困难
    nandu_id: 1,

    is_team: 0,

    // 我的成绩（实时更新）
    gx_score: 0,
    // 我的成绩（记录）
    jl_score: 0,

    // 我的步数（实时更新）
    gx_run_num: 0,
    // 我的步数（记录）
    jl_run_num: 0,

    // 游戏状态 0闯关模式 1无尽模式
    game_status: 1,

    // 允许答题错误数量
    ans_max_err_num: 5,

    // 选择长征难度（最大难度）
    myNandu: 1,

    // 视频倒计时时长
    v_time: 10,
    // 答题倒计时
    ansTime: 99,

    // isWx: 0,
    // token: '88cecac6b1e04820af1d36573e16bcea',
    // nickname: "讨口子",
    // avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/R5tHHzNKnj8Aa4RSNtN3Ctib7iaSouLkNLpyW8TnuiciaM5MlHSsskJcssj3xIibCsEmbbx5IHebZ9KKjlP3KuXicqcg/132",


    isWx: 1,
    token: '',
    nickname: null,
    avatarUrl: null,

    cbk_nav: 0,

    path: 'https://www.oneh5.com/yjl/rod_hero/api/', //'https://www.oneh5.com/yjl/party_answer/front_api/api/',


    isGoHomeBtn: 0,

    // 本地存储key名称
    token_name: 'RedStar_token9',

    avatarUrl_name: 'avatarUrl9',

    nickName_name: 'nickName9',

    // 手机号效验正则
    telReg: /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/,
    // 验证码效验正则
    codeReg: /^\d{6}$/,

    // 无尽模式根据成绩更换背景
    backgroundLoader: [30, 100, 150, 200, 250, 300],

    sendCode: false,

    // 静态方法
    configFunc: function configFunc() {
        cc.log(" window function ");
    },

    ajaxPost: function ajaxPost(url, data, fnSucceed, fnFail, fnLoading) {
        //这里需要将json数据 {"name1":"value1","name2":"value2"} 转成post能够进行提交的字符串  name1=value1&name2=value2格式
        data = function (value) {
            var oStr = '';
            for (var key in value) {
                oStr += key + "=" + value[key] + "&";
            };
            return oStr;
        }(data);

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    // console.log( JSON.parse(xhr.responseText) );
                    fnSucceed(JSON.parse(xhr.responseText));
                } else {
                    fnFail("HTTP请求错误！错误码：" + xhr.status);
                }
            } else {
                fnLoading("就绪状态：" + xhr.readyState);
            }
        };

        xhr.open("post", url, true);

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.send(data);
    },

    // 获取验证码
    get_code: function get_code(tel, codeBtnLabel) {
        if (!Win_Global.sendCode) {
            if (!Win_Global.telReg.test(tel)) {
                if (Win_Global.isWx == 1) {
                    wx.showToast({ title: '手机号码验证错误！（' + tel + '）', icon: 'none' });
                } else {
                    console.log('手机号码验证错误！（' + tel + '）');
                }
            } else {
                if (Win_Global.isWx == 1) {
                    wx.showLoading({ title: '发送中...' });
                }
                Win_Global.sendCode = true;
                Win_Global.ajaxPost(Win_Global.path + 'msg_validata.php', {
                    'action': 'get_code',
                    'token': Win_Global.token,
                    'tel': tel,
                    'stime': Date.parse(new Date()).toString().substr(0, 10)
                }, function (res) {
                    // console.log(res);
                    if (Win_Global.isWx == 1) {
                        wx.hideLoading();
                    }
                    if (res.code == 1 || res.code == 9004) {
                        // console.log('发送成功');
                        if (Win_Global.isWx == 1) {
                            wx.showToast({ title: '发送成功', icon: 'success' });
                        }
                        var times = 60;
                        var intervalId = setInterval(function () {
                            times--;
                            codeBtnLabel.getComponent(cc.Label).string = times + 's';
                            if (times <= 0) {
                                clearInterval(intervalId);
                                codeBtnLabel.getComponent(cc.Label).string = '获取验证码';
                                Win_Global.sendCode = false;
                            }
                        }, 1000);
                    } else if (res.code == 9002) {
                        if (Win_Global.isWx == 1) {
                            wx.showToast({ title: '号码重复', icon: 'none' });
                        } else {
                            console.log('号码重复');
                        }
                        Win_Global.sendCode = false;
                    } else {
                        if (Win_Global.isWx == 1) {
                            wx.showToast({ title: '系统异常，请稍后再试哦', icon: 'none' });
                        } else {
                            console.log('系统异常，请稍后再试哦');
                        }
                        Win_Global.sendCode = false;
                    }
                }, function (fail) {
                    console.log(fail);
                }, function (error) {
                    console.log(error);
                });
            }
        }
    },

    // 绑定手机号
    bind_tel: function bind_tel(tel, telLayer, code) {
        if (!Win_Global.telReg.test(tel)) {
            if (Win_Global.isWx == 1) {
                wx.showToast({ title: '手机号码验证错误！（' + tel + '）', icon: 'none' });
            } else {
                console.log('手机号码验证错误！（' + tel + '）');
            }
            return false;
        }

        if (!Win_Global.codeReg.test(code)) {
            if (Win_Global.isWx == 1) {
                wx.showToast({ title: '验证码错误！！（' + code + '）', icon: 'none' });
            } else {
                console.log('验证码错误！！（' + code + '）');
            }
            return false;
        }

        Win_Global.ajaxPost(Win_Global.path + 'msg_validata.php', //task.php
        {
            'action': 'validata_code', //task_tel
            'token': Win_Global.token,
            'tel': tel,
            'code': code
        }, function (res) {
            // console.log(res);
            if (res.code == 1) {
                telLayer.active = false;
            } else {
                if (Win_Global.isWx == 1) {
                    wx.showToast({ title: '系统异常，请稍后再试哦', icon: 'none' });
                } else {
                    console.log('系统异常，请稍后再试哦');
                }
            }
            cc.sys.localStorage.setItem('bkqTel', tel);
        }, function (fail) {
            console.log(fail);
        }, function (error) {
            console.log(error);
        });
    }

};

cc._RF.pop();