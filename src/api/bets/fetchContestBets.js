/*function to fetch bets by contest entry id
formats bet into bets object containing open and settled bets
returns bets object
*/
const fetchContestBets = async(entryid) => {
    const response = await fetch('/bets/byEntry?entryid='+entryid);
    const json = await response.json();
    //separate into open and settled and set redux state
    
    let bets = {
        open : [],
        settled : []
    } 

    json.forEach(bet=>{
        if(bet.result === "W"|| bet.result === "L" || bet.Result ==="P"){
            bets.settled.push(bet);
        }else{
            bets.open.push(bet);
        }
    })
    return bets;
}

export default fetchContestBets;