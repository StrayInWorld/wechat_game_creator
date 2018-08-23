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
        // cc.audioEngine.setMaxWebAudioSize(1024*10);
    },
    start:function(){
        if(this.audioSource.isPlaying){
            this.node.runAction(cc.repeatForever(cc.rotateBy(1,30)));
        }
    },
    msuicCB(){
        if(this.audioSource.isPlaying){
            this.stop();
            this.node.pauseAllActions();
            this.node.rotation=0;
        }
        else{
            this.play();
            this.node.resumeAllActions();
            this.node.rotation=0;
        }        
    },
    play: function () {
        this.audioSource.play();
    },

    pause: function () {
        this.audioSource.pause();
    },

    stop: function () {
        this.audioSource.stop();
    },

    resume: function () {
        this.audioSource.resume();
    }
});
