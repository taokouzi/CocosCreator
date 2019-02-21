cc.Class({
    extends: cc.Component,

    properties: {
        head_img: cc.Node,
        rank_n: cc.Node,
        rank_name: cc.Node,
        rank_cj: cc.Node,
        rank_bg: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },


    // 排行榜
    init:function( data )
    {   
        var  that = this;
        this.rank_n.getComponent(cc.Label).string = 'No.' + data.rank_n;
        this.rank_name.getComponent(cc.Label).string = data.rank_name;
        this.rank_cj.getComponent(cc.Label).string = data.rank_cj + '分';
        
        if( data.head_img )
        {
            cc.loader.load({url:data.head_img,type:'png'},function(err, texture) {
                that.head_img.getChildByName('h').getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
        }

        if( data.rank_status == '1' )
        {   
            cc.loader.loadRes('page_img/phb_g2.png', cc.SpriteFrame, function (err, spriteFrame) 
            {   
                that.rank_bg.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                that.rank_n.color = new cc.Color(255,255,255,255);
                that.rank_name.color = new cc.Color(255,255,255,255);
                that.rank_cj.color = new cc.Color(255,255,255,255);
            });

            cc.loader.loadRes('page_img/headBox1.png', cc.SpriteFrame, function (err, spriteFrame) 
            {   
                that.head_img.getChildByName('box').getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }


    },



    // update (dt) {},
});
