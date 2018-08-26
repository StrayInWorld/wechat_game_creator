let musicComp = require("MusicComp");


cc.Class({
    extends: cc.Component,

    properties: {
         startAgainBtn:cc.Node,
         rusemeGameBtn:cc.Node,
         backBg:cc.Node,
         musicBtn:cc.Node,
         highSocre:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.rusemeGameBtn.active=false;        
        this.startAgainBtn.active=false;
        this.musicBtn = cc.find("Canvas/music");
        this.musicComp = this.musicBtn.getComponent(musicComp);
        this.heighScore = cc.find("Canvas/highScore");
        this.heighScore.active=false;
    },
    onBeginContact(contact, selfCollider, otherCollider){
        this.backBg.active=true;
        this.startAgainBtn.active=true;
        this.heighScore.active=true;
        this.backBg.on("touchstart",function(event){
            event.stopPropagation();
        });
        if(this.musicComp.audioSource.isPlaying){
            this.audioSource.stop();
        }
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
