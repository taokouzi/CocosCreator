require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"backgroundLoader":[function(require,module,exports){
"use strict";
cc._RF.push(module, '1ba569pWT1NW4FvgybtQ/YJ', 'backgroundLoader');
// StickHero\Scripts\backgroundLoader.js

"use strict";

// 随机生成背景

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        var randomNum = "bg" + ((Math.random() * 100 | 0) % 3 + 1);
        var bgSprite = this.node.getComponent(cc.Sprite);
        cc.log(bgSprite);

        cc.loader.loadRes("hero/" + randomNum, cc.SpriteFrame, function (err, SpriteFrame) {
            bgSprite.spriteFrame = SpriteFrame;
        });
        cc.log(randomNum);
    }
});

cc._RF.pop();
},{}],"btn":[function(require,module,exports){
"use strict";
cc._RF.push(module, '2da0dBTR9tDEoDKa8CshNX4', 'btn');
// StickHero\Scripts\btn.js

"use strict";

var fsm = require("landMaker");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {},

    buttonClicked: function buttonClicked() {
        fsm.restart();
    },
    gameStart: function gameStart() {
        cc.director.loadScene("MainGameScene");
    }
});

cc._RF.pop();
},{"landMaker":"landMaker"}],"landMaker":[function(require,module,exports){
"use strict";
cc._RF.push(module, 'd0079DKriBNl693joESFHLy', 'landMaker');
// StickHero\Scripts\landMaker.js

"use strict";

var spriteCreator = require("spriteCreator");
var perfectLabel = require("perfectLabel");
var storageManager = require("storageManager");
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
            gameDirector.stickLengthen = true;
            gameDirector.stick = gameDirector.createStick();
            gameDirector.stick.x = gameDirector.hero.x + gameDirector.hero.width * (1 - gameDirector.hero.anchorX) + gameDirector.stick.width * gameDirector.stick.anchorX;
            var ani = gameDirector.hero.getComponent(cc.Animation);
            ani.play('heroPush');
        },
        onHeroTick: function onHeroTick() {
            gameDirector.stickLengthen = false;
            var ani = gameDirector.hero.getComponent(cc.Animation);
            ani.play('heroTick');
        },
        onStickFall: function onStickFall() {
            //stick fall action.
            var stickFall = cc.rotateBy(0.5, 90);
            stickFall.easing(cc.easeIn(3));
            var callFunc = cc.callFunc(function () {
                var stickLength = gameDirector.stick.height - gameDirector.stick.width * gameDirector.stick.anchorX;
                if (stickLength < gameDirector.currentLandRange || stickLength > gameDirector.currentLandRange + gameDirector.secondLand.width) {
                    //failed.
                    fsm.heroMoveToStickEnd();
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
                }
            });
            var se = cc.sequence(stickFall, callFunc);
            gameDirector.stick.runAction(se);
        },
        onHeroMoveToLand: function onHeroMoveToLand() {
            var ani = gameDirector.hero.getComponent(cc.Animation);
            var callFunc = cc.callFunc(function () {
                ani.stop('heroRun');
                gameDirector.getScore();
                fsm.landMove();
            });
            ani.play('heroRun');
            gameDirector.heroMove(gameDirector.hero, { length: gameDirector.currentLandRange + gameDirector.secondLand.width, callFunc: callFunc });
        },
        onLandMove: function onLandMove() {
            var callFunc = cc.callFunc(function () {
                gameDirector.registerEvent();
            });
            gameDirector.landCreateAndMove(callFunc);
        },
        onHeroMoveToStickEnd: function onHeroMoveToStickEnd() {
            var ani = gameDirector.hero.getComponent(cc.Animation);
            var callFunc = cc.callFunc(function () {
                ani.stop('heroRun');
                fsm.heroDown();
            });
            ani.play('heroRun');
            gameDirector.heroMove(gameDirector.hero, { length: gameDirector.stick.height, callFunc: callFunc });
        },
        onHeroDown: function onHeroDown() {
            var callFunc = cc.callFunc(function () {
                fsm.gameOver();
            });
            gameDirector.stickAndHeroDownAction(callFunc);
        },
        onGameOver: function onGameOver() {
            gameDirector.overLabel.node.active = true;
        },
        onRestart: function onRestart() {
            cc.director.loadScene("MainGameScene");
        }
    }
});
var gameDirector = null;
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
        scoreLabel: cc.Label,
        hightestScoreLabel: cc.Label,
        overLabel: cc.Label,
        perfectLabel: cc.Node
    },
    onLoad: function onLoad() {
        //init data
        // alert(storageManager.getHighestScore());
        gameDirector = this;
        this.runLength = 0, this.stick = null;
        this.stickLengthen = false;
        this.score = 0;
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
    },
    registerEvent: function registerEvent() {
        this.canvas.on(cc.Node.EventType.TOUCH_START, this.touchStart.bind(this), this.node);
        this.canvas.on(cc.Node.EventType.TOUCH_END, this.touchEnd.bind(this), this.node);
        this.canvas.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel.bind(this), this.node);
        console.log("on");
    },
    unregisterEvent: function unregisterEvent() {
        this.canvas.targetOff(this.node);
        console.log("off");
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
        cc.log("touchStart");
    },
    touchEnd: function touchEnd(event) {
        fsm.heroTick();
        cc.log("touchEnd");
    },
    touchCancel: function touchCancel() {
        this.touchEnd();
        cc.log("touchCancel");
    },
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

        //landRange
        var range = this.getLandRange();

        //secondland;
        this.secondLand.setPosition(this.runLength + winSize.width, 0);
        var l = winSize.width - range - this.heroWorldPosX - this.hero.width * this.hero.anchorX - this.stickWidth;
        var secondAction = cc.moveBy(this.moveDuration, cc.p(-l, 0));
        var seq = cc.sequence(secondAction, callFunc);
        this.secondLand.runAction(seq);
    },
    createStick: function createStick() {
        cc.log("sc");
        var stick = spriteCreator.createStick(this.stickWidth);
        stick.parent = this.node;
        return stick;
    },
    createNewLand: function createNewLand() {
        this.secondLand = spriteCreator.createNewLand(this.getLandWidth());
        this.secondLand.parent = this.node;
    },
    getScore: function getScore(num) {
        if (num) {
            this.score += num;
        } else {
            this.score++;
        }
        if (storageManager.getHighestScore() < this.score) {
            storageManager.setHighestScore(this.score);
            this.changeHightestScoreLabel();
        }
        this.scoreLabel.string = "得分:" + this.score;
    },
    changeHightestScoreLabel: function changeHightestScoreLabel() {
        this.hightestScoreLabel.string = "最高分:" + storageManager.getHighestScore();
    },
    getLandRange: function getLandRange() {
        this.currentLandRange = this.landRange.x + (this.landRange.y - this.landRange.x) * Math.random();
        var winSize = cc.director.getWinSize();
        if (winSize.width < this.currentLandRange + this.heroWorldPosX + this.hero.width + this.secondLand.width) {
            this.currentLandRange = winSize.width - this.heroWorldPosX - this.hero.width - this.secondLand.width;
        }
        return this.currentLandRange;
    },
    getLandWidth: function getLandWidth() {
        return this.landWidth.x + (this.landWidth.y - this.landWidth.x) * Math.random();
    }
});
module.exports = fsm;

