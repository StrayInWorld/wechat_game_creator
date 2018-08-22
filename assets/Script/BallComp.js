let SquareTool = require("SquareTool");

cc.Class({
    extends: cc.Component,

    properties: {
        ballVelocity: cc.v2(0, 0),
        square: cc.Prefab,
        moveTime: 1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.rigidBody = this.getComponent(cc.RigidBody);
        this.arrow = this.node.getChildByName("arrow");
        this.scoreLabel = cc.find("Canvas/score/scoreLabel").getComponent(cc.Label);
        // this.square=cc.find("Canvas/dispatchSquare");

        this.leftSquareMask = cc.find("Canvas/leftSquareMask");
        this.leftMaskCompHeight = 0;
        this.rightSquareMask = cc.find("Canvas/rightSquareMask");
        this.rightMaskCompHeight = 0;

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
            let sign = otherNode.getChildByName("sign");
            let squareComp = otherNode.getComponent("square-comp");

            //移动数字，计算
            if (sign && sign.getNumberOfRunningActions() === 0) {
                let symbol = sign.getChildByName("symbol");
                let num = sign.getChildByName("num");

                let symbolSpriteFrame = symbol.getComponent(cc.Sprite).spriteFrame;
                let numSpriteFrame = num.getComponent(cc.Sprite).spriteFrame;
                this.calculatingScore(symbolSpriteFrame.name, numSpriteFrame.name);
                let action = cc.spawn(
                    cc.scaleBy(1.0, 1, 0.8),
                    cc.moveBy(1.0, cc.v2(0, 70)),
                    cc.scaleTo(1.0, 1, 1),
                    cc.fadeOut(1.0)
                );
                let seqAction = cc.sequence(action,
                    cc.callFunc(function () {            //移动方块
                        sign.removeFromParent();
                        if (squareComp && squareComp.floor >= 3) {
                            let delayTime = 0;
                            if (otherNode.getNumberOfRunningActions() !== 0) {
                                delayTime = this.moveTime;
                            }
                            otherNode.runAction(cc.sequence(
                                cc.delayTime(delayTime),
                                cc.callFunc(function () {
                                    this.moveSideSquare();
                                }, this)
                            ));

                        }
                    }, this));
                sign.runAction(seqAction);
            }
        }

    },

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve: function (contact, selfCollider, otherCollider) {
    },

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve: function (contact, selfCollider, otherCollider) {
        if (this.arrow.opacity === 0&&this.arrow.getNumberOfRunningActions()===0) {
            this.arrow.runAction(cc.sequence(
                cc.delayTime(0.5),
                cc.callFunc(function () {
                    this.arrow.opacity = 255;
                    cc.log("is runAction");
                }, this)
            ));
        }
    },
    setMaskCompHeight(leftHeight, rightHeight) {
        cc.log(leftHeight, rightHeight);
        this.leftMaskCompHeight = leftHeight;  //比较高度
        this.rightMaskCompHeight = rightHeight;
    },
    moveSideSquare() {
        //添加新的方块
        let newLeftSquare = SquareTool.createSingleSquare(this.square, true, this.leftSquareMask);
        if (newLeftSquare) {
            this.leftSquareMask.addChild(newLeftSquare);
        }
        let newRightSquare = SquareTool.createSingleSquare(this.square, false, this.rightSquareMask);
        if (newRightSquare) {
            this.rightSquareMask.addChild(newRightSquare);
        }
        //移动方块
        let childrenLength = this.leftSquareMask.children.length;
        let moveLength = SquareTool.distanceOfSquare * 2;
        this.mapOfSquareMask(this.leftSquareMask, this.leftMaskCompHeight);
        this.mapOfSquareMask(this.rightSquareMask, this.rightMaskCompHeight);
    },
    mapOfSquareMask(squareMask, squareMaskHeight) {
        let moveLength = SquareTool.distanceOfSquare * 2;
        if (squareMask.children.constructor === Array) {
            squareMask.children.map(function (item) {
                item.runAction(cc.sequence(
                    cc.moveBy(this.moveTime, 0, -moveLength),
                    cc.callFunc(function () {
                        this.isDestory(squareMask, item, squareMaskHeight);
                    }, this)

                ));
            }, this);
        }
    },
    updateSquareFloor(parentNode) {
        let childrenLength = parentNode.children.length;
        // cc.log("update",parentNode.children[0].children[3].children[0].getComponent(cc.Sprite).spriteFrame);
        for (let i = 0; i < childrenLength; i++) {
            let squareComp = parentNode.children[i].getComponent("square-comp");
            squareComp.floor = i;
        }

        // for (let i = 0; i < childrenLength; i++) {
        //     let leftSquareComp = this.leftSquareMask.children[i].getComponent("square-comp");
        //     cc.log(leftSquareComp.floor);
        // }

    },
    isDestory(maskNode, squareNode, compareHeight) {
        if (squareNode) {
            let worldPos = maskNode.convertToWorldSpaceAR(squareNode.position);
            // cc.log("AR",worldPos);
            if (worldPos.y < compareHeight) {
                squareNode.removeFromParent(true);
                // cc.log("isDestory",maskNode.children[0].children[3].children[0].getComponent(cc.Sprite).spriteFrame);
                this.updateSquareFloor(maskNode);    //重新设置floor
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
                    score = Number.parseFloat(score.toFixed(2));
                    break;
                case "sub":
                    score -= Number.parseInt(numText);
                    break;
            }
            this.scoreLabel.string = score.toString();
        }
    },
    update(dt) {
        // let angular = Number.parseFloat(this.rigidBody.angularVelocity.toFixed(2));
        // if (this.rigidBody.angularVelocity !== 0 && angular < 1.7 && angular >= -1.7) {
        //     this.arrow.opacity = 255;
        // }
    },
});
