import React, {useState} from 'react'
import {Row} from 'react-bootstrap';

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
        <Row>   
            <NeedResultsPage />
        </Row>
    )

}

export default AdminPage