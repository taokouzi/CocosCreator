(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/StickHero/Scripts/btn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2da0dBTR9tDEoDKa8CshNX4', 'btn', __filename);
// StickHero/Scripts/btn.js

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
        // 默认成绩和已走步数为0
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
        //# sourceMappingURL=btn.js.map
        