import React, {useEffect, useState} from 'react'
import organizeBook from '../../utils/organizeBook';
import '../../css/global/fixtures.css';

import {Row, Col, Navbar, Nav} from 'react-bootstrap';
import BetSlip from './BetSlip/BetSlip';
import SportPrev from './SportPrev';

const Book = () => {
    const [fixts, setfixts] = useState([]);
    const [bets, setBets] = useState([]);
    const [sports, setSports] = useState([]);
    const [leagues, setLeagues] = useState([]);
    const [book, setBook] = useState([]);

    useEffect(()=>{
        const fetchfixts = async() =>{
            const response = await fetch('https://api.lineleaders.net/fixtures/getBook');
            const data = await response.json();
            setfixts(data);
        }
        const fetchSports = async () => {
            const response = await fetch('https://api.lineleaders.net/sports/');
            const data = await response.json();
            setSports(data)
        }
        const fetchLeagues = async () => {
            const response = await fetch('https://api.lineleaders.net/leagues/');
            const data = await response.json();
            setLeagues(data);
        }

        fetchLeagues();
        fetchSports();
        fetchfixts();
    },[])

    //organize book
    useEffect(()=>{
        if(fixts.length > 0 && leagues.length > 0 && sports.length > 0){
            let orgBook = organizeBook(fixts, leagues, sports);
            setBook(orgBook)
        }
    },[sports,leagues,fixts])

    //function to remove a single bet
    const removeBet = (id) => {
        console.log(id)
        //get temp array
        let tmpBets = [...bets];
        //get index 
        const index = tmpBets.map(bet => bet.id).indexOf(id);
        //get element by id
        const element = document.getElementById(id);
        //remove class
        element.classList.remove("selected-bet");     
        //remove bet from array   
        tmpBets.splice(index, 1);
        console.log(tmpBets)
        //set bets array
        setBets(tmpBets);
    }

    //function to remove bets after submission, takes array of ids
    const removeBets = (ids) => {
        //get temp array
        let tmpBets = [...bets];
        ids.forEach(id=> {
            //get index 
            const index = tmpBets.map(bet => bet.id).indexOf(id);
            //get element by id
            const element = document.getElementById(id);
            //remove class
            element.classList.remove("selected-bet");     
            //remove bet from array   
            tmpBets.splice(index, 1);
            console.log(tmpBets)
            //set bets array
        })
        setBets(tmpBets);
    }

    return (
        <>  
            {/* <Navbar bg="dark">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Basketball</Nav.Link>
                    <Nav.Link href="#features">Football</Nav.Link>
                    <Nav.Link href="#pricing">Soccer</Nav.Link>
                    <Nav.Link href="#pricing">Baseball</Nav.Link>
                </Nav>
            </Navbar> */}
            <Row>
                <Col md={8} sm={12}> 
                    {book.map(sport=>{
                        return(<SportPrev key={sport.sport_id} sport={sport} bets={bets} setBets={setBets} removeBet={removeBet}/>) 
                    })}
                </Col>
                <Col md={4} sm={12}>
                    <BetSlip bets={bets} removeBets={removeBets} />
                </Col>
            </Row>   
        </>
    )
}

export default Book