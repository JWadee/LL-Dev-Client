import React, {useState, useEffect} from 'react'
import '../../../../css/global/fixtures.css';
import {Row, Col, Spinner} from 'react-bootstrap';
import BetSlip from '../BetSlip/BetSlip';
import SportPrev from '../../../../social/Book/SportPrev';
import Sport from '../../../../social/Book/Sport';
import isEmpty from '../../../../utils/isEmpty';
import BookFooter from '../../../../social/Book/BookFooter';
import MobileBetSlip from '../BetSlip/MobileBetSlip';
const Book = (props) => {
    const [bets, setBets] = useState([]);
    const [spin, setSpin]= useState(true);
    const [currDisp, setCurrDisp]= useState({});
    const [showMobileBetSlip, setShowMobileBetSlip]= useState(false);

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
        //set bets array
        setBets(tmpBets);
    }

    useEffect(()=>{
        setTimeout(()=>setSpin(false),1000)
    },[props.book])

    //Function to handle close mobile bet slip
    const handleCancellation = () => {
        setShowMobileBetSlip(false);
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

    //function to set display from the sport nav
    const setDisplay =(sport)=>{
        if(sport === "all"){
            setSpin(true)
            setCurrDisp({});
            setTimeout(()=>setSpin(false),400);
        }else{
            let index = props.book.findIndex(ArrSprt=> ArrSprt.sport_name === sport)
            if(index > -1){
                setCurrDisp(props.book[index])
            }
        }
    }

    return (
        <>  
            <Row className="book">
                {spin ? (<Spinner className="center" animation="border"/>)
                    :    
                    (isEmpty(currDisp) ?
                        (
                        <Col md={8} sm={12}>
                            {props.book.map(sport => {
                                return (<SportPrev key={sport.sport_id} sport={sport} bets={bets} setBets={setBets} removeBet={removeBet} setCurrDisp={setCurrDisp}/>)
                            })}
                        </Col>
                        )
                            :
                        (
                        <Col md={8} sm={12}>
                            <Sport key={currDisp.sport_id} sport={currDisp} bets={bets} setBets={setBets} removeBet={removeBet} setDisplay={setDisplay} />
                        </Col>
                        )  
                    )
                }
                <Col className="hidden-md" md={4} sm={12}>
                    <BetSlip bets={bets} removeBets={removeBets} />
                </Col>
                <MobileBetSlip close={handleCancellation} removeBets={removeBets} show={showMobileBetSlip} bets={bets}/>
            </Row>   
            <BookFooter setDisplay={setDisplay} showSlip={setShowMobileBetSlip} bets={bets}/>
        </>
    )
}

export default Book