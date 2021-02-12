import React, { useState } from 'react';
import { Fragment } from 'react';
import {Table, Button}from 'react-bootstrap';
import Fixture from './Fixture';

const SportPrev = (props) => {
    return (
        <>  
            <h2>{props.sport.sport_name}</h2>
            {props.sport.leagues.map(league => {
                return (
                    <Fragment key={league.league_key}>  
                        <h5>{league.league_short}</h5>
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

        </>
    )

}

export default SportPrev;