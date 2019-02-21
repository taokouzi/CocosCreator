require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = "function" == typeof require && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, l, l.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof require && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  backgroundLoader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1ba569pWT1NW4FvgybtQ/YJ", "backgroundLoader");
    "use strict";
    var page = require("page");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        cc.log("我选择的关卡 = " + Win_Global.mySelectLv);
        var bgSprite = this.node.getComponent(cc.Sprite);
        1 == Win_Global.isWx && wx.showLoading({
          title: "场景加载中..."
        });
        cc.loader.load({
          url: "http://www.oneh5.com/LJ/game71/bg/bg" + Win_Global.mySelectLv + ".png",
          type: "png"
        }, function(err, texture) {
          bgSprite.spriteFrame = new cc.SpriteFrame(texture);
          1 == Win_Global.isWx && wx.hideLoading();
        });
      }
    });
    cc._RF.pop();
  }, {
    page: "page"
  } ],
  bkqList: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8874h+gtJAMqFYdQ8HudjK", "bkqList");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        bkq_num: cc.Label,
        bkq_rank: cc.Label,
        bkq_id: null
      },
      start: function start() {},
      init: function init(data) {
        var that = this;
        cc.log(data);
        that.bkq_num.string = data.bkq_num + "贝壳券";
      },
      giveBkqFunc: function giveBkqFunc() {}
    });
    cc._RF.pop();
  }, {} ],
  btn: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2da0dBTR9tDEoDKa8CshNX4", "btn");
    "use strict";
    var fsm = require("landMaker");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      buttonClicked: function buttonClicked() {
        fsm.restart();
      },
      gameStart: function gameStart() {
        Win_Global.gx_score = 0;
        Win_Global.jl_score = 0;
        Win_Global.gx_run_num = 0;
        Win_Global.jl_run_num = 0;
        Win_Global.isGoHomeBtn = 0;
        cc.director.loadScene("MainGameScene");
        fsm.restart();
      }
    });
    cc._RF.pop();
  }, {
    landMaker: "landMaker"
  } ],
  config: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "021616saVZENJ/7kPccaIyc", "config");
    "use strict";
    window.Win_Global = {
      select_team_id: 0,
      select_team_name: null,
      myMaxLv: 3,
      mySelectLv: 1,
      run_num: {
        "1": 3,
        "2": 5,
        "3": 9
      },
      rand: {
        "1": .5,
        "2": .3,
        "3": .22
      },
      rand_en: .4,
      nandu_id: 1,
      is_team: 0,
      gx_score: 0,
      jl_score: 0,
      gx_run_num: 0,
      jl_run_num: 0,
      game_status: 1,
      ans_max_err_num: 5,
      myNandu: 1,
      v_time: 10,
      ansTime: 99,
      isWx: 1,
      token: "",
      nickname: null,
      avatarUrl: null,
      cbk_nav: 0,
      path: "https://www.oneh5.com/yjl/rod_hero/api/",
      isGoHomeBtn: 0,
      token_name: "RedStar_token9",
      avatarUrl_name: "avatarUrl9",
      nickName_name: "nickName9",
      telReg: /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      codeReg: /^\d{6}$/,
      backgroundLoader: [ 30, 100, 150, 200, 250, 300 ],
      sendCode: false,
      configFunc: function configFunc() {
        cc.log(" window function ");
      },
      ajaxPost: function ajaxPost(url, data, fnSucceed, fnFail, fnLoading) {
        data = function(value) {
          var oStr = "";
          for (var key in value) oStr += key + "=" + value[key] + "&";
          return oStr;
        }(data);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          4 == xhr.readyState ? 200 == xhr.status ? fnSucceed(JSON.parse(xhr.responseText)) : fnFail("HTTP请求错误！错误码：" + xhr.status) : fnLoading("就绪状态：" + xhr.readyState);
        };
        xhr.open("post", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);
      },
      get_code: function get_code(tel, codeBtnLabel) {
        if (!Win_Global.sendCode) if (Win_Global.telReg.test(tel)) {
          1 == Win_Global.isWx && wx.showLoading({
            title: "发送中..."
          });
          Win_Global.sendCode = true;
          Win_Global.ajaxPost(Win_Global.path + "msg_validata.php", {
            action: "get_code",
            token: Win_Global.token,
            tel: tel,
            stime: Date.parse(new Date()).toString().substr(0, 10)
          }, function(res) {
            1 == Win_Global.isWx && wx.hideLoading();
            if (1 == res.code || 9004 == res.code) {
              1 == Win_Global.isWx && wx.showToast({
                title: "发送成功",
                icon: "success"
              });
              var times = 60;
              var intervalId = setInterval(function() {
                times--;
                codeBtnLabel.getComponent(cc.Label).string = times + "s";
                if (times <= 0) {
                  clearInterval(intervalId);
                  codeBtnLabel.getComponent(cc.Label).string = "获取验证码";
                  Win_Global.sendCode = false;
                }
              }, 1e3);
            } else if (9002 == res.code) {
              1 == Win_Global.isWx ? wx.showToast({
                title: "号码重复",
                icon: "none"
              }) : console.log("号码重复");
              Win_Global.sendCode = false;
            } else {
              1 == Win_Global.isWx ? wx.showToast({
                title: "系统异常，请稍后再试哦",
                icon: "none"
              }) : console.log("系统异常，请稍后再试哦");
              Win_Global.sendCode = false;
            }
          }, function(fail) {
            console.log(fail);
          }, function(error) {
            console.log(error);
          });
        } else 1 == Win_Global.isWx ? wx.showToast({
          title: "手机号码验证错误！（" + tel + "）",
          icon: "none"
        }) : console.log("手机号码验证错误！（" + tel + "）");
      },
      bind_tel: function bind_tel(tel, telLayer, code) {
        if (!Win_Global.telReg.test(tel)) {
          1 == Win_Global.isWx ? wx.showToast({
            title: "手机号码验证错误！（" + tel + "）",
            icon: "none"
          }) : console.log("手机号码验证错误！（" + tel + "）");
          return false;
        }
        if (!Win_Global.codeReg.test(code)) {
          1 == Win_Global.isWx ? wx.showToast({
            title: "验证码错误！！（" + code + "）",
            icon: "none"
          }) : console.log("验证码错误！！（" + code + "）");
          return false;
        }
        Win_Global.ajaxPost(Win_Global.path + "msg_validata.php", {
          action: "validata_code",
          token: Win_Global.token,
          tel: tel,
          code: code
        }, function(res) {
          1 == res.code ? telLayer.active = false : 1 == Win_Global.isWx ? wx.showToast({
            title: "系统异常，请稍后再试哦",
            icon: "none"
          }) : console.log("系统异常，请稍后再试哦");
          cc.sys.localStorage.setItem("bkqTel", tel);
        }, function(fail) {
          console.log(fail);
        }, function(error) {
          console.log(error);
        });
      }
    };
    cc._RF.pop();
  }, {} ],
  giftList: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a6a36Ju8f5H3qLzKmRarjQy", "giftList");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        gf_img: cc.Node,
        gf_name: cc.Label,
        task_id: null
      },
      start: function start() {},
      init: function init(data) {
        var that = this;
        "1" == data.gf_status ? cc.loader.loadRes("page_img/jiangba.png", cc.SpriteFrame, function(err, spriteFrame) {
          that.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }) : "2" == data.gf_status ? cc.loader.loadRes("page_img/jiangb.png", cc.SpriteFrame, function(err, spriteFrame) {
          that.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }) : "3" == data.gf_status && cc.loader.loadRes("page_img/jiangbb.png", cc.SpriteFrame, function(err, spriteFrame) {
          that.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        that.gf_name.string = data.gf_name;
        that.task_id = data.gf_id;
      },
      giveGfFunc: function giveGfFunc() {
        cc.log("000");
      }
    });
    cc._RF.pop();
  }, {} ],
  landMaker: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d0079DKriBNl693joESFHLy", "landMaker");
    "use strict";
    var spriteCreator = require("spriteCreator");
    var perfectLabel = require("perfectLabel");
    var storageManager = require("storageManager");
    var StateMachine = require("state-machine");
    var fsm = new StateMachine({
      data: {
        gameDirector: null
      },
      init: "stand",
      transitions: [ {
        name: "stickLengthen",
        from: "stand",
        to: "stickLengthened"
      }, {
        name: "heroTick",
        from: "stickLengthened",
        to: "heroTicked"
      }, {
        name: "stickFall",
        from: "heroTicked",
        to: "stickFalled"
      }, {
        name: "heroMoveToLand",
        from: "stickFalled",
        to: "heroMovedToLand"
      }, {
        name: "landMove",
        from: "heroMovedToLand",
        to: "stand"
      }, {
        name: "heroMoveToStickEnd",
        from: "stickFalled",
        to: "heroMovedToStickEnd"
      }, {
        name: "heroDown",
        from: "heroMovedToStickEnd",
        to: "heroDowned"
      }, {
        name: "gameOver",
        from: "heroDowned",
        to: "end"
      }, {
        name: "restart",
        from: "end",
        to: "stand"
      } ],
      methods: {
        onLeaveHeroTicked: function onLeaveHeroTicked() {
          gameDirector.unregisterEvent();
        },
        onStickLengthen: function onStickLengthen() {
          Win_Global.isGoHomeBtn = 1;
          gameDirector.stickLengthen = true;
          gameDirector.stick = gameDirector.createStick();
          gameDirector.stick.x = gameDirector.hero.x + gameDirector.hero.width * (1 - gameDirector.hero.anchorX) + gameDirector.stick.width * gameDirector.stick.anchorX;
          var ani = gameDirector.hero.getComponent(cc.Animation);
          ani.play("heroPush");
        },
        onHeroTick: function onHeroTick() {
          Win_Global.isGoHomeBtn = 2;
          gameDirector.stickLengthen = false;
          var ani = gameDirector.hero.getComponent(cc.Animation);
          ani.play("heroTick");
        },
        onStickFall: function onStickFall() {
          Win_Global.isGoHomeBtn = 3;
          var stickFall = cc.rotateBy(.2, 90);
          stickFall.easing(cc.easeIn(3));
          var callFunc = cc.callFunc(function() {
            var stickLength = gameDirector.stick.height - gameDirector.stick.width * gameDirector.stick.anchorX;
            if (stickLength < gameDirector.currentLandRange || stickLength > gameDirector.currentLandRange + gameDirector.secondLand.width) fsm.heroMoveToStickEnd(); else {
              fsm.heroMoveToLand();
              if (stickLength > gameDirector.currentLandRange + gameDirector.secondLand.width / 2 - 5 && stickLength < gameDirector.currentLandRange + gameDirector.secondLand.width / 2 + 5) {
                gameDirector.perfect++;
                gameDirector.getScore(gameDirector.perfect);
                var pl = gameDirector.perfectLabel.getComponent(perfectLabel);
                pl.showPerfect(gameDirector.perfect);
              } else gameDirector.perfect = 0;
            }
          });
          var se = cc.sequence(stickFall, callFunc);
          gameDirector.stick.runAction(se);
        },
        onHeroMoveToLand: function onHeroMoveToLand() {
          Win_Global.isGoHomeBtn = 4;
          "0" != cc.sys.localStorage.getItem("yinx") && gameDirector.woodAudioPlay();
          var ani = gameDirector.hero.getComponent(cc.Animation);
          var callFunc = cc.callFunc(function() {
            ani.stop("heroRun");
            gameDirector.getScore();
            fsm.landMove();
          });
          ani.play("heroRun");
          gameDirector.heroMove(gameDirector.hero, {
            length: gameDirector.currentLandRange + gameDirector.secondLand.width,
            callFunc: callFunc
          });
        },
        onLandMove: function onLandMove() {
          Win_Global.isGoHomeBtn = 5;
          run_start++;
          Win_Global.gx_run_num = run_start;
          gameDirector.runRange.string = "距胜利还差 " + (run_num[nandu_id] - run_start) + " 步";
          if (run_start >= run_num[nandu_id] && 0 == Win_Global.game_status) {
            "0" != cc.sys.localStorage.getItem("yinx") && gameDirector.successAudioPlay();
            gameDirector.gameEndFunc(Win_Global.gx_score, 1);
          } else {
            var callFunc = cc.callFunc(function() {
              gameDirector.registerEvent();
            });
            gameDirector.landCreateAndMove(callFunc);
            if (1 == Win_Global.game_status) {
              var num = 1;
              Win_Global.gx_score >= Win_Global.backgroundLoader[0] && Win_Global.gx_score < Win_Global.backgroundLoader[1] ? num = 2 : Win_Global.gx_score >= Win_Global.backgroundLoader[1] && Win_Global.gx_score < Win_Global.backgroundLoader[2] ? num = 3 : Win_Global.gx_score >= Win_Global.backgroundLoader[2] && Win_Global.gx_score < Win_Global.backgroundLoader[3] ? num = 4 : Win_Global.gx_score >= Win_Global.backgroundLoader[3] && Win_Global.gx_score < Win_Global.backgroundLoader[4] ? num = 5 : Win_Global.gx_score >= Win_Global.backgroundLoader[4] && Win_Global.gx_score < Win_Global.backgroundLoader[5] ? num = 6 : Win_Global.gx_score >= Win_Global.backgroundLoader[5] && (num = 7);
              gameDirector.backgroundLoader(num);
            }
          }
        },
        onHeroMoveToStickEnd: function onHeroMoveToStickEnd() {
          Win_Global.isGoHomeBtn = 6;
          "0" != cc.sys.localStorage.getItem("yinx") && gameDirector.woodAudioPlay();
          var ani = gameDirector.hero.getComponent(cc.Animation);
          var callFunc = cc.callFunc(function() {
            ani.stop("heroRun");
            fsm.heroDown();
          });
          ani.play("heroRun");
          gameDirector.heroMove(gameDirector.hero, {
            length: gameDirector.stick.height,
            callFunc: callFunc
          });
        },
        onHeroDown: function onHeroDown() {
          Win_Global.isGoHomeBtn = 7;
          var callFunc = cc.callFunc(function() {
            fsm.gameOver();
          });
          gameDirector.stickAndHeroDownAction(callFunc);
        },
        onGameOver: function onGameOver() {
          Win_Global.isGoHomeBtn = 8;
          if (0 == Win_Global.game_status) gameDirector.overLabel.active = true; else {
            gameDirector.geiveBkqLessFunc(Win_Global.gx_score);
            gameDirector.overLabel2.active = true;
            cc.find("box/score", gameDirector.overLabel2).getComponent(cc.Label).string = "成绩：" + Win_Global.gx_score + "，游戏结束！";
            cc.find("box", gameDirector.overLabel2).runAction(cc.spawn(cc.scaleTo(.1, 1, 1), cc.fadeTo(.1, 255)));
            cc.find("box/out", gameDirector.overLabel2).on("click", function() {
              gameDirector.goHomeFunc();
            });
            cc.find("box/again", gameDirector.overLabel2).on("click", function() {
              cc.find("box", gameDirector.overLabel2).runAction(cc.spawn(cc.scaleTo(.1, 1.2, 1.2), cc.fadeTo(.1, 0)));
              gameDirector.overLabel2.active = false;
              fsm.restart();
            });
            cc.find("box/share/btn", gameDirector.overLabel2).on("click", function() {
              var share_n = Math.floor(10 * Math.random() + 1);
              wx.shareAppMessage({
                title: "@" + Win_Global.nickname + " 走了" + 100 * share_n + "公里，邀请你快来和我一起重走长征路吧！（邀请好友）",
                imageUrl: "https://www.oneh5.com/LJ/game71/share/share" + share_n + ".png",
                query: "share_t=" + Win_Global.token,
                success: function success(res) {
                  cc.log("点击邀请好友（分享）成功！");
                },
                fail: function fail(res) {
                  console.log("转发失败!!!");
                }
              });
            });
          }
          1 == Win_Global.isWx && wx.showLoading({
            title: "加载中..."
          });
          gameDirector.fialShyNumFunc();
          "0" != cc.sys.localStorage.getItem("yinx") && gameDirector.failAudioPlay();
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
    var nanduArr = [ "简单", "一般", "困难" ];
    cc.Class({
      extends: cc.Component,
      properties: {
        landRange: cc.v2(20, 300),
        landWidth: cc.v2(20, 200),
        hero: cc.Node,
        firstLand: cc.Node,
        secondLand: cc.Node,
        moveDuration: .5,
        stickSpeed: 400,
        heroMoveSpeed: 400,
        stickWidth: 6,
        canvas: cc.Node,
        socre_box: cc.Node,
        scoreLabel: cc.Label,
        hightestScoreLabel: cc.Label,
        overLabel: cc.Node,
        overLabel2: cc.Node,
        perfectLabel: cc.Node,
        endScore: cc.Label,
        endLabel: cc.Label,
        telLayer: cc.Node,
        Alert: cc.Node,
        paoAudio1: cc.AudioSource,
        paoAudio: cc.AudioSource,
        ans: cc.Node,
        ans_time: cc.Label,
        video: cc.Node,
        videoPlayer: cc.VideoPlayer,
        runRange: cc.Label,
        lvName: cc.Label,
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
        gameDirector = this;
        cc.find("box", this.Alert).runAction(cc.spawn(cc.scaleTo(0, 1.2, 1.2), cc.fadeTo(0, 0)));
        if (1 == Win_Global.game_status) {
          this.lvName.node.active = false;
          this.runRange.node.active = false;
          this.socre_box.y = 420;
          this.scoreLabel.node.y = 420;
        } else {
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
        this.score = Win_Global.jl_score;
        this.scoreLabel.string = this.score;
        this.perfect = 0;
        this.currentLandRange = 0;
        this.heroWorldPosX = 0;
        this.changeHightestScoreLabel();
        this.createNewLand();
        var range = this.getLandRange();
        this.heroWorldPosX = this.firstLand.width - (1 - this.hero.anchorX) * this.hero.width - this.stickWidth;
        this.secondLand.setPosition(range + this.firstLand.width, 0);
        this.registerEvent();
        var ani = gameDirector.hero.getComponent(cc.Animation);
        ani.on("stop", function(event) {
          "heroTick" == event.target.name && fsm.stickFall();
        });
        this.runRange.string = "距胜利还差 " + (run_num[nandu_id] - run_start) + " 步";
        var lvs = [ "瑞金", "遵义会议", "四渡赤水", "大渡河", "翻雪山", "过草地", "会师" ];
        this.lvName.string = lvs[Win_Global.mySelectLv - 1];
        var that = this;
        that.endLabel.node.getChildByName("opacity").on(cc.Node.EventType.TOUCH_START, function(e) {
          e.stopPropagation();
        });
        cc.find("opacity", that.telLayer).on(cc.Node.EventType.TOUCH_START, function(e) {
          e.stopPropagation();
        });
        that.overLabel.getChildByName("opacity").on(cc.Node.EventType.TOUCH_START, function(e) {
          e.stopPropagation();
        });
        that.video.on(cc.Node.EventType.TOUCH_START, function(e) {
          e.stopPropagation();
        });
        that.ans.on(cc.Node.EventType.TOUCH_START, function(e) {
          e.stopPropagation();
        });
        that.show_bkq.runAction(cc.spawn(cc.scaleTo(0, .5, .5), cc.fadeTo(0, 0)));
        cc.find("opacity", that.adiLayer).on(cc.Node.EventType.TOUCH_START, function(e) {
          that.adiLayer.active = false;
        });
        cc.find("box", that.adiLayer).on(cc.Node.EventType.TOUCH_START, function(e) {
          e.stopPropagation();
        });
        cc.find("opacity", that.Alert).on(cc.Node.EventType.TOUCH_START, function(e) {
          e.stopPropagation();
        });
        if ("0" == cc.sys.localStorage.getItem("yiny")) {
          that.yiny = 0;
          that.bgAudioPause();
          cc.loader.loadRes("page_img/off.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("box/bgadimg", that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
        } else {
          that.yiny = 1;
          that.bgAudioPlay();
          cc.loader.loadRes("page_img/on.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("box/bgadimg", that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
        }
        if ("0" == cc.sys.localStorage.getItem("yinx")) {
          that.yinx = 0;
          cc.loader.loadRes("page_img/off.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("box/gameimg", that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
        } else {
          that.yinx = 1;
          cc.loader.loadRes("page_img/on.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("box/gameimg", that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
        }
        if (1 == Win_Global.isWx) {
          that.paoAdi = wx.createInnerAudioContext();
          that.paoAdi.src = "https://www.oneh5.com/thq/201871/mp3/pao.mp3";
          that.paoAdi.volume = .8;
          that.paoAdi.loop = true;
        }
      },
      toggleBgAdiFunc: function toggleBgAdiFunc() {
        var that = this;
        if (1 != that.yiny) {
          that.yiny = 1;
          that.bgAudioPlay();
          cc.loader.loadRes("page_img/on.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("box/bgadimg", that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.sys.localStorage.setItem("yiny", "1");
        } else {
          that.yiny = 0;
          that.bgAudioPause();
          cc.loader.loadRes("page_img/off.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("box/bgadimg", that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.sys.localStorage.setItem("yiny", "0");
        }
      },
      toggleGameAdiFunc: function toggleGameAdiFunc() {
        var that = this;
        if (1 != that.yinx) {
          that.yinx = 1;
          that.musicAudioPlay2();
          cc.loader.loadRes("page_img/on.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("box/gameimg", that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.sys.localStorage.setItem("yinx", "1");
        } else {
          that.yinx = 0;
          cc.loader.loadRes("page_img/off.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("box/gameimg", that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.sys.localStorage.setItem("yinx", "0");
        }
      },
      backgroundLoader: function backgroundLoader(num) {
        var bgSprite = this.canvas.getChildByName("bg").getComponent(cc.Sprite);
        cc.loader.load({
          url: "http://www.oneh5.com/LJ/game71/bg/bg" + num + ".png",
          type: "png"
        }, function(err, texture) {
          bgSprite.spriteFrame = new cc.SpriteFrame(texture);
        });
      },
      clickMadeAdiFunc: function clickMadeAdiFunc() {
        var that = this;
        that.adiLayer.active = true;
      },
      musicAudioPlay2: function musicAudioPlay2() {
        this.paoAudio1.play();
      },
      bgAudioPlay: function bgAudioPlay() {
        this.bgAdi = cc.audioEngine.play("https://www.oneh5.com/thq/201871/mp3/bg.mp3", true, .8);
      },
      bgAudioStop: function bgAudioStop() {
        cc.audioEngine.stop(this.bgAdi);
      },
      bgAudioPause: function bgAudioPause() {
        cc.audioEngine.pause(this.bgAdi);
      },
      paoAudioPlay: function paoAudioPlay() {
        this.paoAdi.play();
      },
      paoAudioPause: function paoAudioPause() {
        this.paoAdi.pause();
      },
      woodAudioPlay: function woodAudioPlay() {
        this.gzdzzAdi = cc.audioEngine.play("https://www.oneh5.com/thq/201871/mp3/wood.mp3", false, 1);
      },
      woodAudioPause: function woodAudioPause() {
        cc.audioEngine.pause(this.gzdzzAdi);
      },
      failAudioPlay: function failAudioPlay() {
        this.failAdi = cc.audioEngine.play("https://www.oneh5.com/thq/201871/mp3/failed.mp3", false, 1);
      },
      failAudioPause: function failAudioPause() {
        cc.audioEngine.pause(this.failAdi);
      },
      successAudioPlay: function successAudioPlay() {
        this.successAdi = cc.audioEngine.play("https://www.oneh5.com/thq/201871/mp3/success.mp3", false, 1);
      },
      successAudioPause: function successAudioPause() {
        cc.audioEngine.stop(this.successAdi);
      },
      fialShyNumFunc: function fialShyNumFunc() {
        var that = this;
        Win_Global.ajaxPost(Win_Global.path + "/user.php", {
          action: "left_num",
          token: Win_Global.token
        }, function(res) {
          if (1 == res.code) {
            cc.find("fail/btn1/n", that.overLabel).getComponent(cc.Label).string = res.data.answer;
            cc.find("fail/btn2/n", that.overLabel).getComponent(cc.Label).string = res.data.adver;
            cc.find("fail/btn3/n", that.overLabel).getComponent(cc.Label).string = res.data.share;
            that.ans_sy_n = res.data.answer;
            that.adv_sy_n = res.data.adver;
            that.share_sy_n = res.data.share;
            1 == Win_Global.isWx && wx.hideLoading();
          }
        }, function(fail) {
          console.log(fail);
        }, function(error) {
          console.log(error);
        });
      },
      registerEvent: function registerEvent() {
        this.canvas.on(cc.Node.EventType.TOUCH_START, this.touchStart.bind(this), this.node);
        this.canvas.on(cc.Node.EventType.TOUCH_END, this.touchEnd.bind(this), this.node);
        this.canvas.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel.bind(this), this.node);
      },
      unregisterEvent: function unregisterEvent() {
        this.canvas.targetOff(this.node);
      },
      update: function update(dt) {
        this.stickLengthen && (this.stick.height += dt * this.stickSpeed);
      },
      touchStart: function touchStart(event) {
        fsm.stickLengthen();
        "0" != cc.sys.localStorage.getItem("yinx") && this.paoAudioPlay();
      },
      touchEnd: function touchEnd(event) {
        fsm.heroTick();
        this.paoAudioPause();
      },
      touchCancel: function touchCancel() {
        this.touchEnd();
      },
      stickAndHeroDownAction: function stickAndHeroDownAction(callFunc) {
        var stickAction = cc.rotateBy(.5, 90);
        stickAction.easing(cc.easeIn(3));
        this.stick.runAction(stickAction);
        var heroAction = cc.moveBy(.5, cc.p(0, -300 - this.hero.height));
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
        } else this.hero.runAction(heroMove);
      },
      landCreateAndMove: function landCreateAndMove(callFunc) {
        var winSize = cc.director.getWinSize();
        var length = this.currentLandRange + this.secondLand.width;
        this.runLength += length;
        var action = cc.moveBy(this.moveDuration, cc.p(-length, 0));
        this.node.runAction(action);
        this.firstLand = this.secondLand;
        this.createNewLand();
        var that = this;
        cc.loader.loadRes("hero/hero.png", cc.SpriteFrame, function(err, spriteFrame) {
          that.hero.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        var range = this.getLandRange();
        this.secondLand.setPosition(this.runLength + winSize.width, 0);
        var l = winSize.width - range - this.heroWorldPosX - this.hero.width * this.hero.anchorX - this.stickWidth;
        var secondAction = cc.moveBy(this.moveDuration, cc.p(-l, 0));
        var seq = cc.sequence(secondAction, callFunc);
        this.secondLand.runAction(seq);
      },
      createStick: function createStick() {
        var stick = spriteCreator.createStick(this.stickWidth);
        stick.width = 4;
        stick.parent = this.node;
        return stick;
      },
      createNewLand: function createNewLand() {
        this.secondLand = spriteCreator.createNewLand(this.getLandWidth());
        this.secondLand.parent = this.node;
      },
      getScore: function getScore(num) {
        this.score += num ? 10 * num : 10;
        if (storageManager.getHighestScore() < this.score) {
          storageManager.setHighestScore(this.score);
          this.changeHightestScoreLabel();
        }
        this.scoreLabel.string = this.score;
        Win_Global.gx_score = this.score;
      },
      changeHightestScoreLabel: function changeHightestScoreLabel() {
        this.hightestScoreLabel.string = "最高分：" + storageManager.getHighestScore();
      },
      getLandRange: function getLandRange() {
        this.currentLandRange = this.landRange.x + (this.landRange.y - this.landRange.x) * Math.random();
        var winSize = cc.director.getWinSize();
        winSize.width < this.currentLandRange + this.heroWorldPosX + this.hero.width + this.secondLand.width && (this.currentLandRange = winSize.width - this.heroWorldPosX - this.hero.width - this.secondLand.width);
        return this.currentLandRange;
      },
      getLandWidth: function getLandWidth() {
        var randFloat;
        randFloat = 1 == Win_Global.game_status ? Win_Global.rand_en / 3 + Math.random() * Win_Global.rand_en : Win_Global.rand[nandu_id] / 2 + Math.random() * Win_Global.rand[nandu_id];
        return this.landWidth.x + (this.landWidth.y - this.landWidth.x) * randFloat;
      },
      gameEndFunc: function gameEndFunc(score, status) {
        1 == Win_Global.isWx && wx.showLoading({
          title: "成绩上报中..."
        });
        var that = this;
        cc.log(Win_Global.token + "  " + score + "    " + status);
        Win_Global.ajaxPost(Win_Global.path + "/answer.php", {
          action: "game_over",
          token: Win_Global.token,
          score: score,
          status: 1,
          stime: Date.parse(new Date()).toString().substr(0, 10)
        }, function(res) {
          cc.log("通关，上传成绩");
          var bkqTel = cc.sys.localStorage.getItem("bkqTel");
          that.endLabel.node.active = true;
          that.endScore.string = Win_Global.gx_score + "分";
          if (1 == res.code) if (res.data.prize > 0) {
            that.showBkqAnimateFunc();
            bkqTel || (that.telLayer.active = true);
            1 == Win_Global.isWx && wx.showToast({
              title: "审核成功后三天内发放至您的贝壳账户，感谢您的参与！",
              icon: "none",
              duration: 5e3
            });
            cc.find("pass/gxnbkq/bkq", that.endLabel.node).getComponent(cc.Label).string = res.data.prize;
            cc.find("pass/gxnbkq", that.endLabel.node).active = true;
          } else cc.find("pass/gxnbkq", that.endLabel.node).active = false; else cc.find("pass/gxnbkq", that.endLabel.node).active = false;
          1 == Win_Global.isWx && wx.hideLoading();
        }, function(fail) {
          console.log(fail);
        }, function(error) {
          console.log(error);
        });
      },
      geiveBkqLessFunc: function geiveBkqLessFunc(score) {
        var that = this;
        Win_Global.ajaxPost(Win_Global.path + "/share.php", {
          action: "endless_game_over",
          token: Win_Global.token,
          score: score,
          stime: Date.parse(new Date()).toString().substr(0, 10)
        }, function(res) {
          console.log("上报成绩 （无尽模式） 成功！");
        }, function(fail) {
          console.log(fail);
        }, function(error) {
          console.log(error);
        });
      },
      getCodeFunc: function getCodeFunc() {
        var that = this;
        var tel = cc.find("box/input", that.telLayer).getComponent(cc.EditBox).string || "null";
        var codeBtnLabel = cc.find("box/codeBtn/Label", that.telLayer);
        Win_Global.get_code(tel, codeBtnLabel);
      },
      submitTelFunc: function submitTelFunc() {
        var that = this;
        var tel = cc.find("box/input", that.telLayer).getComponent(cc.EditBox).string || "null";
        var telLayer = that.telLayer;
        var code = cc.find("box/code", that.telLayer).getComponent(cc.EditBox).string || "null";
        Win_Global.bind_tel(tel, telLayer, code);
      },
      selectFhTypeFunc: function selectFhTypeFunc(e, data) {
        var that = this;
        this.bgAudioPause();
        Win_Global.jl_score = Win_Global.gx_score;
        Win_Global.jl_run_num = Win_Global.gx_run_num;
        if (1 == data) if (that.ans_sy_n > 0) {
          this.overLabel.active = false;
          this.ans.active = true;
          this.showAnsListInfoFunc();
        } else wx.showToast({
          title: "答题复活次数已用完，请尝试其他方式！",
          icon: "none",
          duration: 2e3
        }); else if (2 == data) if (that.adv_sy_n > 0) {
          that.overLabel.active = false;
          1 == Win_Global.isWx && wx.showLoading({
            title: "视频加载中..."
          });
          if (1 == Win_Global.isWx) {
            var v = wx.createVideo();
            v.src = "https://www.oneh5.com/thq/201871/mp4/" + Math.floor(12 * Math.random() + 1) + ".mp4";
            v.width = wx.getSystemInfoSync().windowWidth;
            v.height = wx.getSystemInfoSync().windowHeight;
            v.controls = false;
            v.autoplay = true;
            v.loop = false;
            1 == Win_Global.isWx && wx.hideLoading();
            v.play();
            v.onWaiting = function(res) {
              wx.showLoading({
                title: "视频加载中..."
              });
            };
            v.onended = function(argument) {
              v.exitFullScreen();
              v.stop();
              v.width = 0;
              v.height = 0;
              that.adverOkFunc();
              fsm.restart();
            };
          }
        } else wx.showToast({
          title: "视频广告复活次数已用完，请尝试其他方式！",
          icon: "none",
          duration: 2e3
        }); else if (3 == data) {
          that.share_sy_n <= 0 && wx.showToast({
            title: "分享复活次数已用完，分享后将不能复活游戏",
            icon: "none",
            duration: 2e3
          });
          var share_n = Math.floor(10 * Math.random() + 1);
          wx.shareAppMessage({
            title: "@" + Win_Global.nickname + " 走了" + 100 * share_n + "公里，邀请你快来和我一起重走长征路吧！",
            imageUrl: "https://www.oneh5.com/LJ/game71/share/share" + share_n + ".png",
            success: function success(res) {
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
      adverOkFunc: function adverOkFunc() {
        var that = this;
        Win_Global.ajaxPost(Win_Global.path + "/answer.php?action=get_adver", {
          action: "get_adver",
          token: Win_Global.token
        }, function(res) {
          1 == res.code && console.log("视频观看完后记录");
        }, function(fail) {
          console.log(fail);
        }, function(error) {
          console.log(error);
        });
      },
      shareOkFriendsFunc: function shareOkFriendsFunc() {},
      shareOkFunc: function shareOkFunc() {
        var that = this;
        Win_Global.ajaxPost(Win_Global.path + "answer.php", {
          action: "share_log",
          token: Win_Global.token
        }, function(res) {
          1 == res.code && console.log("转发成功后记录");
        }, function(fail) {
          console.log(fail);
        }, function(error) {
          console.log(error);
        });
      },
      ansTimeFunc: function ansTimeFunc() {
        var that = this;
        var vTime = Win_Global.ansTime;
        this.callback = function() {
          that.ans_time.string = vTime;
          if (vTime <= 0) {
            vTime = 0;
            this.unschedule(this.callback);
            that.ans_err_num++;
            that.unscheduleAllCallbacks();
            if (that.ans_err_num < Win_Global.ans_max_err_num) {
              1 == Win_Global.isWx && wx.showToast({
                title: "超时，继续答题！",
                icon: "none",
                duration: 5e3
              });
              setTimeout(function() {
                cc.find("title", that.ans).runAction(cc.fadeOut(.1));
                cc.find("ansList", that.ans).runAction(cc.fadeOut(.1));
                that.showAnsListInfoFunc();
              }, 5e3);
            } else {
              1 == Win_Global.isWx && wx.showToast({
                title: "答题连错" + Win_Global.ans_max_err_num + "题，很遗憾，游戏结束！",
                icon: "none",
                duration: 5e3
              });
              setTimeout(function() {
                that.goHomeFunc();
              }, 5e3);
            }
          }
          vTime--;
        };
        this.schedule(this.callback, 1);
      },
      showAnsListInfoFunc: function showAnsListInfoFunc() {
        var that = this;
        1 == Win_Global.isWx && wx.showLoading({
          title: "正在获取题目..."
        });
        that.unscheduleAllCallbacks();
        cc.loader.loadRes("page_img/btn_g21.png", cc.SpriteFrame, function(err, spriteFrame) {
          for (var i = 1; i <= 4; i++) {
            cc.find("ansList/ansBtn" + i, that.ans).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            cc.find("ansList/ansBtn" + i + "/ans_text", that.ans).color = new cc.Color(0, 0, 0, 255);
            cc.find("ansList/ansBtn" + i, that.ans).getComponent(cc.Button).interactable = true;
          }
        });
        Win_Global.ajaxPost(Win_Global.path + "/answer.php", {
          action: "topic",
          token: Win_Global.token
        }, function(res) {
          if (1 == res.code) {
            that.ans_time.string = 99;
            that.ansTimeFunc();
            cc.find("title", that.ans).runAction(cc.fadeIn(.1));
            cc.find("ansList", that.ans).runAction(cc.fadeIn(.1));
            cc.find("title", that.ans).getComponent(cc.Label).string = res.data.topic;
            cc.find("ansList/ansBtn1/ans_text", that.ans).getComponent(cc.Label).string = res.data.answer1;
            cc.find("ansList/ansBtn2/ans_text", that.ans).getComponent(cc.Label).string = res.data.answer2;
            cc.find("ansList/ansBtn3/ans_text", that.ans).getComponent(cc.Label).string = res.data.answer3;
            cc.find("ansList/ansBtn4/ans_text", that.ans).getComponent(cc.Label).string = res.data.answer4;
            1 == Win_Global.isWx && wx.hideLoading();
          }
        }, function(fail) {
          console.log(fail);
        }, function(error) {
          console.log(error);
        });
      },
      selectAnsFunc: function selectAnsFunc(e, data) {
        var that = this;
        cc.find("ansList/ansBtn" + data + "/ans_text", that.ans).color = new cc.Color(181, 31, 36, 255);
        for (var i = 1; i <= 4; i++) cc.find("ansList/ansBtn" + i, that.ans).getComponent(cc.Button).interactable = false;
        Win_Global.ajaxPost(Win_Global.path + "/answer.php", {
          action: "topic_answer",
          token: Win_Global.token,
          user_answer: data
        }, function(res) {
          that.unscheduleAllCallbacks();
          if (1 == res.code) if (1 == res.data.success) {
            cc.log("答题成功！");
            cc.loader.loadRes("page_img/ans_ok.png", cc.SpriteFrame, function(err, spriteFrame) {
              cc.find("ansList/ansBtn" + data, that.ans).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            setTimeout(function() {
              that.ans.active = false;
              fsm.restart();
            }, 2e3);
          } else if (2 == res.data.success) {
            that.ans_err_num++;
            cc.log(that.ans_err_num);
            cc.loader.loadRes("page_img/ans_fail.png", cc.SpriteFrame, function(err, spriteFrame) {
              cc.find("ansList/ansBtn" + data, that.ans).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            cc.loader.loadRes("page_img/ans_ok.png", cc.SpriteFrame, function(err, spriteFrame) {
              cc.find("ansList/ansBtn" + res.data.bingo, that.ans).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            if (that.ans_err_num < Win_Global.ans_max_err_num) {
              1 == Win_Global.isWx && wx.showToast({
                title: "选择错误，继续答题！",
                icon: "none",
                duration: 5e3
              });
              setTimeout(function() {
                cc.find("title", that.ans).runAction(cc.fadeOut(.1));
                cc.find("ansList", that.ans).runAction(cc.fadeOut(.1));
                that.showAnsListInfoFunc();
              }, 5e3);
            } else {
              1 == Win_Global.isWx && wx.showToast({
                title: "答题连错" + Win_Global.ans_max_err_num + "题，很遗憾，游戏结束！",
                icon: "none",
                duration: 5e3
              });
              setTimeout(function() {
                that.goHomeFunc();
              }, 5e3);
            }
          }
        }, function(fail) {
          console.log(fail);
        }, function(error) {
          console.log(error);
        });
      },
      closeVideoFunc: function closeVideoFunc(e, data) {
        cc.log(data);
        cc.log("xxkkkk");
      },
      goHomeFunc: function goHomeFunc() {
        Win_Global.gx_score = 0;
        Win_Global.jl_score = 0;
        Win_Global.gx_run_num = 0;
        Win_Global.jl_run_num = 0;
        this.bgAudioPause();
        cc.director.loadScene("page");
        Win_Global.cbk_nav = 1;
      },
      showBkqAnimateFunc: function showBkqAnimateFunc() {
        var that = this;
        that.show_bkq.runAction(cc.spawn(cc.scaleTo(.5, 1, 1), cc.fadeTo(.5, 255)));
        this.count = 0;
        this.callback = function() {
          if (this.count >= 35) {
            this.unschedule(this.callback);
            that.show_bkq.runAction(cc.fadeTo(.3, 0));
          }
          cc.find("bg", that.show_bkq).rotation += 10;
          this.count++;
        };
        that.schedule(this.callback, .07);
      },
      isGoHomeFunc: function isGoHomeFunc() {
        var that = this;
        that.Alert.active = true;
        cc.find("box/text", that.Alert).getComponent(cc.Label).string = "确定回到主页吗？";
        cc.find("box", that.Alert).runAction(cc.spawn(cc.scaleTo(.1, 1, 1), cc.fadeTo(.1, 255)));
        cc.find("box/ok", that.Alert).on("click", function() {
          that.goHomeFunc();
        });
        cc.find("box/qux", that.Alert).on("click", function() {
          cc.find("box", that.Alert).runAction(cc.spawn(cc.scaleTo(.1, 1.2, 1.2), cc.fadeTo(.1, 0)));
          setTimeout(function() {
            that.Alert.active = false;
          }, 100);
        });
      },
      shareZoneFunc: function shareZoneFunc() {
        var that = this;
        var scene = cc.director.getScene();
        var node = cc.instantiate(that.shareImg);
        node.parent = scene;
        cc.loader.load({
          url: "https://www.oneh5.com/yjl/party_answer/front_api/api/../images/qrcode/share_fa971ce35c0c799d.png",
          type: "png"
        }, function(err, texture) {
          node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        });
        node.runAction(cc.sequence(cc.scaleTo(1, .2), cc.moveTo(.6, cc.p(486.4, 96))));
        setTimeout(function() {
          node.runAction(cc.fadeTo(.5, 0));
        }, 2800);
        setTimeout(function() {
          node.destroy();
        }, 3500);
        wx.downloadFile({
          url: "https://www.oneh5.com/yjl/party_answer/front_api/api/../images/qrcode/share_fa971ce35c0c799d.png",
          success: function success(res) {
            console.log("保存图片到本地");
            console.log(res);
            var path = res.tempFilePath;
            wx.saveImageToPhotosAlbum({
              filePath: path,
              success: function success(res) {
                wx.showToast({
                  title: "已将你的专属二维码保存到相册中，现在可以去发朋友圈了哦",
                  icon: "none",
                  duration: 2e3
                });
                that.shareImg.runAction(cc.scaleTo(0, 1));
                console.log("保存图片到本地1");
                console.log("已将你的专属二维码保存到相册中，现在可以去发朋友圈了哦");
                console.log(res);
              },
              fail: function fail(res) {
                console.log("保存图片到本地2");
                console.log(res);
              },
              complete: function complete(res) {
                console.log("保存图片到本地3");
                console.log(res);
              }
            });
          },
          fail: function fail(res) {
            console.log("保存图片到本地0");
            console.log(res);
          }
        });
      },
      shareZoneFunc2: function shareZoneFunc2() {
        var uls = [ "https://www.oneh5.com/yjl/party_answer/front_api/api/../images/qrcode/share_fa971ce35c0c799d.png" ];
        wx.previewImage({
          current: "https://www.oneh5.com/yjl/party_answer/front_api/api/../images/qrcode/share_fa971ce35c0c799d.png",
          urls: uls
        });
      },
      shareZoneFunc3: function shareZoneFunc3() {
        var uls = [ "https://www.oneh5.com/LJ/bkEWM.png" ];
        wx.previewImage({
          current: "https://www.oneh5.com/LJ/bkEWM.png",
          urls: uls
        });
      },
      goToBkqOutFunc: function goToBkqOutFunc() {
        window.location.href = "https://bk.189store.com/h5/user/base?bk_tel=" + Win_Global.token;
      }
    });
    module.exports = fsm;
    cc._RF.pop();
  }, {
    perfectLabel: "perfectLabel",
    spriteCreator: "spriteCreator",
    "state-machine": "state-machine",
    storageManager: "storageManager"
  } ],
  page: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "947d8MW88FJdK2KSaaDs+rW", "page");
    "use strict";
    var Alert = {
      _alert: null,
      _detailLabel: null,
      _cancelButton: null,
      _enterButton: null,
      _enterCallBack: null,
      _animSpeed: .3
    };
    Alert.show = function(detailString, enterCallBack, needCancel, animSpeed) {
      var self = this;
      if (void 0 != Alert._alert) return;
      Alert._animSpeed = animSpeed || Alert._animSpeed;
      cc.loader.loadRes("Alert", cc.Prefab, function(error, prefab) {
        if (error) {
          cc.error(error);
          return;
        }
        var alert = cc.instantiate(prefab);
        Alert._alert = alert;
        var cbFadeOut = cc.callFunc(self.onFadeOutFinish, self);
        var cbFadeIn = cc.callFunc(self.onFadeInFinish, self);
        self.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(Alert._animSpeed, 255), cc.scaleTo(Alert._animSpeed, 1)), cbFadeIn);
        self.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(Alert._animSpeed, 0), cc.scaleTo(Alert._animSpeed, 1.2)), cbFadeOut);
        Alert._detailLabel = cc.find("alertBackground/detailLabel", alert).getComponent(cc.Label);
        Alert._cancelButton = cc.find("alertBackground/cancelButton", alert);
        Alert._enterButton = cc.find("alertBackground/enterButton", alert);
        Alert._enterButton.on("click", self.onButtonClicked, self);
        Alert._cancelButton.on("click", self.onButtonClicked, self);
        Alert._alert.parent = cc.find("Canvas");
        self.startFadeIn();
        self.configAlert(detailString, enterCallBack, needCancel, animSpeed);
      });
      self.configAlert = function(detailString, enterCallBack, needCancel, animSpeed) {
        Alert._enterCallBack = enterCallBack;
        Alert._detailLabel.string = detailString;
        if (needCancel || void 0 == needCancel) Alert._cancelButton.active = true; else {
          Alert._cancelButton.active = false;
          Alert._enterButton.x = 0;
        }
      };
      self.startFadeIn = function() {
        cc.eventManager.pauseTarget(Alert._alert, true);
        Alert._alert.position = cc.p(0, 0);
        Alert._alert.setScale(1.2);
        Alert._alert.opacity = 0;
        Alert._alert.runAction(self.actionFadeIn);
      };
      self.startFadeOut = function() {
        cc.eventManager.pauseTarget(Alert._alert, true);
        Alert._alert.runAction(self.actionFadeOut);
      };
      self.onFadeInFinish = function() {
        cc.eventManager.resumeTarget(Alert._alert, true);
      };
      self.onFadeOutFinish = function() {
        self.onDestory();
      };
      self.onButtonClicked = function(event) {
        "enterButton" == event.target.name && self._enterCallBack && self._enterCallBack();
        self.startFadeOut();
      };
      self.onDestory = function() {
        Alert._alert.destroy();
        Alert._enterCallBack = null;
        Alert._alert = null;
        Alert._detailLabel = null;
        Alert._cancelButton = null;
        Alert._enterButton = null;
        Alert._animSpeed = .3;
      };
    };
    var fsm = require("landMaker");
    var pageF = cc.Class({
      extends: cc.Component,
      properties: {
        nav1: cc.Node,
        nav2: cc.Node,
        nav3: cc.Node,
        nav4: cc.Node,
        nav5: cc.Node,
        nav6: cc.Node,
        nav7: cc.Node,
        nav8: cc.Node,
        rank: cc.Prefab,
        my_rank: cc.Label,
        gift: cc.Prefab,
        bkq: cc.Prefab,
        music_btn: cc.Node,
        myNandu: 0,
        menuLayer: cc.Node,
        telLayer: cc.Node,
        adiLayer: cc.Node,
        pass_id: 1,
        diff_id: 1,
        isGiveRankBkq: 1,
        isGiveRankBkq_friend: 1,
        yiny: 1,
        yinx: 1,
        bgm: null,
        paoAudio: cc.AudioSource,
        bgAdi: null,
        bgAdi_n: 1,
        gameAdi: null
      },
      onLoad: function onLoad() {
        var that = this;
        this.setGoInFunc();
        if (1 == Win_Global.isWx) {
          wx.onShow(function(res) {
            console.log(res.query);
          });
          var avatarUrl = cc.sys.localStorage.getItem(Win_Global.avatarUrl_name) || "";
          var nickName = cc.sys.localStorage.getItem(Win_Global.nickName_name) || "";
          var RedStar_token = cc.sys.localStorage.getItem(Win_Global.token_name) || "";
          Win_Global.nickname = nickName;
          Win_Global.avatarUrl = avatarUrl;
          console.log("nickName = " + nickName + "  ; RedStar_token = " + RedStar_token);
          "" == RedStar_token && wx.login({
            success: function success(res) {
              res.code && Win_Global.ajaxPost(Win_Global.path + "wxLogin.php", {
                code: res.code
              }, function(res) {
                if (1 == res.code) {
                  cc.sys.localStorage.setItem(Win_Global.token_name, res.data.token);
                  Win_Global.token = res.data.token;
                }
              }, function(fail) {
                console.log(fail);
              }, function(error) {
                console.log(error);
              });
            }
          });
          if ("" == nickName && "" == avatarUrl) {
            var button = wx.createUserInfoButton({
              type: "text",
              text: "",
              image: "",
              style: {
                left: 0,
                top: 0,
                width: 600,
                height: 6e3,
                lineHeight: 0,
                backgroundColor: "transparent",
                color: "#ffffff",
                textAlign: "center",
                fontSize: 16,
                borderRadius: 4
              }
            });
            button.onTap(function(e) {
              if (e.userInfo) {
                Win_Global.nickname = e.userInfo.nickName;
                Win_Global.avatarUrl = e.userInfo.avatarUrl;
                cc.sys.localStorage.setItem(Win_Global.avatarUrl_name, e.userInfo.avatarUrl);
                cc.sys.localStorage.setItem(Win_Global.nickName_name, e.userInfo.nickName);
                that.nav1.active = false;
                that.nav2.active = true;
                that.setLvPositionFunc();
                button.destroy();
              } else wx.showToast({
                title: "同志您好，进入游戏需要授权哦~",
                icon: "none"
              });
            });
          } else cc.find("btn", that.nav1).on("click", function() {
            that.nav1.active = false;
            that.nav2.active = true;
            that.setLvPositionFunc();
          });
        } else cc.find("btn", that.nav1).on("click", function() {
          that.nav1.active = false;
          that.nav2.active = true;
          that.setLvPositionFunc();
        });
        cc.find("box/btn/rank1", that.nav5).on("click", function() {
          that.showUserRankDataFunc("1");
        });
        cc.find("box/btn/rank2", that.nav5).on("click", function() {
          that.showUserRankDataFunc("2");
        });
        this.bgAdi_n = Math.floor(9 * Math.random() + 1);
        if (1 == Win_Global.cbk_nav) {
          that.nav1.active = false;
          that.nav2.active = true;
          that.setLvPositionFunc();
        }
        cc.sys.localStorage.getItem(Win_Global.token_name) && (Win_Global.token = cc.sys.localStorage.getItem(Win_Global.token_name));
        cc.find("opacity", that.telLayer).on(cc.Node.EventType.TOUCH_START, function(e) {
          e.stopPropagation();
        });
        cc.find("opacity", that.menuLayer).on(cc.Node.EventType.TOUCH_START, function(e) {
          e.stopPropagation();
          that.menuLayer.active = false;
        });
        cc.find("opacity", that.adiLayer).on(cc.Node.EventType.TOUCH_START, function(e) {
          that.adiLayer.active = false;
        });
        cc.find("box", that.adiLayer).on(cc.Node.EventType.TOUCH_START, function(e) {
          e.stopPropagation();
        });
        if ("0" == cc.sys.localStorage.getItem("yiny")) {
          that.yiny = 0;
          that.musicAudioPause();
          cc.loader.loadRes("page_img/off.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("box/bgadimg", that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
        } else {
          that.yiny = 1;
          that.musicAudioPlay();
          cc.loader.loadRes("page_img/on.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("box/bgadimg", that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
        }
        if ("0" == cc.sys.localStorage.getItem("yinx")) {
          that.yinx = 0;
          cc.loader.loadRes("page_img/off.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("box/gameimg", that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
        } else {
          that.yinx = 1;
          cc.loader.loadRes("page_img/on.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("box/gameimg", that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
        }
      },
      toggleBgAdiFunc: function toggleBgAdiFunc() {
        var that = this;
        if (1 != that.yiny) {
          that.yiny = 1;
          that.musicAudioPlay();
          cc.loader.loadRes("page_img/on.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("box/bgadimg", that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.sys.localStorage.setItem("yiny", "1");
        } else {
          that.yiny = 0;
          that.musicAudioPause();
          cc.loader.loadRes("page_img/off.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("box/bgadimg", that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.sys.localStorage.setItem("yiny", "0");
        }
      },
      toggleGameAdiFunc: function toggleGameAdiFunc() {
        var that = this;
        if (1 != that.yinx) {
          that.yinx = 1;
          that.musicAudioPlay2();
          cc.loader.loadRes("page_img/on.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("box/gameimg", that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.sys.localStorage.setItem("yinx", "1");
        } else {
          that.yinx = 0;
          cc.loader.loadRes("page_img/off.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("box/gameimg", that.adiLayer).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.sys.localStorage.setItem("yinx", "0");
        }
      },
      musicAudioPlay: function musicAudioPlay() {
        this.bgAdi = cc.audioEngine.play("https://www.oneh5.com/thq/201871/mp3/m" + this.bgAdi_n + ".mp3", true, .8);
      },
      musicAudioPause: function musicAudioPause() {
        cc.audioEngine.pause(this.bgAdi);
      },
      musicAudioPlay2: function musicAudioPlay2() {
        this.paoAudio.play();
      },
      musicAudioPause2: function musicAudioPause2() {
        this.paoAudio.isPlaying && this.paoAudio.pause();
      },
      setGoInFunc: function setGoInFunc() {
        var that = this;
        that.animationComFunc(cc.find("btn", that.nav1), {
          "0": cc.fadeIn(.5),
          "1": cc.moveTo(.5, 0, -410)
        }, 500);
      },
      startChangzhengLenFunc: function startChangzhengLenFunc() {
        Win_Global.game_status = 1;
        this.musicAudioPause();
        cc.director.loadScene("MainGameScene");
        fsm.restart();
      },
      startChangzhengLvFunc: function startChangzhengLvFunc() {
        this.nav2.active = false;
        this.nav3.active = true;
        this.setLvPositionFunc();
      },
      clcikGoToRuleFunc: function clcikGoToRuleFunc() {
        this.nav2.active = false;
        this.nav7.active = true;
        this.showRuleGiftInfoFunc();
      },
      clickMadeAdiFunc: function clickMadeAdiFunc() {
        var that = this;
        that.adiLayer.active = true;
      },
      setLvPositionFunc: function setLvPositionFunc() {
        var that = this;
        1 == Win_Global.isWx && wx.showLoading({
          title: "加载中..."
        });
        that.animationComFunc(that.nav3.getChildByName("map"), {
          "0": cc.fadeIn(.5),
          "1": cc.scaleTo(.5, 1, 1)
        }, 800);
        var lvPositionArr = Array({
          lv: "lv1",
          x: 222.5,
          y: -176.5
        }, {
          lv: "lv2",
          x: 17.8,
          y: -169
        }, {
          lv: "lv3",
          x: -70.8,
          y: -117.8
        }, {
          lv: "lv4",
          x: -216.2,
          y: -165.9
        }, {
          lv: "lv5",
          x: -219.7,
          y: -45.6
        }, {
          lv: "lv6",
          x: -184.3,
          y: 56.4
        }, {
          lv: "lv7",
          x: -116,
          y: 169.8
        });
        for (var i in lvPositionArr) {
          cc.find("map/" + lvPositionArr[i].lv, that.nav3).x = lvPositionArr[i].x;
          cc.find("map/" + lvPositionArr[i].lv, that.nav3).y = lvPositionArr[i].y;
          cc.find("map/" + lvPositionArr[i].lv, that.nav3).width = 35;
          cc.find("map/" + lvPositionArr[i].lv, that.nav3).height = 35;
        }
        cc.log("我的token = " + Win_Global.token);
        Win_Global.ajaxPost(Win_Global.path + "user.php", {
          action: "get_userinfo",
          token: Win_Global.token,
          nickname: Win_Global.nickname,
          head_img: Win_Global.avatarUrl
        }, function(res) {
          if (1 == res.code) {
            cc.loader.load({
              url: Win_Global.avatarUrl,
              type: "png"
            }, function(err, texture) {
              cc.find("head/head_icon", that.nav2).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
            that.nav2.getChildByName("score").getComponent(cc.Label).string = "战绩：" + res.data.score + "分";
            Win_Global.myMaxLv = res.data.pass_num;
            Win_Global.mySelectLv = res.data.pass_num;
            cc.log("最大关卡： " + res.data.pass_num);
            cc.loader.loadRes("page_img/nav3-51a.png", cc.SpriteFrame, function(err, spriteFrame) {
              for (var i = 1; i <= res.data.pass_num - 1; i++) cc.find("map/lv" + i, that.nav3).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            cc.loader.loadRes("page_img/suo.png", cc.SpriteFrame, function(err, spriteFrame) {
              for (var i = res.data.pass_num + 1; i <= 7; i++) cc.find("map/lv" + i, that.nav3).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            cc.loader.loadRes("page_img/nav3-51.png", cc.SpriteFrame, function(err, spriteFrame) {
              cc.find("map/lv" + res.data.pass_num, that.nav3).getComponent(cc.Sprite).spriteFrame = spriteFrame;
              cc.find("map/lv" + res.data.pass_num, that.nav3).width = 50;
              cc.find("map/lv" + res.data.pass_num, that.nav3).height = 50;
              cc.find("map/lv" + res.data.pass_num, that.nav3).runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.3, 1.3, 1.3), cc.scaleTo(.2, 1, 1))));
            });
            1 == Win_Global.isWx && wx.hideLoading();
            res.data.tel && cc.sys.localStorage.setItem("bkqTel", res.data.tel);
          }
        }, function(fail) {
          console.log(fail);
        }, function(error) {
          console.log(error);
        });
      },
      selectLvFunc: function selectLvFunc(event, customEventData) {
        var that = this;
        var myMaxLv = Win_Global.myMaxLv;
        that.pass_id = Win_Global.myMaxLv;
        if (customEventData <= myMaxLv) {
          cc.log("我的token2 = " + Win_Global.token);
          that.setNanduShowFunc();
          Win_Global.mySelectLv = customEventData;
          cc.loader.loadRes("page_img/nav3-51a.png", cc.SpriteFrame, function(err, spriteFrame) {
            for (var i = 1; i <= myMaxLv; i++) {
              cc.find("map/lv" + i, that.nav3).runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1, 1), cc.scaleTo(1, 1))));
              cc.find("map/lv" + i, that.nav3).getComponent(cc.Sprite).spriteFrame = spriteFrame;
              cc.find("map/lv" + i, that.nav3).width = 35;
              cc.find("map/lv" + i, that.nav3).height = 35;
            }
          });
          cc.loader.loadRes("page_img/nav3-51.png", cc.SpriteFrame, function(err, spriteFrame) {
            if (customEventData <= myMaxLv) {
              cc.find("map/lv" + customEventData, that.nav3).runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.3, 1.3, 1.3), cc.scaleTo(.2, 1, 1))));
              cc.find("map/lv" + customEventData, that.nav3).getComponent(cc.Sprite).spriteFrame = spriteFrame;
              cc.find("map/lv" + customEventData, that.nav3).width = 50;
              cc.find("map/lv" + customEventData, that.nav3).height = 50;
            }
          });
        } else Alert.show("当前关卡未解锁！", null, false, .1);
      },
      rankFunc: function rankFunc() {
        this.nav2.active = false;
        this.nav5.active = true;
        this.showUserRankDataFunc("1");
      },
      userFunc: function userFunc() {
        this.nav2.active = false;
        this.nav6.active = true;
        this.showUserGiftInfoFunc();
      },
      setNanduShowFunc: function setNanduShowFunc() {
        var that = this;
        1 == Win_Global.isWx && wx.showLoading({
          title: "加载中..."
        });
        cc.log("选择关卡：" + Win_Global.mySelectLv);
        that.menuLayer.active = true;
        var selectNanduChildArr = cc.find("nandu", that.nav4).children;
        cc.loader.loadRes("page_img/btn_g.png", cc.SpriteFrame, function(err, spriteFrame) {
          for (var i in selectNanduChildArr) {
            selectNanduChildArr[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
            selectNanduChildArr[i].getChildByName("Label").color = new cc.Color(0, 0, 0, 255);
          }
        });
        Win_Global.ajaxPost(Win_Global.path + "/answer.php", {
          action: "diff_list",
          token: Win_Global.token,
          pass_id: Win_Global.mySelectLv
        }, function(res) {
          if (1 == res.code) {
            that.myNandu = res.diff_num;
            cc.log("最大难度：" + that.myNandu);
            for (var i = 0; i < res.data.length; i++) 0 == res.data[i].is_lock ? cc.find("box/btn" + (i + 1) + "/status", that.menuLayer).active = false : cc.find("box/btn" + (i + 1) + "/status", that.menuLayer).active = true;
            1 == Win_Global.isWx && wx.hideLoading();
          }
        }, function(fail) {
          console.log(fail);
        }, function(error) {
          console.log(error);
        });
      },
      selectNanduFunc: function selectNanduFunc(e, data) {
        var that = this;
        var pass_id = Win_Global.mySelectLv;
        that.diff_id = data;
        var selectNanduChildArr = cc.find("nandu", that.nav4).children;
        cc.loader.loadRes("page_img/btn_g.png", cc.SpriteFrame, function(err, spriteFrame) {
          for (var i in selectNanduChildArr) {
            selectNanduChildArr[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
            selectNanduChildArr[i].getChildByName("Label").color = new cc.Color(0, 0, 0, 255);
          }
        });
        cc.loader.loadRes("page_img/btn_g21.png", cc.SpriteFrame, function(err, spriteFrame) {
          cc.find("nandu/nd" + data, that.nav4).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          cc.find("nandu/nd" + data, that.nav4).getChildByName("Label").color = new cc.Color(181, 31, 36, 255);
        });
        cc.log("我选择的关卡：" + pass_id + "  ; 选择的难度：" + that.diff_id);
        cc.log("难度：" + that.myNandu);
        if (data <= that.myNandu) Win_Global.ajaxPost(Win_Global.path + "/answer.php", {
          action: "answer_start",
          token: Win_Global.token,
          pass_id: pass_id,
          diff_id: that.diff_id
        }, function(res) {
          if (1 == res.code) {
            Win_Global.mySelectLv = pass_id;
            Win_Global.nandu_id = that.diff_id;
            that.nav4.active = false;
            that.nav8.active = true;
            1 == Win_Global.isWx && wx.showLoading({
              title: "加载中..."
            });
            cc.find("text", that.nav8).runAction(cc.fadeIn(.5));
            that.animationComFunc(cc.find("btn", that.nav8), {
              "0": cc.fadeIn(.5),
              "1": cc.moveTo(.5, 0, -310)
            }, 350);
            cc.loader.load({
              url: "https://www.oneh5.com/LJ/game71/lv_bg/lv" + pass_id + "0" + that.diff_id + ".png",
              type: "png"
            }, function(err, texture) {
              that.nav8.getChildByName("top_img").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
              1 == Win_Global.isWx && wx.hideLoading();
            });
          }
        }, function(fail) {
          console.log(fail);
        }, function(error) {
          console.log(error);
        }); else {
          var layerText = "";
          layerText = 1 == that.myNandu && 2 == data ? "同志，你需要先通关“简单”关卡，才能解锁“一般”关卡。加油！" : "同志，你需要先通关“一般”关卡，才能解锁“困难”关卡。加油！";
          Alert.show(layerText, null, false, .1);
        }
      },
      showUserRankDataFunc: function showUserRankDataFunc(status) {
        var that = this;
        this.rankDestroy();
        1 == Win_Global.isWx && wx.showLoading({
          title: "加载中..."
        });
        var obj = {};
        if ("1" == status) {
          obj.action = "one_rand";
          obj.img_path_active = "page_img/z_rka.png";
          obj.img_path = "page_img/fr_rk.png";
          obj.btn_active = "box/btn/rank1";
          obj.btn = "box/btn/rank2";
        } else {
          obj.action = "one_rand_now";
          obj.img_path_active = "page_img/fr_rka.png";
          obj.img_path = "page_img/z_rk.png";
          obj.btn_active = "box/btn/rank2";
          obj.btn = "box/btn/rank1";
        }
        cc.loader.loadRes(obj.img_path_active, cc.SpriteFrame, function(err, spriteFrame) {
          cc.find(obj.btn_active, that.nav5).getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        cc.loader.loadRes(obj.img_path, cc.SpriteFrame, function(err, spriteFrame) {
          cc.find(obj.btn, that.nav5).getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        Win_Global.ajaxPost(Win_Global.path + "/rand.php", {
          action: obj.action,
          token: Win_Global.token
        }, function(res) {
          if (1 == res.code) {
            "" == res.data.rand ? cc.find("box/not_data", that.nav5).active = true : cc.find("box/not_data", that.nav5).active = false;
            for (var i = 0; i < res.data.rand.length; i++) {
              var node = cc.instantiate(that.rank);
              var scene = cc.find("box/rank_box/view/content", that.nav5);
              node.setPosition(0, -105 - 130 * i + 100);
              node.getComponent("rankList").init({
                head_img: res.data.rand[i].head_img,
                rank_n: res.data.rand[i].rand,
                rank_name: res.data.rand[i].nickname,
                rank_cj: res.data.rand[i].score,
                rank_status: res.data.rand[i].status
              });
              scene.addChild(node);
            }
            if ("1" == status) {
              that.my_rank.node.active = true;
              that.my_rank.string = "我的排名：" + res.data.my_rand;
            } else that.my_rank.node.active = false;
            cc.find("box/rank_box/view/content", that.nav5).height = 130 * res.data.rand.length - 25;
            cc.find("box/rank_box/scrollBar", that.nav5).active = false;
            1 == Win_Global.isWx && wx.hideLoading();
          }
        }, function(fail) {
          console.log(fail);
        }, function(error) {
          console.log(error);
        });
      },
      goToMyGiftFunc: function goToMyGiftFunc() {
        this.nav5.active = false;
        this.nav7.active = true;
        this.showRuleGiftInfoFunc();
      },
      bkqGoToRuleGiftInfoFunc: function bkqGoToRuleGiftInfoFunc() {
        this.nav6.active = false;
        this.nav7.active = true;
        this.showRuleGiftInfoFunc();
      },
      showUserGiftInfoFunc: function showUserGiftInfoFunc() {
        var that = this;
        1 == Win_Global.isWx && wx.showLoading({
          title: "加载中..."
        });
        Win_Global.ajaxPost(Win_Global.path + "/task.php?=", {
          action: "task_list",
          token: Win_Global.token
        }, function(res) {
          if (1 == res.code) {
            cc.find("top/head_box/t_name", that.nav6).getComponent(cc.Label).string = res.data.nickname;
            cc.find("top/head_box/left/num", that.nav6).getComponent(cc.Label).string = res.data.score;
            cc.find("top/head_box/right/num", that.nav6).getComponent(cc.Label).string = res.data.beike;
            res.data.head_img && cc.loader.load({
              url: res.data.head_img,
              type: "png"
            }, function(err, texture) {
              cc.find("top/head_box/head/h", that.nav6).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
            for (var i = 0; i < res.data.task.length; i++) {
              var gift = cc.instantiate(that.gift);
              var scene = cc.find("main/gf_box/view/content", that.nav6);
              gift.setPosition(70 + 120 * i, -103);
              gift.getComponent("giftList").init({
                gf_status: res.data.task[i].status,
                gf_num: res.data.task[i].task_beike,
                gf_name: res.data.task[i].task_name,
                gf_id: res.data.task[i].id
              });
              scene.addChild(gift);
            }
            cc.find("main/gf_box/view/content", that.nav6).width = 120 * res.data.task.length + 60;
            1 == Win_Global.isWx && wx.hideLoading();
          }
        }, function(fail) {
          console.log(fail);
        }, function(error) {
          console.log(error);
        });
      },
      showRuleGiftInfoFunc: function showRuleGiftInfoFunc() {
        var that = this;
        1 == Win_Global.isWx && wx.showLoading({
          title: "加载中..."
        });
        Win_Global.ajaxPost(Win_Global.path + "/rand.php", {
          action: "week_prize",
          token: Win_Global.token
        }, function(res) {
          if (1 == res.code) {
            if (res.data.one.prize > 0 || res.data.friends.prize > 0) {
              cc.find("box/view/content/bkq_box", that.nav7).active = true;
              cc.find("box/view/content/bkq_none", that.nav7).active = false;
              res.data.one.prize > 0 && res.data.friends.prize > 0 ? cc.find("box/view/content/rule", that.nav7).y = -1050 : cc.find("box/view/content/rule", that.nav7).y = -780;
              res.data.friends.prize > 0 && res.data.one.prize <= 0 && (cc.find("box/view/content/bkq_box/bkq_friend/", that.nav7).y = 300);
              if (res.data.one.prize > 0) {
                cc.find("box/view/content/bkq_box/bkq_user", that.nav7).active = true;
                that.isGiveRankBkq = res.data.one.status;
                1 == that.isGiveRankBkq && cc.loader.loadRes("page_img/lingq2.png", cc.SpriteFrame, function(err, spriteFrame) {
                  cc.find("box/view/content/bkq_box/bkq_user/btn", that.nav7).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                cc.find("box/view/content/bkq_box/bkq_user/text", that.nav7).getComponent(cc.Label).string = "总榜No." + res.data.one.rand;
                cc.find("box/view/content/bkq_box/bkq_user/bkq_num", that.nav7).getComponent(cc.Label).string = res.data.one.prize + "贝壳券";
              }
              if (res.data.friends.prize > 0) {
                cc.find("box/view/content/bkq_box/bkq_friend", that.nav7).active = true;
                that.isGiveRankBkq_friend = res.data.friends.status;
                1 == that.isGiveRankBkq_friend && cc.loader.loadRes("page_img/lingq2.png", cc.SpriteFrame, function(err, spriteFrame) {
                  cc.find("box/view/content/bkq_box/bkq_friend/btn", that.nav7).getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                cc.find("box/view/content/bkq_box/bkq_friend/text", that.nav7).getComponent(cc.Label).string = "好友榜No." + res.data.friends.rand;
                cc.find("box/view/content/bkq_box/bkq_friend/bkq_num", that.nav7).getComponent(cc.Label).string = res.data.friends.prize + "贝壳券";
              }
            } else {
              cc.find("box/view/content/bkq_none", that.nav7).active = true;
              cc.find("box/view/content/bkq_box", that.nav7).active = false;
              cc.find("box/view/content/rule", that.nav7).y = -650;
            }
            1 == Win_Global.isWx && wx.hideLoading();
          }
        }, function(fail) {
          console.log(fail);
        }, function(error) {
          console.log(error);
        });
      },
      giveBkqFunc: function giveBkqFunc(e, data) {
        cc.log("点击领取排行榜贝壳券");
        var that = this;
        var btn_status = "";
        if (1 == that.isGiveRankBkq && 1 == data || 1 == that.isGiveRankBkq_friend && 3 == data) {
          1 == that.isGiveRankBkq && (btn_status = "box/view/content/bkq_box/bkq_user/btn");
          1 == that.isGiveRankBkq_friend && (btn_status = "box/view/content/bkq_box/bkq_friend/btn");
          cc.loader.loadRes("page_img/lingq2.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find(btn_status, that.nav7).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          Alert.show("你已经领取过了哦", null, false, .1);
        } else Win_Global.ajaxPost(Win_Global.path + "/rand.php", {
          action: "get_week_prize",
          token: Win_Global.token,
          id: data,
          stime: Date.parse(new Date()).toString().substr(0, 10)
        }, function(res) {
          if (1 == res.code) Alert.show("成功领取" + res.data.prize + "贝壳券", null, false, .1); else if (9004 == res.code) {
            cc.log("绑定手机号码");
            that.telLayer.active = true;
          } else 9002 == res.code && Alert.show("你已经领取过了哦", null, false, .1);
        }, function(fail) {
          console.log(fail);
        }, function(error) {
          console.log(error);
        });
      },
      getCodeFunc: function getCodeFunc() {
        var that = this;
        var tel = cc.find("box/input", that.telLayer).getComponent(cc.EditBox).string || "null";
        var codeBtnLabel = cc.find("box/codeBtn/Label", that.telLayer);
        Win_Global.get_code(tel, codeBtnLabel);
      },
      submitTelFunc: function submitTelFunc() {
        var that = this;
        var tel = cc.find("box/input", that.telLayer).getComponent(cc.EditBox).string || "null";
        var telLayer = that.telLayer;
        var code = cc.find("box/code", that.telLayer).getComponent(cc.EditBox).string || "null";
        Win_Global.bind_tel(tel, telLayer, code);
      },
      goToGameFunc: function goToGameFunc() {
        Win_Global.game_status = 0;
        this.musicAudioPause();
        cc.director.loadScene("MainGameScene");
        fsm.restart();
      },
      callbackFunc: function callbackFunc(e, data) {
        var that = this;
        5 == data && this.rankDestroy();
        if (8 == data) {
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
      },
      rankDestroy: function rankDestroy() {
        var rank_arr = cc.find("box/rank_box/view/content", this.nav5).children;
        for (var i in rank_arr) rank_arr[i].destroy();
      },
      animationComFunc: function animationComFunc(node, spawn, time) {
        setTimeout(function() {
          node.runAction(cc.spawn(spawn[0], spawn[1]));
        }, time);
      }
    });
    var page = new pageF();
    module.exports = page;
    cc._RF.pop();
  }, {
    landMaker: "landMaker"
  } ],
  perfectLabel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "68d3cmKQRxMxJwM5MfqZrPh", "perfectLabel");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.anim = this.node.getComponent(cc.Animation);
        this.label = this.node.getComponent(cc.Label);
      },
      showPerfect: function showPerfect(count) {
        this.node.getComponent(cc.Label).string = "奖励分数 +10";
        var fadeInAction = cc.fadeIn(.1);
        var moveAction = cc.moveBy(1, cc.p(0, 0));
        var fadeOutAction = cc.fadeOut(0);
        var seq = cc.sequence(fadeInAction, moveAction, fadeOutAction);
        this.node.runAction(seq);
      },
      removeLabel: function removeLabel() {
        cc.log("removeLabel");
      },
      showLabel: function showLabel() {
        cc.log("showLabel");
      }
    });
    cc._RF.pop();
  }, {} ],
  rankList: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a072z+B2hBkYHAjc36nhuU", "rankList");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        head_img: cc.Node,
        rank_n: cc.Node,
        rank_name: cc.Node,
        rank_cj: cc.Node,
        rank_bg: cc.Node
      },
      start: function start() {},
      init: function init(data) {
        var that = this;
        this.rank_n.getComponent(cc.Label).string = "No." + data.rank_n;
        this.rank_name.getComponent(cc.Label).string = data.rank_name;
        this.rank_cj.getComponent(cc.Label).string = data.rank_cj + "分";
        data.head_img && cc.loader.load({
          url: data.head_img,
          type: "png"
        }, function(err, texture) {
          that.head_img.getChildByName("h").getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        });
        if ("1" == data.rank_status) {
          cc.loader.loadRes("page_img/phb_g2.png", cc.SpriteFrame, function(err, spriteFrame) {
            that.rank_bg.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            that.rank_n.color = new cc.Color(255, 255, 255, 255);
            that.rank_name.color = new cc.Color(255, 255, 255, 255);
            that.rank_cj.color = new cc.Color(255, 255, 255, 255);
          });
          cc.loader.loadRes("page_img/headBox1.png", cc.SpriteFrame, function(err, spriteFrame) {
            that.head_img.getChildByName("box").getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  spriteCreator: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4310ceORutFCrUEBpToyuTd", "spriteCreator");
    "use strict";
    var spriteCreator = function() {
      var spriteFrameCache = null;
      return {
        createNewLand: function createNewLand(width) {
          var newLand = new cc.Node("Land");
          newLand.anchorX = 0;
          newLand.anchorY = 0;
          var sprite = newLand.addComponent(cc.Sprite);
          sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
          newLand.color = cc.Color.BLACK;
          newLand.height = 300;
          newLand.width = width;
          var redLand = new cc.Node("Red Land");
          redLand.anchorY = 1;
          var redSprite = redLand.addComponent(cc.Sprite);
          redSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
          redLand.color = cc.Color.RED;
          redLand.parent = newLand;
          redLand.height = 10;
          redLand.width = 10;
          redLand.setPosition(newLand.width / 2, newLand.height);
          if (spriteFrameCache) {
            sprite.spriteFrame = spriteFrameCache;
            redSprite.spriteFrame = spriteFrameCache;
          } else cc.loader.loadRes("hero/blank", cc.SpriteFrame, function(err, SpriteFrame) {
            sprite.spriteFrame = SpriteFrame;
            redSprite.spriteFrame = SpriteFrame;
            spriteFrameCache = SpriteFrame;
          });
          newLand.center = redLand;
          return newLand;
        },
        createStick: function createStick(width) {
          var stick = new cc.Node("stick");
          stick.anchorY = 0;
          stick.y = 300;
          var sprite = stick.addComponent(cc.Sprite);
          sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
          sprite.spriteFrame = spriteFrameCache;
          stick.color = cc.Color.BLACK;
          stick.width = width;
          stick.height = 0;
          return stick;
        }
      };
    }();
    module.exports = spriteCreator;
    cc._RF.pop();
  }, {} ],
  "state-machine": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7e42dZP3uxCS5nmxgOIHv9d", "state-machine");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    (function webpackUniversalModuleDefinition(root, factory) {
      "object" === ("undefined" === typeof exports ? "undefined" : _typeof(exports)) && "object" === ("undefined" === typeof module ? "undefined" : _typeof(module)) ? module.exports = factory() : "function" === typeof define && define.amd ? define("StateMachine", [], factory) : "object" === ("undefined" === typeof exports ? "undefined" : _typeof(exports)) ? exports["StateMachine"] = factory() : root["StateMachine"] = factory();
    })(void 0, function() {
      return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
          if (installedModules[moduleId]) return installedModules[moduleId].exports;
          var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
          };
          modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
          module.l = true;
          return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.i = function(value) {
          return value;
        };
        __webpack_require__.d = function(exports, name, getter) {
          __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            configurable: false,
            enumerable: true,
            get: getter
          });
        };
        __webpack_require__.n = function(module) {
          var getter = module && module.__esModule ? function getDefault() {
            return module["default"];
          } : function getModuleExports() {
            return module;
          };
          __webpack_require__.d(getter, "a", getter);
          return getter;
        };
        __webpack_require__.o = function(object, property) {
          return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 6);
      }([ function(module, exports, __webpack_require__) {
        module.exports = function(target, sources) {
          var n, source, key;
          for (n = 1; n < arguments.length; n++) {
            source = arguments[n];
            for (key in source) source.hasOwnProperty(key) && (target[key] = source[key]);
          }
          return target;
        };
      }, function(module, exports, __webpack_require__) {
        var mixin = __webpack_require__(0);
        module.exports = {
          build: function build(target, config) {
            var n, max, plugin, plugins = config.plugins;
            for (n = 0, max = plugins.length; n < max; n++) {
              plugin = plugins[n];
              plugin.methods && mixin(target, plugin.methods);
              plugin.properties && Object.defineProperties(target, plugin.properties);
            }
          },
          hook: function hook(fsm, name, additional) {
            var n, max, method, plugin, plugins = fsm.config.plugins, args = [ fsm.context ];
            additional && (args = args.concat(additional));
            for (n = 0, max = plugins.length; n < max; n++) {
              plugin = plugins[n];
              method = plugins[n][name];
              method && method.apply(plugin, args);
            }
          }
        };
      }, function(module, exports, __webpack_require__) {
        module.exports = function(label) {
          var n, word, words = label.split(/[_-]/), result = words[0];
          for (n = 1; n < words.length; n++) result = result + words[n].charAt(0).toUpperCase() + words[n].substring(1);
          return result;
        };
      }, function(module, exports, __webpack_require__) {
        var mixin = __webpack_require__(0), camelize = __webpack_require__(2);
        function Config(options, StateMachine) {
          options = options || {};
          this.options = options;
          this.defaults = StateMachine.defaults;
          this.states = [];
          this.transitions = [];
          this.map = {};
          this.lifecycle = this.configureLifecycle();
          this.init = this.configureInitTransition(options.init);
          this.data = this.configureData(options.data);
          this.methods = this.configureMethods(options.methods);
          this.map[this.defaults.wildcard] = {};
          this.configureTransitions(options.transitions || []);
          this.plugins = this.configurePlugins(options.plugins, StateMachine.plugin);
        }
        mixin(Config.prototype, {
          addState: function addState(name) {
            if (!this.map[name]) {
              this.states.push(name);
              this.addStateLifecycleNames(name);
              this.map[name] = {};
            }
          },
          addStateLifecycleNames: function addStateLifecycleNames(name) {
            this.lifecycle.onEnter[name] = camelize("on-enter-" + name);
            this.lifecycle.onLeave[name] = camelize("on-leave-" + name);
            this.lifecycle.on[name] = camelize("on-" + name);
          },
          addTransition: function addTransition(name) {
            if (this.transitions.indexOf(name) < 0) {
              this.transitions.push(name);
              this.addTransitionLifecycleNames(name);
            }
          },
          addTransitionLifecycleNames: function addTransitionLifecycleNames(name) {
            this.lifecycle.onBefore[name] = camelize("on-before-" + name);
            this.lifecycle.onAfter[name] = camelize("on-after-" + name);
            this.lifecycle.on[name] = camelize("on-" + name);
          },
          mapTransition: function mapTransition(transition) {
            var name = transition.name, from = transition.from, to = transition.to;
            this.addState(from);
            "function" !== typeof to && this.addState(to);
            this.addTransition(name);
            this.map[from][name] = transition;
            return transition;
          },
          configureLifecycle: function configureLifecycle() {
            return {
              onBefore: {
                transition: camelize("on-before-transition")
              },
              onAfter: {
                transition: camelize("on-after-transition")
              },
              onEnter: {
                state: camelize("on-enter-state")
              },
              onLeave: {
                state: camelize("on-leave-state")
              },
              on: {
                transition: camelize("on-transition")
              }
            };
          },
          configureInitTransition: function configureInitTransition(init) {
            if ("string" === typeof init) return this.mapTransition(mixin({}, this.defaults.init, {
              to: init,
              active: true
            }));
            if ("object" === ("undefined" === typeof init ? "undefined" : _typeof(init))) return this.mapTransition(mixin({}, this.defaults.init, init, {
              active: true
            }));
            this.addState(this.defaults.init.from);
            return this.defaults.init;
          },
          configureData: function configureData(data) {
            return "function" === typeof data ? data : "object" === ("undefined" === typeof data ? "undefined" : _typeof(data)) ? function() {
              return data;
            } : function() {
              return {};
            };
          },
          configureMethods: function configureMethods(methods) {
            return methods || {};
          },
          configurePlugins: function configurePlugins(plugins, builtin) {
            plugins = plugins || [];
            var n, max, plugin;
            for (n = 0, max = plugins.length; n < max; n++) {
              plugin = plugins[n];
              "function" === typeof plugin && (plugins[n] = plugin = plugin());
              plugin.configure && plugin.configure(this);
            }
            return plugins;
          },
          configureTransitions: function configureTransitions(transitions) {
            var i, n, transition, from, to, wildcard = this.defaults.wildcard;
            for (n = 0; n < transitions.length; n++) {
              transition = transitions[n];
              from = Array.isArray(transition.from) ? transition.from : [ transition.from || wildcard ];
              to = transition.to || wildcard;
              for (i = 0; i < from.length; i++) this.mapTransition({
                name: transition.name,
                from: from[i],
                to: to
              });
            }
          },
          transitionFor: function transitionFor(state, transition) {
            var wildcard = this.defaults.wildcard;
            return this.map[state][transition] || this.map[wildcard][transition];
          },
          transitionsFor: function transitionsFor(state) {
            var wildcard = this.defaults.wildcard;
            return Object.keys(this.map[state]).concat(Object.keys(this.map[wildcard]));
          },
          allStates: function allStates() {
            return this.states;
          },
          allTransitions: function allTransitions() {
            return this.transitions;
          }
        });
        module.exports = Config;
      }, function(module, exports, __webpack_require__) {
        var mixin = __webpack_require__(0), Exception = __webpack_require__(5), plugin = __webpack_require__(1), UNOBSERVED = [ null, [] ];
        function JSM(context, config) {
          this.context = context;
          this.config = config;
          this.state = config.init.from;
          this.observers = [ context ];
        }
        mixin(JSM.prototype, {
          init: function init(args) {
            mixin(this.context, this.config.data.apply(this.context, args));
            plugin.hook(this, "init");
            if (this.config.init.active) return this.fire(this.config.init.name, []);
          },
          is: function is(state) {
            return Array.isArray(state) ? state.indexOf(this.state) >= 0 : this.state === state;
          },
          isPending: function isPending() {
            return this.pending;
          },
          can: function can(transition) {
            return !this.isPending() && !!this.seek(transition);
          },
          cannot: function cannot(transition) {
            return !this.can(transition);
          },
          allStates: function allStates() {
            return this.config.allStates();
          },
          allTransitions: function allTransitions() {
            return this.config.allTransitions();
          },
          transitions: function transitions() {
            return this.config.transitionsFor(this.state);
          },
          seek: function seek(transition, args) {
            var wildcard = this.config.defaults.wildcard, entry = this.config.transitionFor(this.state, transition), to = entry && entry.to;
            return "function" === typeof to ? to.apply(this.context, args) : to === wildcard ? this.state : to;
          },
          fire: function fire(transition, args) {
            return this.transit(transition, this.state, this.seek(transition, args), args);
          },
          transit: function transit(transition, from, to, args) {
            var lifecycle = this.config.lifecycle, changed = this.config.options.observeUnchangedState || from !== to;
            if (!to) return this.context.onInvalidTransition(transition, from, to);
            if (this.isPending()) return this.context.onPendingTransition(transition, from, to);
            this.config.addState(to);
            this.beginTransit();
            args.unshift({
              transition: transition,
              from: from,
              to: to,
              fsm: this.context
            });
            return this.observeEvents([ this.observersForEvent(lifecycle.onBefore.transition), this.observersForEvent(lifecycle.onBefore[transition]), changed ? this.observersForEvent(lifecycle.onLeave.state) : UNOBSERVED, changed ? this.observersForEvent(lifecycle.onLeave[from]) : UNOBSERVED, this.observersForEvent(lifecycle.on.transition), changed ? [ "doTransit", [ this ] ] : UNOBSERVED, changed ? this.observersForEvent(lifecycle.onEnter.state) : UNOBSERVED, changed ? this.observersForEvent(lifecycle.onEnter[to]) : UNOBSERVED, changed ? this.observersForEvent(lifecycle.on[to]) : UNOBSERVED, this.observersForEvent(lifecycle.onAfter.transition), this.observersForEvent(lifecycle.onAfter[transition]), this.observersForEvent(lifecycle.on[transition]) ], args);
          },
          beginTransit: function beginTransit() {
            this.pending = true;
          },
          endTransit: function endTransit(result) {
            this.pending = false;
            return result;
          },
          doTransit: function doTransit(lifecycle) {
            this.state = lifecycle.to;
          },
          observe: function observe(args) {
            if (2 === args.length) {
              var observer = {};
              observer[args[0]] = args[1];
              this.observers.push(observer);
            } else this.observers.push(args[0]);
          },
          observersForEvent: function observersForEvent(event) {
            var n = 0, max = this.observers.length, observer, result = [];
            for (;n < max; n++) {
              observer = this.observers[n];
              observer[event] && result.push(observer);
            }
            return [ event, result, true ];
          },
          observeEvents: function observeEvents(events, args, previousEvent) {
            if (0 === events.length) return this.endTransit(true);
            var event = events[0][0], observers = events[0][1], pluggable = events[0][2];
            args[0].event = event;
            event && pluggable && event !== previousEvent && plugin.hook(this, "lifecycle", args);
            if (0 === observers.length) {
              events.shift();
              return this.observeEvents(events, args, event);
            }
            var observer = observers.shift(), result = observer[event].apply(observer, args);
            return result && "function" === typeof result.then ? result.then(this.observeEvents.bind(this, events, args, event)).catch(this.endTransit.bind(this)) : false === result ? this.endTransit(false) : this.observeEvents(events, args, event);
          },
          onInvalidTransition: function onInvalidTransition(transition, from, to) {},
          onPendingTransition: function onPendingTransition(transition, from, to) {
            throw new Exception("transition is invalid while previous transition is still in progress", transition, from, to, this.state);
          }
        });
        module.exports = JSM;
      }, function(module, exports, __webpack_require__) {
        module.exports = function(message, transition, from, to, current) {
          this.message = message;
          this.transition = transition;
          this.from = from;
          this.to = to;
          this.current = current;
        };
      }, function(module, exports, __webpack_require__) {
        var mixin = __webpack_require__(0), camelize = __webpack_require__(2), plugin = __webpack_require__(1), Config = __webpack_require__(3), JSM = __webpack_require__(4);
        var PublicMethods = {
          is: function is(state) {
            return this._fsm.is(state);
          },
          can: function can(transition) {
            return this._fsm.can(transition);
          },
          cannot: function cannot(transition) {
            return this._fsm.cannot(transition);
          },
          observe: function observe() {
            return this._fsm.observe(arguments);
          },
          transitions: function transitions() {
            return this._fsm.transitions();
          },
          allTransitions: function allTransitions() {
            return this._fsm.allTransitions();
          },
          allStates: function allStates() {
            return this._fsm.allStates();
          },
          onInvalidTransition: function onInvalidTransition(t, from, to) {
            return this._fsm.onInvalidTransition(t, from, to);
          },
          onPendingTransition: function onPendingTransition(t, from, to) {
            return this._fsm.onPendingTransition(t, from, to);
          }
        };
        var PublicProperties = {
          state: {
            configurable: false,
            enumerable: true,
            get: function get() {
              return this._fsm.state;
            },
            set: function set(state) {
              throw Error("use transitions to change state");
            }
          }
        };
        function StateMachine(options) {
          return apply(this || {}, options);
        }
        function factory() {
          var cstor, options;
          if ("function" === typeof arguments[0]) {
            cstor = arguments[0];
            options = arguments[1] || {};
          } else {
            cstor = function cstor() {
              this._fsm.apply(this, arguments);
            };
            options = arguments[0] || {};
          }
          var config = new Config(options, StateMachine);
          build(cstor.prototype, config);
          cstor.prototype._fsm.config = config;
          return cstor;
        }
        function apply(instance, options) {
          var config = new Config(options, StateMachine);
          build(instance, config);
          instance._fsm();
          return instance;
        }
        function build(target, config) {
          if ("object" !== ("undefined" === typeof target ? "undefined" : _typeof(target)) || Array.isArray(target)) throw Error("StateMachine can only be applied to objects");
          plugin.build(target, config);
          Object.defineProperties(target, PublicProperties);
          mixin(target, PublicMethods);
          mixin(target, config.methods);
          config.allTransitions().forEach(function(transition) {
            target[camelize(transition)] = function() {
              return this._fsm.fire(transition, [].slice.call(arguments));
            };
          });
          target._fsm = function() {
            this._fsm = new JSM(this, config);
            this._fsm.init(arguments);
          };
        }
        StateMachine.version = "3.0.0-rc.1";
        StateMachine.factory = factory;
        StateMachine.apply = apply;
        StateMachine.defaults = {
          wildcard: "*",
          init: {
            name: "init",
            from: "none"
          }
        };
        module.exports = StateMachine;
      } ]);
    });
    cc._RF.pop();
  }, {} ],
  storageManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "10710Cz8ZRCqLlVtCy4fcaY", "storageManager");
    "use strict";
    var storageManager = function() {
      var spriteFrameCache = null;
      cc.sys.localStorage.highestScore || (cc.sys.localStorage.highestScore = 0);
      return {
        getHighestScore: function getHighestScore() {
          return cc.sys.localStorage.highestScore;
        },
        setHighestScore: function setHighestScore(score) {
          cc.sys.localStorage.highestScore = score;
        }
      };
    }();
    module.exports = storageManager;
    cc._RF.pop();
  }, {} ]
}, {}, [ "backgroundLoader", "bkqList", "btn", "config", "giftList", "landMaker", "page", "perfectLabel", "rankList", "spriteCreator", "state-machine", "storageManager" ]);