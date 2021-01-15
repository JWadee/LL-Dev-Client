import React from 'react';
import {Modal} from 'react-bootstrap';
import CreatePost from './CreatePost';

const CPModal = (props) => {

    return (
        <Modal size='lg' show={props.show} onHide={props.close}>
            <Modal.Body>
                <CreatePost openBets={props.openBets}/>
            </Modal.Body>
        </Modal>
    )

}

export default CPModal