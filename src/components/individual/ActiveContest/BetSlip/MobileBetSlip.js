import React, { useState } from 'react';
import {Modal, Button, Alert} from 'react-bootstrap';
import '../../../../css/betslip.css';
import Bet from './Bet';
import {model, ML, Spread, Total, Leg} from '../../../../models/bet/bet';
import { useRouteMatch } from "react-router-dom";
import { connect } from 'react-redux';
import fetchContestBets from '../../../../api/bets/fetchContestBets';
import ConfirmationModal from '../../../shared/ConfirmationModal';

const MobileBetSlip = (props) => {
    const match = useRouteMatch();
    const [error, setError] = useState();
    const [showConfirm, setShowConfirm] = useState(false);
    let bets = props.bets;
    //State variable to hold slip type (straight, parlay, etc.)
    const [slipType, setSlipType] = useState("Straight")
    const [records, setRecords] = useState([]);

    //add wager amount to Straight bet 
    const addWager = (id, wager) => {
        //find index
        const index = bets.map(bet => bet.id).indexOf(id);
        let tmpBets = bets;
        tmpBets[index].wager = wager;
        bets = tmpBets;
    }

    //Function to format straight bets in records for db storage
    const formatStraightBet = (bet) =>{
        //create instance of bet model obj and add properties
        let betModel = {...model};
        betModel.type = slipType;
        betModel.wager = bet.wager;
        betModel.odds = bet.odds;
        betModel.result = "";
        
        //create instance of leg obj 
        let leg = {...Leg};

        let legType = bet.type;
        if(legType === "Spread"){
            //create instance of spread line object 
            let spread = {...Spread}; 
            spread.team = {...spread.team}
            spread.team.type = bet.team.type;
            spread.team.name = bet.team.name;
            spread.line = bet.handicap;
            leg.fixture = {...leg.fixture}
            leg.fixture.fixtureID = bet.fixtureID; 
            leg.fixture.fixture = bet.fixture; 
            leg.fixture.time = bet.time; 
            leg.line = spread;
            leg.odds = bet.odds.decimal;
            leg.result ="";
        }else if(legType === "Moneyline"){
            //create instance of ML line object
            let ml = {...ML}; 
            ml.team = {...ml.team}
            ml.team.type = bet.team.type;
            ml.team.name = bet.team.name;
            leg.fixture = {...leg.fixture}
            leg.fixture.fixtureID = bet.fixtureID; 
            leg.fixture.fixture = bet.fixture; 
            leg.fixture.time = bet.time;             
            leg.line = ml;
            leg.odds = bet.odds.decimal; 
            leg.result ="";       
        }else if(legType === "Total"){
            //create instance of Total line object
            let total = {...Total}; 
            total.bet = bet.bet;
            total.line = bet.total;
            leg.fixture = {...leg.fixture}
            leg.fixture.fixtureID = bet.fixtureID; 
            leg.fixture.fixture = bet.fixture; 
            leg.fixture.time = bet.time; 
            leg.line = total;
            leg.odds = bet.odds.decimal;
            leg.result ="";
        }

        return {
            contestPlayerID: match.params.entryid,
            jsonBet: betModel,
            leg: leg
        };
    }

    //function to validate and confirm bets, then confirm placements of bets
    const validateBets = async() => {
        //check to make sure all bets contain valid wagers and combine wagers from all bets
        let totalWagered = 0;
        //object to hold error
        let error = {
            isError: false,
            message: String
        }

        await bets.forEach(bet=>{
            if(bet.wager > 0){
                totalWagered = totalWagered + parseFloat(bet.wager);
            }else{
                error.isError = true;
                error.message ="Please enter a valid wager amount for all bets";
            }
        })
        //check totalWagered and validate that it is not less than available

        if(totalWagered > props.available){
            error.isError = true;
            error.message = "Cash Available: $"+props.available;
        }

        //check for error and either insert bets or display error message
        if(error.isError === true){
            setError(<Alert variant='danger'>{error.message}</Alert>)
            return;
        }else{
            //clear any error message, display confirmation box
            setError();
            setShowConfirm(true);

            //determine type of bet(s) - straight,parlay,etc.
            if(slipType === "Straight"){
                let tmpRecords = [];
                //format each bet and set records state array
                bets.forEach(bet=>{
                    let tmpModel = formatStraightBet(bet)
                    tmpRecords.push(tmpModel);
                })
                
                setRecords(tmpRecords);
            }
        }   
    }

    //Function to insert records into the database
    const insertBetRecords = async() => {
        //close modal
        setShowConfirm(false);

        //api parameters to create bets
        const body = {
            bets: records
        }
        console.log(bets)

        const url ='https://api.lineleaders.net/bets/createContest';
        const options = {
            method:'POST',
            headers:{
                'Content-Type': 'application/json;charset=UTF-8'
            }, 
            body: JSON.stringify(body)
        }

        //call api and check res code
        let response = await fetch(url, options);
        let json = await response.json();

        //if resources have been created, clear bets array
        if(json.code === 201){
            let ids = [];
            bets.forEach(bet=>{
                ids.push(bet.id);
            })    
            props.removeBets(ids);
            props.close();

            let contestBets = await fetchContestBets(match.params.entryid);
            props.setOpenBets(contestBets.open);
            props.setSettledBets(contestBets.settled);
        }
    }

    //Function to handle cancellation of bet submission
    const handleCancellation = () => {
        setRecords([]);
        setShowConfirm(false);
    }
    

    return (
        <Modal id="mobile-betslip" size='lg' show={props.show} onHide={props.close} bets={props.bets}>
            <Modal.Header closeButton><h5>Bet Slip</h5></Modal.Header>
            <Modal.Body>
                {bets.map((bet, i)=>{
                    return(
                            <Bet key={bet.bet+bet.id} bet={bet} i={i} removeBets={props.removeBets} slipType={slipType} addWager={addWager}/>
                        )
                })}
            </Modal.Body>
            <Modal.Footer>
                {error}
                <Button onClick={()=>validateBets()} variant="primary">Place Bet(s)</Button>
            </Modal.Footer>
            <ConfirmationModal close={handleCancellation} show={showConfirm} action={insertBetRecords} buttonText="Yes" message={"Are you ready to place your bets?"}/>
        </Modal> 
    )

}

const mapStateToProps = (state) => {
    return {
        available: state.contest.available,
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return{
        setOpenBets: bets => { dispatch({type: 'SET_OPEN_BETS', bets: bets })},      
        setSettledBets: bets => { dispatch({type: 'SET_SETTLED_BETS', bets: bets })}
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(MobileBetSlip);