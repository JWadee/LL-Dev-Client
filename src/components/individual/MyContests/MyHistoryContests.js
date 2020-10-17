import React from 'react'
import {Table} from 'react-bootstrap';

const MyHistoryContests = (props) => {

    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Contest Name</th>
                    <th>Style</th>
                    <th>Place</th>
                    <th>$ Won</th>
                    <th>Final Bankroll</th>
                </tr>
            </thead>
            <tbody>
                {props.contests.map(contest=>(
                    <tr key={contest.intContestID}>
                        <td>{contest.strContestName}</td>
                        <td>{contest.strContestType}</td>
                        <th>need place</th>
                        <th>need calc</th>
                        <td>$ need earnings</td>
                        <td>$ need bankroll</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )

}

export default MyHistoryContests