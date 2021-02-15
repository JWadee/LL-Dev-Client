import React from 'react'
import {Table, Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import formatCurrency from '../../../utils/formatCurrency';
import '../../../css/global/tables.css'

const Leaderboard = (props) => {
    console.log(props.leaderboards)
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
                        <tr key={contestant.id}>
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




export default Leaderboard;
