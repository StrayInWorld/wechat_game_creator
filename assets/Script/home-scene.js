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
        let distance=-3;
        for(let i=0;i<10;i++){
            let randomSquare=cc.instantiate(this.square);
            let randomSquareWidget=randomSquare.getComponent(cc.Widget);
            randomSquare.y=-420+i*70;
            randomSquareWidget.isAlignLeft=true;
            randomSquareWidget.left=distance;
            if(i%2==0){
                randomSquareWidget.isAlignLeft=false;          
                randomSquareWidget.isAlignRight=true;
                randomSquareWidget.right=distance;
                randomSquare.getChildByName("singleColor").getComponent(SquareComp).isLeft=false;
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
    getSpriteFrameName(parentNode,childNode){
        let node=parentNode.getChildByName(childNode);
        if(node){
            return  node.getComponent(cc.Sprite).spriteFrame._name; 
        }
    }
    // update (dt) {},
});
