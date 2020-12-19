import React, {} from 'react';
import {Table} from 'react-bootstrap';
import formatTime from '../../utils/formatTime';
import isEmpty from '../../utils/isEmpty';
import formatHandicap from '../../utils/formatHandicap';
import '../../css/global/fixtures.css';

let test = {
    "sport_key": "basketball_ncaab",
    "sport_nice": "NCAAB",
    "commence_time": 1607126400,
    "home_team": "Purdue Boilermakers",
    "away_team": "Valparaiso Crusaders",
    "odds": {  
            "h2h": {
                "home":1.02,
                "away":13.6
            },
            "spreads": {
                    "home": {
                        "odds": 1.83,
                        "points":-3.5
                    },
                    "away": {
                        "odds": 1.92,
                        "points":3.5
                    }       
                },
            "totals": {
                    "over":{
                        "points": 139.5,
                        "odds": 1.91
                    },
                    "under":{
                        "points": 139.5,
                        "odds": 1.91
                    }
            }
        }
}



const Fixture = (props) => {
    let fixt = props.fixt;
    let formattedTime = formatTime(fixt.fixture.commence_time);
    
    //function to add bet 
    const addBet = (fixture, bettype) => {
        let tmp = [...props.bets];
        let bet = {
            id : bettype+"-"+fixture.fixture_id,
            time : fixture.fixture.commence_time,
            wager: Number,
            fixture : fixture.fixture.home_team+" vs "+fixture.fixture.away_team,
            fixtureID : fixture.fixture_id
        };

        //Format Bet
        switch (bettype){
            case "away-spread" : 
                bet.bet = fixture.fixture.away_team;
                bet.odds = fixture.fixture.odds.spreads.away.odds;
                bet.handicap = formatHandicap(fixture.fixture.odds.spreads.away.points);
                bet.type = "Spread";
                bet.team = {
                    type: "Away",
                    name: fixture.fixture.away_team
                }
            break;
            case "away-ml" : 
                bet.type = "Moneyline";
                bet.bet = fixture.fixture.away_team;
                bet.odds = fixture.fixture.odds.h2h.away;
                bet.team = {
                    type: "Away",
                    name: fixture.fixture.away_team
                }
            break;
            case "home-spread" : 
                bet.bet = fixture.fixture.home_team;
                bet.handicap = formatHandicap(fixture.fixture.odds.spreads.home.points);
                bet.odds = fixture.fixture.odds.spreads.home.odds;
                bet.type = "Spread";  
                bet.team = {
                    type: "Home",
                    name: fixture.fixture.home_team
                }
            break;
            case "home-ml" : 
                bet.bet = fixture.fixture.home_team;
                bet.odds = fixture.fixture.odds.h2h.home;
                bet.type = "Moneyline";
                bet.team = {
                    type: "Home",
                    name: fixture.fixture.home_team
                }
            break;
            case "over" : 
                bet.odds = fixture.fixture.odds.totals.over;
                bet.type = "Total";
                bet.bet = "Over";
                bet.total = fixture.fixture.odds.totals.points;
            break;
            case "under" : 
                bet.odds = fixture.fixture.odds.totals.under;
                bet.type = "Total";
                bet.bet = "Under";
                bet.total = fixture.fixture.odds.totals.points;
            break;
            default : break; 
        }
        tmp.push(bet);
        props.setBets(tmp);
    }

    //Funtion to either add or remove bet to/from bets array
    const handleBetClick = (fixt, bettype) => {
        let tmpBets = [...props.bets];
        const id = bettype+"-"+fixt.fixture_id;
        const element = document.getElementById(id);
        const index = tmpBets.map(bet => bet.id).indexOf(id);

        if(index > -1){
            props.removeBet(bettype+"-"+fixt.fixture_id)
        }else{
            addBet(fixt, bettype);
            element.classList.add("selected-bet");        
        } 
    }

    return (                                
        <Table responsive className="fixtureTable">
            <tbody>
                <tr>
                    <td rowSpan={2} className="fixtTime">{formattedTime}</td>
                    <td className="fixtCol">{fixt.fixture.away_team}</td>
                    {!isEmpty(fixt.fixture.odds.spreads) ?
                        <td className="line" id={"away-spread-"+fixt.fixture_id} onClick={()=>handleBetClick(fixt,"away-spread")}>{fixt.fixture.odds.spreads.away.points +" ("+fixt.fixture.odds.spreads.away.odds+")"}</td>      
                            :
                        <td className="line"></td>
                    }
                    {!isEmpty(fixt.fixture.odds.h2h) ?
                        <td  className="line" id={"away-ml-"+fixt.fixture_id} onClick={()=>handleBetClick(fixt,"away-ml")} >{fixt.fixture.odds.h2h.away}</td>        
                            :
                        <td className="line"></td>
                    }
                    {!isEmpty(fixt.fixture.odds.totals) ?
                        <td className="line" id={"over-"+fixt.fixture_id} onClick={()=>handleBetClick(fixt,"over")} >{"O"+fixt.fixture.odds.totals.points +" ("+fixt.fixture.odds.totals.over+")"}</td>       
                            :
                        <td className="line"></td>
                    }
                </tr> 
                <tr>
                    <td className="fixtCol">{fixt.fixture.home_team}</td>
                    {!isEmpty(fixt.fixture.odds.spreads) ?
                        <td className="line" id={"home-spread-"+fixt.fixture_id} onClick={()=>handleBetClick(fixt,"home-spread")}>{fixt.fixture.odds.spreads.home.points +" ("+fixt.fixture.odds.spreads.home.odds+")"}</td>      
                            :
                        <td className="line"></td>
                    }
                    {!isEmpty(fixt.fixture.odds.h2h) ?
                        <td className="line" id={"home-ml-"+fixt.fixture_id} onClick={()=>handleBetClick(fixt,"home-ml")}>{fixt.fixture.odds.h2h.home}</td>        
                            :
                        <td className="line"></td>
                    }
                    {!isEmpty(fixt.fixture.odds.totals) ?
                        <td className="line" id={"under-"+fixt.fixture_id} onClick={()=>handleBetClick(fixt,"under")}>{"U"+fixt.fixture.odds.totals.points +" ("+fixt.fixture.odds.totals.under+")"}</td>       
                            :
                        <td className="line"></td>
                    }
                </tr> 
            </tbody>
        </Table>
    )
}

export default Fixture