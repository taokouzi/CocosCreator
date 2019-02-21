"use strict";
cc._RF.push(module, 'c8874h+gtJAMqFYdQ8HudjK', 'bkqList');
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