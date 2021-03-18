import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import CreatePost from './CreatePost';

const CPModal = (props) => {
    const [header, setHeader] = useState('')
    return (
        <Modal size='lg' show={props.show} onHide={props.close} >
            <Modal.Header closeButton><h4>{header}</h4></Modal.Header>
            <Modal.Body >
                <CreatePost openBets={props.openBets} close={props.close} setHeader={setHeader} userid={props.userid}/>
            </Modal.Body>
        </Modal>
    )

}

export default CPModal