import React from 'react'
import { Row, Col } from 'react-bootstrap';
import stringifyOddsAndPoints from '../utils/stringifyOddsAndPoints';
import '../css/global/posts.css'
import formatTime from '../utils/formatTime';

const MyPosts = (props) => {

    return (
        <>
            {props.posts.map((post, i) => {
                let dtm = parseInt(post.contents.timestamp)
                let strDtm = new Date(dtm);
                let timestamp = strDtm.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
                return (
                    <div className="post" key={i}>
                        <div className="post-prof-col">
                            <img src={props.user.picture} className="post-prof" alt="Profile" />
                        </div>
                        <div className="post-content">
                            <div className={"post-info"}>
                                <strong>{props.user.email}</strong>
                                <p>{timestamp}</p>
                            </div>
                            {post.bets.map((bet, i) => {
                                if (bet.type === "Straight") {
                                    const leg = bet.legs[0];
                                    //calc win field
                                    let win;
                                    if (bet.odds > 0) {
                                        let dec = bet.odds / 100;
                                        win = parseFloat(bet.wager * dec).toFixed(2)
                                    } else {
                                        let dec = Math.abs(bet.odds) / 100;
                                        win = parseFloat(bet.wager / dec).toFixed(2)
                                    }
                                    if (leg.line.type === "Spread") {
                                        return (
                                            <div key={i}>
                                                <p><strong>{leg.line.team.name}</strong>{" " + stringifyOddsAndPoints(leg.line.line) + " (" + stringifyOddsAndPoints(bet.odds) + ")"}</p>
                                                <p>{leg.fixture.fixture}</p>
                                                <p>{formatTime(leg.fixture.time)}</p>
                                            </div>
                                        )
                                    } else if (leg.line.type === "Moneyline") {
                                        return (
                                            <div key={i}>
                                                <p><strong>{leg.line.team.name}</strong>{" " + stringifyOddsAndPoints(bet.odds)}</p>
                                                <p>{leg.fixture.fixture}</p>
                                                <p>{formatTime(leg.fixture.time)}</p>
                                            </div>
                                        )
                                    }
                                    else if (leg.line.type === "Total") {
                                        return (
                                            <div key={i}>
                                                <p><strong>{leg.line.bet + " " + leg.line.line}</strong>{" " + " (" + stringifyOddsAndPoints(bet.odds) + ")"}</p>
                                                <p>{leg.fixture.fixture}</p>
                                                <p>{formatTime(leg.fixture.time)}</p>
                                            </div>
                                        )
                                    }

                                } else {
                                    return <></>;
                                }
                            })}
                            <div className="writeup">
                                <p>{post.contents.writeup}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )

}

export default MyPosts