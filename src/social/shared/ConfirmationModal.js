import React from 'react'
import {Modal, Button} from 'react-bootstrap';

/* 
Component takes following props
show - boolean to show or hide modal
close - function to set parent variable that handles display of modal to false
action - call back funtion to action on clicking button
buttonText - text to display on button
message - title text for modal
*/

const ConfirmationModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>{props.message}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.action}>
                    {props.buttonText}
                </Button>
                </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationModal