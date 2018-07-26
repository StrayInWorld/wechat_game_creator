var SquareComp=require("square-comp");

cc.Class({
    extends: cc.Component,

    properties: {
       square:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.director.setDisplayStats(false); //关闭fps
        for(let i=0;i<10;i++){
            let randomSquare=cc.instantiate(this.square);
            randomSquare.x=-420;
            randomSquare.y=-400+i*80;
            if(i%2==0){
                randomSquare.x=420;
                randomSquare.getComponent(SquareComp).isLeft=false;
            }
            cc.director.getScene().getChildByName("Canvas").addChild(randomSquare);
        }

    },

    start () {

    },

    // update (dt) {},
});
