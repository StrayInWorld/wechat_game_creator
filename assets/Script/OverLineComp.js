cc.Class({
    extends: cc.Component,

    properties: {
         startAgainBtn:cc.Node,
         rusemeGameBtn:cc.Node,
         backBg:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.rusemeGameBtn.active=false;        
        this.startAgainBtn.active=false;
    },
    onBeginContact(contact, selfCollider, otherCollider){
        this.backBg.active=true;
        this.startAgainBtn.active=true;
        this.backBg.on("touchstart",function(event){
            event.stopPropagation();
        });
    },
    start () {

    },
    onStartAgainCB(){
        cc.director.loadScene("maingame");
        this.backBg.removeFromParent(true);
        this.backBg.active=false;
        this.startAgainBtn.active=false;

    },
    onResumeAgainCB(){
        cc.log("resume");
    }

    // update (dt) {},
});