cc._RF.pop();
},{"perfectLabel":"perfectLabel","spriteCreator":"spriteCreator","storageManager":"storageManager"}],"perfectLabel":[function(require,module,exports){
"use strict";
cc._RF.push(module, '68d3cmKQRxMxJwM5MfqZrPh', 'perfectLabel');
// StickHero\Scripts\perfectLabel.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        this.anim = this.node.getComponent(cc.Animation);
        this.label = this.node.getComponent(cc.Label);
    },
    showPerfect: function showPerfect(count) {
        this.label.string = "奖励+" + count;
        var fadeInAction = cc.fadeIn(0.1);
        var moveAction = cc.moveBy(1, cc.p(0, 0));
        var fadeOutAction = cc.fadeOut(0);
        var seq = cc.sequence(fadeInAction, moveAction, fadeOutAction);
        this.node.runAction(seq);
        //has bug.  web will 花屏...
        // this.anim.play("perfect_anim");
    },
    removeLabel: function removeLabel() {
        // this.node.x = -100;
        // this.node.y = -100;
        cc.log("removeLabel");
    },
    showLabel: function showLabel() {
        // this.node.x = cc.director.getWinSize().width/2;
        // this.node.y = cc.director.getWinSize().height/2;
        cc.log("showLabel");
    }
});

