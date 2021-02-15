import React, {useState, useEffect} from 'react'
import {Table, Modal} from 'react-bootstrap';
import Leaderboard from '../../ActiveContest/Leaderboard';
import isEmpty from'../../../../utils/isEmpty';
import fetchLeaderboards from '../../../../api/fetchLeaderboards';

const MyHistoryContests = (props) => {
    const [leaderboards,setLeaderboards] = useState([]);
    const [displayLb, setDisplayLb] = useState(false);
    const [contest, setContest] = useState({});

    //open contest leaderboard modal
    const displayLeaderboard = (contest) => {
        setDisplayLb(true)
        setContest(contest)
    }   

    //run when contest is set, get leaderboards 
    useEffect(()=>{
        const getLB = async ()=>{
            let lb = await fetchLeaderboards(contest.intContestID, contest.intContestTypeID, contest.decPrizePool);
            setLeaderboards(lb);
        }

        if(!isEmpty(contest) && displayLb === true){
            getLB();
        }
    },[setDisplayLb, contest])

    //Function to handle cancellation of bet submission
    const handleClose = () => {
        setContest({});
        setLeaderboards([]);
        setDisplayLb(false);
    }

    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Contest Name</th>
                        <th>Style</th>
                        <th>Placement</th>
                        <th>Record</th>
                        <th>Bankroll</th>
                        <th>Prizes</th>
                    </tr>
                </thead>
                <tbody>
                    {props.contests.map(contest=>(
                        <tr key={contest.intContestID} onClick={()=>displayLeaderboard(contest)}>
                            <td>{contest.strContestName}</td>
                            <td>{contest.strContestType}</td>
                            <td>{contest.intPlacement}</td>
                            <td>{contest.strRecord}</td>
                            <td>{"$"+contest.decBankroll}</td>
                            <td>{"$"+contest.decWinnings}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={displayLb} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>{contest.strContestName}<br />Final Standings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Leaderboard leaderboards={leaderboards} />
                </Modal.Body>
            </Modal>
        </>
    )

}

export default MyHistoryContests