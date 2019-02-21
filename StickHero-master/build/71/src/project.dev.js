require = function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
}()({
  Hall: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4e723XX1VVBKrkIxGH9dFRb", "Hall");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {},
      showAlertText: function showAlertText() {
        Alert.show("难道还有这种操作？");
      },
      showAlertCallBack: function showAlertCallBack() {
        Alert.show("难道还有这种操作？", function() {
          cc.log("确定按钮被点击！");
        });
      },
      showAlertOnlayEnter: function showAlertOnlayEnter() {
        Alert.show("难道还有这种操作？", null, false);
      },
      showAlertAnimSpeed: function showAlertAnimSpeed() {
        Alert.show("难道还有这种操作？", null, null, .1);
      }
    });
    cc._RF.pop();
  }, {} ],
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
        var randomNum = "bg" + Win_Global.mySelectLv;
        var bgSprite = this.node.getComponent(cc.Sprite);
        cc.loader.loadRes("hero/" + randomNum, cc.SpriteFrame, function(err, SpriteFrame) {
          bgSprite.spriteFrame = SpriteFrame;
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
        cc.director.loadScene("MainGameScene");
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
        1: 5,
        2: 2,
        3: 20
      },
      nandu_id: 2,
      token: "c39f5e17087e16ea36870cf613c607dc",
      is_team: 0,
      gx_score: 0,
      jl_score: 0,
      gx_run_num: 0,
      jl_run_num: 0,
      myNandu: 1,
      path: "http://www.oneh5.com/yjl/party_answer/front_api/api/",
      configFunc: function configFunc() {
        cc.log(" window function ");
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
          gameDirector.stickLengthen = true;
          gameDirector.stick = gameDirector.createStick();
          gameDirector.stick.x = gameDirector.hero.x + gameDirector.hero.width * (1 - gameDirector.hero.anchorX) + gameDirector.stick.width * gameDirector.stick.anchorX;
          var ani = gameDirector.hero.getComponent(cc.Animation);
          ani.play("heroPush");
        },
        onHeroTick: function onHeroTick() {
          gameDirector.stickLengthen = false;
          var ani = gameDirector.hero.getComponent(cc.Animation);
          ani.play("heroTick");
        },
        onStickFall: function onStickFall() {
          var stickFall = cc.rotateBy(.5, 90);
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
          gameDirector.woodAudioPlay();
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
          run_start++;
          Win_Global.gx_run_num = run_start;
          gameDirector.runRange.string = run_start + "/" + run_num[nandu_id] + "（" + nanduArr[nandu_id - 1] + " 模式）";
          if (run_start >= run_num[nandu_id]) {
            gameDirector.endLabel.node.active = true;
            gameDirector.endScore.string = Win_Global.gx_score + "分";
          } else {
            var callFunc = cc.callFunc(function() {
              gameDirector.registerEvent();
            });
            gameDirector.landCreateAndMove(callFunc);
          }
        },
        onHeroMoveToStickEnd: function onHeroMoveToStickEnd() {
          gameDirector.woodAudioPlay();
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
          var callFunc = cc.callFunc(function() {
            fsm.gameOver();
          });
          gameDirector.stickAndHeroDownAction(callFunc);
        },
        onGameOver: function onGameOver() {
          gameDirector.overLabel.node.active = true;
          gameDirector.failAudioPlay();
        },
        onRestart: function onRestart() {
          cc.director.loadScene("MainGameScene");
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
        scoreLabel: cc.Label,
        hightestScoreLabel: cc.Label,
        overLabel: cc.Label,
        perfectLabel: cc.Node,
        endScore: cc.Label,
        endLabel: cc.Label,
        bgAudio: cc.AudioSource,
        paoAudio: cc.AudioSource,
        woodAudio: cc.AudioSource,
        failAudio: cc.AudioSource,
        ans: cc.Node,
        ans_time: cc.Label,
        video: cc.Node,
        videoPlayer: cc.VideoPlayer,
        runRange: cc.Label
      },
      onLoad: function onLoad() {
        gameDirector = this;
        run_num = Win_Global.run_num;
        run_start = Win_Global.jl_run_num;
        nandu_id = Win_Global.nandu_id;
        this.runLength = 0, this.stick = null;
        this.stickLengthen = false;
        this.score = Win_Global.jl_score;
        this.scoreLabel.string = "得分：" + this.score;
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
        this.bgAudioPlay();
        cc.log("当前难度系数：" + nandu_id);
        this.runRange.string = run_start + "/" + run_num[nandu_id] + "（" + nanduArr[nandu_id - 1] + " 模式）";
        this.showAnsListInfoFunc();
        var that = this;
        that.endLabel.node.getChildByName("opacity").on(cc.Node.EventType.TOUCH_START, function(e) {
          e.stopPropagation();
        });
        that.overLabel.node.getChildByName("opacity").on(cc.Node.EventType.TOUCH_START, function(e) {
          e.stopPropagation();
        });
        that.video.on(cc.Node.EventType.TOUCH_START, function(e) {
          e.stopPropagation();
        });
        that.ans.on(cc.Node.EventType.TOUCH_START, function(e) {
          e.stopPropagation();
        });
      },
      bgAudioPlay: function bgAudioPlay() {
        this.bgAudio.isPlaying || this.bgAudio.play();
      },
      bgAudioPause: function bgAudioPause() {
        this.bgAudio.pause();
      },
      paoAudioPlay: function paoAudioPlay() {
        this.paoAudio.isPlaying || this.paoAudio.play();
      },
      paoAudioPause: function paoAudioPause() {
        this.paoAudio.pause();
      },
      woodAudioPlay: function woodAudioPlay() {
        this.woodAudio.isPlaying || this.woodAudio.play();
      },
      woodAudioPause: function woodAudioPause() {
        this.woodAudio.pause();
      },
      failAudioPlay: function failAudioPlay() {
        this.failAudio.isPlaying || this.failAudio.play();
      },
      failAudioPause: function failAudioPause() {
        this.failAudio.pause();
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
        this.paoAudioPlay();
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
        console.log("xx");
        var range = this.getLandRange();
        this.secondLand.setPosition(this.runLength + winSize.width, 0);
        var l = winSize.width - range - this.heroWorldPosX - this.hero.width * this.hero.anchorX - this.stickWidth;
        var secondAction = cc.moveBy(this.moveDuration, cc.p(-l, 0));
        var seq = cc.sequence(secondAction, callFunc);
        this.secondLand.runAction(seq);
      },
      createStick: function createStick() {
        var stick = spriteCreator.createStick(this.stickWidth);
        stick.parent = this.node;
        return stick;
      },
      createNewLand: function createNewLand() {
        this.secondLand = spriteCreator.createNewLand(this.getLandWidth());
        this.secondLand.parent = this.node;
      },
      getScore: function getScore(num) {
        num ? this.score += num : this.score++;
        if (storageManager.getHighestScore() < this.score) {
          storageManager.setHighestScore(this.score);
          this.changeHightestScoreLabel();
        }
        this.scoreLabel.string = "得分：" + this.score;
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
        1 == nandu_id ? randFloat = .2 + .5 * Math.random() : 2 == nandu_id ? randFloat = .1 + .3 * Math.random() : 3 == nandu_id && (randFloat = .1 * Math.random());
        return this.landWidth.x + (this.landWidth.y - this.landWidth.x) * randFloat;
      },
      selectFhTypeFunc: function selectFhTypeFunc(e, data) {
        var that = this;
        this.overLabel.node.active = false;
        this.bgAudioPause();
        Win_Global.jl_score = Win_Global.gx_score;
        Win_Global.jl_run_num = Win_Global.gx_run_num;
        if (1 == data) {
          this.showAnsListInfoFunc();
          this.ans.active = true;
          var vTime = 10;
          this.callback = function() {
            vTime--;
            that.ans_time.string = vTime;
            if (vTime <= 0) {
              this.unschedule(this.callback);
              this.video.active = false;
              fsm.restart();
            }
          };
          this.schedule(this.callback, 1);
        } else 2 == data ? this.video.active = true : 3 == data;
      },
      showAnsListInfoFunc: function showAnsListInfoFunc() {
        var that = this;
        var ansTitle = cc.find("title", that.ans);
        var ans1 = cc.find("ansList/ansBtn1/ans_text", that.ans);
        var ans2 = cc.find("ansList/ansBtn2/ans_text", that.ans);
        var ans3 = cc.find("ansList/ansBtn3/ans_text", that.ans);
        var ans4 = cc.find("ansList/ansBtn4/ans_text", that.ans);
        that.ajaxPostFun(Win_Global.path + "/answer.php?action=topic", "token=" + Win_Global.token, function(res) {
          console.log(res);
          if (1 == res.code) {
            ansTitle.string = res.data.topic;
            ans1.string = res.data.answer1;
            ans2.string = res.data.answer2;
            ans3.string = res.data.answer3;
            ans4.string = res.data.answer4;
          }
        });
      },
      selectAnsFunc: function selectAnsFunc(e, data) {
        var ansArr = {
          1: "A",
          2: "B",
          3: "C",
          4: "D"
        };
        cc.log("你选择的答案是：" + ansArr[data]);
      },
      videoPlayerEvent: function videoPlayerEvent(sender, event) {
        this.videoPlayer.play();
        var vTime = 10;
        this.callback = function() {
          vTime--;
          if (vTime <= 0) {
            this.unschedule(this.callback);
            this.video.active = false;
            fsm.restart();
          }
        };
        this.schedule(this.callback, 1);
      },
      ajaxPostFun: function ajaxPostFun(ServerLink, str, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", ServerLink);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(str);
        xhr.onreadystatechange = function() {
          if (4 == xhr.readyState && xhr.status >= 200 && xhr.status <= 207) {
            var result = JSON.parse(xhr.responseText);
            callback(result);
          }
        };
      },
      goHomeFunc: function goHomeFunc() {
        cc.director.loadScene("page");
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
        is_team: 0,
        team_name_3: cc.Label,
        cj_n_3: cc.Label,
        user_rank: cc.Prefab,
        my_rank: cc.Label,
        team_rank: cc.Prefab,
        my_team_rank: cc.Label,
        team: cc.Prefab,
        gift: cc.Prefab,
        bkq: cc.Prefab,
        music_btn: cc.Node,
        musicAudio: cc.AudioSource
      },
      start: function start() {
        var that = this;
        this.setGoInFunc();
        this.showTeamListInfoFunc();
        this.showUserGiftInfoFunc();
        this.showRuleGiftInfoFunc();
        that.showMusicType();
        cc.find("telLayer/opacity", that.nav6).on(cc.Node.EventType.TOUCH_START, function(e) {
          e.stopPropagation();
        });
      },
      showMusicType: function showMusicType() {
        var that = this;
        var musicBtnRotation = function musicBtnRotation() {
          "1" != cc.sys.localStorage.getItem("musicIsOpen2") ? that.unschedule(musicBtnRotation) : 360 == that.music_btn.rotation ? that.music_btn.rotation = 0 : that.music_btn.rotation++;
        };
        if ("1" == cc.sys.localStorage.getItem("musicIsOpen2")) {
          cc.loader.loadRes("page_img/ad.png", cc.SpriteFrame, function(err, spriteFrame) {
            that.music_btn.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          that.musicAudioPlay();
          that.schedule(musicBtnRotation, .01);
        } else {
          that.music_btn.rotation = 0;
          cc.loader.loadRes("page_img/nav3-51.png", cc.SpriteFrame, function(err, spriteFrame) {
            that.music_btn.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          that.musicAudioPause();
        }
      },
      toggleMusicTypeFunc: function toggleMusicTypeFunc() {
        var that = this;
        var musicBtnRotation1 = function musicBtnRotation1() {
          "1" != cc.sys.localStorage.getItem("musicIsOpen2") ? that.unschedule(musicBtnRotation1) : 360 == that.music_btn.rotation ? that.music_btn.rotation = 0 : that.music_btn.rotation++;
        };
        if ("1" == cc.sys.localStorage.getItem("musicIsOpen2")) {
          cc.sys.localStorage.setItem("musicIsOpen2", "0");
          that.music_btn.rotation = 0;
          cc.loader.loadRes("page_img/nav3-51.png", cc.SpriteFrame, function(err, spriteFrame) {
            that.music_btn.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          that.musicAudioPause();
        } else {
          cc.sys.localStorage.setItem("musicIsOpen2", "1");
          cc.loader.loadRes("page_img/ad.png", cc.SpriteFrame, function(err, spriteFrame) {
            that.music_btn.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          that.musicAudioPlay();
          that.schedule(musicBtnRotation1, .01);
        }
      },
      musicAudioPlay: function musicAudioPlay() {
        this.musicAudio.isPlaying || this.musicAudio.play();
      },
      musicAudioPause: function musicAudioPause() {
        this.musicAudio.pause();
      },
      setGoInFunc: function setGoInFunc() {
        var that = this;
        that.animationComFunc(that.nav1.getChildByName("btn"), {
          0: cc.fadeIn(.5),
          1: cc.moveTo(.5, 0, -310)
        }, 500);
        setTimeout(function() {
          that.nav1.getChildByName("bg1").runAction(cc.repeatForever(cc.sequence(cc.fadeIn(.5), cc.fadeOut(.3))));
        }, 1e3);
      },
      startChangzhengFunc: function startChangzhengFunc() {
        var that = this;
        that.nav1.active = false;
        if (0 == that.is_team) {
          that.nav3.active = true;
          that.setLvPositionFunc();
        } else that.nav2.active = true;
        wx.login({
          success: function success() {
            wx.getUserInfo({
              success: function success(res) {
                console.log("用户已授权");
                console.log(res);
              },
              fail: function fail(res) {
                console.log(res);
                (res.errMsg.indexOf("auth deny") > -1 || res.errMsg.indexOf("auth denied") > -1) && console.log("拒绝授权");
              }
            });
          }
        });
        wx.getSetting({
          success: function success(res) {
            var authSetting = res.authSetting;
            true === authSetting["scope.userInfo"] ? console.log("用户已授权2") : false === authSetting["scope.userInfo"] ? console.log("拒绝授权2") : console.log("授权");
          }
        });
      },
      showTeamListInfoFunc: function showTeamListInfoFunc() {
        var that = this;
        that.ajaxPostFun(Win_Global.path + "/user.php?action=team_list", null, function(res) {
          console.log(res);
          if (1 == res.code) {
            for (var i = 0; i < res.data.length; i++) {
              var node = cc.instantiate(that.team);
              var scene = cc.find("teams/view/content", that.nav2);
              node.setPosition(0, -50 - 120 * i);
              node.getComponent("teamList").init({
                team_name: res.data[i].team_name,
                team_id: res.data[i].id
              });
              scene.addChild(node);
            }
            cc.find("teams/view/content", that.nav2).height = 100 * res.data.length + 160;
          }
        });
      },
      selectTeamFunc: function selectTeamFunc() {
        var that = this;
        var select_team_id = Win_Global.select_team_id;
        var select_team_name = Win_Global.select_team_name;
        0 == select_team_id ? Alert.show("没有选择战队！", null, false, .1) : Alert.show("你选择的是：“" + select_team_name + "”战队，选择后将不能更改战队！", function() {
          console.log(select_team_id + "        ;;;;;;;;;;;    " + Win_Global.token);
          that.ajaxPostFun(Win_Global.path + "/user.php?action=team_change", "token=" + Win_Global.token + "&team_id=" + select_team_id, function(res) {
            console.log(res);
            if (1 == res.code) {
              that.nav2.active = false;
              that.nav3.active = true;
              that.setLvPositionFunc();
            }
          });
        }, null, .1);
      },
      setLvPositionFunc: function setLvPositionFunc() {
        var that = this;
        var lv = 1;
        that.ajaxPostFun(Win_Global.path + "/user.php?action=get_userinfo", "token=" + Win_Global.token, function(res) {
          if (1 == res.code) for (var i in res.data.pass_list) 0 == res.data.pass_list[i].is_lock && lv++;
          that.team_name_3.string = "测试战队";
          that.cj_n_3.string = "99分";
        });
        Win_Global.myMaxLv = lv;
        var myMaxLv = lv;
        that.animationComFunc(cc.find("top/user", that.nav3), {
          0: cc.fadeIn(.8),
          1: cc.moveTo(.8, -160, 390)
        }, 0);
        that.animationComFunc(cc.find("top/rule", that.nav3), {
          0: cc.fadeIn(1),
          1: cc.moveTo(.5, 220, 390)
        }, 500);
        that.animationComFunc(that.nav3.getChildByName("map"), {
          0: cc.fadeIn(.5),
          1: cc.scaleTo(.5, 1, 1)
        }, 1e3);
        that.animationComFunc(that.nav3.getChildByName("start"), {
          0: cc.fadeIn(.8),
          1: cc.moveTo(.8, 0, -259)
        }, 500);
        that.animationComFunc(that.nav3.getChildByName("rank"), {
          0: cc.fadeIn(.5),
          1: cc.moveTo(.5, 0, -375)
        }, 1e3);
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
          cc.find("map/" + lvPositionArr[i].lv, that.nav3).width = 30;
          cc.find("map/" + lvPositionArr[i].lv, that.nav3).height = 30;
        }
        cc.loader.loadRes("page_img/nav3-51a.png", cc.SpriteFrame, function(err, spriteFrame) {
          for (var i = 1; i <= myMaxLv - 1; i++) cc.find("map/lv" + i, that.nav3).getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        cc.loader.loadRes("page_img/suo.png", cc.SpriteFrame, function(err, spriteFrame) {
          for (var i = myMaxLv + 1; i <= 7; i++) cc.find("map/lv" + i, that.nav3).getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        cc.loader.loadRes("page_img/nav3-51.png", cc.SpriteFrame, function(err, spriteFrame) {
          cc.find("map/lv" + myMaxLv, that.nav3).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          cc.find("map/lv" + myMaxLv, that.nav3).width = 50;
          cc.find("map/lv" + myMaxLv, that.nav3).height = 50;
        });
      },
      selectLvFunc: function selectLvFunc(event, customEventData) {
        var that = this;
        var myMaxLv = Win_Global.myMaxLv;
        that.ajaxPostFun(Win_Global.path + "/user.php?action=diff_list", "token=" + Win_Global.token + "&", function(res) {
          if (1 == res.code) for (var i in res.data.pass_list) 0 == res.data.pass_list[i].is_lock && lv++;
        });
        if (customEventData <= myMaxLv) {
          Win_Global.mySelectLv = customEventData;
          cc.loader.loadRes("page_img/nav3-51a.png", cc.SpriteFrame, function(err, spriteFrame) {
            for (var i = 1; i <= myMaxLv; i++) {
              cc.find("map/lv" + i, that.nav3).getComponent(cc.Sprite).spriteFrame = spriteFrame;
              cc.find("map/lv" + i, that.nav3).width = 30;
              cc.find("map/lv" + i, that.nav3).height = 30;
            }
          });
          cc.loader.loadRes("page_img/nav3-51.png", cc.SpriteFrame, function(err, spriteFrame) {
            if (customEventData <= myMaxLv) {
              cc.find("map/lv" + customEventData, that.nav3).getComponent(cc.Sprite).spriteFrame = spriteFrame;
              cc.find("map/lv" + customEventData, that.nav3).width = 50;
              cc.find("map/lv" + customEventData, that.nav3).height = 50;
            }
          });
        } else Alert.show("当前关卡未解锁！", null, false, .1);
      },
      lvBeforeStartFunc: function lvBeforeStartFunc() {
        this.nav3.active = false;
        this.nav4.active = true;
        this.setNanduShowFunc();
      },
      rankFunc: function rankFunc() {
        this.nav3.active = false;
        this.nav5.active = true;
        this.showUserRankDataFunc();
        this.showTeamRankDataFunc();
      },
      userFunc: function userFunc() {
        this.nav3.active = false;
        this.nav6.active = true;
      },
      setNanduShowFunc: function setNanduShowFunc() {
        var that = this;
        for (var i = 1; i <= 3; i++) i > Win_Global.myNandu ? cc.find("nandu/nd" + i, that.nav4).getChildByName("suo").active = true : cc.find("nandu/nd" + i, that.nav4).getChildByName("suo").active = false;
        that.animationComFunc(that.nav4.getChildByName("ren"), {
          0: cc.fadeIn(1),
          1: cc.moveTo(.8, 94, -246)
        }, 500);
      },
      selectNanduFunc: function selectNanduFunc(e, data) {
        var that = this;
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
        if (data > Win_Global.myNandu) {
          var layerText = "";
          layerText = 1 == Win_Global.myNandu && 2 == data ? "同志，你需要先通关“积极分子”关卡，才能解锁“预备党员”关卡。加油！" : "同志，你需要先通关“预备党员”关卡，才能解锁“中共党员”关卡。加油！";
          Alert.show(layerText, null, false, .1);
        } else {
          that.nav4.active = false;
          that.nav8.active = true;
        }
      },
      showUserRankDataFunc: function showUserRankDataFunc() {
        var that = this;
        cc.log(Win_Global.token);
        that.ajaxPostFun(Win_Global.path + "/rand.php?action=one_rand", "token=" + Win_Global.token, function(res) {
          cc.log("11");
          console.log(res);
          cc.log("22");
          if (1 == res.code) {
            for (var i = 0; i < res.data.rand.length; i++) {
              var node = cc.instantiate(that.user_rank);
              var scene = cc.find("box/rank_box1/view/content", that.nav5);
              node.setPosition(0, -65 - 130 * i);
              node.getComponent("rankList").init({
                head_img: res.data.rand[i].head_img,
                rank_n: res.data.rand[i].rand,
                rank_name: res.data.rand[i].nickname,
                rank_cj: res.data.rand[i].score,
                rank_status: res.data.rand[i].status
              });
              scene.addChild(node);
            }
            that.my_rank.string = "我的排名：" + res.data.my_rand;
            cc.find("box/rank_box1/view/content", that.nav5).height = 130 * res.data.rand.length;
            cc.find("box/rank_box1/scrollBar", that.nav5).active = false;
          }
        });
      },
      showTeamRankDataFunc: function showTeamRankDataFunc() {
        var that = this;
        that.ajaxPostFun(Win_Global.path + "/rand.php?action=team_rand", "token=" + Win_Global.token, function(res) {
          console.log(res);
          if (1 == res.code) {
            for (var i = 0; i < res.data.rand.length; i++) {
              var node = cc.instantiate(that.team_rank);
              var scene = cc.find("box/rank_box2/view/content", that.nav5);
              node.setPosition(0, -65 - 130 * i);
              node.getComponent("rankList_team").init({
                head_img: res.data.rand[i].team_img,
                rank_n: res.data.rand[i].rand,
                rank_name: res.data.rand[i].team_name,
                rank_cj: res.data.rand[i].score,
                rank_status: res.data.rand[i].status
              });
              scene.addChild(node);
            }
            that.my_team_rank.string = "我的战队排名：" + res.data.my_team_rand;
            cc.find("box/rank_box2/view/content", that.nav5).height = 130 * res.data.rand.length;
            cc.find("box/rank_box2/scrollBar", that.nav5).active = false;
          }
        });
      },
      toggleRankFunc: function toggleRankFunc(e, data) {
        var that = this;
        if (1 == data) {
          cc.loader.loadRes("page_img/rank_mya.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("btn/user", that.nav5).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.loader.loadRes("page_img/rank_team.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("btn/team", that.nav5).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.find("box/rank_box1", that.nav5).active = true;
          cc.find("box/rank_box2", that.nav5).active = false;
        } else {
          cc.loader.loadRes("page_img/rank_my.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("btn/user", that.nav5).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.loader.loadRes("page_img/rank_teama.png", cc.SpriteFrame, function(err, spriteFrame) {
            cc.find("btn/team", that.nav5).getComponent(cc.Sprite).spriteFrame = spriteFrame;
          });
          cc.find("box/rank_box1", that.nav5).active = false;
          cc.find("box/rank_box2", that.nav5).active = true;
        }
      },
      goToMyGiftFunc: function goToMyGiftFunc() {
        this.nav5.active = false;
        this.nav7.active = true;
        this.showUserGiftInfoFunc();
      },
      showUserGiftInfoFunc: function showUserGiftInfoFunc() {
        var that = this;
        that.ajaxPostFun(Win_Global.path + "/task.php?action=task_list", "token=" + Win_Global.token, function(res) {
          console.log(res);
          if (1 == res.code) {
            cc.find("top/head_box/t_name", that.nav6).getComponent(cc.Label).string = res.data.nickname;
            cc.find("top/head_box/left/num", that.nav6).getComponent(cc.Label).string = res.data.score;
            cc.find("top/head_box/right/num", that.nav6).getComponent(cc.Label).string = res.data.beike;
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
          }
        });
      },
      submitTelFunc: function submitTelFunc() {
        var that = this;
        var tel = cc.find("telLayer/box/input", that.nav6).getComponent(cc.EditBox).string;
        var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(tel)) that.ajaxPostFun(Win_Global.path + "/task.php?action=task_tel", "token=" + Win_Global.token + "&tel=" + tel, function(res) {
          if (1 == res.code) {
            cc.find("telLayer/box/errorText", that.nav6).active = false;
            cc.find("telLayer/box/errorText", that.nav6).getComponent(cc.Label).string = "";
            cc.find("telLayer", that.nav6).active = false;
          } else {
            cc.find("telLayer/box/errorText", that.nav6).active = true;
            cc.find("telLayer/box/errorText", that.nav6).getComponent(cc.Label).string = "系统异常";
          }
        }); else {
          cc.find("telLayer/box/errorText", that.nav6).active = true;
          cc.find("telLayer/box/errorText", that.nav6).getComponent(cc.Label).string = "手机号格式错误！";
        }
      },
      showRuleGiftInfoFunc: function showRuleGiftInfoFunc() {
        var that = this;
        that.ajaxPostFun(Win_Global.path + "/rand.php?action=week_prize", "token=" + Win_Global.token, function(res) {
          console.log(res);
          if (1 == res.code) {
            cc.find("box/view/content/bkq_box", that.nav7).active = true;
            cc.find("box/view/content/bkq_none", that.nav7).active = false;
            var userGfNum = res.data.length;
            for (var i = 0; i < res.data.length; i++) {
              var bkq = cc.instantiate(that.bkq);
              var scene = cc.find("box/view/content/bkq_box", that.nav7);
              bkq.setPosition(0, -200 - 300 * i);
              bkq.getComponent("bkqList").init({
                bkq_num: res.data[i].team_name,
                bkq_id: res.data[i].id,
                bkq_status: res.data[i].team_img
              });
              scene.addChild(bkq);
            }
            cc.find("box/view/content/rule_box", that.nav7).y = -650 - 300 * (userGfNum - 1);
            cc.find("box/view/content", that.nav7).height = 1050 + 300 * (userGfNum - 1);
          } else if (9004 == res.code) {
            cc.find("box/view/content/bkq_none", that.nav7).active = true;
            cc.find("box/view/content/bkq_box", that.nav7).active = false;
            cc.find("box/view/content/rule_box", that.nav7).y = -600;
            cc.find("box/view/content", that.nav7).height = 950;
          }
        });
      },
      goToGameFunc: function goToGameFunc() {
        cc.director.loadScene("MainGameScene");
        fsm.restart();
      },
      callbackFunc: function callbackFunc(e, data) {
        var that = this;
        if (5 == data) {
          var userRankArr = cc.find("box/rank_box1/view/content", that.nav5).children;
          for (var i in userRankArr) userRankArr[i].destroy();
          var teamRankArr = cc.find("box/rank_box2/view/content", that.nav5).children;
          for (var i in teamRankArr) teamRankArr[i].destroy();
        }
        this.nav1.active = false;
        this.nav2.active = false;
        this.nav3.active = true;
        this.nav4.active = false;
        this.nav5.active = false;
        this.nav6.active = false;
        this.nav7.active = false;
        this.nav8.active = false;
        this.setLvPositionFunc();
      },
      animationComFunc: function animationComFunc(node, spawn, time) {
        setTimeout(function() {
          node.runAction(cc.spawn(spawn[0], spawn[1]));
        }, time);
      },
      ajaxPostFun: function ajaxPostFun(ServerLink, str, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", ServerLink);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(str);
        xhr.onreadystatechange = function() {
          if (4 == xhr.readyState && xhr.status >= 200 && xhr.status <= 207) {
            var result = JSON.parse(xhr.responseText);
            callback(result);
          }
        };
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
        this.label.string = "奖励+" + count;
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
  rankList_team: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "959aeGkZgxMCIZSuhGlmUNF", "rankList_team");
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
        "1" == data.rank_status && cc.loader.loadRes("page_img/phb_g2.png", cc.SpriteFrame, function(err, spriteFrame) {
          that.rank_bg.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          that.rank_n.color = new cc.Color(255, 255, 255, 255);
          that.rank_name.color = new cc.Color(255, 255, 255, 255);
          that.rank_cj.color = new cc.Color(255, 255, 255, 255);
        });
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
        if ("1" == data.rank_status) {
          cc.log("帅");
          cc.loader.loadRes("page_img/phb_g2.png", cc.SpriteFrame, function(err, spriteFrame) {
            that.rank_bg.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            that.rank_n.color = new cc.Color(255, 255, 255, 255);
            that.rank_name.color = new cc.Color(255, 255, 255, 255);
            that.rank_cj.color = new cc.Color(255, 255, 255, 255);
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
          onInvalidTransition: function onInvalidTransition(transition, from, to) {
            throw new Exception("transition is invalid in current state", transition, from, to, this.state);
          },
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
  }, {} ],
  teamList: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e46f7zArRBJ/p2rnL1Qrt5K", "teamList");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        team_name: cc.Node,
        team_list: cc.Node,
        type: null,
        tName: null
      },
      start: function start() {},
      init: function init(data) {
        cc.log(data);
        this.type = data.team_id;
        this.tName = data.team_name;
        this.team_name.getComponent(cc.Label).string = data.team_name;
      },
      selectTeamFunc: function selectTeamFunc() {
        var that = this;
        var customEventData = this.type;
        var teamListArr = this.team_list.parent.children;
        cc.loader.loadRes("page_img/btn_g.png", cc.SpriteFrame, function(err, spriteFrame) {
          for (var i in teamListArr) {
            teamListArr[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
            teamListArr[i].getChildByName("Label").color = new cc.Color(0, 0, 0, 255);
          }
        });
        cc.loader.loadRes("page_img/btn_g2.png", cc.SpriteFrame, function(err, spriteFrame) {
          that.team_list.getComponent(cc.Sprite).spriteFrame = spriteFrame;
          that.team_list.getChildByName("Label").color = new cc.Color(181, 31, 36, 255);
        });
        Win_Global.select_team_id = customEventData;
        Win_Global.select_team_name = this.tName;
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "Hall", "backgroundLoader", "bkqList", "btn", "config", "giftList", "landMaker", "page", "perfectLabel", "rankList", "rankList_team", "spriteCreator", "state-machine", "storageManager", "teamList" ]);