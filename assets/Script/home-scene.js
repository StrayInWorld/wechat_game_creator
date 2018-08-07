let SquareComp = require("square-comp");
let SquareTool=require("SquareTool");

cc.Class({
    extends: cc.Component,

    properties: {
        square: cc.Prefab,
        startBtn: cc.Node,
        gameTitleNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // cc.director.setDisplayStats(false); //关闭fps
        var self = this;
        cc.loader.loadResDir("num", cc.SpriteFrame, function (err, assets, url) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            SquareTool.numberSpriteFrame=assets;
            self.node.runAction(cc.callFunc(function(){
                cc.loader.loadResDir("symbol", cc.SpriteFrame, function (err, assets, url) {
                    if (err) {
                        cc.error(err.message || err);
                        return;
                    }
                    SquareTool.symbolSpriteFrame=assets;
                    self.node.runAction(cc.callFunc(function(){
                            let randomSquareComp = cc.instantiate(self.square).getComponent(SquareComp);
                            SquareTool.createRandomSquare(self.square);
                    },self));
                });
            }));
        });



        //开始按钮
        this.startBtn.setOpacity(0);
        this.startBtn.runAction(cc.fadeIn(1.5));

        //标题
        let rotateAct = cc.sequence(cc.rotateBy(0.5, 15), cc.rotateBy(0.5, -15));
        this.gameTitleNode.runAction(cc.moveTo(1.0, cc.p(0, 0)).easing(cc.easeExponentialInOut(3)));


    },
    startBtnCB() {
        cc.director.loadScene("maingame");
    },
    start(){}

    // update (dt) {},
});
