(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/StickHero/Scripts/bkqList.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c8874h+gtJAMqFYdQ8HudjK', 'bkqList', __filename);
// StickHero/Scripts/bkqList.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {

        bkq_num: cc.Label,
        bkq_rank: cc.Label,

        bkq_id: null
    },

    start: function start() {},


    init: function init(data) {
        var that = this;

        cc.log(data);

        that.bkq_num.string = data.bkq_num + '贝壳券';
    },

    // 领取贝壳券
    giveBkqFunc: function giveBkqFunc() {}

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
        //# sourceMappingURL=bkqList.js.map
        