import React from 'react';
import {Modal} from 'react-bootstrap';

const ContestDetails = (props) => {
    let contest = props.contest;

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Contest Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Type: {contest.contestType}</p>
                <p>ID: {contest.contestID}</p>
            </Modal.Body>
        </Modal>
    )

}

export default ContestDetails