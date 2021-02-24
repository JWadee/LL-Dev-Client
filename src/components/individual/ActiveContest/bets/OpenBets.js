import React from 'react';
import {Table } from 'react-bootstrap';
import stringifyOddsAndPoints from '../../../../utils/stringifyOddsAndPoints';
import Leg from './Leg';
import '../../../../css/betsTable.css';
import { connect } from 'react-redux';
import formatTime from '../../../../utils/formatTime';
const OpenBets = (props) => {    
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>Date Placed</th>
                    <th>Type</th>
                    <th>Line(s)</th>
                    <th>Odds</th>
                    <th>Risk</th>
                    <th>Win</th>
                </tr>
            </thead>
            <tbody>
                {props.openBets.map((bet, i)=>{
                    var dtm = new Date(parseInt(bet.timestamp));
                    let timestamp = dtm.toLocaleString([], {dateStyle: 'short', timeStyle:'short'});
                    if(bet.type === "Straight"){
                        const leg = bet.legs[0];
                        //calc win field
                        let win;
                        if(bet.odds > 0){
                            let dec = bet.odds/100;
                            win = parseFloat(bet.wager * dec).toFixed(2)
                        }else{
                            let dec = Math.abs(bet.odds)/100;
                            win = parseFloat(bet.wager / dec).toFixed(2)
                        }
                        return(
                            <tr className={"openBet"} key={i}>
                                <td>{timestamp}</td>
                                <td>{bet.type}</td>
                                <Leg leg={leg} />
                                <td>{stringifyOddsAndPoints(bet.odds)}</td>
                                <td>{"$"+parseFloat(bet.wager).toFixed(2)}</td>
                                <td>{"$"+win}</td>
                            </tr>
                        )
                    }else{
                        return <></>;
                    }
                })}
            </tbody>
        </Table>
    )
}


const mapStateToProps = (state) => {
    return {
        openBets: state.contest.openBets
    }
  }

  export default connect(mapStateToProps)(OpenBets);
