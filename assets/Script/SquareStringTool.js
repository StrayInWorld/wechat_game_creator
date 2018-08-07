function isDivisionSymbol(symbolName){
    if(symbolName==="division"){
        return true;
    }
    return false;
}

function getInteger(toNum,fromNum=0){
    return Math.floor(Math.random()*toNum)+fromNum;
}

module.exports.isDivisionSymbol=isDivisionSymbol;
module.exports.getInteger=getInteger;



