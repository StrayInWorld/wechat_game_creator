
cc.Class({
    extends: cc.Component,

    properties: {
     
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let rotateAct=cc.sequence(cc.rotateBy(0.5,15),cc.rotateBy(0.5,-15));
        // this.node.runAction(cc.repeat(rotateAct,3));
        this.node.runAction(cc.moveTo(1.0,cc.p(0,0)).easing(cc.easeExponentialInOut(3)));
    },

    start () {

    },

    // update (dt) {},
});
