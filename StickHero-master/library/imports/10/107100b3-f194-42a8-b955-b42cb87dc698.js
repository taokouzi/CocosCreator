"use strict";
cc._RF.push(module, '10710Cz8ZRCqLlVtCy4fcaY', 'storageManager');
// StickHero/Scripts/storageManager.js

"use strict";

// 存储最高分

var storageManager = function () {
    var spriteFrameCache = null;
    if (!cc.sys.localStorage.highestScore) {
        cc.sys.localStorage.highestScore = 0;
    }
    return {
        getHighestScore: function getHighestScore() {
            return cc.sys.localStorage.highestScore;
        },
        setHighestScore: function setHighestScore(score) {
            cc.sys.localStorage.highestScore = score;
        }
    };
}();

module.exports = storageManager;

cc._RF.pop();