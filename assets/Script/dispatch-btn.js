let BallComp = require("BallComp");

cc.Class({
    extends: cc.Component,

    properties: {
        powerLineMask: cc.Node,
        isDispatch: false,
        ball: cc.Node,
        velocity: cc.v2(0, 0)
    },
    onLoad() {
        this.lineMaskWidget = this.powerLineMask.getComponent(cc.Widget);
        this.isChangeLeft = false;
        this.reduceLength = 3;
        this.ballComp = this.ball.getComponent(BallComp);
        this.dispatchSquare = cc.find("Canvas/dispatchSquare");

        this.node.on("touchend", this.touchEndCB, this);
        this.node.on("touchcancel", this.backLineMask, this)
    },
    start() {

    },
    update(dt) {
        //修改能量条
        if (this.isChangeLeft && this.lineMaskWidget.left <= this.node.parent.width) {
            this.lineMaskWidget.left += this.reduceLength;
        }
        //判断是否开启触摸事件监听,防止在飞行过程中再次飞行。
        // cc.log(this.velocity.mag());
        if (this.velocity.mag() === 0) {
            this.node.pauseSystemEvents(true);
        }
        else {
            this.node.resumeSystemEvents(true);
        }
    },
    onTouchEvent() {
        this.node.on("touchstart", function (event) {
            this.lineMaskWidget.left = 0;
            this.isChangeLeft = true;
            this.isDispatch = true;
        }, this);
    },
    touchEndCB() {
        this.backLineMask();
        //线速度存在的情况下
        if (this.ballComp.ballVelocity.mag() !== 0) {
            this.ball.getChildByName("arrow").opacity = 0;
            this.ballComp.move();  //移动球    
        }
        if(this.dispatchSquare){
            this.dispatchSquare.removeFromParent(true);
        }
    },
    backLineMask() {
        //不转动箭头时线速度
        if (this.velocity.mag() === 0) {
            let v2ByRotate = cc.v2(0, 1).rotate(-(this.ball.rotation * Math.PI / 180));
            this.velocity = v2ByRotate.normalize();
        }
        this.ballComp.ballVelocity = this.velocity.mul(this.lineMaskWidget.left * 2);
        this.velocity = cc.v2(0, 0);
        this.lineMaskWidget.left = -1500;
        this.isChangeLeft = false;
    }
});
