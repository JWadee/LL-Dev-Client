import React, {useState, useEffect} from "react";
import { Table } from "react-bootstrap";
import {Form, Row, Col, Button} from 'react-bootstrap';
import Leg from '../../bets/Leg';
import stringifyOddsAndPoints from '../../../utils/stringifyOddsAndPoints';
import isEmpty from '../../../utils/isEmpty';

const SelectBet = (props) => {
    const [disabled, setDisabled] = useState(true)

    const saveAndContinue = () => {
        props.nextStep()
    }

    useEffect(()=>{
        if(!isEmpty(props.bet)){
            setDisabled(false);
        }else setDisabled(true);
    },[props.bet])
    
    return (
        <>
            <h2>Select Bet</h2>
            <Form>
                <Table> 
                    <thead> 
                        <tr>
                            <th>Type</th>
                            <th>Line(s)</th>
                            <th>Odds</th>
                            <th>Risk</th>
                            <th>Win</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody> 
                        {props.openBets.map((bet, i)=>{
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
                                        <td>{bet.type}</td>
                                        <Leg leg={leg} />
                                        <td>{stringifyOddsAndPoints(bet.odds)}</td>
                                        <td>{"$"+parseFloat(bet.wager).toFixed(2)}</td>
                                        <td>{"$"+win}</td>
                                        <td>
                                            <Form.Check type="radio" name="bet" onClick={()=>props.setBet(bet)}/>
                                        </td>
                                    </tr>
                                )
                            }else{
                                return <></>;
                            }
                        })}
                    </tbody>
                </Table>
                <Form.Group as={Row}>
                    <Col sm={{ span: 12 }}>
                        <Button disabled={disabled} onClick={(e)=> saveAndContinue(e)}>Next</Button>
                    </Col>
                </Form.Group>  
            </Form>
        </>    
    );
};

export default SelectBet;