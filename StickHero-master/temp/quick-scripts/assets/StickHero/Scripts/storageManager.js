(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/StickHero/Scripts/storageManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '10710Cz8ZRCqLlVtCy4fcaY', 'storageManager', __filename);
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
        //# sourceMappingURL=storageManager.js.map
        