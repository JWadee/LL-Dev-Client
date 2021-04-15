import React from 'react';
import { Fragment } from 'react';
import {Table, Image}from 'react-bootstrap';
import Fixture from './Fixture';
import back from '../../images/icons/noun_back_3542560.svg';

const Sport = (props) => {
    return (
        <>  
            <div className="left-align" onClick={() => props.setDisplay("all")}><Image src={back} width="35" height="auto" />All Sports</div>
            <h4 className="left-align sport-header">{props.sport.sport_name}</h4>
            {props.sport.leagues.map(league => {
                return (
                    <Fragment key={league.league_key}>  
                        <h5  className="left-align">{league.league_short}</h5>
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

export default Sport;