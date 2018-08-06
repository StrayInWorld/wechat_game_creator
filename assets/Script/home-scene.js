var SquareComp = require("square-comp");

cc.Class({
    extends: cc.Component,

    properties: {
        square: cc.Prefab,
        startBtn: cc.Node,
        gameTitleNode: cc.Node,
        singleSquare: cc.Node,
 
        age:10
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // cc.director.setDisplayStats(false); //关闭fps


        this.symbolAry=null;
        this.numberAry=null;
        var self = this;
        cc.loader.loadResDir("num", cc.SpriteFrame, function (err, assets, url) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            self.numberAry=assets;
            cc.log(self.numberAry);
            self.node.runAction(cc.callFunc(function(){
                cc.loader.loadResDir("symbol", cc.SpriteFrame, function (err, assets, url) {
                    if (err) {
                        cc.error(err.message || err);
                        return;
                    }
                    self.symbolAry = assets;
                    cc.log(self.symbolAry);
                    self.node.runAction(cc.callFunc(self.createSquare,self));
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

    createSquare(){
        cc.log("dd");
        let canvasWidth = this.node.width;
        let squareTest = cc.instantiate(this.square);
        let symbolSF = this.getSpriteFrameFromSprite(this.singleSquare, "symbol");

        let canvasSidePos = canvasWidth / 2 + squareTest.width / 2
        //边缘方块
        var canvas = cc.director.getScene().getChildByName("Canvas");
        for (let i = 0; i < 10; i++) {
            let randomSquare = cc.instantiate(this.square);
            randomSquare.y = -420 + i * 70;
            randomSquare.x = -canvasSidePos;
            if (i % 2 == 0) {
                randomSquare.getComponent(SquareComp).isLeft = false;
                randomSquare.x = canvasSidePos;
            }
            let randomSquareSymbol = randomSquare.getChildByName("symbol");
            randomSquareSymbol.getComponent(cc.Sprite).spriteFrame=this.symbolAry[Math.floor(Math.random()*4)];

            let randomSquareNum =randomSquare.getChildByName("num");
            randomSquareNum.getComponent(cc.Sprite).spriteFrame=this.numberAry[Math.floor(Math.random()*9)];
            canvas.addChild(randomSquare);
        }
    },
    start() {
        cc.log("start");
    },
    getSpriteFrameFromSprite(parentNode, childNode) {
        let node = parentNode.getChildByName(childNode);
        if (node) {
            return node.getComponent(cc.Sprite).spriteFrame;
        }
    }
    // update (dt) {},
});
