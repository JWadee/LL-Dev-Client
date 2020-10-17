import React from 'react';
import {Table, Row, Form, Col} from 'react-bootstrap';
import '../../../../../css/fixture.css';
import '../../../../../css/dropdownArrow.css'
import '../../../../../css/dropdownArrow.css';
import convertOdds from '../../../../../utils/convertOdds';
import formatHandicap from '../../../../../utils/formatHandicap';

const SoccerFixts = (props) => {
    //function to add bet 
    const addBet = (fixture, bettype) => {
        let tmp = [...bets];
        let bet = {
            id : bettype+"-"+fixture.id,
            time : fixture.time,
            wager: Number,
            fixture : fixture.away.name+" vs "+fixture.home.name,
            fixtureID : fixture.id
        };
        //Format Bet
        switch (bettype){
            case "away-spread" : 
                 bet.bet = fixture.away.name;
                 bet.odds = {
                    american:convertOdds(fixture.odds.main.sp.asian_handicap.odds[0].odds),
                    decimal:fixture.odds.main.sp.asian_handicap.odds[0].odds
                }
                 bet.handicap = formatHandicap(fixture.odds.main.sp.asian_handicap.odds[0].handicap);
                 bet.type = "Spread";
                 bet.team = {
                     type: "Away",
                     name: fixture.away.name
                 }
                break;
            case "away-ml" : 
                bet.type = "3-Way Moneyline";
                bet.bet = fixture.away.name;
                bet.odds = {
                    american:convertOdds(fixture.odds.main.sp.full_time_result.odds[2].odds),
                    decimal:fixture.odds.main.sp.full_time_result.odds[2].odds
                }
                bet.team = {
                    type: "Away",
                    name: fixture.away.name
                }
            break;
            case "draw" : 
                bet.odds = {
                    american:convertOdds(fixture.odds.main.sp.full_time_result.odds[1].odds),
                    decimal:fixture.odds.main.sp.full_time_result.odds[1].odds
                }
                bet.type = "3-Way Moneyline";
                bet.bet = "Draw"; 
                bet.team = {
                    type: "Draw",
                    name: ""
                }
            break;
            case "home-spread" : 
                bet.bet = fixture.home.name;
                bet.handicap = formatHandicap(fixture.odds.main.sp.asian_handicap.odds[1].handicap);
                bet.odds = {
                    american:convertOdds(fixture.odds.main.sp.asian_handicap.odds[1].odds),
                    decimal:fixture.odds.main.sp.asian_handicap.odds[1].odds
                }
                bet.type = "Spread";  
                bet.team = {
                    type: "Home",
                    name: fixture.home.name
                }
            break;
            case "home-ml" : 
                bet.bet = fixture.home.name;
                bet.odds = {
                    american:convertOdds(fixture.odds.main.sp.full_time_result.odds[0].odds),
                    decimal:fixture.odds.main.sp.full_time_result.odds[0].odds 
                }
                bet.type = "3-Way Moneyline";
                bet.team = {
                    type: "Home",
                    name: fixture.home.name
                }
                break;
            case "over" : 
                bet.odds = {
                    american:convertOdds(fixture.odds.main.sp.goals_over_under.odds[0].odds),
                    decimal:fixture.odds.main.sp.goals_over_under.odds[0].odds   
                }
                bet.type = "Total"
                bet.bet = "Over"
                bet.total = fixture.odds.main.sp.goals_over_under.odds[0].name
            break;
            case "under" : 
                bet.odds = {
                    american:convertOdds(fixture.odds.main.sp.goals_over_under.odds[1].odds),
                    decimal:fixture.odds.main.sp.goals_over_under.odds[1].odds  
                }
                bet.type = "Total";
                bet.bet = "Under";
                bet.total = fixture.odds.main.sp.goals_over_under.odds[1].name
            break;
            default : break; 
        }
        tmp.push(bet);
        setBets(tmp);
    }
    
    //Funtion to either add or remove bet to/from bets array
    const handleBetClick = (fixture, bettype) => {
        let tmpBets = [...props.bets];
        const id = bettype+"-"+fixture.id;
        const element = document.getElementById(id);
        const index = tmpBets.map(bet => bet.id).indexOf(id);

        if(index > -1){
            props.removeBet(bettype+"-"+fixture.id)
        }else{
            addBet(fixture, bettype);
            element.classList.add("selected-bet");        
        } 
    }

return (
    <Row>
        <Col md={12}>
            <Table key={league.leagueID}>
                <tbody>
                    <tr>
                        <th>{league.fixtures[0].league.name}</th>
                    </tr>      
                    {league.fixtures.map(fixture=>{
                        let formattedTime = formatTime(fixture.time);
                        return (
                            <tr key={fixture.id}>
                                <td>{formattedTime}</td>
                                <td>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Fixture</th>
                                                <th>Spread</th>
                                                <th>Win</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{fixture.away.name}</td>
                                                <td className="line" id={"away-spread-"+fixture.id} onClick={()=>handleBetClick(fixture,"away-spread")}>
                                                    {formatHandicap(fixture.odds.main.sp.asian_handicap.odds[0].handicap)+" ("+convertOdds(fixture.odds.main.sp.asian_handicap.odds[0].odds)+")"}
                                                </td>
                                                <td className="line" id={"away-ml-"+fixture.id} onClick={()=>handleBetClick(fixture,"away-ml")}>
                                                    {convertOdds(fixture.odds.main.sp.full_time_result.odds[2].odds)}
                                                </td>
                                                <td className="line" id={"over-"+fixture.id} onClick={()=>handleBetClick(fixture,"over")}>
                                                    {"O"+fixture.odds.main.sp.goals_over_under.odds[0].name+" ("+convertOdds(fixture.odds.main.sp.goals_over_under.odds[0].odds)+")"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{fixture.home.name}</td>
                                                <td className="line" id={"home-spread-"+fixture.id} onClick={()=>handleBetClick(fixture,"home-spread")}>
                                                    {formatHandicap(fixture.odds.main.sp.asian_handicap.odds[1].handicap)+" ("+convertOdds(fixture.odds.main.sp.asian_handicap.odds[1].odds)+")"}
                                                </td>
                                                <td className="line" id={"home-ml-"+fixture.id} onClick={()=>handleBetClick(fixture,"home-ml")}>
                                                    {convertOdds(fixture.odds.main.sp.full_time_result.odds[0].odds)}
                                                </td>
                                                <td className="line" id={"under-"+fixture.id} onClick={()=>handleBetClick(fixture,"under")}>
                                                    {"U"+fixture.odds.main.sp.goals_over_under.odds[1].name+" ("+convertOdds(fixture.odds.main.sp.goals_over_under.odds[1].odds)+")"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Draw</td>
                                                <td></td>
                                                <td className="line" id={"draw-"+fixture.id} onClick={()=>handleBetClick(fixture,"draw")} >{convertOdds(fixture.odds.main.sp.full_time_result.odds[1].odds)}</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </td>     
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Col>
    </ Row>
)
}

export default SoccerFixts