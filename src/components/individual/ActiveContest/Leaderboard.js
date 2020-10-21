import React from 'react'
import {Table} from 'react-bootstrap';
import { connect } from 'react-redux';
import formatCurrency from '../../../utils/formatCurrency';
import '../../../css/global/tables.css'

const Leaderboard = (props) => {
    console.log(props)
    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Place</th>
                    <th>Username</th>
                    <th>Bankroll</th>
                    <th>W/L</th>
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
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )

}


const mapStateToProps = (state) => {
    return {
      leaderboards: state.contest.leaderboards,
    }
}

export default connect(mapStateToProps)(Leaderboard);
