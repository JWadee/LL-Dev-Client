let stringifyOddsAndPoints = (a) => {
    let num = parseFloat(a);
    let string;
    if(num > 0){
        string = "+"+num;
    }else string = num; 

    return string;
} 

export default stringifyOddsAndPoints;