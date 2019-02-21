

var fsm =require("landMaker");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad: function () {

    },

    buttonClicked()
    {
        fsm.restart();
    },
    gameStart()
    {
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
