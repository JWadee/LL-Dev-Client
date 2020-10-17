import React, { useEffect} from 'react'
import {Table} from 'react-bootstrap';
import updateStartCountdown from '../../../utils/startCountdown';

const MyUpcomingContests = (props) => {
    let contests = props.contests;

    //Effect to update countdown 
    useEffect(()=>{
        if(contests.length > 0){
            var countdowns = setInterval(()=>{
                contests.forEach((contest, i)=>{
                    updateStartCountdown(contest.dtmStart, i);
                })
            },1000)
        }

        //Cleanup interval on component unmount
        return function cleanup() {
            clearInterval(countdowns);       
        };
    });

    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Contest Name</th>
                    <th>Live In</th>
                    <th>Game Style</th>
                    <th>Entry Fee</th>
                    <th>Entries</th>
                    <th>Prizes</th>
                </tr>
            </thead>
            <tbody>
                {props.contests.map((contest, i)=>(
                    <tr key={contest.intContestID+i}>
                        <td>{contest.strContestName}</td>
                        <td id={"countdown"+i}></td>
                        <td>{contest.strContestType}</td>
                        <td>${contest.decEntryFee}</td>
                        <td>calc entries</td>
                        <td>${contest.decPrizePool}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default MyUpcomingContests