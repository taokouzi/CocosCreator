"use strict";
cc._RF.push(module, '947d8MW88FJdK2KSaaDs+rW', 'page');
// StickHero/Scripts/page.js

"use strict";

var Alert = {
    _alert: null, // prefab
    _detailLabel: null, // 内容
    _cancelButton: null, // 确定按钮
    _enterButton: null, // 取消按钮
    _enterCallBack: null, // 回调事件
    _animSpeed: 0.3 // 动画速度
};

/**
 * detailString :   内容 string 类型.
 * enterCallBack:   确定点击事件回调  function 类型.
 * neeCancel:       是否展示取消按钮 bool 类型 default YES.
 * duration:        动画速度 default = 0.3.
*/
Alert.show = function (detailString, enterCallBack, needCancel, animSpeed) {

    // 引用
    var self = this;

    // 判断
    if (Alert._alert != undefined) return;

    // 
    Alert._animSpeed = animSpeed ? animSpeed : Alert._animSpeed;

    // 加载 prefab 创建
    cc.loader.loadRes("Alert", cc.Prefab, function (error, prefab) {

        if (error) {
            cc.error(error);
            return;
        }

        // 实例 
        var alert = cc.instantiate(prefab);

        // Alert 持有
        Alert._alert = alert;

        // 动画 
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(Alert._animSpeed, 255), cc.scaleTo(Alert._animSpeed, 1.0)), cbFadeIn);
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(Alert._animSpeed, 0), cc.scaleTo(Alert._animSpeed, 1.2)), cbFadeOut);

        // 获取子节点
        Alert._detailLabel = cc.find("alertBackground/detailLabel", alert).getComponent(cc.Label);
        Alert._cancelButton = cc.find("alertBackground/cancelButton", alert);
        Alert._enterButton = cc.find("alertBackground/enterButton", alert);

        // 添加点击事件
        Alert._enterButton.on('click', self.onButtonClicked, self);
        Alert._cancelButton.on('click', self.onButtonClicked, self);

        // 父视图
        Alert._alert.parent = cc.find("Canvas");

        // 展现 alert
        self.startFadeIn();

        // 参数
        self.configAlert(detailString, enterCallBack, needCancel, animSpeed);
    });

    // 参数
    self.configAlert = function (detailString, enterCallBack, needCancel, animSpeed) {

        // 回调
        Alert._enterCallBack = enterCallBack;

        // 内容
        Alert._detailLabel.string = detailString;
        // 是否需要取消按钮
        if (needCancel || needCancel == undefined) {
            // 显示
            Alert._cancelButton.active = true;
        } else {
            // 隐藏
            Alert._cancelButton.active = false;
            Alert._enterButton.x = 0;
        }
    };

    // 执行弹进动画
    self.startFadeIn = function () {
        cc.eventManager.pauseTarget(Alert._alert, true);
        Alert._alert.position = cc.p(0, 0);
        Alert._alert.setScale(1.2);
        Alert._alert.opacity = 0;
        Alert._alert.runAction(self.actionFadeIn);
    };

    // 执行弹出动画
    self.startFadeOut = function () {
        cc.eventManager.pauseTarget(Alert._alert, true);
        Alert._alert.runAction(self.actionFadeOut);
    };

    // 弹进动画完成回调
    self.onFadeInFinish = function () {
        cc.eventManager.resumeTarget(Alert._alert, true);
    };

    // 弹出动画完成回调
    self.onFadeOutFinish = function () {
        self.onDestory();
    };

    // 按钮点击事件
    self.onButtonClicked = function (event) {
        if (event.target.name == "enterButton") {
            if (self._enterCallBack) {
                self._enterCallBack();
            }
        }
        self.startFadeOut();
    };

    // 销毁 alert (内存管理还没搞懂，暂且这样写吧~v~)
    self.onDestory = function () {
        Alert._alert.destroy();
        Alert._enterCallBack = null;
        Alert._alert = null;
        Alert._detailLabel = null;
        Alert._cancelButton = null;
        Alert._enterButton = null;
        Alert._animSpeed = 0.3;
    };
};

var fsm = require("landMaker");

