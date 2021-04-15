import React, {useState} from 'react';
import {Modal, Image} from 'react-bootstrap';
import CreatePost from './CreatePost';
import '../../../css/global/posts.css';
const CPModal = (props) => {
    return (
        <Modal id="cp-modal" size='lg' show={props.show} onHide={props.close} >
            <Modal.Header closeButton>
                <Image src={props.user.picture} className="profile"></Image>
                <p>{props.user.email}</p>
            </Modal.Header>
            <Modal.Body >
                <CreatePost openBets={props.openBets} close={props.close} userid={props.userid}/>
            </Modal.Body>
        </Modal>
    )

}

export default CPModal