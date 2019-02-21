"use strict";
cc._RF.push(module, '2da0dBTR9tDEoDKa8CshNX4', 'btn');
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