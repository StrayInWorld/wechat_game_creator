// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let canvasWidth=this.node.parent.width;
        let overLineY=this.node.parent.getChildByName("overLine").y
        this.node.y=385;
        if(Math.random()>0.8){
            cc.log("0.5");
            let whiteSquateWidget=this.getComponent(cc.Widget);
            whiteSquateWidget.left=290;
        } 
        let duration=overLineY-this.node.y-this.node.height/2;
        this.node.runAction(cc.sequence(
            cc.moveBy(5.0,cc.p(0,duration)),
            cc.callFunc(function(){this.whiteSquarePool.put(this.node)},this)

        ));
    },

    start () {},
    update (dt) {},
    reuse(whiteSquarePool){
        cc.log("reuse is on");
        this.whiteSquarePool=whiteSquarePool;
    },
    unuse(){
        cc.log("unuse is on");
    }
});
