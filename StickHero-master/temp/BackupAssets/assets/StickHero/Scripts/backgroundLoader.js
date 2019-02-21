
// 随机生成背景

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () 
    {
        var randomNum = "bg" + ((Math.random()*100|0)%3+1);
        var bgSprite = this.node.getComponent(cc.Sprite);
        cc.log(bgSprite);
        
        cc.loader.loadRes("hero/"+randomNum, cc.SpriteFrame, (err, SpriteFrame) => {
            bgSprite.spriteFrame = SpriteFrame;
        });
        cc.log(randomNum);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
