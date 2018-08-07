let SquareComp = require("square-comp");

function isDivisionSymbol(symbolName){
    if(symbolName==="division"){
        return true;
    }
    return false;
}

function getInteger(toNum,fromNum=0){
    return Math.floor(Math.random()*toNum)+fromNum;
}

function createRandomSquare(prefabNode,startHeight=-420){
    var canvas = cc.director.getScene().getChildByName("Canvas");
    let canvasWidth = canvas.width;
    let prefabInstance = cc.instantiate(prefabNode);
    let canvasSidePos = canvasWidth / 2 + prefabInstance.width / 2

    //边缘方块
    for (let i = 0; i < 10; i++) {
        let randomSquare = cc.instantiate(prefabNode);
        randomSquare.y = startHeight + i * 60;
        randomSquare.x = -canvasSidePos;
        let squareComp=randomSquare.getComponent(SquareComp);
        if (i % 2 == 0) {
            squareComp.isLeft = false;
            randomSquare.x = canvasSidePos;
        }
        // cc.log(this.floor);
        let randomSquareSymbol = randomSquare.getChildByName("symbol");
        let randomSymbol = this.symbolSpriteFrame[this.getInteger(4)];
        randomSquareSymbol.getComponent(cc.Sprite).spriteFrame=randomSymbol;

        let randomSquareNum =randomSquare.getChildByName("num");
        let randomNum=0;
        if(this.isDivisionSymbol(randomSymbol.name)){
            randomNum=this.numberSpriteFrame[this.getInteger(9,1)];
            // cc.log("true",randomNum);
        }
        else{
            randomNum=this.numberSpriteFrame[this.getInteger(10,0)];
        }
        // cc.log("false",randomSymbol);
        randomSquareNum.getComponent(cc.Sprite).spriteFrame=randomNum;
        canvas.addChild(randomSquare);
    }
}


let symbolSpriteFrame=null;
let numberSpriteFrame=null;


module.exports.isDivisionSymbol=isDivisionSymbol;
module.exports.getInteger=getInteger;
module.exports.symbolSpriteFrame=symbolSpriteFrame;
module.exports.numberSpriteFrame=numberSpriteFrame;
module.exports.createRandomSquare=createRandomSquare;



