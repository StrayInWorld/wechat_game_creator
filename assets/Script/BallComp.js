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
        this.scoreLabel = cc.find("Canvas/score/scoreLabel").getComponent(cc.Label);
        // this.square=cc.find("Canvas/dispatchSquare");
    },
    // start() {},
    move() {
        this.rigidBody.linearVelocity = this.ballVelocity;
        this.rigidBody.angularDamping = 5;
    },
    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
        let otherNode = otherCollider.node;
        if (otherNode && otherNode.name === "singleSqaure") {
            let numSpriteFrame = otherNode.getChildByName("sign");
            let symbol=numSpriteFrame.getChildByName("symbol");
            let num=numSpriteFrame.getChildByName("num");
            cc.log(otherNode.getChildByName("New Node"));
            cc.log(otherNode.getChildByName("sign"));

            if(numSpriteFrame){
                let symbolSpriteFrame = symbol.getComponent(cc.Sprite).spriteFrame;
                let numSpriteFrame = num.getComponent(cc.Sprite).spriteFrame;
                this.calculatingScore(symbolSpriteFrame.name, numSpriteFrame.name);
                let action=cc.spawn(cc.scaleBy(1.0,1,0.8),cc.moveBy(1.0,cc.v2(0,50)),cc.scaleTo(1.0,1,1));
                //判断是否有动作在执行
                if(symbol.getNumberOfRunningActions()===0){
                    numSpriteFrame.runAction(action);
                }
     
                // num.runAction(action);    
            }
        }
    },
    calculatingScore(symbolText, numText) {
        let score = Number.parseInt(this.scoreLabel.string);
        if (!Number.isNaN(score)) {
            switch (symbolText) {
                case "X":
                    score *= Number.parseInt(numText);
                    break;
                case "add":
                    score += Number.parseInt(numText);
                    break;
                case "division":
                    score /= Number.parseInt(numText);
                    break;
                case "sub":
                    score -= Number.parseInt(numText);
                    break;
            }
            this.scoreLabel.string=score.toString();
        }
    },
    update(dt) {
        if (this.rigidBody.linearVelocity.mag() === 0) {
            this.arrow.opacity = 255;
        }
    },
});
