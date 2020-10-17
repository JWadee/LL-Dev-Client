//function to convert odds to american
const convertOdds = (odds) => {
    let parsedOdds = parseFloat(odds);
    let americanOdds ="";
    if(parsedOdds === 2){
        americanOdds = 'EVEN'
    }else if(parsedOdds < 2){
        americanOdds = Math.round(-100/(parsedOdds-1))
    }else if(parsedOdds > 2){
        americanOdds = "+"+Math.round((parsedOdds-1)*100)
    }
    return americanOdds;
}

export default convertOdds;