cc._RF.pop();
},{}],"spriteCreator":[function(require,module,exports){
"use strict";
cc._RF.push(module, '4310ceORutFCrUEBpToyuTd', 'spriteCreator');
// StickHero\Scripts\spriteCreator.js

"use strict";

// 生成柱状道路

var spriteCreator = function () {
    var spriteFrameCache = null;
    return {
        createNewLand: function createNewLand(width) {
            //create new land.
            var newLand = new cc.Node("Land");
            newLand.anchorX = 0;
            newLand.anchorY = 0;
            var sprite = newLand.addComponent(cc.Sprite);
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            newLand.color = cc.Color.BLACK;
            newLand.height = 300;
            newLand.width = width;

            //create red land.
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
            } else {
                cc.loader.loadRes("hero/blank", cc.SpriteFrame, function (err, SpriteFrame) {
                    sprite.spriteFrame = SpriteFrame;
                    redSprite.spriteFrame = SpriteFrame;
                    spriteFrameCache = SpriteFrame;
                });
            }
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
        } };
}();
module.exports = spriteCreator;

cc._RF.pop();
},{}],"storageManager":[function(require,module,exports){
"use strict";
cc._RF.push(module, '10710Cz8ZRCqLlVtCy4fcaY', 'storageManager');
// StickHero\Scripts\storageManager.js

"use strict";

// 存储最高分

var storageManager = function () {
    var spriteFrameCache = null;
    if (!cc.sys.localStorage.highestScore) {
        cc.sys.localStorage.highestScore = 0;
    }
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
},{}]},{},["backgroundLoader","btn","landMaker","perfectLabel","spriteCreator","storageManager"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TdGlja0hlcm8vU2NyaXB0cy9iYWNrZ3JvdW5kTG9hZGVyLmpzIiwiYXNzZXRzL1N0aWNrSGVyby9TY3JpcHRzL2J0bi5qcyIsImFzc2V0cy9TdGlja0hlcm8vU2NyaXB0cy9sYW5kTWFrZXIuanMiLCJhc3NldHMvU3RpY2tIZXJvL1NjcmlwdHMvcGVyZmVjdExhYmVsLmpzIiwiYXNzZXRzL1N0aWNrSGVyby9TY3JpcHRzL3Nwcml0ZUNyZWF0b3IuanMiLCJhc3NldHMvU3RpY2tIZXJvL1NjcmlwdHMvc3RvcmFnZU1hbmFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUVBO0FBQ0k7O0FBRUE7O0FBSUE7QUFDQTtBQUVJO0FBQ0E7QUFDQTs7QUFFQTtBQUNJO0FBQ0g7QUFDRDtBQUNIO0FBbEJJOzs7Ozs7Ozs7O0FDRFQ7QUFDQTtBQUNJOztBQUVBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWUTs7QUFhWjtBQUNBOztBQUlBO0FBQ0k7QUFDSDtBQUNEO0FBQ0k7QUFDSDtBQTFCSTs7Ozs7Ozs7OztBQ0hUO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDSTtBQURDO0FBR0w7QUFDQTtBQVdBO0FBQ0k7QUFDSTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFBNkg7QUFDekg7QUFDSDtBQUFLO0FBQ0Y7QUFDQTtBQUVJO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRztBQUNIO0FBQ0o7QUFDSjtBQUNEO0FBQ0E7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDQTtBQUNIO0FBQ0Q7QUFDSTtBQUNJO0FBQ0g7QUFDRDtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBQ0Q7QUFDQTtBQUNIO0FBQ0Q7QUFDSztBQUNHO0FBQ0g7QUFDRDtBQUNIO0FBQ0Q7QUFDSTtBQUNIO0FBQ0Q7QUFDSTtBQUNIO0FBNUVHO0FBaEJlO0FBK0YzQjtBQUNBO0FBQ0k7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaEJRO0FBa0JaO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0k7QUFDSDtBQUNKO0FBQ0o7QUFDRDtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNJO0FBQ0E7QUFDSDtBQUNKO0FBQ0Q7QUFDSTtBQUNBO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBQ0c7QUFDSDtBQUNKO0FBQ0Q7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0g7QUFDRDtBQUNJO0FBQ0k7QUFDSDtBQUNHO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7QUFDSDtBQUNEO0FBQ0g7QUFDRDtBQUNJO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7QUFDQTtBQUNJO0FBQ0g7QUFDRDtBQUNIO0FBQ0Q7QUFDSTtBQUNIO0FBMUpJO0FBNEpUOzs7Ozs7Ozs7O0FDN1BBO0FBQ0k7O0FBRUE7O0FBSUE7QUFDQTtBQUNJO0FBQ0E7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUEvQkk7Ozs7Ozs7Ozs7QUNGVDs7QUFFQTtBQUVJO0FBQ0E7QUFDSTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUVJO0FBQ0E7QUFDSDtBQUdHO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFDSjtBQUNEO0FBQ0E7QUFDSDtBQUNEO0FBRUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNKO0FBQ0Q7Ozs7Ozs7Ozs7QUMzREE7O0FBRUE7QUFFSTtBQUNBO0FBRUk7QUFDSDtBQUNEO0FBQ0k7QUFFSTtBQUNIO0FBQ0Q7QUFFSTtBQUNIO0FBUkU7QUFVVjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyDpmo/mnLrnlJ/miJDog4zmma9cblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkgXG4gICAge1xuICAgICAgICB2YXIgcmFuZG9tTnVtID0gXCJiZ1wiICsgKChNYXRoLnJhbmRvbSgpKjEwMHwwKSUzKzEpO1xuICAgICAgICB2YXIgYmdTcHJpdGUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGNjLmxvZyhiZ1Nwcml0ZSk7XG4gICAgICAgIFxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcImhlcm8vXCIrcmFuZG9tTnVtLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgU3ByaXRlRnJhbWUpID0+IHtcbiAgICAgICAgICAgIGJnU3ByaXRlLnNwcml0ZUZyYW1lID0gU3ByaXRlRnJhbWU7XG4gICAgICAgIH0pO1xuICAgICAgICBjYy5sb2cocmFuZG9tTnVtKTtcbiAgICB9LFxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG59KTtcbiIsIlxuXG52YXIgZnNtID1yZXF1aXJlKFwibGFuZE1ha2VyXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICB9LFxuXG4gICAgYnV0dG9uQ2xpY2tlZCgpe1xuICAgICAgICBmc20ucmVzdGFydCgpO1xuICAgIH0sXG4gICAgZ2FtZVN0YXJ0KCl7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIk1haW5HYW1lU2NlbmVcIik7XG4gICAgfVxufSk7XG4iLCJ2YXIgc3ByaXRlQ3JlYXRvciA9IHJlcXVpcmUoXCJzcHJpdGVDcmVhdG9yXCIpO1xudmFyIHBlcmZlY3RMYWJlbCA9IHJlcXVpcmUoXCJwZXJmZWN0TGFiZWxcIik7XG52YXIgc3RvcmFnZU1hbmFnZXIgPSByZXF1aXJlKFwic3RvcmFnZU1hbmFnZXJcIik7XG52YXIgZnNtID0gbmV3IFN0YXRlTWFjaGluZSh7XG4gICAgZGF0YTp7XG4gICAgICAgIGdhbWVEaXJlY3RvcjpudWxsLFxuICAgIH0sXG4gICAgaW5pdDogJ3N0YW5kJyxcbiAgICB0cmFuc2l0aW9uczpbXG4gICAgICAgIHtuYW1lOidzdGlja0xlbmd0aGVuJyxmcm9tOidzdGFuZCcsdG86J3N0aWNrTGVuZ3RoZW5lZCd9LFxuICAgICAgICB7bmFtZTonaGVyb1RpY2snLGZyb206J3N0aWNrTGVuZ3RoZW5lZCcsdG86J2hlcm9UaWNrZWQnfSxcbiAgICAgICAge25hbWU6J3N0aWNrRmFsbCcsZnJvbTonaGVyb1RpY2tlZCcsdG86J3N0aWNrRmFsbGVkJ30sXG4gICAgICAgIHtuYW1lOidoZXJvTW92ZVRvTGFuZCcsZnJvbTonc3RpY2tGYWxsZWQnLHRvOidoZXJvTW92ZWRUb0xhbmQnfSxcbiAgICAgICAge25hbWU6J2xhbmRNb3ZlJyxmcm9tOidoZXJvTW92ZWRUb0xhbmQnLHRvOidzdGFuZCd9LFxuICAgICAgICB7bmFtZTonaGVyb01vdmVUb1N0aWNrRW5kJyxmcm9tOidzdGlja0ZhbGxlZCcsdG86J2hlcm9Nb3ZlZFRvU3RpY2tFbmQnfSxcbiAgICAgICAge25hbWU6J2hlcm9Eb3duJyxmcm9tOidoZXJvTW92ZWRUb1N0aWNrRW5kJyx0bzonaGVyb0Rvd25lZCd9LFxuICAgICAgICB7bmFtZTonZ2FtZU92ZXInLGZyb206J2hlcm9Eb3duZWQnLHRvOidlbmQnfSxcbiAgICAgICAge25hbWU6J3Jlc3RhcnQnLGZyb206J2VuZCcsdG86J3N0YW5kJ30sXG4gICAgXSxcbiAgICBtZXRob2RzOntcbiAgICAgICAgb25MZWF2ZUhlcm9UaWNrZWQoKXtcbiAgICAgICAgICAgIGdhbWVEaXJlY3Rvci51bnJlZ2lzdGVyRXZlbnQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TdGlja0xlbmd0aGVuKCl7XG4gICAgICAgICAgICBnYW1lRGlyZWN0b3Iuc3RpY2tMZW5ndGhlbiA9IHRydWU7XG4gICAgICAgICAgICBnYW1lRGlyZWN0b3Iuc3RpY2sgPSBnYW1lRGlyZWN0b3IuY3JlYXRlU3RpY2soKTtcbiAgICAgICAgICAgIGdhbWVEaXJlY3Rvci5zdGljay54ID0gZ2FtZURpcmVjdG9yLmhlcm8ueCArIGdhbWVEaXJlY3Rvci5oZXJvLndpZHRoICogKDEtZ2FtZURpcmVjdG9yLmhlcm8uYW5jaG9yWCkgKyBnYW1lRGlyZWN0b3Iuc3RpY2sud2lkdGggKiBnYW1lRGlyZWN0b3Iuc3RpY2suYW5jaG9yWDtcbiAgICAgICAgICAgIHZhciBhbmkgPSBnYW1lRGlyZWN0b3IuaGVyby5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgICAgIGFuaS5wbGF5KCdoZXJvUHVzaCcpO1xuICAgICAgICB9LFxuICAgICAgICBvbkhlcm9UaWNrKCl7XG4gICAgICAgICAgICBnYW1lRGlyZWN0b3Iuc3RpY2tMZW5ndGhlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGFuaSA9IGdhbWVEaXJlY3Rvci5oZXJvLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICAgICAgYW5pLnBsYXkoJ2hlcm9UaWNrJyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU3RpY2tGYWxsKCl7XG4gICAgICAgICAgICAvL3N0aWNrIGZhbGwgYWN0aW9uLlxuICAgICAgICAgICAgdmFyIHN0aWNrRmFsbCA9IGNjLnJvdGF0ZUJ5KDAuNSwgOTApO1xuICAgICAgICAgICAgc3RpY2tGYWxsLmVhc2luZyhjYy5lYXNlSW4oMykpO1xuICAgICAgICAgICAgdmFyIGNhbGxGdW5jID0gY2MuY2FsbEZ1bmMoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgc3RpY2tMZW5ndGggPSBnYW1lRGlyZWN0b3Iuc3RpY2suaGVpZ2h0LWdhbWVEaXJlY3Rvci5zdGljay53aWR0aCAqIGdhbWVEaXJlY3Rvci5zdGljay5hbmNob3JYO1xuICAgICAgICAgICAgICAgIGlmKHN0aWNrTGVuZ3RoIDwgZ2FtZURpcmVjdG9yLmN1cnJlbnRMYW5kUmFuZ2UgfHwgc3RpY2tMZW5ndGggPiBnYW1lRGlyZWN0b3IuY3VycmVudExhbmRSYW5nZStnYW1lRGlyZWN0b3Iuc2Vjb25kTGFuZC53aWR0aCl7Ly9mYWlsZWQuXG4gICAgICAgICAgICAgICAgICAgIGZzbS5oZXJvTW92ZVRvU3RpY2tFbmQoKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXsvL3N1Y2Nlc3NlZFxuICAgICAgICAgICAgICAgICAgICBmc20uaGVyb01vdmVUb0xhbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoc3RpY2tMZW5ndGggPiBnYW1lRGlyZWN0b3IuY3VycmVudExhbmRSYW5nZSArIGdhbWVEaXJlY3Rvci5zZWNvbmRMYW5kLndpZHRoLzItNSBcbiAgICAgICAgICAgICAgICAgICAgICAgICYmc3RpY2tMZW5ndGggPCBnYW1lRGlyZWN0b3IuY3VycmVudExhbmRSYW5nZSArIGdhbWVEaXJlY3Rvci5zZWNvbmRMYW5kLndpZHRoLzIrNSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lRGlyZWN0b3IucGVyZmVjdCArKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVEaXJlY3Rvci5nZXRTY29yZShnYW1lRGlyZWN0b3IucGVyZmVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGwgPSBnYW1lRGlyZWN0b3IucGVyZmVjdExhYmVsLmdldENvbXBvbmVudChwZXJmZWN0TGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGwuc2hvd1BlcmZlY3QoZ2FtZURpcmVjdG9yLnBlcmZlY3QpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVEaXJlY3Rvci5wZXJmZWN0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHNlID1jYy5zZXF1ZW5jZShzdGlja0ZhbGwsY2FsbEZ1bmMpO1xuICAgICAgICAgICAgZ2FtZURpcmVjdG9yLnN0aWNrLnJ1bkFjdGlvbihzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uSGVyb01vdmVUb0xhbmQoKXtcbiAgICAgICAgICAgIHZhciBhbmkgPSBnYW1lRGlyZWN0b3IuaGVyby5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgICAgIHZhciBjYWxsRnVuYyA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgYW5pLnN0b3AoJ2hlcm9SdW4nKTtcbiAgICAgICAgICAgICAgICBnYW1lRGlyZWN0b3IuZ2V0U2NvcmUoKTtcbiAgICAgICAgICAgICAgICBmc20ubGFuZE1vdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYW5pLnBsYXkoJ2hlcm9SdW4nKTtcbiAgICAgICAgICAgIGdhbWVEaXJlY3Rvci5oZXJvTW92ZShnYW1lRGlyZWN0b3IuaGVybyx7bGVuZ3RoOmdhbWVEaXJlY3Rvci5jdXJyZW50TGFuZFJhbmdlK2dhbWVEaXJlY3Rvci5zZWNvbmRMYW5kLndpZHRoLGNhbGxGdW5jOmNhbGxGdW5jfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uTGFuZE1vdmUoKXtcbiAgICAgICAgICAgIHZhciBjYWxsRnVuYyA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgZ2FtZURpcmVjdG9yLnJlZ2lzdGVyRXZlbnQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZ2FtZURpcmVjdG9yLmxhbmRDcmVhdGVBbmRNb3ZlKGNhbGxGdW5jKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25IZXJvTW92ZVRvU3RpY2tFbmQoKXtcbiAgICAgICAgICAgIHZhciBhbmkgPSBnYW1lRGlyZWN0b3IuaGVyby5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgICAgIHZhciBjYWxsRnVuYyA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgYW5pLnN0b3AoJ2hlcm9SdW4nKTtcbiAgICAgICAgICAgICAgICBmc20uaGVyb0Rvd24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYW5pLnBsYXkoJ2hlcm9SdW4nKTtcbiAgICAgICAgICAgIGdhbWVEaXJlY3Rvci5oZXJvTW92ZShnYW1lRGlyZWN0b3IuaGVybyx7bGVuZ3RoOmdhbWVEaXJlY3Rvci5zdGljay5oZWlnaHQsY2FsbEZ1bmM6Y2FsbEZ1bmN9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25IZXJvRG93bigpe1xuICAgICAgICAgICAgIHZhciBjYWxsRnVuYyA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgZnNtLmdhbWVPdmVyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGdhbWVEaXJlY3Rvci5zdGlja0FuZEhlcm9Eb3duQWN0aW9uKGNhbGxGdW5jKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25HYW1lT3Zlcigpe1xuICAgICAgICAgICAgZ2FtZURpcmVjdG9yLm92ZXJMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVzdGFydCgpe1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiTWFpbkdhbWVTY2VuZVwiKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xudmFyIGdhbWVEaXJlY3RvciA9IG51bGw7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGFuZFJhbmdlOmNjLnYyKDIwLDMwMCksXG4gICAgICAgIGxhbmRXaWR0aDpjYy52MigyMCwyMDApLFxuICAgICAgICBoZXJvOmNjLk5vZGUsXG4gICAgICAgIGZpcnN0TGFuZDpjYy5Ob2RlLFxuICAgICAgICBzZWNvbmRMYW5kOmNjLk5vZGUsXG4gICAgICAgIG1vdmVEdXJhdGlvbjowLjUsXG4gICAgICAgIHN0aWNrU3BlZWQ6NDAwLFxuICAgICAgICBoZXJvTW92ZVNwZWVkOjQwMCxcbiAgICAgICAgLy8gc3RpY2s6Y2MuTm9kZSxcbiAgICAgICAgLy8gc3RpY2tMZW5ndGhlbjpmYWxzZSxcbiAgICAgICAgc3RpY2tXaWR0aDo2LFxuICAgICAgICBjYW52YXM6Y2MuTm9kZSxcbiAgICAgICAgc2NvcmVMYWJlbDpjYy5MYWJlbCxcbiAgICAgICAgaGlnaHRlc3RTY29yZUxhYmVsOmNjLkxhYmVsLFxuICAgICAgICBvdmVyTGFiZWw6Y2MuTGFiZWwsXG4gICAgICAgIHBlcmZlY3RMYWJlbDpjYy5Ob2RlXG4gICAgfSxcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy9pbml0IGRhdGFcbiAgICAgICAgLy8gYWxlcnQoc3RvcmFnZU1hbmFnZXIuZ2V0SGlnaGVzdFNjb3JlKCkpO1xuICAgICAgICBnYW1lRGlyZWN0b3IgPSB0aGlzO1xuICAgICAgICB0aGlzLnJ1bkxlbmd0aCA9IDAsXG4gICAgICAgIHRoaXMuc3RpY2sgPSBudWxsO1xuICAgICAgICB0aGlzLnN0aWNrTGVuZ3RoZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgICAgIHRoaXMucGVyZmVjdCA9IDA7XG4gICAgICAgIHRoaXMuY3VycmVudExhbmRSYW5nZSA9IDA7XG4gICAgICAgIHRoaXMuaGVyb1dvcmxkUG9zWCA9IDA7XG4gICAgICAgIHRoaXMuY2hhbmdlSGlnaHRlc3RTY29yZUxhYmVsKCk7XG5cbiAgICAgICAgLy9jcmVhdGUgbmV3IGxhbmQ7XG4gICAgICAgIHRoaXMuY3JlYXRlTmV3TGFuZCgpO1xuICAgICAgICB2YXIgcmFuZ2UgPSB0aGlzLmdldExhbmRSYW5nZSgpO1xuICAgICAgICB0aGlzLmhlcm9Xb3JsZFBvc1ggPSB0aGlzLmZpcnN0TGFuZC53aWR0aCAtICgxLXRoaXMuaGVyby5hbmNob3JYKSAqIHRoaXMuaGVyby53aWR0aCAtIHRoaXMuc3RpY2tXaWR0aDtcbiAgICAgICAgdGhpcy5zZWNvbmRMYW5kLnNldFBvc2l0aW9uKHJhbmdlK3RoaXMuZmlyc3RMYW5kLndpZHRoLDApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KCk7XG4gICAgICAgIC8vaW5pdCBoZXJvIGFuaW1hdGlvbiBjYWxsYmFjay5cbiAgICAgICAgdmFyIGFuaSA9IGdhbWVEaXJlY3Rvci5oZXJvLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgICBhbmkub24oJ3N0b3AnLChldmVudCk9PntcbiAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldC5uYW1lID09J2hlcm9UaWNrJyl7XG4gICAgICAgICAgICAgICAgZnNtLnN0aWNrRmFsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHJlZ2lzdGVyRXZlbnQoKXtcbiAgICAgICAgdGhpcy5jYW52YXMub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMudG91Y2hTdGFydC5iaW5kKHRoaXMpLCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLmNhbnZhcy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy50b3VjaEVuZC5iaW5kKHRoaXMpLCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLmNhbnZhcy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsdGhpcy50b3VjaENhbmNlbC5iaW5kKHRoaXMpLCB0aGlzLm5vZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uXCIpO1xuICAgIH0sXG4gICAgdW5yZWdpc3RlckV2ZW50KCl7XG4gICAgICAgIHRoaXMuY2FudmFzLnRhcmdldE9mZih0aGlzLm5vZGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9mZlwiKTtcbiAgICB9LFxuICAgIHVwZGF0ZShkdCl7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGR0KTtcbiAgICAgICAgaWYodGhpcy5zdGlja0xlbmd0aGVuKXtcbiAgICAgICAgICAgIHRoaXMuc3RpY2suaGVpZ2h0ICs9IGR0KnRoaXMuc3RpY2tTcGVlZDtcbiAgICAgICAgICAgIC8vIHRoaXMuc3RpY2suaGVpZ2h0ID0gdGhpcy5jdXJyZW50TGFuZFJhbmdlICsgdGhpcy5zZWNvbmRMYW5kLndpZHRoLzI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRvdWNoU3RhcnQoZXZlbnQpe1xuICAgICAgICBmc20uc3RpY2tMZW5ndGhlbigpO1xuICAgICAgICBjYy5sb2coXCJ0b3VjaFN0YXJ0XCIpO1xuICAgIH0sXG4gICAgdG91Y2hFbmQoZXZlbnQpe1xuICAgICAgICBmc20uaGVyb1RpY2soKTtcbiAgICAgICAgY2MubG9nKFwidG91Y2hFbmRcIik7XG4gICAgfSxcbiAgICB0b3VjaENhbmNlbCgpe1xuICAgICAgICB0aGlzLnRvdWNoRW5kKCk7XG4gICAgICAgIGNjLmxvZyhcInRvdWNoQ2FuY2VsXCIpO1xuICAgIH0sXG4gICAgc3RpY2tBbmRIZXJvRG93bkFjdGlvbihjYWxsRnVuYyl7XG4gICAgICAgIC8vc3RpY2sgZG93biBhY3Rpb247XG4gICAgICAgIHZhciBzdGlja0FjdGlvbiA9IGNjLnJvdGF0ZUJ5KDAuNSwgOTApO1xuICAgICAgICBzdGlja0FjdGlvbi5lYXNpbmcoY2MuZWFzZUluKDMpKTtcbiAgICAgICAgdGhpcy5zdGljay5ydW5BY3Rpb24oc3RpY2tBY3Rpb24pO1xuICAgICAgICAvL2hlcm8gZG93biBhY3Rpb247XG4gICAgICAgIHZhciBoZXJvQWN0aW9uID0gY2MubW92ZUJ5KDAuNSxjYy5wKDAsLTMwMCAtIHRoaXMuaGVyby5oZWlnaHQpKTtcbiAgICAgICAgaGVyb0FjdGlvbi5lYXNpbmcoY2MuZWFzZUluKDMpKTtcbiAgICAgICAgdmFyIHNlcSA9Y2Muc2VxdWVuY2UoaGVyb0FjdGlvbixjYWxsRnVuYyk7XG4gICAgICAgIHRoaXMuaGVyby5ydW5BY3Rpb24oc2VxKTtcbiAgICB9LFxuICAgIGhlcm9Nb3ZlKHRhcmdldCxkYXRhKXtcbiAgICAgICAgdmFyIHRpbWUgPSBkYXRhLmxlbmd0aC90aGlzLmhlcm9Nb3ZlU3BlZWQ7XG4gICAgICAgIHZhciBoZXJvTW92ZSA9IGNjLm1vdmVCeSh0aW1lLGNjLnAoZGF0YS5sZW5ndGgsMCkpO1xuICAgICAgICBpZihkYXRhLmNhbGxGdW5jKXtcbiAgICAgICAgICAgIHZhciBzZSA9Y2Muc2VxdWVuY2UoaGVyb01vdmUsZGF0YS5jYWxsRnVuYyk7XG4gICAgICAgICAgICB0aGlzLmhlcm8ucnVuQWN0aW9uKHNlKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmhlcm8ucnVuQWN0aW9uKGhlcm9Nb3ZlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbGFuZENyZWF0ZUFuZE1vdmUoY2FsbEZ1bmMpIHtcbiAgICAgICAgdmFyIHdpblNpemUgPSBjYy5kaXJlY3Rvci5nZXRXaW5TaXplKCk7XG4gICAgICAgIC8vZmlyc3RsYW5kO1xuICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5jdXJyZW50TGFuZFJhbmdlICsgdGhpcy5zZWNvbmRMYW5kLndpZHRoO1xuICAgICAgICB0aGlzLnJ1bkxlbmd0aCArPWxlbmd0aDtcbiAgICAgICAgdmFyIGFjdGlvbiA9IGNjLm1vdmVCeSh0aGlzLm1vdmVEdXJhdGlvbixjYy5wKC1sZW5ndGgsMCkpO1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XG4gICAgICAgIHRoaXMuZmlyc3RMYW5kID0gdGhpcy5zZWNvbmRMYW5kO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlTmV3TGFuZCgpO1xuXG4gICAgICAgIC8vbGFuZFJhbmdlXG4gICAgICAgIHZhciByYW5nZSA9IHRoaXMuZ2V0TGFuZFJhbmdlKCk7XG5cbiAgICAgICAgLy9zZWNvbmRsYW5kO1xuICAgICAgICB0aGlzLnNlY29uZExhbmQuc2V0UG9zaXRpb24odGhpcy5ydW5MZW5ndGgrd2luU2l6ZS53aWR0aCwwKTtcbiAgICAgICAgdmFyIGwgPSB3aW5TaXplLndpZHRoIC0gcmFuZ2UgLSB0aGlzLmhlcm9Xb3JsZFBvc1ggLSB0aGlzLmhlcm8ud2lkdGggKiB0aGlzLmhlcm8uYW5jaG9yWCAtIHRoaXMuc3RpY2tXaWR0aDtcbiAgICAgICAgdmFyIHNlY29uZEFjdGlvbiA9IGNjLm1vdmVCeSh0aGlzLm1vdmVEdXJhdGlvbixjYy5wKC1sLDApKTtcbiAgICAgICAgdmFyIHNlcSA9Y2Muc2VxdWVuY2Uoc2Vjb25kQWN0aW9uLGNhbGxGdW5jKTtcbiAgICAgICAgdGhpcy5zZWNvbmRMYW5kLnJ1bkFjdGlvbihzZXEpO1xuICAgIH0sXG4gICAgY3JlYXRlU3RpY2soKXtcbiAgICAgICAgY2MubG9nKFwic2NcIik7XG4gICAgICAgIHZhciBzdGljayA9IHNwcml0ZUNyZWF0b3IuY3JlYXRlU3RpY2sodGhpcy5zdGlja1dpZHRoKTtcbiAgICAgICAgc3RpY2sucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICByZXR1cm4gc3RpY2tcbiAgICB9LFxuICAgIGNyZWF0ZU5ld0xhbmQoKSB7XG4gICAgICAgIHRoaXMuc2Vjb25kTGFuZCA9IHNwcml0ZUNyZWF0b3IuY3JlYXRlTmV3TGFuZCh0aGlzLmdldExhbmRXaWR0aCgpKTtcbiAgICAgICAgdGhpcy5zZWNvbmRMYW5kLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICB9LFxuICAgIGdldFNjb3JlKG51bSl7XG4gICAgICAgIGlmKG51bSl7XG4gICAgICAgICAgICB0aGlzLnNjb3JlICs9IG51bTsgIFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc2NvcmUrKztcbiAgICAgICAgfVxuICAgICAgICBpZihzdG9yYWdlTWFuYWdlci5nZXRIaWdoZXN0U2NvcmUoKTx0aGlzLnNjb3JlKXtcbiAgICAgICAgICAgIHN0b3JhZ2VNYW5hZ2VyLnNldEhpZ2hlc3RTY29yZSh0aGlzLnNjb3JlKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSGlnaHRlc3RTY29yZUxhYmVsKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY29yZUxhYmVsLnN0cmluZyA9IFwi5b6X5YiGOlwiK3RoaXMuc2NvcmU7XG4gICAgfSxcbiAgICBjaGFuZ2VIaWdodGVzdFNjb3JlTGFiZWwoKXtcbiAgICAgICAgdGhpcy5oaWdodGVzdFNjb3JlTGFiZWwuc3RyaW5nID0gXCLmnIDpq5jliIY6XCIgKyBzdG9yYWdlTWFuYWdlci5nZXRIaWdoZXN0U2NvcmUoKTtcbiAgICB9LFxuICAgIGdldExhbmRSYW5nZSgpe1xuICAgICAgICB0aGlzLmN1cnJlbnRMYW5kUmFuZ2UgPSB0aGlzLmxhbmRSYW5nZS54ICsodGhpcy5sYW5kUmFuZ2UueSAtIHRoaXMubGFuZFJhbmdlLngpKk1hdGgucmFuZG9tKCk7XG4gICAgICAgIHZhciB3aW5TaXplID0gY2MuZGlyZWN0b3IuZ2V0V2luU2l6ZSgpO1xuICAgICAgICBpZih3aW5TaXplLndpZHRoIDwgdGhpcy5jdXJyZW50TGFuZFJhbmdlICsgdGhpcy5oZXJvV29ybGRQb3NYICsgdGhpcy5oZXJvLndpZHRoICsgdGhpcy5zZWNvbmRMYW5kLndpZHRoKXtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudExhbmRSYW5nZSA9IHdpblNpemUud2lkdGggLSB0aGlzLmhlcm9Xb3JsZFBvc1ggLSB0aGlzLmhlcm8ud2lkdGggLSB0aGlzLnNlY29uZExhbmQud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudExhbmRSYW5nZTtcbiAgICB9LFxuICAgIGdldExhbmRXaWR0aCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5sYW5kV2lkdGgueCArICh0aGlzLmxhbmRXaWR0aC55IC0gdGhpcy5sYW5kV2lkdGgueCkqIE1hdGgucmFuZG9tKCk7XG4gICAgfVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZzbTsiLCJcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFuaW0gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMubGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICB9LFxuICAgIHNob3dQZXJmZWN0KGNvdW50KXtcbiAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSBcIuWlluWKsStcIiArIGNvdW50O1xuICAgICAgICB2YXIgZmFkZUluQWN0aW9uID0gY2MuZmFkZUluKDAuMSk7XG4gICAgICAgIHZhciBtb3ZlQWN0aW9uID0gY2MubW92ZUJ5KDEsY2MucCgwLDApKTtcbiAgICAgICAgdmFyIGZhZGVPdXRBY3Rpb24gPSBjYy5mYWRlT3V0KDApO1xuICAgICAgICB2YXIgc2VxID0gY2Muc2VxdWVuY2UoZmFkZUluQWN0aW9uLG1vdmVBY3Rpb24sZmFkZU91dEFjdGlvbik7XG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oc2VxKTtcbiAgICAgICAgLy9oYXMgYnVnLiAgd2ViIHdpbGwg6Iqx5bGPLi4uXG4gICAgICAgIC8vIHRoaXMuYW5pbS5wbGF5KFwicGVyZmVjdF9hbmltXCIpO1xuICAgIH0sXG4gICAgcmVtb3ZlTGFiZWwoKXtcbiAgICAgICAgLy8gdGhpcy5ub2RlLnggPSAtMTAwO1xuICAgICAgICAvLyB0aGlzLm5vZGUueSA9IC0xMDA7XG4gICAgICAgIGNjLmxvZyhcInJlbW92ZUxhYmVsXCIpO1xuICAgIH0sXG4gICAgc2hvd0xhYmVsKCl7XG4gICAgICAgIC8vIHRoaXMubm9kZS54ID0gY2MuZGlyZWN0b3IuZ2V0V2luU2l6ZSgpLndpZHRoLzI7XG4gICAgICAgIC8vIHRoaXMubm9kZS55ID0gY2MuZGlyZWN0b3IuZ2V0V2luU2l6ZSgpLmhlaWdodC8yO1xuICAgICAgICBjYy5sb2coXCJzaG93TGFiZWxcIik7XG4gICAgfVxufSk7XG4iLCIvLyDnlJ/miJDmn7HnirbpgZPot69cblxudmFyIHNwcml0ZUNyZWF0b3IgPSAoZnVuY3Rpb24gKClcbntcbiAgICB2YXIgc3ByaXRlRnJhbWVDYWNoZSA9IG51bGw7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlTmV3TGFuZDpmdW5jdGlvbih3aWR0aCkgXG4gICAgICAgIHtcbiAgICAgICAgLy9jcmVhdGUgbmV3IGxhbmQuXG4gICAgICAgIHZhciBuZXdMYW5kID0gbmV3IGNjLk5vZGUoXCJMYW5kXCIpO1xuICAgICAgICBuZXdMYW5kLmFuY2hvclggPSAwO1xuICAgICAgICBuZXdMYW5kLmFuY2hvclkgPSAwO1xuICAgICAgICB2YXIgc3ByaXRlID0gbmV3TGFuZC5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgc3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTTtcbiAgICAgICAgbmV3TGFuZC5jb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xuICAgICAgICBuZXdMYW5kLmhlaWdodCA9IDMwMDtcbiAgICAgICAgbmV3TGFuZC53aWR0aCA9IHdpZHRoO1xuXG4gICAgICAgIC8vY3JlYXRlIHJlZCBsYW5kLlxuICAgICAgICB2YXIgcmVkTGFuZCA9IG5ldyBjYy5Ob2RlKFwiUmVkIExhbmRcIik7XG4gICAgICAgIHJlZExhbmQuYW5jaG9yWSA9IDE7XG4gICAgICAgIHZhciByZWRTcHJpdGUgPSByZWRMYW5kLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICByZWRTcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xuICAgICAgICByZWRMYW5kLmNvbG9yID0gY2MuQ29sb3IuUkVEO1xuICAgICAgICByZWRMYW5kLnBhcmVudCA9IG5ld0xhbmQ7XG4gICAgICAgIHJlZExhbmQuaGVpZ2h0ID0gMTA7XG4gICAgICAgIHJlZExhbmQud2lkdGggPSAxMDtcbiAgICAgICAgcmVkTGFuZC5zZXRQb3NpdGlvbihuZXdMYW5kLndpZHRoLzIsbmV3TGFuZC5oZWlnaHQpO1xuICAgICAgICBcbiAgICAgICAgaWYoc3ByaXRlRnJhbWVDYWNoZSlcbiAgICAgICAge1xuICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWVDYWNoZTtcbiAgICAgICAgICAgIHJlZFNwcml0ZS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lQ2FjaGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhcImhlcm8vYmxhbmtcIiwgY2MuU3ByaXRlRnJhbWUsIChlcnIsIFNwcml0ZUZyYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gU3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgcmVkU3ByaXRlLnNwcml0ZUZyYW1lID0gU3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgc3ByaXRlRnJhbWVDYWNoZSA9IFNwcml0ZUZyYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3TGFuZC5jZW50ZXIgPSByZWRMYW5kO1xuICAgICAgICByZXR1cm4gbmV3TGFuZDtcbiAgICB9LFxuICAgIGNyZWF0ZVN0aWNrIDogZnVuY3Rpb24od2lkdGgpXG4gICAge1xuICAgICAgICB2YXIgc3RpY2sgPSBuZXcgY2MuTm9kZShcInN0aWNrXCIpO1xuICAgICAgICBzdGljay5hbmNob3JZID0gMDtcbiAgICAgICAgc3RpY2sueSA9IDMwMDtcbiAgICAgICAgdmFyIHNwcml0ZSA9IHN0aWNrLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBzcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xuICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZUNhY2hlO1xuICAgICAgICBzdGljay5jb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xuICAgICAgICBzdGljay53aWR0aCA9IHdpZHRoO1xuICAgICAgICBzdGljay5oZWlnaHQgPSAwO1xuICAgICAgICByZXR1cm4gc3RpY2s7XG4gICAgfX07XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBzcHJpdGVDcmVhdG9yOyIsIi8vIOWtmOWCqOacgOmrmOWIhlxuXG52YXIgc3RvcmFnZU1hbmFnZXIgPSAoZnVuY3Rpb24gKClcbntcbiAgICB2YXIgc3ByaXRlRnJhbWVDYWNoZSA9IG51bGw7XG4gICAgaWYoIWNjLnN5cy5sb2NhbFN0b3JhZ2UuaGlnaGVzdFNjb3JlKVxuICAgIHtcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5oaWdoZXN0U2NvcmUgPSAwO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRIaWdoZXN0U2NvcmU6ZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gY2Muc3lzLmxvY2FsU3RvcmFnZS5oaWdoZXN0U2NvcmU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldEhpZ2hlc3RTY29yZTpmdW5jdGlvbihzY29yZSlcbiAgICAgICAge1xuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5oaWdoZXN0U2NvcmUgPSBzY29yZTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xubW9kdWxlLmV4cG9ydHMgPSBzdG9yYWdlTWFuYWdlcjsiXSwic291cmNlUm9vdCI6IiJ9