cc.Class({
    extends: cc.Component,

    properties: {
        ballVelocity: cc.v2(0, 0),
        ballAngularVelocity: cc.v2(0, 0)
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.rigidBody = this.getComponent(cc.RigidBody);
        this.arrow = this.node.getChildByName("arrow");
        this.ballAngularVelocity = this.rigidBody.angularVelocity;
    },

    start() { },
    move() {
        this.rigidBody.linearVelocity = this.ballVelocity;
        this.rigidBody.angularDamping = 5;
    },
    update(dt) {
        if (this.rigidBody.linearVelocity.mag() === 0) {
            this.arrow.opacity = 255;
        }
        // cc.log(this.rigidBody.angularVelocity);
    },
});
