import React, { useState, useEffect } from 'react';
import {Tabs, Tab, Spinner, Form, Col} from 'react-bootstrap';
import Leaderboard from '../individual/ActiveContest/Leaderboard';
import SettledBets from '../individual/ActiveContest/bets/SettledBets';
import OpenBets from '../individual/ActiveContest/bets/OpenBets';
import Book from '../individual/ActiveContest/Book/ContestBook';
import { useRouteMatch } from "react-router-dom";
import { connect } from 'react-redux';
import isEmpty from '../../utils/isEmpty';
import formatCurrency from '../../utils/formatCurrency';
import organizeUpcomingBook from '../../utils/organizeUpcomingBook';
const LiveContest = (props) => {
    const match = useRouteMatch();
    const [display, setDisplay] = useState(false);
    const [activeTab, setActiveTab] = useState('book');

    //Function to run on render and fetch contest + contestLeagues + contestBets
    useEffect(()=>{
        const fetchContest = async () => {
            const response = await fetch('https://api.lineleaders.net/contests/byID?id='+match.params.contestid);
            const data = await response.json();
            props.setContest(data)
            fetchBets();
        }
        const fetchLeagues = async () =>{
            const response = await fetch('https://api.lineleaders.net/contests/contestLeagues/byID?id='+match.params.contestid);
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
    
    //run whenever contest is set, fetch leaderboard
    useEffect(()=>{
        const fetch_leaderboards = async() => {
            const response = await fetch('https://api.lineleaders.net/contests/leaderboards/?id='+match.params.contestid+"&contestTypeID="+props.contest.intContestTypeID+"&prizepool="+props.contest.decPrizePool);
            let leaderboards = await response.json();
            if(leaderboards.length > 0){
                props.setLeaderboards(leaderboards)
            }
        }

        if(!isEmpty(props.contest)){
            fetch_leaderboards();
        }
    },[props.contest])

    //function to fetch fixtures
    const fetchFixtures = async() => {
        let leagueIds = props.leagues.map(league=>{
            return league.intLeagueID
        });

        if(leagueIds.length > 0 & props.sports.length > 0){  
            //api parameters to get fixtures
            let body = {
                leagueIDs: leagueIds,
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
            const fixts = await response.json();
            //organize fixtures and set upcoming + inplay
            let book = organizeUpcomingBook(fixts, props.leagues, props.sports);
            props.setBook(book);
            setDisplay(true);
        }
    }

    //Get Book initially
    useEffect(()=>{
        if(!isEmpty(props.contest)){
            fetchFixtures();    
        }
    },[props.leagues, props.contest, props.sports])
    
    //check book once a minute and remove live games
    // setInterval(()=>{
    //     if(!isEmpty(props.contest)){
    //         fetchFixtures();    
    //     }
    // }, 60000)

    //Run on settled bets change, calculate bankroll and update store
    useEffect(()=>{
        //calculate bankroll
        let bankroll = 0;
        props.settledBets.forEach(bet=>{
            //update bankroll
            if(bet.result === "W" ){
                let win;
                let odds = parseFloat(bet.odds);
                let wager = parseFloat(bet.wager);

                if(odds > 0){
                    let dec = odds/100;
                    win = parseFloat(wager * dec)
                }
                else{
                    let dec = Math.abs(odds)/100;
                    win = parseFloat(parseFloat(wager) / dec)
                };
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
            let available = parseFloat(props.bankroll) + parseFloat(props.contest.decInitialBankRoll);
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
                <br/><b>Available:</b> {formatCurrency(props.available)}
                <b> Bankroll:</b> {formatCurrency(props.bankroll)}
                {/* Display when screens are md or smaller */}
                <Form className="hidden-lg">
                    <Form.Row>                    
                            <Col>
                                <Form.Control as="select" onChange={(e)=>setActiveTab(e.target.value)}>
                                    <option key="book" value="book">Book</option>
                                    <option key="open" value="open">{"Open ("+props.openBets.length+")"}</option>
                                    <option key="settled" value="settled">Settled</option>
                                    <option key="leaderboard" value="leaderboard">Leaderboard</option>
                                </Form.Control>
                            </Col>
                        </Form.Row>
                </Form>
                {/* Display when screens are large */}
                <Tabs fill activeKey={activeTab} onSelect={(k)=>setActiveTab(k)} id="contestsTab" className="hidden-md">
                    <Tab eventKey="book" title="BOOK">
                        {typeof props.book != "undefined" ?
                            (<Book book={props.book} /> )
                            :
                            (<></>)
                        }
                    </Tab>
                    <Tab eventKey="open" title={"OPEN ("+props.openBets.length+")"}>
                        <OpenBets />
                    </Tab>
                    <Tab eventKey="settled" title="SETTLED">
                        <SettledBets />
                    </Tab>
                    <Tab eventKey="leaderboard" title="LEADERBOARD">
                        <Leaderboard leaderboards={props.leaderboards}/>
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
      leaderboards: state.contest.leaderboards,
      entryID: state.contest.entryID,
      bankroll: state.contest.bankroll,
      available: state.contest.available,
      openBets: state.contest.openBets, 
      settledBets: state.contest.settledBets,
      leagues: state.contest.leagues,
      book: state.contest.book,
      sports: state.application.sports
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
      setLeagues: leagues => { dispatch({type: 'SET_CONTEST_LEAGUES', leagues:leagues})},
      setUpcoming: upcoming => {dispatch({type: 'SET_UPCOMING', upcoming:upcoming})},
      setInplay: inplay => {dispatch({type: 'SET_INPLAY', inplay:inplay})},
      setLeaderboards: leaderboards => {dispatch({type: 'SET_LEADERBOARDS', leaderboards:leaderboards})},
      setBook: book => {dispatch({type: 'SET_BOOK', book:book})}
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(LiveContest);
