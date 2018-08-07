let SquareComp = require("square-comp");
let SquareStringTool=require("SquareStringTool");

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
            SquareStringTool.numberSpriteFrame=assets;
            self.node.runAction(cc.callFunc(function(){
                cc.loader.loadResDir("symbol", cc.SpriteFrame, function (err, assets, url) {
                    if (err) {
                        cc.error(err.message || err);
                        return;
                    }
                    SquareStringTool.symbolSpriteFrame=assets;
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
        let canvasWidth = this.node.width;
        let squareTest = cc.instantiate(this.square);

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
            let randomSymbol = SquareStringTool.symbolSpriteFrame[SquareStringTool.getInteger(4)];
            randomSquareSymbol.getComponent(cc.Sprite).spriteFrame=randomSymbol;

            let randomSquareNum =randomSquare.getChildByName("num");
            let randomNum=0;
            if(SquareStringTool.isDivisionSymbol(randomSymbol.name)){
                randomNum=SquareStringTool.numberSpriteFrame[SquareStringTool.getInteger(9,1)];
                cc.log("true",randomNum);
            }
            else{
                randomNum=SquareStringTool.numberSpriteFrame[SquareStringTool.getInteger(10,0)];
                cc.log("false",randomNum);
            }
            randomSquareNum.getComponent(cc.Sprite).spriteFrame=randomNum;
            canvas.addChild(randomSquare);
        }
    },
    start(){}
    // isDivisionSymbol(symbolName){
    //        if(symbolName==="division"){
    //            return true;
    //        }
    //        return false;
    // },
    // getInteger(toNum,fromNum=0){
    //       return Math.floor(Math.random()*toNum)+fromNum;
    // }
    // update (dt) {},
});
