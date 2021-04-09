import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import {Table, Button}from 'react-bootstrap';
import Fixture from './Fixture';

const SportPrev = (props) => {
    const [prev, setPrev] = useState([]);
    /*Filter Prev for display
        only keep 3 games to show for preview
    */
    useEffect(()=>{
        let sport = props.sport;
        let count = 0;
        let tmpPrev = [];
        //go through each league
        sport.leagues.forEach(league => {
            //only pull first 3 fixtures
            if(count < 3){
                let tmpLeag = {
                    league_key: league.league_key,
                    league_name: league.league_name,
                    league_short: league.league_short,
                    fixtures: []
                }
                league.fixtures.forEach(fixt=>{
                    if(count < 3){
                        tmpLeag.fixtures.push(fixt)
                        count ++;
                    }
                })   
                tmpPrev.push(tmpLeag) 
                count = count + 1;
            }
        });
        setPrev(tmpPrev)
    },[props.sport])

    return (
        <>  
            <h4 className="left-align sport-header">{props.sport.sport_name}</h4>
            {prev.map(league => {
                return (
                    <Fragment key={league.league_key}>  
                        <h5 className="left-align">{league.league_short}</h5>
                        <Table className="fixtureTable" responsive>
                            <thead className="fixtHeader">
                                <tr>
                                    <th className="timeHeader"></th>
                                    <th className="fixtCol">Fixture</th>
                                    <th className="lineCol">Spread</th>
                                    <th className="lineCol">Win</th>
                                    <th className="lineCol">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {league.fixtures.map(fixt=>{
                                    return <Fixture key={fixt.fixture_id} fixt={fixt} bets={props.bets} setBets={props.setBets} removeBet={props.removeBet}/>
                                })}
                            </tbody>  
                        </Table>
                    </Fragment>
                )
            })}
            <Button className="see-more-btn" onClick={()=>props.setCurrDisp(props.sport)}>See More</Button>
        </>
    )

}

export default SportPrev;