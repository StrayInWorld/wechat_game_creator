
cc.Class({
    extends: cc.Component,

    properties: {
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        audio: {
            default: null,
            type: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function () {
        this.current = cc.audioEngine.play(this.audio, false, 1);
    },

    // called every frame
    update: function (dt) {

    },
    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    }
});
