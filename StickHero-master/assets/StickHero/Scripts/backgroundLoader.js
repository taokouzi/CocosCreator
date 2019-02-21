
// 随机生成背景

var page = require("page");


cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () 
    {   
        
        cc.log( '我选择的关卡 = '+Win_Global.mySelectLv );

        var bgSprite = this.node.getComponent(cc.Sprite);
       
        /*var randomNum = "bg" + Win_Global.mySelectLv;//((Math.random()*100|0)%3+1);

        // cc.log(bgSprite);
        
        cc.loader.loadRes("hero/"+randomNum, cc.SpriteFrame, (err, SpriteFrame) => {
            bgSprite.spriteFrame = SpriteFrame;
        });*/
        if( Win_Global.isWx == 1 ){ wx.showLoading({title:'场景加载中...'}); }

        cc.loader.load({url:'http://www.oneh5.com/LJ/game71/bg/bg'+Win_Global.mySelectLv+'.png',type:'png'},function(err, texture) {
            bgSprite.spriteFrame =  new cc.SpriteFrame(texture);
            
            if( Win_Global.isWx == 1 ){ wx.hideLoading(); }
        });


        // cc.log(randomNum);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {


});
