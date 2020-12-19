import React from 'react';
import {Table } from 'react-bootstrap';
import Leg from './Leg';
import '../../css/betsTable.css';
import { connect } from 'react-redux';

const OpenBets = (props) => {    
    return (
        <Table responsive>
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
                        let win;
                        if(bet.odds > 0){
                            let dec = bet.odds/100;
                            win = parseFloat(bet.wager * dec).toFixed(2)
                        }else{
                            let dec = Math.abs(bet.odds)/100;
                            win = parseFloat(bet.wager / dec).toFixed(2)
                        }
                        
                        return(
                            <tr className={"openBet"}>
                                <td>{bet.type}</td>
                                <Leg leg={leg} />
                                <td>{bet.odds}</td>
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
