import React, { useState, useEffect } from 'react';
import {Tabs, Tab, Spinner} from 'react-bootstrap';
import { connect } from 'react-redux';

//Components 
import MyLiveContests from '../individual/MyContests/MyLiveContests';
import MyUpcomingContests from '../individual/MyContests/MyUpcomingContests';
import MyHistoryContests from '../individual/MyContests/MyHistoryContests';

const ContestsPage = (props) => {
    const [contests, setContests] = useState([]);
    const [liveContests, setLiveContests] = useState([]);
    const [upcomingContests, setUpcomingContests] = useState([]);
    const [historyContests, setHistoryContests] = useState([]);
    const [display, setDisplay] = useState(false);

    //Set display to true after 3 seconds
    setTimeout(function() {
        setDisplay(true)
    }, 1000);

    useEffect(()=>{
        const fetchMyContests = async ()=> {
            const response = await fetch('https://api.lineleaders.net/contests/myContests?ID='+props.accountID);
            const contests = await response.json();
            setContests(contests);
        }

        fetchMyContests();
    },[props])


    useEffect(()=>{
        if(contests.length > 0){
            let active = [];
            let upcoming = [];
            let history = [];
            let count = 0;

            contests.forEach(contest => {
                //upcoming (Or open in DB)
                if(contest.intContestStatusID == 1){
                    upcoming.push(contest)
                }
                // active
                else if(contest.intContestStatusID == 2){
                    active.push(contest)
                }
                // history (complete)
                else if(contest.intContestStatusID == 3){
                    history.push(contest)
                }
                count++;
            })
            if(count == contests.length ){
                setLiveContests(active);
                setUpcomingContests(upcoming);
                setHistoryContests(history);            
            }
        }
    },[contests])

    if(contests.length > 0 && display===true){ 

        return (
            <>
                <h3>MY CONTESTS</h3>
                <Tabs fill defaultActiveKey="live" id="contestsTab">
                    <Tab eventKey="live" title="LIVE">
                        <MyLiveContests contests={liveContests} />
                    </Tab>  
                    <Tab eventKey="upcoming" title="UPCOMING">
                        <MyUpcomingContests contests={upcomingContests} />
                    </Tab>
                    <Tab eventKey="history" title="HISTORY">
                        <MyHistoryContests contests={historyContests} />
                    </Tab>
                </Tabs>
            </>
        )
    }else return (
        <>
            <Spinner animation="border"/>
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        accountID: state.user.ID
    }
}

export default connect(mapStateToProps)(ContestsPage);