import React, {useState} from 'react';
import {Row, Form, Col} from 'react-bootstrap';
import '../../../../css/fixture.css';
import '../../../../css/dropdownArrow.css'
import BetSlip from '../BetSlip/BetSlip';
import formatTime from '../../../../utils/formatTime';
import FootballFixts from './Fixtures/FootballFixts';

const Book = (props) => {
    // const [leagueFixtures, setLeagueFixtures] = useState([]);
    const [leagueDisp, setLeaguesDisp] = useState([]);
    const [bets, setBets] = useState([]);

    //function to remove bet
    const removeBet = (id) => {
        console.log(id)
        //get temp array
        let tmpBets = [...bets];
        //get index 
        const index = tmpBets.map(bet => bet.id).indexOf(id);
        //get element by id
        const element = document.getElementById(id);
        //remove class
        element.classList.remove("selected-bet");     
        //remove bet from array   
        tmpBets.splice(index, 1);
        console.log(tmpBets)
        //set bets array
        setBets(tmpBets);
    }
    //function to remove bets after submission, takes array of ids
    const removeBets = (ids) => {
        //get temp array
        let tmpBets = [...bets];
        ids.forEach(id=> {
            //get index 
            const index = tmpBets.map(bet => bet.id).indexOf(id);
            //get element by id
            const element = document.getElementById(id);
            //remove class
            element.classList.remove("selected-bet");     
            //remove bet from array   
            tmpBets.splice(index, 1);
            console.log(tmpBets)
            //set bets array
        })
        setBets(tmpBets);

    }

    return (
        <Row>
            <Col md={8} sm={12}>
                <Form>
                    <Form.Row>                    
                            <Col>
                                <Form.Control as="select" onChange={(e)=>setLeaguesDisp(e.target.value)}>
                                    <option>All Leagues</option>
                                    {props.leagues.map(league=>{
                                        return (
                                            <option key={league.intLeagueID} value={league.intLeagueID}>{league.strLeagueName}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Col>
                        </Form.Row>
                </Form>
                {props.upcoming.map(league=>{
                    let leagueobj = league.fixtures[0].league
                    return(
                        //Football
                        parseInt(league.fixtures[0].sport_id) === 12 ?
                            <FootballFixts fixtures={league.fixtures} bets={bets} removeBet={removeBet} setBets={setBets} league={leagueobj} formatTime={formatTime}/>
                                :
                            <></>
                    )
                })}
            </Col>
            <Col md={4} sm={12}>
                <BetSlip bets={bets} removeBets={removeBets}/>
            </Col>
        </ Row>
    )
}

export default Book