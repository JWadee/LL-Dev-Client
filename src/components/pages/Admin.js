import React, {useState} from 'react'
import {Row, Col, Card, Button} from 'react-bootstrap';

//Components
import CreateContest from '../forms/createContest/CreateContest';
import AdminSideBar from '../navs/AdminSideBar';
const AdminPage = () => {
    const [component, setComponent] = useState(<></>)

    const close = () => {
        setComponent(<></>)
    }

    return (
        <>
            <Row>   
                <Col sm={{span:4}}>
                    <Card> 
                        <Card.Header>CONTESTS</Card.Header>
                        <Card.Body> 
                            <Button onClick={()=>setComponent(<CreateContest close={close}/>)}>Create Contest</Button>
                        </Card.Body>
                    </Card>
                </Col>         
                <Col sm={{span:8}}>
                    {component}
                </Col>
            </Row>
        </>
    )

}

export default AdminPage