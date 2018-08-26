let squareTool = require("SquareTool");

cc.Class({
    extends: cc.Component,

    properties: {
        audioSource: {
            type: cc.AudioSource,
            default: null
        }
    },

    // use this for initialization
    onLoad: function () {
        //设置常驻节点
        // cc.game.addPersistRootNode(this.node);  

        //播放音乐
        if(cc.sys.isNative){
            this.node.active=false;
        }
        else{
            if(cc.sys.localStorage.getItem(squareTool.musicStorage)==="true"){
                if (!this.audioSource.isPlaying) {
                    this.audioSource.play();
                    this.setMusicStorage(true);
                    this.node.runAction(cc.repeatForever(cc.rotateBy(1, 30)));
                }
            }
            else{
                if (this.audioSource.isPlaying) {
                    this.audioSource.stop();
                    this.setMusicStorage(false);
                    this.node.pauseAllActions();
                    this.node.rotation = 0;                }
            }

        }

    },
    setMusicStorage(value){
        cc.sys.localStorage.setItem(squareTool.musicStorage,value);
    },
    msuicCB() {
        if (this.audioSource.isPlaying) {
            this.stop();
            this.node.pauseAllActions();
            this.setMusicStorage(false);
            this.node.rotation = 0;
        }
        else {
            this.play();
            this.setMusicStorage(true);
            this.node.resumeAllActions();
            this.node.rotation = 0;
        }
    },
    play: function () {
        this.audioSource.play();
    },
    stop: function () {
        this.audioSource.stop();
    },

});
