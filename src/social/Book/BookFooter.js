import React, {useEffect} from 'react';
import {Navbar, Nav, Image}from 'react-bootstrap';
import basketball from '../../images/icons/noun_Basketball_64846.svg';
import football from '../../images/icons/noun_american football_2153147.svg';
import baseball from '../../images/icons/noun_Bat_495572.svg';
import soccer from '../../images/icons/noun_soccer_2730034.svg';
import more from '../../images/icons/noun_more_2269702.svg';
import betslip from '../../images/icons/noun_sale slip_2558704.svg';

const BookFooter = (props) => {
    //check when bets prop changes, hide or show bet count on betslip icon
    useEffect(()=>{
        if(props.bets.length > 0){
            document.getElementById("betCount").style.display ="block";
        }else{
            document.getElementById("betCount").style.display ="none";
        }
    },[props.bets]);

    return (
        <Navbar className="book-footer" variant="dark" bg="dark" sticky="bottom">
            <Nav className="book-nav">
                <Nav.Item className="icon" onClick={() => props.setDisplay("Basketball")}><Image src={basketball} width="28" height="auto" /> </Nav.Item>
                <Nav.Item className="icon" onClick={() => props.setDisplay("football")}><Image src={football} width="28" height="auto" /> </Nav.Item>
                <Nav.Item className="icon" onClick={() => props.setDisplay("Baseball")}><Image src={baseball} width="28" height="auto" /> </Nav.Item>
                <Nav.Item className="icon" onClick={() => props.setDisplay("Soccer")}><Image src={soccer} width="28" height="auto" /> </Nav.Item>
                <Nav.Item className="icon" onClick={() => props.setDisplay("all")}><Image src={more} width="28" height="auto" /> </Nav.Item>
                <Nav.Item onClick={() => props.showSlip(true)}><Image className="icon" src={betslip} width="28" height="auto" /><div id="betCount"> {props.bets.length}</div></Nav.Item>
            </Nav>
        </Navbar>
    );
    
}

export default BookFooter;