import React from 'react';
import {Table } from 'react-bootstrap';
import convertOdds from '../../../../utils/convertOdds';
import Leg from './Leg';
import '../../../../css/betsTable.css';
import { connect } from 'react-redux';

const OpenBets = (props) => {    
    return (
        <Table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Line(s)</th>
                    <th>Odds</th>
                    <th>Risk</th>
                    <th>Win</th>
                </tr>
            </thead>
            <tbody>
                {props.openBets.map(bet=>{
                    if(bet.type === "Straight"){
                        const leg = bet.legs[0];
                        //calc win field
                        let win = bet.odds - 1;
                        win = (win * bet.wager).toFixed(2)
                        return(
                            <tr className={"openBet"}>
                                <td>{bet.type}</td>
                                <Leg leg={leg} />
                                <td>{convertOdds(bet.odds)}</td>
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
