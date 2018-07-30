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
        this.lineMaskWidget=this.powerLineMask.getComponent(cc.Widget);
        this.isChangeLeft=false;
        this.canvansWidth=this.node.width;
        cc.log(this.canvansWidth);
        this.dispatchBtn.on("touchstart",function(event){
            this.lineMaskWidget.left=0;
            this.isChangeLeft=true;
            cc.log("qeqwe");
        },this);
        this.dispatchBtn.on("touchend",this.backLineMask,this);
        this.dispatchBtn.on("touchcancel",this.backLineMask,this);
    },

    start () {
    },

    update (dt) {
        if(this.isChangeLeft&&this.lineMaskWidget.left<=this.node.width){
            this.lineMaskWidget.left+=5;
            cc.log(this.lineMaskWidget.left);
        }
    },
    backLineMask(){
        this.lineMaskWidget.left=-1500;
        this.isChangeLeft=false;
        cc.log("qeqwe");        
    }
});
