import React from 'react';
import {Table, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const MyLiveContests = (props) => {

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>Contest Name</th>
                    <th>Style</th>
                    <th>Remaining</th>
                    <th>Bankroll</th>
                    <th>Available</th>
                    <th>Entry Fee</th>
                    <th>Prizes</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.contests.map(contest=>(
                    <tr key={contest.intContestID}>
                        <td>{contest.strContestName}</td>
                        <td>{contest.strContestType}</td>
                        <td>{contest.dtmEnd}</td>
                        <th>{contest.decBankroll}</th>
                        <th>need calc</th>
                        <td>${contest.decEntryFee}</td>
                        <td>${contest.decPrizePool}</td>
                        <td>
                            <LinkContainer to={"/live-contest/"+contest.intContestID+"/entry/"+contest.intContestPlayerID}>
                                <Button>
                                    Open
                                </Button>
                            </LinkContainer>    
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )

}

export default MyLiveContests