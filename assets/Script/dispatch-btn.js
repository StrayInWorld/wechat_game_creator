cc.Class({
    extends: cc.Component,

    properties: {
        dispatchBtn:cc.Node,
        powerLineMask:cc.Node,
        isDispatch:false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.lineMaskWidget=this.powerLineMask.getComponent(cc.Widget);
        this.isChangeLeft=false;
        this.reduceWidgetLeft=3;

        //发射按钮
        this.dispatchBtn.on("touchstart",function(event){
            this.lineMaskWidget.left=0;
            this.isChangeLeft=true;
            this.isDispatch=true;
        },this);
        this.dispatchBtn.on("touchend",this.backLineMask,this);
        this.dispatchBtn.on("touchcancel",this.backLineMask,this);
    },
    start () {

    },
    update (dt) {
        if(this.isChangeLeft&&this.lineMaskWidget.left<=this.node.parent.width){
            this.lineMaskWidget.left+=this.reduceWidgetLeft;
        }

    },
    backLineMask(){
        this.lineMaskWidget.left=-1500;
        this.isChangeLeft=false;
    }
});
