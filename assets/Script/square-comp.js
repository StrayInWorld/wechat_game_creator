
cc.Class({
    extends: cc.Component,

    properties: {
        isLeft:true
    },

    onLoad () {
    },

    start () {
        var colorAry=[new cc.color(185,248,219),new cc.color(178,231,232)];
        let colorInAry=colorAry[Math.floor(Math.random()*2)];
        if(colorInAry!==undefined){
            this.node.getChildByName("singleColor").color=colorInAry;
            // this.node.getChildByName("singleColor").color=new cc.color(217,232,178);
        }
        else{
            this.node.getChildByName("singleColor").color=new cc.color(148,245,201);
        }
        var nodeWidth=this.node.width;
        var canvasWidth=this.node.parent.width;
        var targetX=cc.p(-canvasWidth/2+nodeWidth/2+5,this.node.y)
        if(!this.isLeft){
            targetX=cc.p(canvasWidth/2-nodeWidth/2-5,this.node.y);
        }
        this.node.runAction(cc.moveTo(1.0,targetX).easing(cc.easeBounceInOut(0.5)));

    },

    // update (dt) {},
});
