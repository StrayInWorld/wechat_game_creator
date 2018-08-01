cc.Class({
    extends: cc.Component,

    properties: {
        dispatchBtn:cc.Node,
        powerLineMask:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.lineMaskWidget=this.powerLineMask.getComponent(cc.Widget);
        this.isChangeLeft=false;

        //发射按钮
        this.dispatchBtn.on("touchstart",function(event){
            this.lineMaskWidget.left=0;
            this.isChangeLeft=true;
        },this);
        this.dispatchBtn.on("touchend",this.backLineMask,this);
        this.dispatchBtn.on("touchcancel",this.backLineMask,this);
    },
    start () {

    },
    update (dt) {
        if(this.isChangeLeft&&this.lineMaskWidget.left<=this.node.parent.width){
            this.lineMaskWidget.left+=5;
        }

    },
    backLineMask(){
        this.lineMaskWidget.left=-1500;
        this.isChangeLeft=false;
    }
});
