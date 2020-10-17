import React, {useState, useEffect} from 'react';
import {Spinner} from 'react-bootstrap';
//Components 
import UpcomingContests from '../individual/UpcomingContests/UpcomingContests';

const Lobby = () => {
    const [contestRows, setContestRows] = useState([]);
    const [contests, setContests] = useState([]);
    const [display, setDisplay] = useState(false);

    //fetch open contests on initial render
    useEffect(()=>{
        const fetchOpenContests = async () => {
            const response = await fetch('https://lineleaders.net/dev-server/contests/open');
            const data = await response.json(); 
            //set contest rows state array
            setContestRows(data);
        }

        fetchOpenContests();
    },[]);

    //Set display to true after 3 seconds
    setTimeout(function() {
        setDisplay(true)
    }, 1000);

    //Function to check each row returned, check for existing contest - add league, or add new contest object to arr
    const checkRow = (row) => {
        let arr = contests;
        let index = contests.findIndex(contest=> contest.contestID === row.intContestID);
        if(index > -1){
            let league = {
                leagueID: row.intLeagueID, 
                leagueName: row.strLeagueName
            }

            arr[index].contestLeagues = [...arr[index].contestLeagues, league];
        }else{
            arr.push({
                contestID: row.intContestID, 
                name: row.strContestName,
                contestType: row.strContestType,
                contestLeagues: [
                    {
                        leagueID: row.intLeagueID, 
                        leagueName: row.strLeagueName
                    }   
                ],
                entry: row.decEntryFee, 
                bankroll: row.decInitialBankRoll, 
                prizepool: row.decPrizePool,
                start: row.dtmStart, 
                end: row.dtmEnd, 
                minPlayers: '', 
                maxPlayers: ''
            })
        }
        return [...arr];

    }; 
    //run when contest rows array changes 
    useEffect(()=>{
        let cntsts = [];
        let count = 0;
        if(contestRows.length > 0){
            contestRows.forEach(row=> {
                cntsts = checkRow(row);
                count++;
            })
            if(count == contestRows.length ){
                setContests(cntsts);
            }
        }
    },[contestRows]);



    if(contests.length > 0 && display===true){ 
        return (
            <>
                <UpcomingContests contests={contests}/>
            </>
        )
    }else{
        return(
            <Spinner animation="border"/>
        )
    }

}

export default Lobby