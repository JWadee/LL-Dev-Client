import React from 'react'
import {Table} from 'react-bootstrap';

const MyHistoryContests = (props) => {

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>Contest Name</th>
                    <th>Style</th>
                </tr>
            </thead>
            <tbody>
                {props.contests.map(contest=>(
                    <tr key={contest.intContestID}>
                        <td>{contest.strContestName}</td>
                        <td>{contest.strContestType}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )

}

export default MyHistoryContests