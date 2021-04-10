import React from 'react';
import {Modal} from 'react-bootstrap';
import BetSlip from './BetSlip';

const MobileBetSlip = (props) => {

    return (
        <Modal id="mobile-betslip" size='lg' show={props.show} onHide={props.close} bets={props.bets}>
            <Modal.Header closeButton></Modal.Header>
            <BetSlip  bets={props.bets} removeBets={props.removeBets} />
        </Modal>
    )

}

export default MobileBetSlip