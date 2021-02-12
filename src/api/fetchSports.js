const fetchSports = async () => {
    const response = await fetch('https://api.lineleaders.net/sports/');
    const sports = await response.json();
    return(sports)
}

export default fetchSports;