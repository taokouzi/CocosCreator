(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/StickHero/Scripts/landMaker.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd0079DKriBNl693joESFHLy', 'landMaker', __filename);
// StickHero/Scripts/landMaker.js

"use strict";

var spriteCreator = require("spriteCreator");
var perfectLabel = require("perfectLabel");
var storageManager = require("storageManager");

// 引入插件
var StateMachine = require("state-machine");

var fsm = new StateMachine({
    data: {
        gameDirector: null
    },
    init: 'stand',
    transitions: [{ name: 'stickLengthen', from: 'stand', to: 'stickLengthened' }, { name: 'heroTick', from: 'stickLengthened', to: 'heroTicked' }, { name: 'stickFall', from: 'heroTicked', to: 'stickFalled' }, { name: 'heroMoveToLand', from: 'stickFalled', to: 'heroMovedToLand' }, { name: 'landMove', from: 'heroMovedToLand', to: 'stand' }, { name: 'heroMoveToStickEnd', from: 'stickFalled', to: 'heroMovedToStickEnd' }, { name: 'heroDown', from: 'heroMovedToStickEnd', to: 'heroDowned' }, { name: 'gameOver', from: 'heroDowned', to: 'end' }, { name: 'restart', from: 'end', to: 'stand' }],
    methods: {
        onLeaveHeroTicked: function onLeaveHeroTicked() {
            gameDirector.unregisterEvent();
        },
        onStickLengthen: function onStickLengthen() {
            Win_Global.isGoHomeBtn = 1;
            // console.log('1');
            gameDirector.stickLengthen = true;
            gameDirector.stick = gameDirector.createStick();

            /*************************   /2  **************************************/
            gameDirector.stick.x = gameDirector.hero.x + gameDirector.hero.width * (1 - gameDirector.hero.anchorX) + gameDirector.stick.width * gameDirector.stick.anchorX;

            var ani = gameDirector.hero.getComponent(cc.Animation);

            // 人物原地动画（棍子升高，人物动）
            ani.play('heroPush');
        },
        onHeroTick: function onHeroTick() {
            // console.log('2');
            Win_Global.isGoHomeBtn = 2;
            gameDirector.stickLengthen = false;
            var ani = gameDirector.hero.getComponent(cc.Animation);

            // 人物把棍子推到（棍子停止升高，人物开始出发，推倒棍子）
            ani.play('heroTick');
        },
        onStickFall: function onStickFall() {
            // console.log('3');
            Win_Global.isGoHomeBtn = 3;
            //stick fall action.
            var stickFall = cc.rotateBy(0.2, 90);
            stickFall.easing(cc.easeIn(3));

            var callFunc = cc.callFunc(function () {
                var stickLength = gameDirector.stick.height - gameDirector.stick.width * gameDirector.stick.anchorX;

                if (stickLength < gameDirector.currentLandRange || stickLength > gameDirector.currentLandRange + gameDirector.secondLand.width) {
                    //failed.
                    fsm.heroMoveToStickEnd();
                    // console.log('失败');
                } else {
                    //successed
                    fsm.heroMoveToLand();
                    if (stickLength > gameDirector.currentLandRange + gameDirector.secondLand.width / 2 - 5 && stickLength < gameDirector.currentLandRange + gameDirector.secondLand.width / 2 + 5) {
                        gameDirector.perfect++;
                        gameDirector.getScore(gameDirector.perfect);
                        var pl = gameDirector.perfectLabel.getComponent(perfectLabel);
                        pl.showPerfect(gameDirector.perfect);
                    } else {
                        gameDirector.perfect = 0;
                    }
                    // console.log('成功');
                }
            });
            var se = cc.sequence(stickFall, callFunc);
            gameDirector.stick.runAction(se);
        },
        onHeroMoveToLand: function onHeroMoveToLand() {
            // console.log('4');
            Win_Global.isGoHomeBtn = 4;
            // 棍子击打柱子音效
            if (cc.sys.localStorage.getItem('yinx') != '0') {
                gameDirector.woodAudioPlay();
            }

            // console.log('4');
            var ani = gameDirector.hero.getComponent(cc.Animation);
            var callFunc = cc.callFunc(function () {
                ani.stop('heroRun');
                gameDirector.getScore();

                fsm.landMove();
            });

            // 人物跑动画
            ani.play('heroRun');
            gameDirector.heroMove(gameDirector.hero, { length: gameDirector.currentLandRange + gameDirector.secondLand.width, callFunc: callFunc });
        },
        onLandMove: function onLandMove() {
            // console.log('5');
            Win_Global.isGoHomeBtn = 5;
            run_start++;

            Win_Global.gx_run_num = run_start;

            // 进度更新
            gameDirector.runRange.string = '距胜利还差 ' + (run_num[nandu_id] - run_start) + ' 步';

            // 游戏通关/闯关模式
            if (run_start >= run_num[nandu_id] && Win_Global.game_status == 0) {
                // console.log('闯关模式通关啦！');
                if (cc.sys.localStorage.getItem('yinx') != '0') {
                    gameDirector.successAudioPlay();
                }

                // Win_Global.isGoHomeBtn = 8;
                // gameDirector.endLabel.node.active = true;
                // gameDirector.endScore.string = Win_Global.gx_score + '分';

                // 通关调用接口
                gameDirector.gameEndFunc(Win_Global.gx_score, 1);
            }

            // 游戏进行中/无尽模式
            else {
                    // console.log('还在继续');
                    var callFunc = cc.callFunc(function () {
                        gameDirector.registerEvent();
                    });

                    gameDirector.landCreateAndMove(callFunc);

                    if (Win_Global.game_status == 1) {
                        var num = 1;

                        if (Win_Global.gx_score >= Win_Global.backgroundLoader[0] && Win_Global.gx_score < Win_Global.backgroundLoader[1]) {
                            num = 2;
                        } else if (Win_Global.gx_score >= Win_Global.backgroundLoader[1] && Win_Global.gx_score < Win_Global.backgroundLoader[2]) {
                            num = 3;
                        } else if (Win_Global.gx_score >= Win_Global.backgroundLoader[2] && Win_Global.gx_score < Win_Global.backgroundLoader[3]) {
                            num = 4;
                        } else if (Win_Global.gx_score >= Win_Global.backgroundLoader[3] && Win_Global.gx_score < Win_Global.backgroundLoader[4]) {
                            num = 5;
                        } else if (Win_Global.gx_score >= Win_Global.backgroundLoader[4] && Win_Global.gx_score < Win_Global.backgroundLoader[5]) {
                            num = 6;
                        } else if (Win_Global.gx_score >= Win_Global.backgroundLoader[5]) {
                            num = 7;
                        }

                        // 换背景
                        gameDirector.backgroundLoader(num);
                    }
                }
        },
        onHeroMoveToStickEnd: function onHeroMoveToStickEnd() {
            // console.log('6');
            Win_Global.isGoHomeBtn = 6;
            // 棍子击打柱子音效
            // gameDirector.woodAudioPlay();
            if (cc.sys.localStorage.getItem('yinx') != '0') {
                gameDirector.woodAudioPlay();
            }

            var ani = gameDirector.hero.getComponent(cc.Animation);
            var callFunc = cc.callFunc(function () {
                ani.stop('heroRun');
                fsm.heroDown();
            });
            ani.play('heroRun');
            gameDirector.heroMove(gameDirector.hero, { length: gameDirector.stick.height, callFunc: callFunc });
        },
        onHeroDown: function onHeroDown() {
            // console.log('7');
            Win_Global.isGoHomeBtn = 7;
            var callFunc = cc.callFunc(function () {
                fsm.gameOver();
            });
            gameDirector.stickAndHeroDownAction(callFunc);
        },
        onGameOver: function onGameOver() {
            // console.log('8');
            Win_Global.isGoHomeBtn = 8;
            // Alert2.show("当前关卡未解锁！", null, false, 0.1);


            // 闯关模式
            if (Win_Global.game_status == 0) {
                gameDirector.overLabel.active = true;
            }

            // 无尽模式
            else {
                    // 上报成绩（无尽模式）
                    gameDirector.geiveBkqLessFunc(Win_Global.gx_score);

                    gameDirector.overLabel2.active = true;

                    cc.find('box/score', gameDirector.overLabel2).getComponent(cc.Label).string = '成绩：' + Win_Global.gx_score + '，游戏结束！';

                    cc.find('box', gameDirector.overLabel2).runAction(cc.spawn(cc.scaleTo(0.1, 1, 1), cc.fadeTo(0.1, 255)));

                    // 点击退出（去首页）
                    cc.find('box/out', gameDirector.overLabel2).on('click', function () {
                        gameDirector.goHomeFunc();
                    });

                    // 点击再玩一次
                    cc.find('box/again', gameDirector.overLabel2).on('click', function () {

                        cc.find('box', gameDirector.overLabel2).runAction(cc.spawn(cc.scaleTo(0.1, 1.2, 1.2), cc.fadeTo(0.1, 0)));

                        gameDirector.overLabel2.active = false;
                        fsm.restart();
                    });

                    // 点击邀请好友（分享）
                    cc.find('box/share/btn', gameDirector.overLabel2).on('click', function () {

                        var share_n = Math.floor(Math.random() * 10 + 1);
                        wx.shareAppMessage({
                            title: '@' + Win_Global.nickname + ' 走了' + share_n * 100 + '公里，邀请你快来和我一起重走长征路吧！（邀请好友）',
                            imageUrl: 'https://www.oneh5.com/LJ/game71/share/share' + share_n + '.png',
                            query: 'share_t=' + Win_Global.token,
                            success: function success(res) {
                                cc.log("点击邀请好友（分享）成功！");
                            },
                            fail: function fail(res) {
                                console.log("转发失败!!!");
                            }
                        });
                    });
                }

            if (Win_Global.isWx == 1) {
                wx.showLoading({ title: '加载中...' });
            }

            // 剩余复活次数回显
            gameDirector.fialShyNumFunc();

            // 任务掉落音效
            if (cc.sys.localStorage.getItem('yinx') != '0') {
                gameDirector.failAudioPlay();
            }
        },
        onRestart: function onRestart() {
            gameDirector.bgAudioStop();
            cc.director.loadScene("MainGameScene");
            Win_Global.isGoHomeBtn = 0;
            Win_Global.gx_score = 0;
        }
    }
});

var run_num, run_start, nandu_id;

var gameDirector = null;

var nanduArr = ['简单', '一般', '困难'];

cc.Class({
    extends: cc.Component,
    properties: {
        landRange: cc.v2(20, 300),
        landWidth: cc.v2(20, 200),
        hero: cc.Node,
        firstLand: cc.Node,
        secondLand: cc.Node,
        moveDuration: 0.5,
        stickSpeed: 400,
        heroMoveSpeed: 400,
        // stick:cc.Node,
        // stickLengthen:false,
        stickWidth: 6,

        canvas: cc.Node,

        socre_box: cc.Node,
        scoreLabel: cc.Label,

        hightestScoreLabel: cc.Label,
        overLabel: cc.Node,

        // 游戏结束弹窗 （无尽模式）
        overLabel2: cc.Node,

        perfectLabel: cc.Node,

        // 游戏结束时分数
        endScore: cc.Label,

        // 过关
        endLabel: cc.Label,

        // 输入手机号弹窗
        telLayer: cc.Node,

        Alert: cc.Node,

        // 开关音效
        paoAudio1: cc.AudioSource,

        // 棍子升高音效
        paoAudio: cc.AudioSource,

        ans: cc.Node,
        ans_time: cc.Label,

        video: cc.Node,
        videoPlayer: cc.VideoPlayer,

        // 闯关模式
        runRange: cc.Label, //还剩步数
        lvName: cc.Label, //关卡名称


        ans_err_num: 0,

        show_bkq: cc.Node,

        ans_sy_n: 0,
        adv_sy_n: 0,
        share_sy_n: 0,

        adiLayer: cc.Node,

        paoAdi: null,

        shareImg: cc.Prefab
    },

    onLoad: function onLoad() {

        // 进入游戏就开始加载视频（随机1-12）
        //cc.find('videoPlayer',this.video).getComponent(cc.VideoPlayer).remoteURL = 'https://oneh5.com/thq/201871/mp4/'+ Math.floor(Math.random()*12+1) +'.mp4';

        //init data
        // alert(storageManager.getHighestScore());
        gameDirector = this;
        cc.find('box', this.Alert).runAction(cc.spawn(cc.scaleTo(0, 1.2, 1.2), cc.fadeTo(0, 0)));
        // cc.log( '我记录的成绩啊啊     '+Win_Global.jl_score );


        // 无尽模式 不显示还剩步数和关卡名称
        if (Win_Global.game_status == 1) {
            this.lvName.node.active = false;
            this.runRange.node.active = false;
            this.socre_box.y = 420;
            this.scoreLabel.node.y = 420;
        }

        // 闯关模式 显示还剩步数和关卡名称
        else {
                this.lvName.node.active = true;
                this.runRange.node.active = true;
                this.socre_box.y = 380;
                this.scoreLabel.node.y = 380;
            }

        run_num = Win_Global.run_num;
        run_start = Win_Global.jl_run_num;
        nandu_id = Win_Global.nandu_id;

        this.runLength = 0, this.stick = null;
        this.stickLengthen = false;

        // 记录的分数  （默认0 复活后记录）
        this.score = Win_Global.jl_score;
        this.scoreLabel.string = this.score;
        // this.scoreLabel.string = "得分："+this.score;


        this.perfect = 0;
        this.currentLandRange = 0;
        this.heroWorldPosX = 0;
        this.changeHightestScoreLabel();

        //create new land;
        this.createNewLand();

        var range = this.getLandRange();
        this.heroWorldPosX = this.firstLand.width - (1 - this.hero.anchorX) * this.hero.width - this.stickWidth;
        this.secondLand.setPosition(range + this.firstLand.width, 0);

        this.registerEvent();
        //init hero animation callback.
        var ani = gameDirector.hero.getComponent(cc.Animation);
        ani.on('stop', function (event) {
            if (event.target.name == 'heroTick') {
                fsm.stickFall();
            }
        });

        // cc.log('当前难度系数：'+nandu_id);

        // cc.log( '游戏模式：0闯关，1无尽 =>'+Win_Global.game_status );

        // 进度更新
        this.runRange.string = '距胜利还差 ' + (run_num[nandu_id] - run_start) + ' 步';

        // 关卡展示
        var lvs = ['瑞金', '遵义会议', '四渡赤水', '大渡河', '翻雪山', '过草地', '会师'];

        this.lvName.string = lvs[Win_Global.mySelectLv - 1];

        var that = this;

        that.endLabel.node.getChildByName('opacity').on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
        });
        cc.find('opacity', that.telLayer).on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
        });
        that.overLabel.getChildByName('opacity').on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
        });
        that.video.on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
        });
        that.ans.on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
        });

        that.show_bkq.runAction(cc.spawn(cc.scaleTo(0, .5, .5), cc.fadeTo(0, 0)));

        // 点击音乐弹窗背景 取消
        cc.find('opacity', that.adiLayer).on(cc.Node.EventType.TOUCH_START, function (e) {
            that.adiLayer.active = false;
        });

        cc.find('box', that.adiLayer).on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
        });

        cc.find('opacity', that.Alert).on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
        });

        // 背景音乐
        if (cc.sys.localStorage.getItem('yiny') == '0') {
            that.yiny = 0;
            // console.log('音乐关');

            that.bgAudioPause();

            cc.loader.loadRes('page_img/off.png', cc.SpriteFrame, function (err, spriteFrame) {
                cc.find('box/bgadimg', that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        } else {
            that.yiny = 1;
            // console.log('音乐开');

            that.bgAudioPlay();

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

        // console.log( 'btn0 = '+Win_Global.isGoHomeBtn );


        if (Win_Global.isWx == 1) {
            // 棍子升高音效
            that.paoAdi = wx.createInnerAudioContext();
            that.paoAdi.src = 'https://www.oneh5.com/thq/201871/mp3/pao.mp3';
            that.paoAdi.volume = 0.8;
            that.paoAdi.loop = true;
        }
    },
    // 切换背景音乐
    toggleBgAdiFunc: function toggleBgAdiFunc() {
        var that = this;
        // console.log('切换音乐  '+that.yiny);

        if (that.yiny != 1) {
            that.yiny = 1;

            that.bgAudioPlay();

            cc.loader.loadRes('page_img/on.png', cc.SpriteFrame, function (err, spriteFrame) {
                cc.find('box/bgadimg', that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            cc.sys.localStorage.setItem('yiny', '1');
        } else {
            that.yiny = 0;

            that.bgAudioPause();

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

    // 无尽模式根据成绩换肤
    backgroundLoader: function backgroundLoader(num) {
        var bgSprite = this.canvas.getChildByName('bg').getComponent(cc.Sprite);
        cc.loader.load({ url: 'http://www.oneh5.com/LJ/game71/bg/bg' + num + '.png', type: 'png' }, function (err, texture) {
            bgSprite.spriteFrame = new cc.SpriteFrame(texture);
        });
    },

    // 点击弹出 设置音乐弹窗
    clickMadeAdiFunc: function clickMadeAdiFunc() {
        var that = this;
        that.adiLayer.active = true;
    },

    // 点击音效开关
    musicAudioPlay2: function musicAudioPlay2() {
        // this.gameAdi = cc.audioEngine.play('http://www.oneh5.com/thq/201871/mp3/pao.mp3', false , 0.2 );
        this.paoAudio1.play();
    },

    // 背景音效 开
    bgAudioPlay: function bgAudioPlay() {
        this.bgAdi = cc.audioEngine.play('https://www.oneh5.com/thq/201871/mp3/bg.mp3', true, 0.8);
    },

    bgAudioStop: function bgAudioStop() {
        cc.audioEngine.stop(this.bgAdi);
    },
    // 背景音效 关
    bgAudioPause: function bgAudioPause() {
        cc.audioEngine.pause(this.bgAdi);
    },
    // 棍子变长音效 开
    paoAudioPlay: function paoAudioPlay() {
        // this.gzsgAdi = cc.audioEngine.play('http://www.oneh5.com/thq/201871/mp3/pao.mp3', true , 1 );
        this.paoAdi.play();
    },
    // 棍子变长音效 关
    paoAudioPause: function paoAudioPause() {
        this.paoAdi.pause();
        // cc.audioEngine.pause(this.gzsgAdi);
        /* if( this.paoAudio.isPlaying )
         {
             this.paoAdi.pause();
         }*/
    },
    // 棍子敲打柱子音效 开
    woodAudioPlay: function woodAudioPlay() {
        this.gzdzzAdi = cc.audioEngine.play('https://www.oneh5.com/thq/201871/mp3/wood.mp3', false, 1);
    },
    // 棍子敲打柱子音效 关
    woodAudioPause: function woodAudioPause() {
        cc.audioEngine.pause(this.gzdzzAdi);
    },
    // 失败掉落音效 开
    failAudioPlay: function failAudioPlay() {
        this.failAdi = cc.audioEngine.play('https://www.oneh5.com/thq/201871/mp3/failed.mp3', false, 1);
    },
    // 失败掉落音效 关
    failAudioPause: function failAudioPause() {
        cc.audioEngine.pause(this.failAdi);
    },
    // 成功音效
    successAudioPlay: function successAudioPlay() {
        this.successAdi = cc.audioEngine.play('https://www.oneh5.com/thq/201871/mp3/success.mp3', false, 1);
    },
    // 成功音效 关
    successAudioPause: function successAudioPause() {
        cc.audioEngine.stop(this.successAdi);
    },

    // 剩余复活次数回显
    fialShyNumFunc: function fialShyNumFunc() {
        var that = this;
        Win_Global.ajaxPost(Win_Global.path + '/user.php', {
            'action': 'left_num',
            'token': Win_Global.token
        }, function (res) {
            if (res.code == 1) {
                cc.find('fail/btn1/n', that.overLabel).getComponent(cc.Label).string = res.data.answer;
                cc.find('fail/btn2/n', that.overLabel).getComponent(cc.Label).string = res.data.adver;
                cc.find('fail/btn3/n', that.overLabel).getComponent(cc.Label).string = res.data.share;

                that.ans_sy_n = res.data.answer;
                that.adv_sy_n = res.data.adver;
                that.share_sy_n = res.data.share;

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

    registerEvent: function registerEvent() {
        this.canvas.on(cc.Node.EventType.TOUCH_START, this.touchStart.bind(this), this.node);
        this.canvas.on(cc.Node.EventType.TOUCH_END, this.touchEnd.bind(this), this.node);
        this.canvas.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel.bind(this), this.node);
        // console.log("on");
    },
    unregisterEvent: function unregisterEvent() {
        this.canvas.targetOff(this.node);
        // console.log("off");
    },
    update: function update(dt) {

        // console.log(dt);
        if (this.stickLengthen) {
            this.stick.height += dt * this.stickSpeed;
            // this.stick.height = this.currentLandRange + this.secondLand.width/2;
        }
    },
    touchStart: function touchStart(event) {
        fsm.stickLengthen();

        // 棍子变长音效
        if (cc.sys.localStorage.getItem('yinx') != '0') {
            this.paoAudioPlay();
        }

        // cc.log("touchStart");
    },
    touchEnd: function touchEnd(event) {
        fsm.heroTick();

        // 关闭 棍子变长音效
        this.paoAudioPause();
        // cc.log("touchEnd");
    },
    touchCancel: function touchCancel() {
        this.touchEnd();
        // cc.log("touchCancel");
    },


    // 人物掉落
    stickAndHeroDownAction: function stickAndHeroDownAction(callFunc) {
        //stick down action;
        var stickAction = cc.rotateBy(0.5, 90);
        stickAction.easing(cc.easeIn(3));
        this.stick.runAction(stickAction);
        //hero down action;
        var heroAction = cc.moveBy(0.5, cc.p(0, -300 - this.hero.height));
        heroAction.easing(cc.easeIn(3));
        var seq = cc.sequence(heroAction, callFunc);
        this.hero.runAction(seq);
    },
    heroMove: function heroMove(target, data) {
        var time = data.length / this.heroMoveSpeed;
        var heroMove = cc.moveBy(time, cc.p(data.length, 0));
        if (data.callFunc) {
            var se = cc.sequence(heroMove, data.callFunc);
            this.hero.runAction(se);
        } else {
            this.hero.runAction(heroMove);
        }
    },
    landCreateAndMove: function landCreateAndMove(callFunc) {
        var winSize = cc.director.getWinSize();
        //firstland;
        var length = this.currentLandRange + this.secondLand.width;
        this.runLength += length;
        var action = cc.moveBy(this.moveDuration, cc.p(-length, 0));
        this.node.runAction(action);
        this.firstLand = this.secondLand;

        this.createNewLand();
        // console.log('xx');

        var that = this;
        cc.loader.loadRes('hero/hero.png', cc.SpriteFrame, function (err, spriteFrame) {
            that.hero.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });

        //landRange
        var range = this.getLandRange();

        //secondland;
        this.secondLand.setPosition(this.runLength + winSize.width, 0);
        var l = winSize.width - range - this.heroWorldPosX - this.hero.width * this.hero.anchorX - this.stickWidth;

        // console.log('llll = '+l);

        var secondAction = cc.moveBy(this.moveDuration, cc.p(-l, 0));
        var seq = cc.sequence(secondAction, callFunc);
        this.secondLand.runAction(seq);
    },
    createStick: function createStick() {
        // 初始化创建棍子
        var stick = spriteCreator.createStick(this.stickWidth);
        stick.width = 4;
        stick.parent = this.node;
        return stick;
    },


    // 生成道路
    createNewLand: function createNewLand() {
        this.secondLand = spriteCreator.createNewLand(this.getLandWidth());
        this.secondLand.parent = this.node;
    },
    getScore: function getScore(num) {
        if (num) {
            this.score += num * 10; //this.score += num;  
        } else {
            this.score += 10; //this.score++;
        }
        if (storageManager.getHighestScore() < this.score) {
            storageManager.setHighestScore(this.score);
            this.changeHightestScoreLabel();
        }

        // this.scoreLabel.string = "得分："+this.score;
        this.scoreLabel.string = this.score;

        Win_Global.gx_score = this.score;
    },
    changeHightestScoreLabel: function changeHightestScoreLabel() {
        this.hightestScoreLabel.string = "最高分：" + storageManager.getHighestScore();
    },
    getLandRange: function getLandRange() {
        this.currentLandRange = this.landRange.x + (this.landRange.y - this.landRange.x) * Math.random();
        var winSize = cc.director.getWinSize();
        if (winSize.width < this.currentLandRange + this.heroWorldPosX + this.hero.width + this.secondLand.width) {
            this.currentLandRange = winSize.width - this.heroWorldPosX - this.hero.width - this.secondLand.width;
        }
        return this.currentLandRange;
    },


    // 随机生成柱子的宽度
    getLandWidth: function getLandWidth() {

        // cc.log('x = ' + this.landWidth.x);

        // cc.log('y = ' + this.landWidth.y);

        // cc.log('w = ' + (this.landWidth.y - this.landWidth.x));
        var randFloat;

        if (Win_Global.game_status == 1) {
            randFloat = Win_Global.rand_en / 3 + Math.random() * Win_Global.rand_en;
        } else {
            randFloat = Win_Global.rand[nandu_id] / 2 + Math.random() * Win_Global.rand[nandu_id];
        }

        return this.landWidth.x + (this.landWidth.y - this.landWidth.x) * randFloat;
    },


    // 游戏通关 
    gameEndFunc: function gameEndFunc(score, status) {
        if (Win_Global.isWx == 1) {
            wx.showLoading({ title: '成绩上报中...' });
        }

        var that = this;
        cc.log(Win_Global.token + '  ' + score + '    ' + status);

        Win_Global.ajaxPost(Win_Global.path + '/answer.php', {
            'action': 'game_over',
            'token': Win_Global.token,
            'score': score,
            'status': 1,
            'stime': Date.parse(new Date()).toString().substr(0, 10)
        }, function (res) {
            // console.log(res);
            cc.log('通关，上传成绩');

            var bkqTel = cc.sys.localStorage.getItem('bkqTel');
            // console.log('我的手机号：'+bkqTel);

            that.endLabel.node.active = true;
            that.endScore.string = Win_Global.gx_score + '分';

            if (res.code == 1) {
                if (res.data.prize > 0) {
                    that.showBkqAnimateFunc();

                    // 手机号
                    if (!bkqTel) {
                        that.telLayer.active = true;
                    }

                    if (Win_Global.isWx == 1) {
                        wx.showToast({ title: '审核成功后三天内发放至您的贝壳账户，感谢您的参与！', icon: 'none', duration: 5000 });
                    }

                    cc.find('pass/gxnbkq/bkq', that.endLabel.node).getComponent(cc.Label).string = res.data.prize;
                    cc.find('pass/gxnbkq', that.endLabel.node).active = true;
                } else {
                    cc.find('pass/gxnbkq', that.endLabel.node).active = false;
                }
            } else {
                cc.find('pass/gxnbkq', that.endLabel.node).active = false;
            }

            if (Win_Global.isWx == 1) {
                wx.hideLoading();
            }
        }, function (fail) {
            console.log(fail);
        }, function (error) {
            console.log(error);
        });
    },

    // 上报成绩 （无尽模式）
    geiveBkqLessFunc: function geiveBkqLessFunc(score) {
        var that = this;
        Win_Global.ajaxPost(Win_Global.path + '/share.php', {
            'action': 'endless_game_over',
            'token': Win_Global.token,
            'score': score,
            'stime': Date.parse(new Date()).toString().substr(0, 10)
        }, function (res) {
            // console.log(res);
            console.log('上报成绩 （无尽模式） 成功！');
        }, function (fail) {
            console.log(fail);
        }, function (error) {
            console.log(error);
        });
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

    // 游戏失败 选择复活方式
    selectFhTypeFunc: function selectFhTypeFunc(e, data) {
        // cc.log(data);
        var that = this;

        this.bgAudioPause();

        Win_Global.jl_score = Win_Global.gx_score;
        Win_Global.jl_run_num = Win_Global.gx_run_num;

        // 答题
        if (data == 1) {
            if (that.ans_sy_n > 0) {
                this.overLabel.active = false;
                this.ans.active = true;
                this.showAnsListInfoFunc();
            } else {
                wx.showToast({
                    title: '答题复活次数已用完，请尝试其他方式！',
                    icon: 'none',
                    duration: 2000
                });
            }
        }
        // 看广告
        else if (data == 2) {
                if (that.adv_sy_n > 0) {

                    that.overLabel.active = false;

                    if (Win_Global.isWx == 1) {
                        wx.showLoading({ title: '视频加载中...' });
                    }

                    /*that.video.active = true;
                     cc.find('text',that.video).getComponent(cc.Label).string = '广告视频还剩：10 s';
                     // 10s后关闭视频
                    var vTime = Win_Global.v_time;
                     that.callback = function () 
                    {
                         vTime --;
                         cc.log('广告视频还剩：'+vTime+' s');
                         cc.find('text',that.video).getComponent(cc.Label).string = '广告视频还剩：'+vTime+' s';
                         if ( vTime <= 0) 
                        {
                            // 看完视频后记录
                            that.adverOkFunc();
                            // 停止计时器
                            that.unschedule(that.callback);
                            // 隐藏视频盒子
                            that.video.active = false;
                            // 复活游戏
                            fsm.restart();
                         }
                     }
                     that.schedule(that.callback, 1);*/

                    if (Win_Global.isWx == 1) {
                        var v = wx.createVideo();
                        v.src = 'https://www.oneh5.com/thq/201871/mp4/' + Math.floor(Math.random() * 12 + 1) + '.mp4';
                        v.width = wx.getSystemInfoSync().windowWidth;
                        v.height = wx.getSystemInfoSync().windowHeight;
                        // v.poster = 'https://oneh5.com/thq/FLH/backend_api/images/upload/20180709/blockcard3.png';
                        v.controls = false;
                        v.autoplay = true;
                        v.loop = false;
                        // v.requestFullScreen();

                        if (Win_Global.isWx == 1) {
                            wx.hideLoading();
                        }
                        v.play();

                        v.onWaiting = function (res) {
                            // console.log(res);
                            wx.showLoading({ title: '视频加载中...' });
                        };

                        v.onended = function (argument) {
                            // console.log('视频播放完了');
                            v.exitFullScreen();
                            v.stop();
                            v.width = 0;
                            v.height = 0;

                            // 看完视频后记录
                            that.adverOkFunc();
                            // 复活游戏
                            fsm.restart();
                        };
                    }
                } else {
                    wx.showToast({
                        title: '视频广告复活次数已用完，请尝试其他方式！',
                        icon: 'none',
                        duration: 2000
                    });
                }
            }

            // 分享
            else if (data == 3) {

                    if (that.share_sy_n <= 0) {
                        wx.showToast({
                            title: '分享复活次数已用完，分享后将不能复活游戏',
                            icon: 'none',
                            duration: 2000
                        });
                    }

                    var share_n = Math.floor(Math.random() * 10 + 1);

                    wx.shareAppMessage({
                        title: '@' + Win_Global.nickname + ' 走了' + share_n * 100 + '公里，邀请你快来和我一起重走长征路吧！',
                        imageUrl: 'https://www.oneh5.com/LJ/game71/share/share' + share_n + '.png',
                        success: function success(res) {
                            // console.log("转发成功!!!")

                            if (that.share_sy_n > 0) {
                                that.shareOkFunc();
                                fsm.restart();
                            }
                        },
                        fail: function fail(res) {
                            console.log("转发失败!!!");
                        }
                    });
                }
    },

    // 视频观看完成之后执行
    adverOkFunc: function adverOkFunc() {
        var that = this;

        Win_Global.ajaxPost(Win_Global.path + '/answer.php?action=get_adver', {
            'action': 'get_adver',
            'token': Win_Global.token
        }, function (res) {
            // console.log(res);
            if (res.code == 1) {
                console.log('视频观看完后记录');
            }
        }, function (fail) {
            console.log(fail);
        }, function (error) {
            console.log(error);
        });
    },

    // 邀请好友
    shareOkFriendsFunc: function shareOkFriendsFunc() {},

    // 转发成功后执行复活
    shareOkFunc: function shareOkFunc() {
        var that = this;

        Win_Global.ajaxPost(Win_Global.path + 'answer.php', {
            'action': 'share_log',
            'token': Win_Global.token
        }, function (res) {
            if (res.code == 1) {
                console.log('转发成功后记录');
            }
        }, function (fail) {
            console.log(fail);
        }, function (error) {
            console.log(error);
        });
    },

    // 答题倒计时
    ansTimeFunc: function ansTimeFunc() {

        var that = this;

        // 10s后答题失败
        var vTime = Win_Global.ansTime;

        this.callback = function () {
            that.ans_time.string = vTime;

            if (vTime <= 0) {
                vTime = 0;

                this.unschedule(this.callback);
                that.ans_err_num++;

                that.unscheduleAllCallbacks();

                // cc.find('ans_err',that.ans).runAction( cc.fadeIn(0.1) );

                if (that.ans_err_num < Win_Global.ans_max_err_num) {
                    // 超时 答案渐显
                    // cc.find('ans_err/text',that.ans).getComponent(cc.Label).string = '超时，继续答题！';
                    if (Win_Global.isWx == 1) {
                        wx.showToast({ title: '超时，继续答题！', icon: 'none', duration: 5000 });
                    }

                    setTimeout(function () {
                        cc.find('title', that.ans).runAction(cc.fadeOut(0.1));
                        cc.find('ansList', that.ans).runAction(cc.fadeOut(0.1));
                        that.showAnsListInfoFunc();
                    }, 5000);
                }

                // 连续答错5题  游戏结束
                else {
                        // cc.find('ans_err/text',that.ans).getComponent(cc.Label).string = '答题连错'+Win_Global.ans_max_err_num+'题，很遗憾，游戏结束！';
                        if (Win_Global.isWx == 1) {
                            wx.showToast({ title: '答题连错' + Win_Global.ans_max_err_num + '题，很遗憾，游戏结束！', icon: 'none', duration: 5000 });
                        }

                        setTimeout(function () {
                            that.goHomeFunc();
                        }, 5000);
                    }
            }

            vTime--;
        };

        this.schedule(this.callback, 1);
    },

    // 获取答题列表
    showAnsListInfoFunc: function showAnsListInfoFunc() {
        var that = this;

        if (Win_Global.isWx == 1) {
            wx.showLoading({ title: '正在获取题目...' });
        }

        // 停止所有计时器
        that.unscheduleAllCallbacks();

        // cc.find('ans_err',that.ans).runAction( cc.fadeOut(0.1) ); 


        // 答案样式恢复默认
        cc.loader.loadRes('page_img/btn_g21.png', cc.SpriteFrame, function (err, spriteFrame) {
            for (var i = 1; i <= 4; i++) {
                cc.find('ansList/ansBtn' + i, that.ans).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                cc.find('ansList/ansBtn' + i + '/ans_text', that.ans).color = new cc.Color(0, 0, 0, 255);
                cc.find('ansList/ansBtn' + i, that.ans).getComponent(cc.Button).interactable = true;
            }
        });

        Win_Global.ajaxPost(Win_Global.path + '/answer.php', {
            'action': 'topic',
            'token': Win_Global.token
        }, function (res) {
            if (res.code == 1) {
                // 开始倒计时
                that.ans_time.string = 99;
                that.ansTimeFunc();

                // 答案渐显
                cc.find('title', that.ans).runAction(cc.fadeIn(0.1));
                cc.find('ansList', that.ans).runAction(cc.fadeIn(0.1));

                cc.find('title', that.ans).getComponent(cc.Label).string = res.data.topic;
                cc.find('ansList/ansBtn1/ans_text', that.ans).getComponent(cc.Label).string = res.data.answer1;
                cc.find('ansList/ansBtn2/ans_text', that.ans).getComponent(cc.Label).string = res.data.answer2;
                cc.find('ansList/ansBtn3/ans_text', that.ans).getComponent(cc.Label).string = res.data.answer3;
                cc.find('ansList/ansBtn4/ans_text', that.ans).getComponent(cc.Label).string = res.data.answer4;

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

    // 选择答案
    selectAnsFunc: function selectAnsFunc(e, data) {
        var that = this;

        // 选择后改变字体颜色
        cc.find('ansList/ansBtn' + data + '/ans_text', that.ans).color = new cc.Color(181, 31, 36, 255);

        // 选择后禁用按钮
        for (var i = 1; i <= 4; i++) {
            cc.find('ansList/ansBtn' + i, that.ans).getComponent(cc.Button).interactable = false;
        }

        Win_Global.ajaxPost(Win_Global.path + '/answer.php', {
            'action': 'topic_answer',
            'token': Win_Global.token,
            'user_answer': data
        }, function (res) {
            that.unscheduleAllCallbacks();
            // console.log(res);
            if (res.code == 1) {
                // 选择正确
                if (res.data.success == 1) {
                    cc.log('答题成功！');
                    // 答题成功样式
                    cc.loader.loadRes('page_img/ans_ok.png', cc.SpriteFrame, function (err, spriteFrame) {
                        cc.find('ansList/ansBtn' + data, that.ans).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });

                    setTimeout(function () {
                        that.ans.active = false;
                        fsm.restart();
                    }, 2000);
                }

                // 选择错误
                else if (res.data.success == 2) {

                        that.ans_err_num++;
                        cc.log(that.ans_err_num);

                        // 答题错误样式
                        cc.loader.loadRes('page_img/ans_fail.png', cc.SpriteFrame, function (err, spriteFrame) {
                            cc.find('ansList/ansBtn' + data, that.ans).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });

                        // 显示正确答案
                        cc.loader.loadRes('page_img/ans_ok.png', cc.SpriteFrame, function (err, spriteFrame) {
                            cc.find('ansList/ansBtn' + res.data.bingo, that.ans).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        });

                        // cc.find('ans_err',that.ans).runAction( cc.fadeIn(0.1) );


                        if (that.ans_err_num < Win_Global.ans_max_err_num) {
                            // 选择错误 答案渐显
                            // cc.find('ans_err/text',that.ans).getComponent(cc.Label).string = '选择错误，继续答题！';

                            if (Win_Global.isWx == 1) {
                                wx.showToast({ title: '选择错误，继续答题！', icon: 'none', duration: 5000 });
                            }

                            setTimeout(function () {
                                cc.find('title', that.ans).runAction(cc.fadeOut(0.1));
                                cc.find('ansList', that.ans).runAction(cc.fadeOut(0.1));
                                that.showAnsListInfoFunc();
                            }, 5000);
                        }

                        // 连续答错5题  游戏结束
                        else {
                                // cc.find('ans_err/text',that.ans).getComponent(cc.Label).string = '答题连错'+Win_Global.ans_max_err_num+'题，很遗憾，游戏结束！';

                                if (Win_Global.isWx == 1) {
                                    wx.showToast({ title: '答题连错' + Win_Global.ans_max_err_num + '题，很遗憾，游戏结束！', icon: 'none', duration: 5000 });
                                }

                                setTimeout(function () {
                                    that.goHomeFunc();
                                }, 5000);
                            }
                    }
            }
        }, function (fail) {
            console.log(fail);
        }, function (error) {
            console.log(error);
        });
    },

    // 关闭视频广告
    closeVideoFunc: function closeVideoFunc(e, data) {
        cc.log(data);
        cc.log('xxkkkk');
    },

    // 结束游戏 回到主页面
    goHomeFunc: function goHomeFunc() {
        Win_Global.gx_score = 0;
        Win_Global.jl_score = 0;

        Win_Global.gx_run_num = 0;
        Win_Global.jl_run_num = 0;

        this.bgAudioPause();
        cc.director.loadScene("page");

        Win_Global.cbk_nav = 1;
    },

    // 贝壳券动画
    showBkqAnimateFunc: function showBkqAnimateFunc() {
        var that = this;

        that.show_bkq.runAction(cc.spawn(cc.scaleTo(.5, 1, 1), cc.fadeTo(.5, 255)));

        this.count = 0;
        this.callback = function () {
            if (this.count >= 35) {
                this.unschedule(this.callback);
                that.show_bkq.runAction(cc.fadeTo(.3, 0));
            }

            cc.find('bg', that.show_bkq).rotation += 10;
            this.count++;
        };
        that.schedule(this.callback, 0.07);
    },

    // 点击游戏页面 去主页，二次确认
    isGoHomeFunc: function isGoHomeFunc() {
        var that = this;

        that.Alert.active = true;

        cc.find('box/text', that.Alert).getComponent(cc.Label).string = '确定回到主页吗？';

        cc.find('box', that.Alert).runAction(cc.spawn(cc.scaleTo(0.1, 1, 1), cc.fadeTo(0.1, 255)));

        // 点击确定
        cc.find('box/ok', that.Alert).on('click', function () {
            that.goHomeFunc();
        });

        cc.find('box/qux', that.Alert).on('click', function () {
            cc.find('box', that.Alert).runAction(cc.spawn(cc.scaleTo(0.1, 1.2, 1.2), cc.fadeTo(0.1, 0)));
            setTimeout(function () {
                that.Alert.active = false;
            }, 100);
        });
    },

    // 分享到朋友圈
    shareZoneFunc: function shareZoneFunc() {
        var that = this;
        // wx.showLoading({title:'专属二维码生成中...'});

        /*Win_Global.ajaxPost(
            Win_Global.path+'/user.php',
            {
                'action':'share_img',
                'token':Win_Global.token
            },
            function(res)
            {   console.log(res.data.img_url);
                if( res.code == 1 )
                {*/
        var scene = cc.director.getScene();
        var node = cc.instantiate(that.shareImg);

        node.parent = scene;

        cc.loader.load({ url: 'https://www.oneh5.com/yjl/party_answer/front_api/api/../images/qrcode/share_fa971ce35c0c799d.png', type: 'png' }, function (err, texture) {
            node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        });

        node.runAction(cc.sequence(cc.scaleTo(1, 0.2), cc.moveTo(.6, cc.p(640 * 0.76, 960 * 0.1))));
        setTimeout(function () {
            node.runAction(cc.fadeTo(.5, 0));
        }, 2800);

        setTimeout(function () {
            node.destroy();
        }, 3500);

        // setTimeout(function(){


        wx.downloadFile({
            url: 'https://www.oneh5.com/yjl/party_answer/front_api/api/../images/qrcode/share_fa971ce35c0c799d.png',
            success: function success(res) {
                console.log('保存图片到本地');
                console.log(res);
                var path = res.tempFilePath;
                wx.saveImageToPhotosAlbum({
                    filePath: path,
                    success: function success(res) {
                        wx.showToast({
                            title: '已将你的专属二维码保存到相册中，现在可以去发朋友圈了哦',
                            icon: 'none',
                            duration: 2000
                        });

                        that.shareImg.runAction(cc.scaleTo(0, 1));

                        console.log('保存图片到本地1');
                        console.log('已将你的专属二维码保存到相册中，现在可以去发朋友圈了哦');
                        console.log(res);
                    },
                    fail: function fail(res) {
                        console.log('保存图片到本地2');
                        console.log(res);
                    },
                    complete: function complete(res) {
                        console.log('保存图片到本地3');
                        console.log(res);
                    }
                });
            },
            fail: function fail(res) {
                console.log('保存图片到本地0');
                console.log(res);
            }
        });

        // },2000)
        /*}
        },
        function( fail ){console.log(fail);},
        function( error ){console.log(error);}
        );*/
    },

    // 
    shareZoneFunc2: function shareZoneFunc2() {
        /*var that = this;
        Win_Global.ajaxPost(
            Win_Global.path+'/user.php',
            {
                'action': 'share_img',
                'token': Win_Global.token
            },
            function(res)
            {   
                if( res.code == 1 )
                {
                    var uls = [ res.data.img_url ];
                    wx.previewImage({
                        current: res.data.img_url,
                        urls: uls
                    })
                }
            },
            function( fail ){console.log(fail);},
            function( error ){console.log(error);}
        );*/

        var uls = ['https://www.oneh5.com/yjl/party_answer/front_api/api/../images/qrcode/share_fa971ce35c0c799d.png'];
        wx.previewImage({
            current: 'https://www.oneh5.com/yjl/party_answer/front_api/api/../images/qrcode/share_fa971ce35c0c799d.png',
            urls: uls
        });
    },

    // 测试识别二维码
    shareZoneFunc3: function shareZoneFunc3() {
        var uls = ['https://www.oneh5.com/LJ/bkEWM.png'];
        wx.previewImage({
            current: 'https://www.oneh5.com/LJ/bkEWM.png',
            urls: uls
        });
    },

    // 跳外部查看贝壳券
    goToBkqOutFunc: function goToBkqOutFunc() {
        // if( Win_Global.isWx == 1 ){ wx.showToast({title:'跳转到外部查看贝壳券数量',icon: 'none'}); }
        window.location.href = 'https://bk.189store.com/h5/user/base?bk_tel=' + Win_Global.token;
    }

});

module.exports = fsm;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=landMaker.js.map
        