var pageF = cc.Class({

    extends: cc.Component,

    properties: {

        // 进入页
        nav1: cc.Node,
        // 选择闯关模式
        nav2: cc.Node,

        // 选择关卡页
        nav3: cc.Node,
        // 选择难度页
        nav4: cc.Node,
        // 排行榜
        nav5: cc.Node,
        // 个人中心（我的奖品页）
        nav6: cc.Node,
        // 规则
        nav7: cc.Node,
        // 游戏前引导页
        nav8: cc.Node,

        // 排行榜
        rank: cc.Prefab,
        my_rank: cc.Label,

        // 奖品列表克隆（展示等级  user）
        gift: cc.Prefab,

        // 贝壳券奖品克隆 （正宗奖品 rule）
        bkq: cc.Prefab,

        // 音乐开关
        music_btn: cc.Node,

        myNandu: 0,

        // 选择难度弹窗
        menuLayer: cc.Node,

        // 输入手机号弹窗
        telLayer: cc.Node,

        // 控制声音弹窗
        adiLayer: cc.Node,

        // 关卡id
        pass_id: 1,
        // 难度id
        diff_id: 1,

        // 排行榜贝壳券是否领取  0未领取 1已领取
        isGiveRankBkq: 1,
        isGiveRankBkq_friend: 1,

        // 音乐默认开启
        yiny: 1,
        // 音效默认开启
        yinx: 1,

        bgm: null,

        // musicAudio2:cc.AudioSource,

        paoAudio: cc.AudioSource,

        bgAdi: null,

        bgAdi_n: 1,

        gameAdi: null

    },

    onLoad: function onLoad() {

        var that = this;

        this.setGoInFunc();

        if (Win_Global.isWx == 1) {

            // 进入游戏获取share_t参数，绑定好友关系
            wx.onShow(function (res) {

                console.log(res.query);
            });

            var avatarUrl = cc.sys.localStorage.getItem(Win_Global.avatarUrl_name) || '';
            var nickName = cc.sys.localStorage.getItem(Win_Global.nickName_name) || '';
            var RedStar_token = cc.sys.localStorage.getItem(Win_Global.token_name) || '';

            Win_Global.nickname = nickName;
            Win_Global.avatarUrl = avatarUrl;

            console.log('nickName = ' + nickName + '  ; RedStar_token = ' + RedStar_token);

            // 本地无token，需要置换用户唯一标识 token/unionid
            if (RedStar_token == '') {
                wx.login({
                    success: function success(res) {
                        if (res.code) {
                            // console.log('置换code = '+res.code);

                            Win_Global.ajaxPost(Win_Global.path + 'wxLogin.php', {
                                'code': res.code
                            }, function (res) {
                                // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                                // console.log(res);

                                if (res.code == 1) {
                                    cc.sys.localStorage.setItem(Win_Global.token_name, res.data.token);
                                    Win_Global.token = res.data.token;
                                }
                            }, function (fail) {
                                console.log(fail);
                            }, function (error) {
                                console.log(error);
                            });
                        }
                    }
                });
            }

            if (nickName == '' && avatarUrl == '') {

                // 需要授权用户信息（显示授权按钮/透明）
                var button = wx.createUserInfoButton({
                    type: 'text',
                    text: '',
                    image: '',
                    style: {
                        left: 0,
                        top: 0,
                        width: 600,
                        height: 6000,
                        lineHeight: 0,
                        backgroundColor: 'transparent',
                        color: '#ffffff',
                        textAlign: 'center',
                        fontSize: 16,
                        borderRadius: 4
                    }
                });

                // 点击授权按钮 出现授权弹窗
                button.onTap(function (e) {

                    if (e.userInfo) {
                        Win_Global.nickname = e.userInfo.nickName;
                        Win_Global.avatarUrl = e.userInfo.avatarUrl;

                        // 存储用户信息
                        cc.sys.localStorage.setItem(Win_Global.avatarUrl_name, e.userInfo.avatarUrl);
                        cc.sys.localStorage.setItem(Win_Global.nickName_name, e.userInfo.nickName);

                        // 进入游戏
                        that.nav1.active = false;
                        that.nav2.active = true;
                        that.setLvPositionFunc();

                        button.destroy();
                    } else {
                        wx.showToast({ title: '同志您好，进入游戏需要授权哦~', icon: 'none' });
                    }
                });
            } else {
                cc.find('btn', that.nav1).on('click', function () {
                    // console.log('滚');
                    that.nav1.active = false;
                    that.nav2.active = true;
                    that.setLvPositionFunc();
                });
            }
        } else {
            cc.find('btn', that.nav1).on('click', function () {
                that.nav1.active = false;
                that.nav2.active = true;
                that.setLvPositionFunc();
            });
        }

        // 排行榜切换
        cc.find('box/btn/rank1', that.nav5).on('click', function () {
            that.showUserRankDataFunc('1');
        });

        cc.find('box/btn/rank2', that.nav5).on('click', function () {
            that.showUserRankDataFunc('2');
        });

        // 随机背景音乐1-9
        this.bgAdi_n = Math.floor(Math.random() * 9 + 1);

        // 从游戏中回到首页
        if (Win_Global.cbk_nav == 1) {
            that.nav1.active = false;
            that.nav2.active = true;
            that.setLvPositionFunc();
        }

        // 用户信息
        if (cc.sys.localStorage.getItem(Win_Global.token_name)) {
            Win_Global.token = cc.sys.localStorage.getItem(Win_Global.token_name);
        }

        cc.find('opacity', that.telLayer).on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
        });

        cc.find('opacity', that.menuLayer).on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
            that.menuLayer.active = false;
        });

        // 点击音乐弹窗背景 取消
        cc.find('opacity', that.adiLayer).on(cc.Node.EventType.TOUCH_START, function (e) {
            that.adiLayer.active = false;
        });

        cc.find('box', that.adiLayer).on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
        });

        // 背景音乐
        if (cc.sys.localStorage.getItem('yiny') == '0') {
            that.yiny = 0;
            // console.log('音乐关');

            that.musicAudioPause();

            cc.loader.loadRes('page_img/off.png', cc.SpriteFrame, function (err, spriteFrame) {
                cc.find('box/bgadimg', that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        } else {
            that.yiny = 1;
            // console.log('音乐开');

            that.musicAudioPlay();

            cc.loader.loadRes('page_img/on.png', cc.SpriteFrame, function (err, spriteFrame) {
                cc.find('box/bgadimg', that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }

        if (cc.sys.localStorage.getItem('yinx') == '0') {
            // console.log('音效关');
            that.yinx = 0;

            cc.loader.loadRes('page_img/off.png', cc.SpriteFrame, function (err, spriteFrame) {
                cc.find('box/gameimg', that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        } else {
            // console.log('音效开');
            that.yinx = 1;

            cc.loader.loadRes('page_img/on.png', cc.SpriteFrame, function (err, spriteFrame) {
                cc.find('box/gameimg', that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
    },

    // 切换背景音乐
    toggleBgAdiFunc: function toggleBgAdiFunc() {
        var that = this;
        // console.log('切换音乐  '+that.yiny);

        if (that.yiny != 1) {
            that.yiny = 1;

            that.musicAudioPlay();

            cc.loader.loadRes('page_img/on.png', cc.SpriteFrame, function (err, spriteFrame) {
                cc.find('box/bgadimg', that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            cc.sys.localStorage.setItem('yiny', '1');
        } else {
            that.yiny = 0;

            that.musicAudioPause();

            cc.loader.loadRes('page_img/off.png', cc.SpriteFrame, function (err, spriteFrame) {
                cc.find('box/bgadimg', that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            cc.sys.localStorage.setItem('yiny', '0');
        }
    },
    // 切换游戏音效
    toggleGameAdiFunc: function toggleGameAdiFunc() {
        var that = this;

        if (that.yinx != 1) {
            that.yinx = 1;

            that.musicAudioPlay2();

            cc.loader.loadRes('page_img/on.png', cc.SpriteFrame, function (err, spriteFrame) {
                cc.find('box/gameimg', that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            cc.sys.localStorage.setItem('yinx', '1');
        } else {
            that.yinx = 0;

            cc.loader.loadRes('page_img/off.png', cc.SpriteFrame, function (err, spriteFrame) {
                cc.find('box/gameimg', that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            cc.sys.localStorage.setItem('yinx', '0');
        }
    },

    // 背景音乐 开
    musicAudioPlay: function musicAudioPlay() {
        this.bgAdi = cc.audioEngine.play('https://www.oneh5.com/thq/201871/mp3/m' + this.bgAdi_n + '.mp3', true, 0.8);
    },
    // 背景音乐 关
    musicAudioPause: function musicAudioPause() {
        cc.audioEngine.pause(this.bgAdi);
    },

    musicAudioPlay2: function musicAudioPlay2() {
        // this.gameAdi = cc.audioEngine.play('http://www.oneh5.com/thq/201871/mp3/pao.mp3', false , 0.1 );
        this.paoAudio.play();
    },
    musicAudioPause2: function musicAudioPause2() {
        if (this.paoAudio.isPlaying) {
            this.paoAudio.pause();
        }
    },

    /************************************ nav1 启动页******************************************/

    // 设置 进入页面 特效
    setGoInFunc: function setGoInFunc() {
        var that = this;

        that.animationComFunc(cc.find('btn', that.nav1), { '0': cc.fadeIn(.5), '1': cc.moveTo(.5, 0, -410) }, 500);
    },

    // 进入选择模式  nav1 -> nav2
    /* goChangeModu:function()
     {
         if( Win_Global.isScopeUserInfo == 1 )
         {
             this.nav1.active = false;
             this.nav2.active = true;
             this.setLvPositionFunc();
         }
     },
    */

    // 开始长征（选择无尽模式 nav2 -> 游戏）
    startChangzhengLenFunc: function startChangzhengLenFunc() {
        Win_Global.game_status = 1;
        this.musicAudioPause();
        cc.director.loadScene("MainGameScene");
        fsm.restart();
    },

    // 开始长征（选择关卡模式 nav2 -> nav3）
    startChangzhengLvFunc: function startChangzhengLvFunc() {
        this.nav2.active = false;
        this.nav3.active = true;
        this.setLvPositionFunc();
    },

    /************************************ nav3 关卡页******************************************/

    // 点击规则
    clcikGoToRuleFunc: function clcikGoToRuleFunc() {
        this.nav2.active = false;
        this.nav7.active = true;
        this.showRuleGiftInfoFunc();
    },
    // 点击控制声音（显示控制声音弹窗）
    clickMadeAdiFunc: function clickMadeAdiFunc() {
        var that = this;
        that.adiLayer.active = true;
    },

    // 设置 默认关卡坐标
    setLvPositionFunc: function setLvPositionFunc() {
        var that = this;

        if (Win_Global.isWx == 1) {
            wx.showLoading({ title: '加载中...' });
        }

        // 设置 地图渐显 特选
        that.animationComFunc(that.nav3.getChildByName('map'), { '0': cc.fadeIn(0.5), '1': cc.scaleTo(0.5, 1, 1) }, 800);

        var lvPositionArr = Array({ 'lv': 'lv1', 'x': 222.5, 'y': -176.5 }, { 'lv': 'lv2', 'x': 17.8, 'y': -169 }, { 'lv': 'lv3', 'x': -70.8, 'y': -117.8 }, { 'lv': 'lv4', 'x': -216.2, 'y': -165.9 }, { 'lv': 'lv5', 'x': -219.7, 'y': -45.6 }, { 'lv': 'lv6', 'x': -184.3, 'y': 56.4 }, { 'lv': 'lv7', 'x': -116, 'y': 169.8 });

        for (var i in lvPositionArr) {
            cc.find('map/' + lvPositionArr[i].lv, that.nav3).x = lvPositionArr[i].x;
            cc.find('map/' + lvPositionArr[i].lv, that.nav3).y = lvPositionArr[i].y;
            cc.find('map/' + lvPositionArr[i].lv, that.nav3).width = 35;
            cc.find('map/' + lvPositionArr[i].lv, that.nav3).height = 35;
        }

        cc.log('我的token = ' + Win_Global.token);

        Win_Global.ajaxPost(Win_Global.path + 'user.php', {
            'action': 'get_userinfo',
            'token': Win_Global.token,
            'nickname': Win_Global.nickname,
            'head_img': Win_Global.avatarUrl
        }, function (res) {
            if (res.code == 1) {
                // 头像回显
                cc.loader.load({ url: Win_Global.avatarUrl, type: 'png' }, function (err, texture) {
                    cc.find('head/head_icon', that.nav2).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                });

                // 战队名回显 Win_Global.nickname


                // 成绩回显
                that.nav2.getChildByName('score').getComponent(cc.Label).string = '战绩：' + res.data.score + '分';

                Win_Global.myMaxLv = res.data.pass_num;

                Win_Global.mySelectLv = res.data.pass_num;

                cc.log('最大关卡： ' + res.data.pass_num);

                // 已解锁关卡
                cc.loader.loadRes('page_img/nav3-51a.png', cc.SpriteFrame, function (err, spriteFrame) {
                    for (var i = 1; i <= res.data.pass_num - 1; i++) {
                        cc.find('map/lv' + i, that.nav3).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    }
                });

                // 未解锁关卡
                cc.loader.loadRes('page_img/suo.png', cc.SpriteFrame, function (err, spriteFrame) {
                    for (var i = res.data.pass_num + 1; i <= 7; i++) {
                        cc.find('map/lv' + i, that.nav3).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    }
                });

                // 我当前关卡显示动效圆
                cc.loader.loadRes('page_img/nav3-51.png', cc.SpriteFrame, function (err, spriteFrame) {
                    cc.find('map/lv' + res.data.pass_num, that.nav3).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    cc.find('map/lv' + res.data.pass_num, that.nav3).width = 50;
                    cc.find('map/lv' + res.data.pass_num, that.nav3).height = 50;

                    cc.find('map/lv' + res.data.pass_num, that.nav3).runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3, 1.3, 1.3), cc.scaleTo(0.2, 1, 1))));
                });

                if (Win_Global.isWx == 1) {
                    wx.hideLoading();
                }

                // 如果用户有电话，则存储电话
                if (res.data.tel) {
                    cc.sys.localStorage.setItem('bkqTel', res.data.tel);
                }
            }
        }, function (fail) {
            console.log(fail);
        }, function (error) {
            console.log(error);
        });
    },

    // 选择关卡
    selectLvFunc: function selectLvFunc(event, customEventData) {
        var that = this;
        var myMaxLv = Win_Global.myMaxLv;
        that.pass_id = Win_Global.myMaxLv;

        if (customEventData <= myMaxLv) {
            cc.log('我的token2 = ' + Win_Global.token);
            that.setNanduShowFunc();

            // 记录我选择的关卡
            // that.mySelectLv = customEventData;
            Win_Global.mySelectLv = customEventData;

            cc.loader.loadRes('page_img/nav3-51a.png', cc.SpriteFrame, function (err, spriteFrame) {

                for (var i = 1; i <= myMaxLv; i++) {
                    cc.find('map/lv' + i, that.nav3).runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1, 1), cc.scaleTo(1, 1))));
                    cc.find('map/lv' + i, that.nav3).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    cc.find('map/lv' + i, that.nav3).width = 35;
                    cc.find('map/lv' + i, that.nav3).height = 35;
                }
            });

            // 显示选中按钮
            cc.loader.loadRes('page_img/nav3-51.png', cc.SpriteFrame, function (err, spriteFrame) {
                if (customEventData <= myMaxLv) {
                    cc.find('map/lv' + customEventData, that.nav3).runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.3, 1.3, 1.3), cc.scaleTo(0.2, 1, 1))));
                    cc.find('map/lv' + customEventData, that.nav3).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    cc.find('map/lv' + customEventData, that.nav3).width = 50;
                    cc.find('map/lv' + customEventData, that.nav3).height = 50;
                }
            });
        } else {
            Alert.show("当前关卡未解锁！", null, false, 0.1);
        }
    },

    // 选择关卡后 开始长征
    /*lvBeforeStartFunc:function()
    {
          this.nav3.active = false;
        this.nav4.active = true;
          this.setNanduShowFunc();
    },*/

    // 排行榜
    rankFunc: function rankFunc() {
        this.nav2.active = false;
        this.nav5.active = true;

        this.showUserRankDataFunc('1');
    },

    // 个人中心（我的成就）
    userFunc: function userFunc() {
        this.nav2.active = false;
        this.nav6.active = true;
        this.showUserGiftInfoFunc();
    },

    /************************************ nav4 选择难度******************************************/

    // 设置默认 选择难度
    setNanduShowFunc: function setNanduShowFunc() {
        var that = this;

        if (Win_Global.isWx == 1) {
            wx.showLoading({ title: '加载中...' });
        }

        cc.log('选择关卡：' + Win_Global.mySelectLv);

        that.menuLayer.active = true;

        var selectNanduChildArr = cc.find('nandu', that.nav4).children;
        // 恢复默认按钮
        cc.loader.loadRes('page_img/btn_g.png', cc.SpriteFrame, function (err, spriteFrame) {
            for (var i in selectNanduChildArr) {
                selectNanduChildArr[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                selectNanduChildArr[i].getChildByName('Label').color = new cc.Color(0, 0, 0, 255);
            }
        });

        Win_Global.ajaxPost(Win_Global.path + '/answer.php', {
            'action': 'diff_list',
            'token': Win_Global.token,
            'pass_id': Win_Global.mySelectLv
        }, function (res) {
            // console.log(res);
            if (res.code == 1) {
                that.myNandu = res.diff_num;
                cc.log('最大难度：' + that.myNandu);
                // 难度回显
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].is_lock == 0) {
                        cc.find('box/btn' + (i + 1) + '/status', that.menuLayer).active = false;
                    } else {
                        cc.find('box/btn' + (i + 1) + '/status', that.menuLayer).active = true;
                    }
                }

                if (Win_Global.isWx == 1) {
                    wx.hideLoading();
                }
            }
        }, function (fail) {
            console.log(fail);
        }, function (error) {
            console.log(error);
        });

        // 设置 人物进入 特效
        // that.animationComFunc( that.nav4.getChildByName('ren') , {'0':cc.fadeIn(1),'1':cc.moveTo(.8,120,-260)} , 500  );


        // 设置 字体 特效
        // that.animationComFunc( that.nav4.getChildByName('zi') , {'0':cc.fadeIn(1),'1':cc.moveTo(.8,-140,-127)} , 500  );

    },

    // 选择难度
    selectNanduFunc: function selectNanduFunc(e, data) {
        var that = this;

        // 我选择的关卡
        var pass_id = Win_Global.mySelectLv;

        that.diff_id = data;

        var selectNanduChildArr = cc.find('nandu', that.nav4).children;

        // 恢复默认按钮
        cc.loader.loadRes('page_img/btn_g.png', cc.SpriteFrame, function (err, spriteFrame) {
            for (var i in selectNanduChildArr) {
                selectNanduChildArr[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                selectNanduChildArr[i].getChildByName('Label').color = new cc.Color(0, 0, 0, 255);
            }
        });

        cc.loader.loadRes('page_img/btn_g21.png', cc.SpriteFrame, function (err, spriteFrame) {
            cc.find('nandu/nd' + data, that.nav4).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            cc.find('nandu/nd' + data, that.nav4).getChildByName('Label').color = new cc.Color(181, 31, 36, 255);
        });

        cc.log('我选择的关卡：' + pass_id + '  ; 选择的难度：' + that.diff_id);
        cc.log('难度：' + that.myNandu);

        if (data <= that.myNandu) {

            // 选择难度
            Win_Global.ajaxPost(Win_Global.path + '/answer.php', {
                'action': 'answer_start',
                'token': Win_Global.token,
                'pass_id': pass_id,
                'diff_id': that.diff_id
            }, function (res) {
                if (res.code == 1) {
                    // 开始游戏前 存储用户选择的关卡及难度
                    Win_Global.mySelectLv = pass_id;
                    Win_Global.nandu_id = that.diff_id;

                    that.nav4.active = false;
                    that.nav8.active = true;

                    if (Win_Global.isWx == 1) {
                        wx.showLoading({ title: '加载中...' });
                    }

                    // 关卡文字描述
                    cc.find('text', that.nav8).runAction(cc.fadeIn(.5));
                    that.animationComFunc(cc.find('btn', that.nav8), { '0': cc.fadeIn(.5), '1': cc.moveTo(.5, 0, -310) }, 350);

                    cc.loader.load({ url: 'https://www.oneh5.com/LJ/game71/lv_bg/lv' + pass_id + '0' + that.diff_id + '.png', type: 'png' }, function (err, texture) {
                        that.nav8.getChildByName('top_img').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                        if (Win_Global.isWx == 1) {
                            wx.hideLoading();
                        }
                    });
                }
            }, function (fail) {
                console.log(fail);
            }, function (error) {
                console.log(error);
            });
        } else {
            var layerText = '';

            if (that.myNandu == 1 && data == 2) {
                layerText = '同志，你需要先通关“简单”关卡，才能解锁“一般”关卡。加油！';
            } else {
                layerText = '同志，你需要先通关“一般”关卡，才能解锁“困难”关卡。加油！';
            }

            Alert.show(layerText, null, false, 0.1);
        }
    },

    /************************************ nav5 排行榜******************************************/

    // 排行榜 数据回显
    showUserRankDataFunc: function showUserRankDataFunc(status) {
        var that = this;

        this.rankDestroy();

        if (Win_Global.isWx == 1) {
            wx.showLoading({ title: '加载中...' });
        }

        var obj = {};

        // 排行榜1
        if (status == '1') {
            obj.action = 'one_rand';
            obj.img_path_active = 'page_img/z_rka.png';
            obj.img_path = 'page_img/fr_rk.png';
            obj.btn_active = 'box/btn/rank1';
            obj.btn = 'box/btn/rank2';
        } else {
            obj.action = 'one_rand_now';
            obj.img_path_active = 'page_img/fr_rka.png';
            obj.img_path = 'page_img/z_rk.png';
            obj.btn_active = 'box/btn/rank2';
            obj.btn = 'box/btn/rank1';
        }

        // 排行榜按钮切换
        cc.loader.loadRes(obj.img_path_active, cc.SpriteFrame, function (err, spriteFrame) {
            cc.find(obj.btn_active, that.nav5).getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        cc.loader.loadRes(obj.img_path, cc.SpriteFrame, function (err, spriteFrame) {
            cc.find(obj.btn, that.nav5).getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });

        Win_Global.ajaxPost(Win_Global.path + '/rand.php', {
            'action': obj.action,
            'token': Win_Global.token
        }, function (res) {
            // console.log(res);
            if (res.code == 1) {
                if (res.data.rand == '') {
                    cc.find('box/not_data', that.nav5).active = true;
                } else {
                    cc.find('box/not_data', that.nav5).active = false;
                }

                for (var i = 0; i < res.data.rand.length; i++) {
                    var node = cc.instantiate(that.rank);

                    var scene = cc.find('box/rank_box/view/content', that.nav5);

                    node.setPosition(0, -105 - 130 * i + 100);

                    node.getComponent('rankList').init({
                        head_img: res.data.rand[i].head_img,
                        rank_n: res.data.rand[i].rand,
                        rank_name: res.data.rand[i].nickname,
                        rank_cj: res.data.rand[i].score,
                        rank_status: res.data.rand[i].status
                    });

                    scene.addChild(node);
                }

                if (status == '1') {
                    that.my_rank.node.active = true;
                    that.my_rank.string = '我的排名：' + res.data.my_rand;
                } else {
                    that.my_rank.node.active = false;
                }

                // scrollView容器的高度
                cc.find('box/rank_box/view/content', that.nav5).height = res.data.rand.length * 130 - 25;
                cc.find('box/rank_box/scrollBar', that.nav5).active = false;

                if (Win_Global.isWx == 1) {
                    wx.hideLoading();
                }
            }
        }, function (fail) {
            console.log(fail);
        }, function (error) {
            console.log(error);
        });
    },

    //去我的奖品
    goToMyGiftFunc: function goToMyGiftFunc() {
        this.nav5.active = false;
        this.nav7.active = true;
        this.showRuleGiftInfoFunc();
    },

    /************************************ nav6 我的成就******************************************/
    // 我的成就点击 贝壳券，去我的奖品
    bkqGoToRuleGiftInfoFunc: function bkqGoToRuleGiftInfoFunc() {
        this.nav6.active = false;
        this.nav7.active = true;
        this.showRuleGiftInfoFunc();
    },

    // 个人中心成就
    showUserGiftInfoFunc: function showUserGiftInfoFunc() {
        var that = this;

        if (Win_Global.isWx == 1) {
            wx.showLoading({ title: '加载中...' });
        }

        Win_Global.ajaxPost(Win_Global.path + '/task.php?=', {
            'action': 'task_list',
            'token': Win_Global.token
        }, function (res) {
            // console.log(res);

            if (res.code == 1) {
                cc.find('top/head_box/t_name', that.nav6).getComponent(cc.Label).string = res.data.nickname;
                cc.find('top/head_box/left/num', that.nav6).getComponent(cc.Label).string = res.data.score;
                cc.find('top/head_box/right/num', that.nav6).getComponent(cc.Label).string = res.data.beike;
                if (res.data.head_img) {
                    cc.loader.load({ url: res.data.head_img, type: 'png' }, function (err, texture) {
                        cc.find('top/head_box/head/h', that.nav6).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                    });
                }

                for (var i = 0; i < res.data.task.length; i++) {
                    var gift = cc.instantiate(that.gift);
                    var scene = cc.find('main/gf_box/view/content', that.nav6);

                    gift.setPosition(70 + 120 * i, -103);
                    // gift.setPosition(100+150*i,-103);

                    gift.getComponent('giftList').init({
                        gf_status: res.data.task[i].status, //1达成条件未领取 2已领取 3锁定
                        gf_num: res.data.task[i].task_beike,
                        gf_name: res.data.task[i].task_name,
                        gf_id: res.data.task[i].id
                    });

                    scene.addChild(gift);
                }

                cc.find('main/gf_box/view/content', that.nav6).width = res.data.task.length * 120 + 60;

                if (Win_Global.isWx == 1) {
                    wx.hideLoading();
                }
            }
        }, function (fail) {
            console.log(fail);
        }, function (error) {
            console.log(error);
        });
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    /************************************ nav7 我的个人中心（贝壳券）******************************************/
    // 规则
    // 用户奖品回显
    showRuleGiftInfoFunc: function showRuleGiftInfoFunc() {
        var that = this;
        // console.log('规则');
        if (Win_Global.isWx == 1) {
            wx.showLoading({ title: '加载中...' });
        }

        // 查询用户中奖详情
        Win_Global.ajaxPost(Win_Global.path + '/rand.php', {
            'action': 'week_prize',
            'token': Win_Global.token
        }, function (res) {
            // console.log('奖品回显');
            // console.log(res);

            if (res.code == 1) {
                // 有奖
                if (res.data.one.prize > 0 || res.data.friends.prize > 0) {

                    cc.find('box/view/content/bkq_box', that.nav7).active = true;
                    cc.find('box/view/content/bkq_none', that.nav7).active = false;

                    if (res.data.one.prize > 0 && res.data.friends.prize > 0) {
                        cc.find('box/view/content/rule', that.nav7).y = -1050;
                    } else {
                        cc.find('box/view/content/rule', that.nav7).y = -780;
                    }

                    if (res.data.friends.prize > 0 && res.data.one.prize <= 0) {
                        cc.find('box/view/content/bkq_box/bkq_friend/', that.nav7).y = 300;
                    }

                    // 总榜
                    if (res.data.one.prize > 0) {
                        cc.find('box/view/content/bkq_box/bkq_user', that.nav7).active = true;
                        that.isGiveRankBkq = res.data.one.status;
                        if (that.isGiveRankBkq == 1) {
                            cc.loader.loadRes('page_img/lingq2.png', cc.SpriteFrame, function (err, spriteFrame) {
                                cc.find('box/view/content/bkq_box/bkq_user/btn', that.nav7).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                            });
                        }
                        cc.find('box/view/content/bkq_box/bkq_user/text', that.nav7).getComponent(cc.Label).string = '总榜No.' + res.data.one.rand;
                        cc.find('box/view/content/bkq_box/bkq_user/bkq_num', that.nav7).getComponent(cc.Label).string = res.data.one.prize + '贝壳券';
                    }

                    // 好友榜
                    if (res.data.friends.prize > 0) {
                        cc.find('box/view/content/bkq_box/bkq_friend', that.nav7).active = true;
                        that.isGiveRankBkq_friend = res.data.friends.status;
                        if (that.isGiveRankBkq_friend == 1) {
                            cc.loader.loadRes('page_img/lingq2.png', cc.SpriteFrame, function (err, spriteFrame) {
                                cc.find('box/view/content/bkq_box/bkq_friend/btn', that.nav7).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                            });
                        }
                        cc.find('box/view/content/bkq_box/bkq_friend/text', that.nav7).getComponent(cc.Label).string = '好友榜No.' + res.data.friends.rand;
                        cc.find('box/view/content/bkq_box/bkq_friend/bkq_num', that.nav7).getComponent(cc.Label).string = res.data.friends.prize + '贝壳券';
                    }
                }
                // 无奖品
                else {
                        cc.find('box/view/content/bkq_none', that.nav7).active = true;
                        cc.find('box/view/content/bkq_box', that.nav7).active = false;

                        cc.find('box/view/content/rule', that.nav7).y = -650;
                    }

                if (Win_Global.isWx == 1) {
                    wx.hideLoading();
                }
            }
        }, function (fail) {
            console.log(fail);
        }, function (error) {
            console.log(error);
        });
    },

    // 领取贝壳券
    giveBkqFunc: function giveBkqFunc(e, data) {
        cc.log('点击领取排行榜贝壳券');
        var that = this;
        var btn_status = '';

        if (that.isGiveRankBkq == 1 && data == 1 || that.isGiveRankBkq_friend == 1 && data == 3) {
            if (that.isGiveRankBkq == 1) {
                btn_status = 'box/view/content/bkq_box/bkq_user/btn';
            }

            if (that.isGiveRankBkq_friend == 1) {
                btn_status = 'box/view/content/bkq_box/bkq_friend/btn';
            }

            cc.loader.loadRes('page_img/lingq2.png', cc.SpriteFrame, function (err, spriteFrame) {
                cc.find(btn_status, that.nav7).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            Alert.show("你已经领取过了哦", null, false, 0.1);
        } else {
            Win_Global.ajaxPost(Win_Global.path + '/rand.php', {
                'action': 'get_week_prize',
                'token': Win_Global.token,
                'id': data,
                'stime': Date.parse(new Date()).toString().substr(0, 10)
            }, function (res) {
                // console.log(res);
                if (res.code == 1) {
                    Alert.show('成功领取' + res.data.prize + '贝壳券', null, false, 0.1);
                }
                // 绑定手机号码
                else if (res.code == 9004) //9004
                        {
                            cc.log('绑定手机号码');
                            that.telLayer.active = true;
                        }
                        // 已领取
                    else if (res.code == 9002) //9002
                            {
                                Alert.show("你已经领取过了哦", null, false, 0.1);
                            }
            }, function (fail) {
                console.log(fail);
            }, function (error) {
                console.log(error);
            });
        }
    },
    // 获取验证码
    getCodeFunc: function getCodeFunc() {
        var that = this;
        var tel = cc.find('box/input', that.telLayer).getComponent(cc.EditBox).string || 'null';
        var codeBtnLabel = cc.find('box/codeBtn/Label', that.telLayer);

        Win_Global.get_code(tel, codeBtnLabel);
    },

    // 绑定手机号
    submitTelFunc: function submitTelFunc() {
        var that = this;
        var tel = cc.find('box/input', that.telLayer).getComponent(cc.EditBox).string || 'null';
        var telLayer = that.telLayer;
        var code = cc.find('box/code', that.telLayer).getComponent(cc.EditBox).string || 'null';

        Win_Global.bind_tel(tel, telLayer, code);
    },

    /************************************ nav8 ******************************************/

    // 进入游戏场景
    goToGameFunc: function goToGameFunc() {
        Win_Global.game_status = 0;
        this.musicAudioPause();
        cc.director.loadScene("MainGameScene");
        fsm.restart();
    },

    /************************************ com ******************************************/

    // 返回主页
    callbackFunc: function callbackFunc(e, data) {
        var that = this;

        // 排行榜 销毁克隆
        if (data == 5) {
            this.rankDestroy();
        }

        if (data == 8) {
            this.nav2.active = false;
            this.nav3.active = true;
        } else {
            this.nav2.active = true;
            this.nav3.active = false;
        }

        this.nav1.active = false;

        this.nav4.active = false;
        this.nav5.active = false;
        this.nav6.active = false;
        this.nav7.active = false;
        this.nav8.active = false;

        this.setLvPositionFunc();
        // this.selectLvFunc( '',Win_Global.myMaxLv );
    },

    // 排行榜销毁克隆
    rankDestroy: function rankDestroy() {
        var rank_arr = cc.find('box/rank_box/view/content', this.nav5).children;
        for (var i in rank_arr) {
            rank_arr[i].destroy();
        }
    },

    // 特效
    animationComFunc: function animationComFunc(node, spawn, time) {
        setTimeout(function () {
            node.runAction(cc.spawn(spawn[0], spawn[1]));
        }, time);
    }

});

var page = new pageF();

module.exports = page;

cc._RF.pop();