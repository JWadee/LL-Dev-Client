const fetchLeagues = async () => {
    const response = await fetch('https://api.lineleaders.net/leagues/');
    const leagues = await response.json();
    return(leagues);
}

export default fetchLeagues;