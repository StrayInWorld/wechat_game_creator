let whiteSquareCom=require("white-square");

cc.Class({
    extends: cc.Component,

    properties: {   
        dispatchSquare:cc.Node,
        whiteSquarePre:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.squareWidget= this.dispatchSquare.getComponent(cc.Widget);

        //缓存池
        this.whiteSquarePool=new cc.NodePool(whiteSquareCom);
        let whiteSauareNum=10;
        for(let i=0;i<whiteSauareNum;i++){
            let whiteSquare=cc.instantiate(this.whiteSquarePre);
            this.whiteSquarePool.put(whiteSquare);
        }
        this.schedule(this.createWhiteSquare,5,cc.macro.REPEAT_FOREVER,5);
    },

    start () {
    },

    update (dt) {
    },
    createWhiteSquare(){
        let whiteSquareInPool=null;
        if(this.whiteSquarePool.size()>0){
            whiteSquareInPool=this.whiteSquarePool.get(this.whiteSquarePool);
        }
        else{
            whiteSquareInPool=cc.instantiate(this.whiteSquarePre);
        }
        whiteSquareInPool.parent=this.node;        
    }
});
