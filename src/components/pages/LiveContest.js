import React, { useState, useEffect } from 'react';
import {Tabs, Tab, Spinner} from 'react-bootstrap';
import Leaderboard from '../individual/ActiveContest/Leaderboard';
import SettledBets from '../individual/ActiveContest/bets/SettledBets';
import OpenBets from '../individual/ActiveContest/bets/OpenBets';
import Book from '../individual/ActiveContest/Book/Book';
import { useRouteMatch } from "react-router-dom";
import { connect } from 'react-redux';
import isEmpty from '../../utils/isEmpty';

const LiveContest = (props) => {
    const match = useRouteMatch();
    const [display, setDisplay] = useState(false);

    //Function to run on render and fetch contest + contestLeagues + contestBets
    useEffect(()=>{
        const fetchContest = async () => {
            const response = await fetch('https://api.lineleaders.net/contests/byID?id='+match.params.contestid);
            const data = await response.json();
            props.setContest(data)
            fetchBets();
        }
        const fetchLeagues = async () =>{
            const response = await fetch('https://api.lineleaders.net/contests/contestLeagues/byID?id='+match.params.contestid)
            const data = await response.json();
            props.setLeagues(data)
        }
        
        const fetchBets = async ()=> {
            const response = await fetch('https://api.lineleaders.net/bets/byEntry?entryid='+match.params.entryid);
            const bets = await response.json();
            //separate into open and settled and set redux state
            let open = [];
            let settled = [];

            bets.forEach(bet=>{
                if(bet.result === "W"|| bet.result === "L" || bet.Result ==="P"){
                    settled.push(bet);
                }else{
                    open.push(bet);
                }
            })
            props.setOpenBets(open);
            props.setSettledBets(settled);
        }

        fetchContest();
        fetchLeagues();
    },[])
    
    //funciton to separate into upcoming and inplay fixtures by leagues
    const organizeFixtures = (leagueFixts) => {
        let upcoming = [];
        let inplay = [];

        leagueFixts.forEach(league=>{
            //add new league fixts objects to upcoming and inplay arrays
            upcoming.push({
                leagueID: league.leagueID,
                fixtures: []
            });

            inplay.push({
                leagueID: league.leagueID,
                fixtures: []
            })

            //sort league fixtures into upcoming and inplay
            league.fixtures.forEach(fixt=>{
                //upcoming
                if(fixt.time_status == 0){
                    let upcIndex = upcoming.findIndex(lf=> parseInt(lf.leagueID) === parseInt(league.leagueID));
                    upcoming[upcIndex].fixtures.push(fixt)
                //inplay
                }else{
                    let inpIndex = inplay.findIndex(lf=> parseInt(lf.leagueID) === parseInt(league.leagueID));
                    inplay[inpIndex].fixtures.push(fixt)
                } 
            })
        })
        //set upcoming and inplay
        props.setUpcoming(upcoming);
        props.setInplay(inplay);
        setDisplay(true);
    }

    //run whenever leagues or contest is set, if contest is not empty fetch fixtures by league w/ time frame
    useEffect(()=>{
        if(!isEmpty(props.contest)){
            const fetchFixtures = async() => {
                let leagueIds = props.leagues.map(league=>{
                    return league.intLeagueID
                });

                if(leagueIds.length > 0){  
                    //api parameters to get fixtures
                    let body = {
                        leagueIDs: [leagueIds],
                        start:props.contest.dtmStart,
                        end: props.contest.dtmEnd
                    }
                    const url ='https://api.lineleaders.net/fixtures/byLeagues/withTimeFrame'
                    const options = {
                        method:'POST',
                        headers:{
                            'Content-Type': 'application/json;charset=UTF-8'
                        }, 
                        body: JSON.stringify(body)
                    }
                    //call api
                    const response = await fetch(url, options);
                    const leagueFixts = await response.json();
                    console.log(leagueFixts)
                    //organize fixtures and set upcoming + inplay
                    organizeFixtures(leagueFixts);
                }
            }
            fetchFixtures();        
        }
    },[props.leagues, props.contest])


    //Run on settled bets change, calculate bankroll and update store
    useEffect(()=>{
        //calculate bankroll
        let bankroll = props.contest.decInitialBankRoll;
        props.settledBets.forEach(bet=>{
            //update bankroll
            if(bet.result === "W" ){
                let win = parseFloat(bet.odds - 1);
                win = (win * parseFloat(bet.wager));
                bankroll = bankroll +  win;
            }else if(bet.result === "L" ){
                bankroll = bankroll - parseFloat(bet.wager);
            }else if(bet.result === "P" ) return;
        })
        props.setBankroll(parseFloat(bankroll).toFixed(2));
    },[props.settledBets])

    //Run on open bets or bankroll change, calculate available 
    useEffect(()=>{
        if(!isNaN(props.bankroll)){
            let available = parseFloat(props.bankroll);
            props.openBets.forEach(bet=>{
                available = available - parseFloat(bet.wager)    
            })
            props.setAvailable(available)
        }
    },[props.openBets, props.bankroll])

    if(Object.getOwnPropertyNames(props.contest).length > 0 && display===true){ 
        return (
            <>
                <h3>{props.contest.strContestName}</h3>
                <br/><b>Available:</b> ${props.available}
                <b> Bankroll:</b> ${props.bankroll}

                <Tabs fill defaultActiveKey="book" id="contestsTab">
                    <Tab eventKey="book" title="BOOK">
                        <Book leagues={props.leagues} inplay={props.inplayFixts} upcoming={props.upcomingFixts} /> 
                    </Tab>
                    <Tab eventKey="open" title={"OPEN ("+props.openBets.length+")"}>
                        <OpenBets />
                    </Tab>
                    <Tab eventKey="settled" title="SETTLED">
                        <SettledBets />
                    </Tab>
                    <Tab eventKey="leaderboard" title="LEADERBOARD">
                        <Leaderboard />
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
      contest: state.contest.contest,
      entryID: state.contest.entryID,
      bankroll: state.contest.bankroll,
      available: state.contest.available,
      openBets: state.contest.openBets, 
      settledBets: state.contest.settledBets,
      leagues: state.contest.leagues,
      upcomingFixts: state.contest.upcomingFixts,
      inplayFixts: state.contest.inplayFixts
    }
  }
  
  const mapDispatchToProps = ( dispatch ) => {
    return{
      setContest: contest => { dispatch({type: 'SET_CONTEST', contest: contest })},
      setEntryID: id => { dispatch({type: 'SET_ENTRY_ID', ID: id })},      
      setAvailable: avaialable => { dispatch({type: 'SET_AVAILABLE', available: avaialable })},
      setBankroll: bankroll => { dispatch({type: 'SET_BANKROLL', bankroll: bankroll })},
      setOpenBets: bets => { dispatch({type: 'SET_OPEN_BETS', bets: bets })},      
      setSettledBets: bets => { dispatch({type: 'SET_SETTLED_BETS', bets: bets })},
      setLeagues: leagues => { dispatch({type: 'SET_LEAGUES', leagues:leagues})},
      setUpcoming: upcoming => {dispatch({type: 'SET_UPCOMING', upcoming:upcoming})},
      setInplay: inplay => {dispatch({type: 'SET_INPLAY', inplay:inplay})}
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(LiveContest);
