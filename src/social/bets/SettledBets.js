import React from 'react';
import {Table } from 'react-bootstrap';
import Leg from './Leg';
import '../../css/betsTable.css';
import stringifyOddsAndPoints from '../../utils/stringifyOddsAndPoints';

const SettledBets = (props) => {    
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
                {props.settledBets.map((bet, i)=>{
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
                            <tr className={"bet"+bet.result} key={i}>
                                <td>{bet.type}</td>
                                <Leg leg={leg} />
                                <td>{stringifyOddsAndPoints(bet.odds)}</td>
                                <td>{"$"+parseFloat(bet.wager).toFixed(2)}</td>
                                {bet.result === "W" ? <td>{"+$"+win}</td> :<></>}
                                {bet.result === "L" ? <td>{"-$"+parseFloat(bet.wager).toFixed(2)}</td> :<></>}
                                {bet.result === "P" ? <td>{"-"}</td> :<></>}
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




export default SettledBets;
