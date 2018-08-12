let BallComp=require("BallComp");

cc.Class({
    extends: cc.Component,

    properties: {
        powerLineMask:cc.Node,
        isDispatch:false,
        ball:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.lineMaskWidget=this.powerLineMask.getComponent(cc.Widget);
        this.isChangeLeft=false;
        this.reduceWidgetLeft=3;

        this.node.on("touchend",this.touchEndCB,this);
        this.node.on("touchcancel",this.backLineMask,this);
    },
    start () {

    },
    update (dt) {
        if(this.isChangeLeft&&this.lineMaskWidget.left<=this.node.parent.width){
            this.lineMaskWidget.left+=this.reduceWidgetLeft;
        }

    },
    touchEndCB(){
        this.backLineMask();
        let ballComp=this.ball.getComponent(BallComp);
        ballComp.move();
    },
    backLineMask(){
        this.lineMaskWidget.left=-1500;
        this.isChangeLeft=false;
    }
});
