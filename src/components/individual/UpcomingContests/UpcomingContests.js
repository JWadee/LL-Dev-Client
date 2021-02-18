import React, {useState, useEffect} from 'react';
import {Row, Col, Table, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import updateStartCountdown from '../../../utils/startCountdown';
import ConfirmationModal from '../../shared/ConfirmationModal';
import { useHistory } from "react-router-dom";

/*  Contest Object Structure
        {
            contestID: Number, 
            contestLeagues: [
                {
                    leagueID: Number, 
                    leagueName: String
                }   
            ],
            entry: Number, 
            bankroll: Number, 
            prizepool: Number,
            start: Date, 
            end: Date, 
            minPlayers: Number, 
            maxPlayers: Number
        }
*/

/*    NOTES 

        - min + max players are hardcoded currently 
        - Start time needs to be countdown within 24 hrs or day + time if > 24 hrs away
        - Make sure time is being translated to the right timezone
*/

const OpenContests = (props) => {
    const contests = props.contests;
    const [contestID, setContestID] = useState();
    const [showConfirm, setShowConfirm] = useState(false);
    const handleClose = () => {
        setShowConfirm(false)
        setContestID()
    };
    const history = useHistory();


    //Enter contest 
    const enterContest = async () => {
        const body = {
            contestID: contestID,
            accountID: props.accountID
        };

        const opts = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"        
            }
        }

        const url = "https://api.lineleaders.net/contests/enter";

        //enter contest
        fetch(url, opts)
        .then(response=> {
            console.log(response.json())
            setShowConfirm(false);
            history.push("/contests");

        })
        .catch(err=>{
            console.log(err)
        })
    }

    //Effect to update countdown 
    useEffect(()=>{
        if(contests.length > 0){
            var countdowns = setInterval(()=>{
                contests.forEach((contest, i)=>{
                    updateStartCountdown(contest.start, i);
                })
            },1000)
        }

        //Cleanup interval on component unmount
        return function cleanup() {
            clearInterval(countdowns);       
        };
    });

    const handleEnter = (contestID) => {
        setContestID(contestID);
        setShowConfirm(true);
    }


    return (
        <Row>
            <Col>
                <h3>Open Contests</h3>
                <Table responsive>  
                    <thead>
                        <tr>
                            <th>Contest Name</th>
                            <th className="hidden-md">Style</th>
                            <th>Entry Fee</th>
                            <th>Prizepool</th>
                            <th className="hidden-md">Bankroll</th>
                            <th>Start</th>
                            <th></th>
                        </tr>
                    </thead>               
                    <tbody>   
                        {contests.length > 0 ?
                            (
                                contests.map((contest,i)=>{
                                    return(
                                        <tr key={contest.contestID}>
                                            <td>{contest.name}</td>
                                            <td className="hidden-md">{contest.contestType}</td>
                                            <td>${contest.entry}</td>
                                            <td>${contest.prizepool}</td>
                                            <td className="hidden-md">${contest.bankroll}</td>
                                            <td id={"countdown"+i}></td>
                                            <td><Button onClick={()=>handleEnter(contest.contestID)}>Enter</Button></td>
                                        </tr>
                                    )
                                })
                            )
                                :
                            (
                                <tr>
                                    <td colSpan="5">No Contests Available</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>            
            </Col> 
            <ConfirmationModal close={handleClose} show={showConfirm} action={()=>enterContest(contestID)} buttonText="Enter" message={"Enter Contest?"}/>

        </Row>     
    )
}

const mapStateToProps = (state) => {
    return {
        accountID: state.user.ID
    }
}

export default connect(mapStateToProps)(OpenContests);