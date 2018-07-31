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
        this.schedule(this.createWhiteSquare,2,2,5);
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
        
        whiteSquareInPool.runAction(cc.sequence(
            cc.moveBy(5.0, cc.p(0, -708)),
            cc.callFunc(function () { 
                this.whiteSquarePool.put(whiteSquareInPool);
                cc.log("callFunc,parent:",this.node.active);
                cc.log("callFunc,parent:",this.node.activeInHierarchy);
            }, this)
        ));

        whiteSquareInPool.parent=this.node;            
    },
    generateNode: function () {
        var monster = this.whiteSquarePool.get();  //调用PoolHandler的reuse
        if (!monster) {
            monster = cc.instantiate(this.whiteSquarePre);
            // Add pool handler component which will control the touch event
            // monster.addComponent('PoolHandler');
        }
        
        monster.runAction(cc.sequence(
            cc.moveBy(5, 0, -100),
            cc.callFunc(this.removeNode, this, monster)
        ));
        
        this.node.addChild(monster);
    },
    
    removeNode: function (sender, monster) {
        this.whiteSquarePool.put(monster);
    }
});
