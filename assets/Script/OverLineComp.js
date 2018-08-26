let musicComp = require("MusicComp");
let squareComp = require("SquareTool");

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
        this.highScore = cc.find("Canvas/highScore");
        this.highScore.active=false;
        this.highscoreLabel =this.highScore.getComponent(cc.Label);
        this.score = cc.find("Canvas/score/scoreLabel");
        this.scoreLabel =this.score.getComponent(cc.Label);
    },
    start(){
        this.musicBtn = cc.find("Canvas/music");
        if(this.musicBtn.active){
            this.musicComp = this.musicBtn.getComponent(musicComp);
        }
    },
    onBeginContact(contact, selfCollider, otherCollider){
        this.backBg.active=true;
        this.startAgainBtn.active=true;
        this.highScore.active=true;
        this.highscoreLabel.string=cc.js.formatStr("最高分：%s",this.scoreLabel.string);

        //最高分
        let storageHighScore = cc.sys.localStorage.getItem(squareComp.highScoreStorage);
        if(storageHighScore){
            let storageScore = Number(storageHighScore);
            if(storageScore>Number(this.scoreLabel.string)){
                this.highscoreLabel.string=cc.js.formatStr("最高分：%s",storageHighScore);
            }
            else{
                this.highscoreLabel.string=cc.js.formatStr("最高分：%s",this.scoreLabel.string);
                cc.sys.localStorage.setItem(squareComp.highScoreStorage,this.scoreLabel.string);
            }
        }
        else{
            cc.sys.localStorage.setItem(squareComp.highScoreStorage,this.scoreLabel.string);
        }

        //停止事件传播
        this.backBg.on("touchstart",function(event){
            event.stopPropagation();
        });
        this.backBg.on("touchmove",function(event){
            event.stopPropagation();
        });
        //背景音乐
        if(this.musicComp&&this.musicComp.audioSource.isPlaying){
            this.musicComp.audioSource.stop();
            this.musicBtn.pauseAllActions();
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
