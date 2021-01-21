import React, {useState, useEffect} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import stringifyOddsAndPoints from '../../../utils/stringifyOddsAndPoints';
import formatTime from '../../../utils/formatTime';
const EditBetModal = (props) => {
    const [bet, setBet] = useState({});
    const [odds, setOdds] = useState();
    const [points, setPoints] = useState();

    //set bet var 
    useEffect(()=>{
        setBet(props.bet)
    },[props.bet])

    //run when odds are changed (update bet)
    useEffect(()=>{
        //if it is a number update bet
        if(!isNaN(odds)){
            let tmp = bet;
            tmp.odds = odds; 
            setBet(tmp);
        }
    },[odds])

    //run when points are changed (update bet)
    useEffect(()=>{
        //if it is a number update bet
        if(!isNaN(points)){
            if(bet.type === "Spread"){
                let tmp = bet;
                tmp.handicap = points; 
                setBet(tmp);
            }else if(bet.type === "Total"){
                let tmp = bet;
                tmp.total = points; 
                setBet(tmp);
            }

        }
    },[points])

    //save changes and close modal
    const submitChanges = () =>{
        props.editBet(bet.id, bet)
        props.close();
    }

    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Body>
                <p>{bet.bet}</p>
                <p>{bet.type}</p>   
                <p>{bet.fixture}</p>                
                <p>{formatTime(bet.time)}</p>
                <Form>
                    {(bet.type === "Spread") ? 
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Odds</Form.Label>
                                <Form.Control type="number" defaultValue={bet.odds} onChange={(e)=>setOdds(e.target.value)}/>
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Points</Form.Label>
                                <Form.Control type="number" defaultValue={bet.handicap} onChange={(e)=>setPoints(e.target.value)}/>
                            </Form.Group>
                        </Form.Row>
                            : 
                    (bet.type === "Total") ?
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Odds</Form.Label>
                                <Form.Control type="number" defaultValue={bet.odds} onChange={(e)=>setOdds(e.target.value)}/>
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Points</Form.Label>
                                <Form.Control type="number" defaultValue={bet.total} onChange={(e)=>setPoints(e.target.value)}/>
                            </Form.Group>
                        </Form.Row>
                            :
                        <Form.Group as={Col} >
                            <Form.Label>Odds</Form.Label>
                            <Form.Control type="number" defaultValue={bet.odds} onChange={(e)=>setOdds(e.target.value)}/>
                        </Form.Group>                     
                    }
                    <Button onClick={()=>submitChanges()}>Save Changes</Button>
                </Form>


            </Modal.Body>
        </Modal>
    )
}

export default EditBetModal