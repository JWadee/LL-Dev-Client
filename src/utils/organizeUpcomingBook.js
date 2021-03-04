function organizeUpcomingBook(fixtures, leagues, sports) {
    let organizedBook = []; 

    //organize fixtures 
    fixtures.forEach(fixt =>{
        //check if fixture is upcoming
        let currentTime = new Date();
        let commence = parseInt(fixt.fixture.commence_time)
        let fixtTime = new Date(commence *1000);
        
        if(fixtTime > currentTime){
            //find sport and league indexes
            let leagueIndex = leagues.findIndex(leag=>leag.jsonLeague.key === fixt.fixture.sport_key);
            //if league doesn't exist, don't add to book
            if(leagueIndex !== -1){
                let sportIndex = sports.findIndex(sprt => sprt.intSportID === leagues[leagueIndex].intSportID);
                //check for sport in organized book 
                let bookSportIndex = organizedBook.findIndex(sprt => sprt.sport_id === sports[sportIndex].intSportID);
        
                //if no existing fixtures in book => add sport, league, and fixture 
                if(bookSportIndex === -1){
                    let league = {
                        league_key:leagues[leagueIndex].jsonLeague.key,
                        league_name:leagues[leagueIndex].jsonLeague.details,
                        league_short:leagues[leagueIndex].jsonLeague.title,
                        fixtures: [fixt]
                    }
                    organizedBook.push({
                        sport_name: sports[sportIndex].strSportName,
                        sport_id: sports[sportIndex].intSportID,
                        leagues: [league]
                    })
                }
                else{
                    //check if sport league exists 
                    let spIndex = organizedBook[bookSportIndex].leagues.findIndex(leag=> leag.league_key === fixt.fixture.sport_key);
        
                    //if league exists add fixture to league fixtures 
                    if(spIndex != -1){
                        organizedBook[bookSportIndex].leagues[spIndex].fixtures.push(fixt);
                    }else{
                        //if league doesn't exist add league and fixt
                        let league = {
                            league_key:leagues[leagueIndex].jsonLeague.key,
                            league_name:leagues[leagueIndex].jsonLeague.details,
                            league_short:leagues[leagueIndex].jsonLeague.title,
                            fixtures: [fixt]
                        }
                        organizedBook[bookSportIndex].leagues.push(league)
                    }
                }
            }
        }
    })
    return organizedBook;
};
export default organizeUpcomingBook;