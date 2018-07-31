cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let canvasWidth = this.node.parent.width;
        let overLineY = this.node.parent.getChildByName("overLine").y
        this.node.y = 385;
        let whiteSquateWidget = this.getComponent(cc.Widget);
        whiteSquateWidget.left = 290;

        let duration = overLineY - this.node.y - this.node.height / 2;
        // this.node.runAction(cc.sequence(
        //     cc.moveBy(5.0, cc.p(0, duration)),
        //     cc.callFunc(function () { 
        //         this.whiteSquarePool.put(this.node);
        //         cc.log("callFunc,parent:",this.node.active);
        //         cc.log("callFunc,parent:",this.node.activeInHierarchy);
        //     }, this)
        // ));
    },

    start() { },
    update(dt) { },
    reuse(whiteSquarePool) {
        cc.log("reuse is on");
        this.whiteSquarePool = whiteSquarePool;
    },
    unuse() {
        cc.log("unuse is on");
    }
});
