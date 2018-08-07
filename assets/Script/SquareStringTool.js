function isDivisionSymbol(symbolName){
    if(symbolName==="division"){
        return true;
    }
    return false;
}

function getInteger(toNum,fromNum=0){
    return Math.floor(Math.random()*toNum)+fromNum;
}

let symbolSpriteFrame=null;
let numberSpriteFrame=null;


module.exports.isDivisionSymbol=isDivisionSymbol;
module.exports.getInteger=getInteger;
module.exports.symbolSpriteFrame=symbolSpriteFrame;
module.exports.numberSpriteFrame=numberSpriteFrame;


