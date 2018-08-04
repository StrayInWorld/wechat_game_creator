
cc.Class({
    extends: cc.Component,

    properties: {
        isLeft:true
    },

    onLoad () {
    },

    start () {
        var colorAry=[new cc.color(148,245,201),new cc.color(106,250,209),new cc.color(165,228,5),
            new cc.color(254,101,144),new cc.color(171,226,67),new cc.color(204,241,91),
            new cc.color(165,226,152),new cc.color(121,202,240),new cc.color(251,71,130),new cc.color(95,218,222)]
        if(colorAry[Math.floor(Math.random()*9)]!==undefined){
            // this.node.color=colorAry[Math.floor(Math.random()*9)];
            this.node.color=new cc.color(164,227,252);
        }
        else{
            this.node.color=new cc.color(148,245,201);
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
