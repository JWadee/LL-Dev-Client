const fetchPersonalBets = async (id) => {
    const response = await fetch('https://api.lineleaders.net/bets/personal?id=' + id);
    const bets = await response.json();
    //separate into open and settled and set redux state
    let open = [];
    let settled = [];

    bets.forEach(bet => {
      if (bet.result === "W" || bet.result === "L" || bet.Result === "P") {
        settled.push(bet);
      } else {
        open.push(bet);
      }
    })

    let obj = {
        open : open,
        settled: settled
    }

    return obj;
}   

export default fetchPersonalBets;