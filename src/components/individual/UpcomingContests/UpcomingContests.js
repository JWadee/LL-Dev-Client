import React, {useState, useEffect} from 'react';
import {Row, Col, Table, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import ContestDetails from './ContestDetails';
import updateStartCountdown from '../../../utils/startCountdown';

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
    const [expandedContest, setExpandedContest] = useState({});
    const [showDetail, setShowDetail] = useState(false);
    const handleClose = () => setShowDetail(false);
    const handleShow = () => setShowDetail(true);

    //Enter contest 
    const enterContest = async (contestID) => {
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

    //Handle open detail
    const handleOpenDetail = async (contest) => {
        await setExpandedContest(contest)
        setShowDetail(true)
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
                            <th className="hidden-md">Entries</th>
                            <th className="hidden-md">Bankroll</th>
                            <th>Start</th>
                            <th className="hidden-md"></th>
                            <th></th>
                        </tr>
                    </thead>               
                    <tbody>   
                        {contests.map((contest,i)=>{
                            return(
                                <tr key={contest.contestID}>
                                    <td>{contest.name}</td>
                                    <td className="hidden-md">{contest.contestType}</td>
                                    <td>${contest.entry}</td>
                                    <td>${contest.prizepool}</td>
                                    <td className="hidden-md">Entries(need calculated)</td>
                                    <td className="hidden-md">${contest.bankroll}</td>
                                    <td id={"countdown"+i}></td>
                                    <td className="hidden-md"><Button onClick={()=>handleOpenDetail(contest)}>Details</Button></td>
                                    <td><Button onClick={()=>enterContest(contest.contestID)}>Enter</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>            
            </Col> 
            <ContestDetails contest={expandedContest} show={showDetail} onHide={handleClose}/> 
        </Row>     
    )
}

const mapStateToProps = (state) => {
    return {
        accountID: state.user.ID
    }
}

export default connect(mapStateToProps)(OpenContests);