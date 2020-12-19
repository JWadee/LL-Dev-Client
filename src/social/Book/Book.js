import React, {useEffect, useState} from 'react'
import Fixture from './Fixture';
import {Table, Row, Col} from 'react-bootstrap';
import BetSlip from './BetSlip/BetSlip';

import '../../css/global/fixtures.css';
const Book = () => {
    const [book, setBook] = useState([]);
    const [bets, setBets] = useState([]);

    useEffect(()=>{
        const fetchBook = async() =>{
            const response = await fetch('https://api.lineleaders.net/fixtures/getBook');
            const data = await response.json();
            setBook(data);
        }

        fetchBook();
    },[])

    //organize by league
    useEffect(()=>{

    },[])

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
        <Row>
            <Col md={8} sm={12}> 
                <Table className="fixtureHeaderTable" responsive>
                    <thead>
                        <tr>
                            <th className="timeHeader"></th>
                            <th className="fixtCol">Fixture</th>
                            <th className="lineCol">Spread</th>
                            <th className="lineCol">Win</th>
                            <th className="lineCol">Total</th>
                        </tr>
                    </thead>
                </Table>
                {book.map(fixt=>{
                    return <Fixture key={fixt.fixture_id} fixt={fixt} bets={bets} setBets={setBets} removeBet={removeBet}/>
                })}  
            </Col>
            <Col md={4} sm={12}>
                <BetSlip bets={bets} removeBets={removeBets} />
            </Col>
        </Row>   
    )
}

export default Book