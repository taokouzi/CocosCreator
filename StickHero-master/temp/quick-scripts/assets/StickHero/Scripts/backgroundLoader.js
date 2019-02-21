(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/StickHero/Scripts/backgroundLoader.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1ba569pWT1NW4FvgybtQ/YJ', 'backgroundLoader', __filename);
// StickHero/Scripts/backgroundLoader.js

'use strict';

// 随机生成背景

var page = require("page");

cc.Class({
    extends: cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {

        cc.log('我选择的关卡 = ' + Win_Global.mySelectLv);

        var bgSprite = this.node.getComponent(cc.Sprite);

        /*var randomNum = "bg" + Win_Global.mySelectLv;//((Math.random()*100|0)%3+1);
         // cc.log(bgSprite);
        
        cc.loader.loadRes("hero/"+randomNum, cc.SpriteFrame, (err, SpriteFrame) => {
            bgSprite.spriteFrame = SpriteFrame;
        });*/
        if (Win_Global.isWx == 1) {
            wx.showLoading({ title: '场景加载中...' });
        }

        cc.loader.load({ url: 'http://www.oneh5.com/LJ/game71/bg/bg' + Win_Global.mySelectLv + '.png', type: 'png' }, function (err, texture) {
            bgSprite.spriteFrame = new cc.SpriteFrame(texture);

            if (Win_Global.isWx == 1) {
                wx.hideLoading();
            }
        });

        // cc.log(randomNum);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {


});

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
        //# sourceMappingURL=backgroundLoader.js.map
        