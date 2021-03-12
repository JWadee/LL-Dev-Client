const fetchLeaderboards = async(contestid, typeID, prizepool) => {
    console.log(contestid)
    console.log(typeID)
    console.log(prizepool)

    const response = await fetch('https://api.lineleaders.net/contests/leaderboards/?id='+contestid+"&contestTypeID="+typeID+"&prizepool="+prizepool);
    let leaderboards = await response.json();
    if(leaderboards.length > 0){
        return leaderboards;
    }else return [];
}

export default fetchLeaderboards