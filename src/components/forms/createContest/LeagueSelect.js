import React, {useState, useEffect} from 'react'
import {Form, Button, Modal} from 'react-bootstrap';


const LeagueSelect = (props) => {
    const [leagues, setLeagues] = useState([])

    return (
        <Modal show={props.show} onHide={()=>props.setDisp(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Select Leagues</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h5>Basketball</h5>
                    <Form.Check 
                        type="checkbox"
                        value="1"
                        label={`NBA`}
                        
                    />
                    <Form.Check 
                        type="checkbox"
                        value="1"
                        label={`Euro League`}
                    />
                    <h5>Soccer</h5>
                    <Form.Check 
                        type="checkbox"
                        value="1"
                        label={`Bundesliga 1`}
                    />
                    <Form.Check 
                        type="checkbox"
                        value="1"
                        label={`Premier League`}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>props.setDisp(false)} >
                    Close
                </Button>
                <Button variant="primary" onClick={()=>props.addLeagues()}>
                    Add Leagues
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default LeagueSelect