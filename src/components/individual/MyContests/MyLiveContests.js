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
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.contests.map(contest=>(
                    <tr key={contest.intContestID}>
                        <td>{contest.strContestName}</td>
                        <td>{contest.strContestType}</td>
                        <th>{contest.decEntry}</th>
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