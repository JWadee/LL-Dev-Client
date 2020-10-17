import React from 'react';
import {Table, Row, Form, Col} from 'react-bootstrap';
import '../../../../../css/fixture.css';
import '../../../../../css/dropdownArrow.css'
import '../../../../../css/dropdownArrow.css';
import convertOdds from '../../../../../utils/convertOdds';
import formatHandicap from '../../../../../utils/formatHandicap';
import isEmpty from '../../../../../utils/isEmpty';

const FootballFixts = (props) => {
    props.fixtures.forEach(fixt=>{
        console.log(fixt.away.name)

    })

    //function to add bet 
    const addBet = (fixture, bettype) => {
        let tmp = [...props.bets];
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
                    american:convertOdds(fixture.odds.main.sp.game_lines.odds[3].odds),
                    decimal:fixture.odds.main.sp.game_lines.odds[3].odds
                }
                 bet.handicap = formatHandicap(fixture.odds.main.sp.game_lines.odds[3].handicap);
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
                    american:convertOdds(fixture.odds.main.sp.game_lines.odds[5].odds),
                    decimal:fixture.odds.main.sp.game_lines.odds[5].odds
                }
                bet.team = {
                    type: "Away",
                    name: fixture.away.name
                }
            break;
            case "home-spread" : 
                bet.bet = fixture.home.name;
                bet.handicap = formatHandicap(fixture.odds.main.sp.game_lines.odds[0].handicap);
                bet.odds = {
                    american:convertOdds(fixture.odds.main.sp.game_lines.odds[0].odds),
                    decimal:fixture.odds.main.sp.game_lines.odds[0].odds
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
                    american:convertOdds(fixture.odds.main.sp.game_lines.odds[2].odds),
                    decimal:fixture.odds.main.sp.game_lines.odds[2].odds
                }
                bet.type = "3-Way Moneyline";
                bet.team = {
                    type: "Home",
                    name: fixture.home.name
                }
                break;
            case "over" : 
                let over = fixture.odds.main.sp.game_lines.odds[1].handicap.match(/[+-]?\d+(\.\d+)?/g);
                bet.odds = {
                    american:convertOdds(fixture.odds.main.sp.game_lines.odds[1].odds),
                    decimal:fixture.odds.main.sp.game_lines.odds[1].odds  
                };
                bet.type = "Total";
                bet.bet = "Over";
                bet.total = over;
            break;
            case "under" : 
                let under = fixture.odds.main.sp.game_lines.odds[4].handicap.match(/[+-]?\d+(\.\d+)?/g);

                bet.odds = {
                    american:convertOdds(fixture.odds.main.sp.game_lines.odds[4].odds),
                    decimal:fixture.odds.main.sp.game_lines.odds[4].odds  
                }
                bet.type = "Total";
                bet.bet = "Under";
                bet.total = under
            break;
            default : break; 
        }
        tmp.push(bet);
        props.setBets(tmp);
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
            <Table key={props.fixtures[0].league.leagueID}>
                <tbody>
                    <tr>
                        <th>{props.league.name}</th>
                    </tr>
                    {props.fixtures.map(fixture=>{
                        let formattedTime = props.formatTime(fixture.time);
                        if(!isEmpty(fixture.odds.main.sp)){
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
                                                        {typeof fixture.odds.main.sp.game_lines.odds[3] == 'object'  ?
                                                            <td className="line" id={"away-spread-"+fixture.id} onClick={()=>handleBetClick(fixture,"away-spread")}>
                                                                {formatHandicap(fixture.odds.main.sp.game_lines.odds[3].handicap)+" ("+convertOdds(fixture.odds.main.sp.game_lines.odds[3].odds)+")"}
                                                            </td>
                                                            :
                                                            <td>-</td>
                                                        }
                                                        {typeof fixture.odds.main.sp.game_lines.odds[5] == 'object'  ?
                                                            <td className="line" id={"away-ml-"+fixture.id} onClick={()=>handleBetClick(fixture,"away-ml")}>
                                                                {convertOdds(fixture.odds.main.sp.game_lines.odds[5].odds)}
                                                            </td>
                                                            :
                                                            <td>-</td>
                                                        }
                                                        {typeof fixture.odds.main.sp.game_lines.odds[1] == 'object'  ?
                                                            <td className="line" id={"over-"+fixture.id} onClick={()=>handleBetClick(fixture,"over")}>
                                                                {fixture.odds.main.sp.game_lines.odds[1].handicap+" ("+convertOdds(fixture.odds.main.sp.game_lines.odds[1].odds)+")"}
                                                            </td>
                                                            :
                                                            <td>-</td>
                                                        }
                                                    </tr>
                                                    <tr>
                                                        <td>{fixture.home.name}</td>                      
                                                        {typeof fixture.odds.main.sp.game_lines.odds[0] == 'object'  ?
                                                            <td className="line" id={"home-spread-"+fixture.id} onClick={()=>handleBetClick(fixture,"home-spread")}>
                                                                {formatHandicap(fixture.odds.main.sp.game_lines.odds[0].handicap)+" ("+convertOdds(fixture.odds.main.sp.game_lines.odds[0].odds)+")"}
                                                            </td>
                                                            :
                                                            <td>-</td>
                                                        }
                                                        {typeof fixture.odds.main.sp.game_lines.odds[2] == 'object'  ?
                                                            <td className="line" id={"home-ml-"+fixture.id} onClick={()=>handleBetClick(fixture,"home-ml")}>
                                                                {convertOdds(fixture.odds.main.sp.game_lines.odds[2].odds)}
                                                            </td>
                                                            :
                                                            <td>-</td>
                                                        }
                                                        {typeof fixture.odds.main.sp.game_lines.odds[4] == 'object'  ?
                                                            <td className="line" id={"under-"+fixture.id} onClick={()=>handleBetClick(fixture,"under")}>
                                                                {fixture.odds.main.sp.game_lines.odds[4].handicap+" ("+convertOdds(fixture.odds.main.sp.game_lines.odds[4].odds)+")"}
                                                            </td> 
                                                            :
                                                            <td>-</td>
                                                        }
                                                    </tr> 
                                                </tbody>
                                        </Table>
                                    </td>     
                                </tr>
                            )
                        }else{
                            return(
                                <></>
                            )
                        }
                    })}
                </tbody>
            </Table>
        </Col>
    </ Row>
)
}

export default FootballFixts