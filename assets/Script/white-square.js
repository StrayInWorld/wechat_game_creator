cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {



    },

    start() { },
    update(dt) { },
    reuse(whiteSquarePool) {
        this.whiteSquarePool = whiteSquarePool;
    },
    unuse() {
    }
});
