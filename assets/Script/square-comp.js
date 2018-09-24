cc.Class({
    extends: cc.Component,

    properties: {
        isLeft: true,
        floor: 0,
        gameScene: true,
        isRunAction: true
    },

    onLoad() {
    },

    start() {
        var colorAry = [new cc.color(185, 248, 219), new cc.color(178, 231, 232)];
        let colorInAry = colorAry[Math.floor(Math.random() * 2)];
        if (colorInAry !== undefined) {
            this.node.getChildByName("singleColor").color = colorInAry;
        }
        else {
            this.node.getChildByName("singleColor").color = new cc.color(148, 245, 201);
        }
        var nodeWidth = this.node.width * this.node.scaleX;
        var canvasWidth = 0;
        if (!this.gameScene) {
            canvasWidth = this.node.parent.width;
        }
        var extraWidth = 5;
        var targetX = cc.v2(-canvasWidth / 2 + nodeWidth / 2 + extraWidth, this.node.y)
        if (!this.isLeft) {
            targetX = cc.v2(canvasWidth / 2 - nodeWidth / 2 - extraWidth, this.node.y);
        }
        if (this.isRunAction) {
            this.node.runAction(cc.moveTo(0.5, targetX).easing(cc.easeBounceInOut(0.5)));
        }

    }

    // update (dt) {},
});
