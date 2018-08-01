let whiteSquareCom = require("white-square");

cc.Class({
    extends: cc.Component,

    properties: {
        dispatchSquare: cc.Node,
        whiteSquarePre: cc.Prefab,
        overLine: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.squareWidget = this.dispatchSquare.getComponent(cc.Widget);

        //缓存池
        this.whiteSquarePool = new cc.NodePool(whiteSquareCom);
        let whiteSauareNum = 10;
        for (let i = 0; i < whiteSauareNum; i++) {
            let whiteSquare = cc.instantiate(this.whiteSquarePre);
            this.whiteSquarePool.put(whiteSquare);
        }
        this.schedule(this.createWhiteSquare, 3.5, cc.macro.REPEAT_FOREVER, 2);
    },

    start() {
    },

    update(dt) {
    },
    createWhiteSquare() {
        let whiteSquareInPool = null;
        if (this.whiteSquarePool.size() > 0) {
            whiteSquareInPool = this.whiteSquarePool.get(this.whiteSquarePool);
        }
        else {
            whiteSquareInPool = cc.instantiate(this.whiteSquarePre);
        }

        whiteSquareInPool.parent = this.node;
        whiteSquareInPool.y = this.node.height / 2 - 35;
        whiteSquareInPool.opacity = 0;
        let whiteSquateWidget = whiteSquareInPool.getComponent(cc.Widget);
        whiteSquateWidget.left = 290;

        let moveDuration = this.overLine.y - whiteSquareInPool.y

        whiteSquareInPool.runAction(cc.sequence(
            cc.spawn(
                cc.fadeIn(0.5),
                cc.moveBy(5, cc.p(0, moveDuration)),
            ),
            cc.spawn(
                cc.moveBy(0.5, cc.p(0, -whiteSquareInPool.height / 2)),
                cc.fadeOut(0.5)
            ),
            cc.callFunc(function () {
                this.whiteSquarePool.put(whiteSquareInPool);
            }, this)
        ));

    }
});
