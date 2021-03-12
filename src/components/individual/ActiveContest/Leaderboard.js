import React, {useState, useEffect} from 'react'
import {Table, Alert, Row, Col} from 'react-bootstrap';
import SettledBets from './bets/SettledBets';
import formatCurrency from '../../../utils/formatCurrency';
import fetchContestBets from '../../../api/bets/fetchContestBets';
import isEmpty from '../../../utils/isEmpty';
import '../../../css/global/tables.css'

const Leaderboard = (props) => {
    const [contestant, setContestant] = useState({})
    //function to fetch a contestants bets 
    const getBets = async(contestant)=>{
        let tmpBets = await fetchContestBets(contestant.id);
        contestant.bets = tmpBets.settled;

        setContestant(contestant);
    }

    //show contestant bets if loaded
    if(!isEmpty(contestant)){
        let record ="";
        let bankroll = formatCurrency(contestant.bankroll)
        if(contestant.p > 0){
            record = contestant.w +"-"+ contestant.l +"-"+ contestant.p
        }else{
            record = contestant.w +"-"+ contestant.l
        }
        return(
            <>    

                <Row>
                    <Col sm={2}>
                        <button onClick={()=>setContestant({})}>Back</button>
                    </Col>
                    <Col sm={10}>
                        <h5>{contestant.email}</h5>
                        <p>{"Place: "+contestant.place +"     Bankroll: "+bankroll+"     Record: "+record} </p>
                    </Col>

                </Row>
                <SettledBets settledBets={contestant.bets} />
            </>
        )
    }else{
        return (
        <Table responsive>
            <thead>
                <tr>
                    <th>Place</th>
                    <th>Username</th>
                    <th>Bankroll</th>
                    <th>W/L</th>
                    <th>Prizes</th>
                </tr>
            </thead>
            <tbody>
                {props.leaderboards.map((contestant, i) => {
                    let record ="";
                    let bankroll = formatCurrency(contestant.bankroll)
                    if(contestant.p > 0){
                        record = contestant.w +"-"+ contestant.l +"-"+ contestant.p
                    }else{
                        record = contestant.w +"-"+ contestant.l
                    }
                    return(
                        <tr key={contestant.id} className="clickable" onClick={()=>getBets(contestant)}>
                            <td>{i+1}</td>
                            <td>{contestant.email}</td>
                            <td>{bankroll}</td>
                            <td>{record}</td>
                            {parseFloat(contestant.winnings) > 0 ?
                                (<td><Alert variant="success">{"$"+contestant.winnings}</Alert></td>)
                                :
                                (<td />)
                            }
                            
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        )
    }

}




export default Leaderboard;
