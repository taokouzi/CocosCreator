(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/StickHero/Scripts/spriteCreator.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4310ceORutFCrUEBpToyuTd', 'spriteCreator', __filename);
// StickHero/Scripts/spriteCreator.js

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
            // cc.log( 'w2 = ' + width );
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

        // 棍子变长
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
        //# sourceMappingURL=spriteCreator.js.map
        