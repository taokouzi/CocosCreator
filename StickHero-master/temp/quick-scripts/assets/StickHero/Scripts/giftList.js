(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/StickHero/Scripts/giftList.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a6a36Ju8f5H3qLzKmRarjQy', 'giftList', __filename);
// StickHero/Scripts/giftList.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {

        gf_img: cc.Node,
        gf_name: cc.Label,

        task_id: null
    },

    start: function start() {},


    init: function init(data) {
        var that = this;
        // gf_status 1达成条件未领取 2已领取 3锁定

        // 未领取
        if (data.gf_status == '1') {
            cc.loader.loadRes('page_img/jiangba.png', cc.SpriteFrame, function (err, spriteFrame) {
                that.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
        // 已领取
        else if (data.gf_status == '2') {
                cc.loader.loadRes('page_img/jiangb.png', cc.SpriteFrame, function (err, spriteFrame) {
                    that.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
            }
            // 锁定
            else if (data.gf_status == '3') {
                    cc.loader.loadRes('page_img/jiangbb.png', cc.SpriteFrame, function (err, spriteFrame) {
                        that.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                }
        // cc.log(data);

        that.gf_name.string = data.gf_name;

        that.task_id = data.gf_id;
    },

    // 领取奖品（废弃）
    giveGfFunc: function giveGfFunc() {
        cc.log('000');
        // var that = this;
        // cc.log(that.task_id);


        // cc.log(that.gf_img.parent.parent.parent.parent.parent);


        // that.ajaxPostFun(
        //     Win_Global.path+'/task.php?action=task_prize',
        //     'token='+Win_Global.token+'&task_id='+that.task_id,
        //     function(res)
        //     {
        //         console.log(res);
        //         if( res.code == 1 )
        //         {
        //             Alert.show("领取成功！", null, false, 0.1);
        //         }
        //         else if( res.code == 9004 )
        //         {
        //             that.gf_img.parent.parent.parent.parent.parent.getChildByName('telLayer').active = true;
        //             // Alert.show("未绑定手机号", null, false, 0.1);
        //         }
        //     }
        // );
    }

    // ajaxPostFun:function(ServerLink,str,callback) {

    //     var xhr = new XMLHttpRequest();

    //     xhr.open("POST", ServerLink);

    //     xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");


    //     xhr.send(str);

    //     xhr.onreadystatechange = function ()
    //     {
    //         if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) 
    //         {   
    //             var result = JSON.parse(xhr.responseText);

    //             callback(result);
    //         }
    //     };
    // } 


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
        //# sourceMappingURL=giftList.js.map
        