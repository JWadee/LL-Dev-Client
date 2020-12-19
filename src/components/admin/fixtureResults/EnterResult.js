

import React, {useState} from 'react';
import { Form, Card, Col, Button, Alert} from 'react-bootstrap';
import isEmpty from '../../../utils/isEmpty';

const EnterResult = (props) => {
    const [homeScore, setHomeScore] = useState();
    const [awayScore, setAwayScore] = useState();
    const [error, setError] = useState();
    
    //Update fixture results  in database
    const updateFixture = async () => {
        //api parameters to update results
        let body = {
            fixt_id : props.fixt.fixture_id,
            results :  {     
                home_score : homeScore, 
                away_score : awayScore
            }
        };
        const url ='https://api.lineleaders.net/fixtures/updateResults'
        const options = {
            method:'POST',
            headers:{
                'Content-Type': 'application/json;charset=UTF-8'
            }, 
            body: JSON.stringify(body)
        }

        //call api
        fetch(url, options)
            .then(response=> {
                props.removeFixt(props.fixt.fixture_id);
            })
            .catch(err=>{
                console.log(err)
            })
    }

    //function to add results to fixture and update database 
    const checkResults = () => {
        //make sure scores are valid 
        if(isNaN(homeScore) || isNaN(awayScore) || awayScore < 0 || homeScore < 0){
            setError(<Alert variant='danger'>Enter a valid score in order to save</Alert>)
        }else{
            setError()
            //add to database
            updateFixture();
        } 
    }

    return (    
        <Card>
            <Card.Header>
                Enter Results
            </Card.Header>
            <Card.Body>
                {!isEmpty(props.fixt) ? 
                    <Form> 
                        <Form.Row> 
                            <Col> 
                                <Form.Control type="number" onChange={(e)=>setAwayScore(e.target.value)}></Form.Control>
                            </Col>
                            <Form.Label column>{props.fixt.fixture.away_team}</Form.Label>
                        </Form.Row>
                        <Form.Row> 
                            <Col> 
                                <Form.Control type="number"  onChange={(e)=>setHomeScore(e.target.value)}></Form.Control>
                            </Col>
                            <Form.Label column>{props.fixt.fixture.home_team}</Form.Label>
                        </Form.Row>
                        <Form.Row> 
                            {error}
                            <Button onClick={()=>checkResults()}>Save Results</Button>
                        </Form.Row>
                        
                    </Form>
                        :
                    <></>
                }
            </Card.Body>
        </Card>
    )

}

export default EnterResult

