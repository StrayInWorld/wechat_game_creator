var SquareComp=require("square-comp");

cc.Class({
    extends: cc.Component,

    properties: {
       square:cc.Prefab,
       startBtn:cc.Node,
       gameTitleNode:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.director.setDisplayStats(false); //关闭fps

        //边缘方块
        var canvas=cc.director.getScene().getChildByName("Canvas");
        let squareTest=cc.instantiate(this.square);
        var canvasSidePos=canvas.width/2+squareTest.width/2
        for(let i=0;i<10;i++){
            let randomSquare=cc.instantiate(this.square);
            randomSquare.x=-canvasSidePos;
            randomSquare.y=-420+i*70;
            if(i%2==0){
                randomSquare.x=canvasSidePos;
                randomSquare.getComponent(SquareComp).isLeft=false;
            }
            canvas.addChild(randomSquare);
        }

        //开始按钮
        this.startBtn.setOpacity(0);
        this.startBtn.runAction(cc.fadeIn(1.5));

        //标题
        let rotateAct=cc.sequence(cc.rotateBy(0.5,15),cc.rotateBy(0.5,-15));
        this.gameTitleNode.runAction(cc.moveTo(1.0,cc.p(0,0)).easing(cc.easeExponentialInOut(3)));


    },
    startBtnCB(){
        cc.director.loadScene("maingame");
    },

    start () {

    },

    // update (dt) {},
});
