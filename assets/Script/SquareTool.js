let SquareComp = require("square-comp");
const X_SYM_INDEX = 0;
const ADD_SYM_INDEX = 1;
const DIV_SYM_INDEX = 2;
const SUB_SYM_INDEX = 3;

let SquareTool = {
    symbolSpriteFrame: null,
    numberSpriteFrame: null,
    distanceOfSquare: 60,
    musicStorage:"music",
    highScoreStorage:"highScore",
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
    reduceProbability: function (toNum,fromNum=0) {
        let newNum=this.getInteger(toNum,fromNum)
        switch (newNum) {
            case X_SYM_INDEX:
                if (Math.random() > 0.4) {
                    newNum = 1;
                }
                break;
            case DIV_SYM_INDEX:
                if (Math.random() > 0.3) {
                    newNum = 1;
                }
                break;
            case SUB_SYM_INDEX:
                if (Math.random() > 0.5) {
                    newNum = 1;
                }
                break;
        }

        return newNum;

    },
    createSingleSquare(prefabNode, isRight, parentNode) {
        let canvas = cc.director.getScene().getChildByName("Canvas");
        let canvasWidth = canvas.width;
        let prefabInstance = cc.instantiate(prefabNode);
        let canvasSidePos = canvasWidth / 2 + prefabInstance.width / 2;

        let randomSquare = cc.instantiate(prefabNode);
        let numNode = randomSquare.getChildByName("sign");
        randomSquare.setAnchorPoint(cc.v2(0, 0));
        //设置位置
        let childLength = parentNode.children.length;
        let lastChild = parentNode.children[childLength - 1]
        randomSquare.y = lastChild.y + (this.distanceOfSquare * 2);
        randomSquare.x = lastChild.x;

        let squareComp = randomSquare.getComponent(SquareComp);
        squareComp.isRunAction = false;
        //设置符号纹理
        let randomSquareSymbol = numNode.getChildByName("symbol");
        let randomSymbol = this.symbolSpriteFrame[this.reduceProbability(4)];
        randomSquareSymbol.getComponent(cc.Sprite).spriteFrame = randomSymbol;

        //设置数字纹理
        let randomSquareNum = numNode.getChildByName("num");
        let randomNum = 0;
        //除法规避0
        if (this.isDivisionSymbol(randomSymbol.name)) {
            randomNum = this.numberSpriteFrame[this.reduceProbability(9, 1)];
        }
        //乘法取到2
        else if (this.isXSymbol(randomSymbol.name)) {
            randomNum = this.numberSpriteFrame[this.reduceProbability(3, 0)];
        }
        else {
            randomNum = this.numberSpriteFrame[this.reduceProbability(10, 0)];
        }
        randomSquareNum.getComponent(cc.Sprite).spriteFrame = randomNum;
        if (isRight) {
            squareComp.isLeft = false;
        }
        return randomSquare;


    },
    createRandomSquare: function (prefabNode, gameScene, startHeight = -380) {
        let canvas = cc.director.getScene().getChildByName("Canvas");
        let canvasWidth = canvas.width;
        let prefabInstance = cc.instantiate(prefabNode);
        let canvasSidePos = canvasWidth / 2 + prefabInstance.width / 2;
        let squareMaskHeight = prefabInstance.height * 2 + 4 * 2 * this.distanceOfSquare; //4个方块间隔总和
        let leftSquareMask = null;
        let rightSquareMask = null;
        //设置mask节点大小
        if (gameScene) {
            leftSquareMask = canvas.getChildByName("leftSquareMask");
            rightSquareMask = canvas.getChildByName("rightSquareMask");
            leftSquareMask.setContentSize(prefabInstance.width, squareMaskHeight);
            rightSquareMask.setContentSize(prefabInstance.width, squareMaskHeight - this.distanceOfSquare / 2);
        }

        //边缘方块
        for (let i = 0; i < 10; i++) {
            let randomSquare = cc.instantiate(prefabNode);
            let numNode = randomSquare.getChildByName("sign");
            randomSquare.setAnchorPoint(cc.v2(0, 0));

            //设置随机符号
            let randomSquareSymbol = numNode.getChildByName("symbol");
            let randomSymbol = this.symbolSpriteFrame[this.reduceProbability(4)];
            randomSquareSymbol.getComponent(cc.Sprite).spriteFrame = randomSymbol;

            //设置随机数字
            let randomSquareNum = numNode.getChildByName("num");
            let randomNum = 0;
            if (this.isDivisionSymbol(randomSymbol.name)) {
                randomNum = this.numberSpriteFrame[this.reduceProbability(9, 1)];     //除法规避0
            }
            else if (this.isXSymbol(randomSymbol.name)) {
                randomNum = this.numberSpriteFrame[this.reduceProbability(3, 0)];     //乘法取到2
            }
            else {
                randomNum = this.numberSpriteFrame[this.reduceProbability(10, 0)];
            }
            randomSquareNum.getComponent(cc.Sprite).spriteFrame = randomNum;

            //初始化挂组件属性
            let squareComp = randomSquare.getComponent(SquareComp);
            squareComp.gameScene = gameScene;
            squareComp.floor = Math.floor(i / 2);
            randomSquare.x = -canvasSidePos;
            if (i % 2 == 0) {
                squareComp.isLeft = false;
                randomSquare.x = canvasSidePos;
            }

            //在主游戏场景中，添加到mask上
            if (gameScene) {
                if (i % 2 !== 0) {
                    randomSquare.y = startHeight + (i - 1) * this.distanceOfSquare;    //左边高度
                    leftSquareMask.addChild(randomSquare);
                }
                else {
                    randomSquare.y = startHeight + i * this.distanceOfSquare - randomSquare.height / 2;
                    rightSquareMask.addChild(randomSquare);
                }
            }
            else {
                randomSquare.y = startHeight + i * this.distanceOfSquare;
                canvas.addChild(randomSquare);
            }
        }
    }
}

module.exports = SquareTool




