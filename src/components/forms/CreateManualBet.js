import React, {useState, useEffect} from 'react';
import {Form, Col, Modal, Button} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';

const CreateManualBet = (props) => {
    const [type, setType] = useState("");
    const [team, setTeam] = useState("");
    const [line, setLine] = useState("");
    const [odds, setOdds] = useState("");
    const [fixture, setFixture] = useState("");
    const [units, setUnits] = useState(1);
    const [overUnder, setOverUnder] = useState("");
    const [condDisp, setCondDisp] = useState();

    //Run when type changes 
    useEffect(()=>{
        if(type === "ml"){
            setCondDisp("ml")
        }else if(type === "spread"){
            setCondDisp("spread")
        }else if(type === "total"){
            setCondDisp("total")
        }
    },[type])

    const onSubmit = () =>{
        //verify type selection
        
    }

    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header>
                <Modal.Title>Create Bet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>    
                    <Form.Row>
                        <Form.Label column>Type</Form.Label>
                        <Col>
                            <Form.Control as="select" onChange={(e)=>setType(e.target.value)}>
                                <option selected disabled>Select type</option>
                                <option value={"ml"}>Moneyline</option>
                                <option value={"spread"}>Spread</option>
                                <option value={"total"}>Total</option>
                            </Form.Control>                        
                        </Col>
                    </Form.Row>    
                    <Form.Row>
                        <Form.Label column>Fixture</Form.Label>
                        <Col>
                            <Form.Control type="text" value={fixture} onChange={(e)=>setFixture(e.target.value)}/>
                        </Col>
                    </Form.Row>  
                    <Form.Row hidden={condDisp != "total"}>
                        <Form.Label column>Over/Under</Form.Label>
                        <Col>
                            <Form.Control as="select" onChange={(e)=>setOverUnder(e.target.value)}>
                                <option selected disabled>Select bet</option>
                                <option value={"over"}>Over</option>
                                <option value={"under"}>Under</option>
                            </Form.Control>                        
                        </Col>
                    </Form.Row>
                    <Form.Row hidden={condDisp != "spread" && condDisp != "ml"}>
                        <Form.Label column>Team</Form.Label>
                        <Col>
                            <Form.Control type="text" value={team} onChange={(e)=>setTeam(e.target.value)}/>
                        </Col>
                    </Form.Row> 
                    <Form.Row hidden={condDisp!="spread" && condDisp!="total"}>
                        <Form.Label column>Line</Form.Label>
                        <Col>
                            <Form.Control type="text" value={line} onChange={(e)=>setLine(e.target.value)}/>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label column>Odds</Form.Label>
                        <Col>
                            <Form.Control type="text" value={odds} onChange={(e)=>setOdds(e.target.value)}/>
                        </Col>
                    </Form.Row>        
                    <Form.Row>
                        <Form.Label column>Units</Form.Label>
                        <Col>
                            <Form.Control type="number" value={units} onChange={(e)=>setUnits(e.target.value)}/>
                        </Col>
                    </Form.Row> 
                    <Form.Row>
                        <Col>                   
                            <Button onClick={()=>props.close()}>Cancel</Button>
                        </Col>
                        <Col>                   
                            <Button type="submit" >Save Bet</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </Modal.Body>
        </Modal>
    )

}

export default CreateManualBet