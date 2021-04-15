import React, {useState, useEffect} from 'react'
import {Table, Alert, Row, Col, Image} from 'react-bootstrap';
import SettledBets from './bets/SettledBets';
import formatCurrency from '../../../utils/formatCurrency';
import fetchContestBets from '../../../api/bets/fetchContestBets';
import isEmpty from '../../../utils/isEmpty';
import '../../../css/global/tables.css'
import back from '../../../images/icons/noun_back_3542560.svg';

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
            <div className="left-align">    
                <div onClick={()=>setContestant({})}><Image src={back} width="35" height="auto" />Back</div>
                <div>
                    <strong>{contestant.email}</strong>
                    <p className="no-margin">{"Place: "+contestant.place}</p>
                    <p className="no-margin">{"Bankroll: "+bankroll}</p>
                    <p className="no-margin">{"Record: "+record}</p>
                </div>
                <SettledBets settledBets={contestant.bets} />
            </div>
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
