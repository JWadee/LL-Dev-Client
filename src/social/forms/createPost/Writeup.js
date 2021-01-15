import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col, Table} from 'react-bootstrap';
import Leg from '../../bets/Leg';
import stringifyOddsAndPoints from '../../../utils/stringifyOddsAndPoints';
import isEmpty from '../../../utils/isEmpty';

const Writeup = (props) => {
    const [win, setWin] = useState();
    const [bet, setBet] = useState({});

    useEffect(()=>{
        
        if(props.bet.type === "Straight"){
            const leg = props.bet.legs[0];
            //calc win field
            let pot;
            if(props.bet.odds > 0){
                let dec = props.bet.odds/100;
                pot = parseFloat(props.bet.wager * dec).toFixed(2)
            }else{
                let dec = Math.abs(props.bet.odds)/100;
                pot = parseFloat(props.bet.wager / dec).toFixed(2)
            }
            setWin(pot);
        }
        setBet(props.bet)
    },[props.bet])

        
    return (
        <>  
            <h2>Write-up</h2>
            {!isEmpty(bet) ? 
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
                        <tr className={"openBet"}>
                            <td>{bet.type}</td>
                            <Leg leg={bet.legs[0]} />
                            <td>{stringifyOddsAndPoints(bet.odds)}</td>
                            <td>{"$"+parseFloat(bet.wager).toFixed(2)}</td>
                            <td>{"$"+win}</td>
                        </tr>     
                    </tbody>
                </Table>
                :
                <></>
            }
            <Form>
                <Form.Group>
                    <Form.Control as="textarea" rows={10} value={props.writeup} onChange={(e)=> props.setWriteup(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Row}>
                    <Col>
                        <Button onClick={()=> props.prevStep()}>Back</Button>
                    </Col>
                    <Col>
                        <Button onClick={()=> alert("posted")}>Post</Button>
                    </Col>
                </Form.Group>  
            </Form>
        </>       
    )

}

export default Writeup