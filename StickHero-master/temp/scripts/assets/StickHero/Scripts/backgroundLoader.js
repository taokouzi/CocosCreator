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