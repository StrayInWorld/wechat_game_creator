let SquareComp = require("square-comp");

let SquareTool = {
    symbolSpriteFrame: null,
    numberSpriteFrame: null,
    isDivisionSymbol: function (symbolName) {
        if (symbolName === "division") {
            return true;
        }
        return false;
    },
    isXSymbol: function (symbolName) {
        if (symbolName === "X") {
            return true;
        }
        return false;
    },
    getInteger: function (toNum, fromNum = 0) {
        return Math.floor(Math.random() * toNum) + fromNum;
    },
    createRandomSquare: function (prefabNode, gameScene, startHeight = -380) {
        let canvas = cc.director.getScene().getChildByName("Canvas");
        let canvasWidth = canvas.width;
        let prefabInstance = cc.instantiate(prefabNode);
        let canvasSidePos = canvasWidth / 2 + prefabInstance.width / 2;
        let squareMaskHeight = prefabInstance.height * 2 + 4 * 2 * 60;
        cc.log(squareMaskHeight);
        let leftSquareMask = null;
        let rightSquareMask = null;
        if (gameScene) {
            leftSquareMask = canvas.getChildByName("leftSquareMask");
            rightSquareMask = canvas.getChildByName("rightSquareMask");
            leftSquareMask.setContentSize(prefabInstance.width, squareMaskHeight);
            rightSquareMask.setContentSize(prefabInstance.width, squareMaskHeight);
        }

        //边缘方块
        for (let i = 0; i < 10; i++) {
            let randomSquare = cc.instantiate(prefabNode);
            let numNode=randomSquare.getChildByName("sign");
            randomSquare.setAnchorPoint(cc.v2(0, 0));
            if (gameScene) {
                if (i % 2 !== 0) {
                    randomSquare.y = startHeight + (i - 1) * 60;
                }
                else {
                    randomSquare.y = startHeight + i * 60;
                }
            }
            else {
                randomSquare.y = startHeight + i * 60;
            }
            randomSquare.x = -canvasSidePos;
            let squareComp = randomSquare.getComponent(SquareComp);
            squareComp.gameScene = gameScene;

            let randomSquareSymbol = numNode.getChildByName("symbol");
            let randomSymbol = this.symbolSpriteFrame[this.getInteger(4)];
            randomSquareSymbol.getComponent(cc.Sprite).spriteFrame = randomSymbol;

            let randomSquareNum = numNode.getChildByName("num");
            let randomNum = 0;
            //除法规避0
            if (this.isDivisionSymbol(randomSymbol.name)) {
                randomNum = this.numberSpriteFrame[this.getInteger(9, 1)];
            }
            //乘法取到2
            else if (this.isXSymbol(randomSymbol.name)) {
                randomNum = this.numberSpriteFrame[this.getInteger(3, 0)];
            }
            else {
                randomNum = this.numberSpriteFrame[this.getInteger(10, 0)];
            }
            randomSquareNum.getComponent(cc.Sprite).spriteFrame = randomNum;
            squareComp.floor = Math.floor(i / 2);
            if (i % 2 == 0) {
                squareComp.isLeft = false;
                randomSquare.x = canvasSidePos;
                if (gameScene && rightSquareMask) {
                    rightSquareMask.addChild(randomSquare);
                }
                else {
                    canvas.addChild(randomSquare);
                }
            }
            else {
                if (gameScene && leftSquareMask) {
                    leftSquareMask.addChild(randomSquare);
                }
                else {
                    canvas.addChild(randomSquare);
                }

            }
            // canvas.addChild(randomSquare);
        }
    }
}

module.exports = SquareTool




