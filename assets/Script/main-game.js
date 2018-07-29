cc.Class({
    extends: cc.Component,

    properties: {
        dispatchBtn:cc.Node,
        dispatchSquare:cc.Node,
        powerLineMask:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.squareWidget= this.dispatchSquare.getComponent(cc.Widget);
        let lineMaskWidget=this.powerLineMask.getComponent(cc.Widget);
        this.dispatchBtn.on("touchstart",function(event){
            this.powerLineMask.runAction(cc.sequence(
                cc.callFunc(function(){
                    cc.log("before:",lineMaskWidget.left);        
                },this),
                cc.callFunc(function(){
                    lineMaskWidget.left+=320;
                },this),
                cc.callFunc(function(){
                    cc.log("after:",lineMaskWidget.left);
                },this)));

            cc.log("qeqwe");
            // this.dispatchSquare.runAction(cc.sequence(
            //     cc.callFunc(function(){cc.log(this.squareWidget.left)},this),
            //      cc.callFunc(function(){this.squareWidget.left=10},this),
            //      cc.callFunc(function(){cc.log(this.squareWidget.left)},this)

            // ));

        },this);
    },

    start () {
    },

    // update (dt) {},
});
