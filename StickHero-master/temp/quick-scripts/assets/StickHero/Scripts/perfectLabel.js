(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/StickHero/Scripts/perfectLabel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '68d3cmKQRxMxJwM5MfqZrPh', 'perfectLabel', __filename);
// StickHero/Scripts/perfectLabel.js

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
        // this.label.string = "奖励分数+" + count;
        this.node.getComponent(cc.Label).string = "奖励分数 +10";
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
        //# sourceMappingURL=perfectLabel.js.map
        