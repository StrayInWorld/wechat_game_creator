cc.Class({
    extends: cc.Component,

    properties: {
    
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this._position = cc.v2();
        this._center = cc.v2();
    },
    move(){
        let rigidBody=this.getComponent(cc.RigidBody);
        // rigidBody.applyForceToCenter(cc.v2(-5000,3000),true);
        // rigidBody.linearVelocity=cc.v2(-500,1000);
    }
    // update (dt) {},
});
