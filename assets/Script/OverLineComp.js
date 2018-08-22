cc.Class({
    extends: cc.Component,

    properties: {
         startAgainBtn:cc.Node,
         rusemeGameBtn:cc.Node,
         backBg:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.startAgainBtn.opacity=0;
        this.rusemeGameBtn.opacity=0;
    },
    onBeginContact(contact, selfCollider, otherCollider){
        cc.director.pause();
        this.backBg.active=true;
        this.startAgainBtn.opacity=255;
        // this.rusemeGameBtn.opacity=255;
    },
    start () {

    },
    onStartAgainCB(){
        cc.director.resume();
        cc.director.loadScene("maingame");
        this.backBg.removeFromParent(true);
        this.backBg.active=false;
    },
    onResumeAgainCB(){
        cc.log("resume");
    }

    // update (dt) {},
});
