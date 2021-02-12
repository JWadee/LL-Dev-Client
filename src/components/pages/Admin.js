import React, {useState} from 'react'
import {Row, Navbar, Nav} from 'react-bootstrap';

//Components
import CreateContest from '../forms/createContest/CreateContest';
import AdminSideBar from '../navs/AdminSideBar';
import NeedResultsPage from '../admin/fixtureResults/NeedResultsPage';
const AdminPage = () => {
    const [component, setComponent] = useState(<></>)

    const close = () => {
        setComponent(<></>)
    }

    return (
        <>
            <Row>
                <Navbar>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link onClick={()=>setComponent(<NeedResultsPage />)}>Enter Results</Nav.Link>
                       </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={()=>setComponent(<CreateContest />)}>Create Contest</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </Row>
            <Row>   
                {component}        
            </Row>
        </>
    )

}

export default AdminPage