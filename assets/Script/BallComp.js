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
            let symbol = otherNode.getChildByName("symbol");
            let num = otherNode.getChildByName("num");
            if(symbol&&num){
                let symbolSpriteFrame = symbol.getComponent(cc.Sprite).spriteFrame;
                let numSpriteFrame = num.getComponent(cc.Sprite).spriteFrame;
                this.calculatingScore(symbolSpriteFrame.name, numSpriteFrame.name);
                let action=cc.sequence(cc.scaleBy(3.5,1,0.8),cc.moveBy(3.5,cc.v2(0,50)),cc.scaleBy(3.5,1,1));
                //判断是否有动作在执行
                // symbol.runAction(action);
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
