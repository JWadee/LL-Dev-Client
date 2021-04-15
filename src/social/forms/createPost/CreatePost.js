import React, { useState } from 'react'
import isEmpty from '../../../utils/isEmpty';
import { Form, Image, Table, Col, Row, Button } from 'react-bootstrap';
import bets from '../../../images/icons/noun_sale slip_2558704.svg';
import Leg from '../../bets/Leg';
import stringifyOddsAndPoints from '../../../utils/stringifyOddsAndPoints';
import add from '../../../images/icons/noun_add_929469.svg';
import back from '../../../images/icons/noun_back_3542560.svg';
import close from '../../../images/icons/noun_Close_3850069.svg';

import { connect } from 'react-redux';
import formatTime from '../../../utils/formatTime';
const CreatePost = (props) => {
    const [bet, setBet] = useState({});
    const [writeup, setWriteup] = useState('')
    const [view, setView] = useState("writeup")

    //function to create post
    const createPost = () => {
        let timestamp = Date.now();
        let contents = {
            writeup: writeup,
            timestamp: timestamp
        }

        const body = {
            betIDs: [bet.id],
            contents: JSON.stringify(contents),
            accountid: props.userid
        }

        //api parameters to create game
        const url = 'https://api.lineleaders.net/posts/create'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(body)
        }

        //call api
        fetch(url, options)
            .then(response => {
                props.close();
            })
            .catch(err => {
                console.log(err)
            })
    }

    //function to submit post
    const submitPost = () => {
        if (!isEmpty(bet)) {
            createPost();
        }
    }

    if (view === "writeup" && isEmpty(bet)) {
        return (
            <>
                <Form>
                    <Form.Group>
                        <Form.Control as="textarea" rows={10} value={writeup} onChange={(e) => setWriteup(e.target.value)} />
                    </Form.Group>
                </Form>
                <div className="left-align">
                    <Image className="icon-dark" src={bets} width="28" height="auto" onClick={() => setView("bets")} />
                </div>
                <div className="center-text">
                    <Button className="button">Create Post</Button>
                </div>
            </>
        )
    } else if (view === "writeup" && !isEmpty(bet)) {
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
                    <>
                        <Row>
                            <Col xs={10}>
                                <p className="no-margin"><strong>{leg.line.team.name}</strong>{" " + stringifyOddsAndPoints(leg.line.line) + " (" + stringifyOddsAndPoints(bet.odds) + ")"}</p>
                                <p className="no-margin">{leg.fixture.fixture}</p>
                                <p className="no-margin">{formatTime(leg.fixture.time)}</p>
                            </Col>    
                            <Col xs={2} className="right-align">
                                <Image className="icon-dark" src={close} width="18" height="auto" onClick={() => setBet({})} />
                            </Col>
                        </Row>
                        <Form>
                            <Form.Group>
                                <Form.Control as="textarea" rows={10} value={writeup} onChange={(e) => setWriteup(e.target.value)} />
                            </Form.Group>
                        </Form>
                        <div className="left-align">
                            <Image className="icon-dark" src={bets} width="28" height="auto" onClick={() => setView("bets")} />
                        </div>
                        <div className="center-text">
                            <Button className="button">Create Post</Button>
                        </div>
                    </>
                )
            } else if (leg.line.type === "Moneyline") {
                return (
                    <>
                        <Row>
                            <Col xs={10}>
                                <p className="no-margin"><strong>{leg.line.team.name}</strong>{" " + stringifyOddsAndPoints(bet.odds)}</p>
                                <p className="no-margin">{leg.fixture.fixture}</p>
                                <p className="no-margin">{formatTime(leg.fixture.time)}</p>
                            </Col>    
                            <Col xs={2} className="right-align">
                                <Image className="icon-dark" src={close} width="18" height="auto" onClick={() => setBet({})} />
                            </Col>
                        </Row>
                        <Form>
                            <Form.Group>
                                <Form.Control as="textarea" rows={10} value={writeup} onChange={(e) => setWriteup(e.target.value)} />
                            </Form.Group>
                        </Form>
                        <div className="left-align">
                            <Image className="icon-dark" src={bets} width="28" height="auto" onClick={() => setView("bets")} />
                        </div>
                        <div className="center-text">
                            <Button className="button">Create Post</Button>
                        </div>
                    </>
                )
            }
            else if (leg.line.type === "Total") {
                return (
                    <>
                        <Row>
                            <Col xs={10}>
                                <p className="no-margin"><strong>{leg.line.bet + " " + leg.line.line}</strong>{" " + " (" + stringifyOddsAndPoints(bet.odds) + ")"}</p>
                                <p className="no-margin">{leg.fixture.fixture}</p>
                                <p className="no-margin">{formatTime(leg.fixture.time)}</p>
                            </Col>    
                            <Col xs={2} className="right-align">
                                <Image className="icon-dark" src={close} width="18" height="auto" onClick={() => setBet({})} />
                            </Col>
                        </Row>
                        <Form>
                            <Form.Group>
                                <Form.Control as="textarea" rows={10} value={writeup} onChange={(e) => setWriteup(e.target.value)} />
                            </Form.Group>
                        </Form>
                        <div className="left-align">
                            <Image className="icon-dark" src={bets} width="28" height="auto" onClick={() => setView("bets")} />
                        </div>
                        <div className="center-text">
                            <Button className="button">Create Post</Button>
                        </div>
                    </>
                )
            }
        } else {
            return <></>;
        }
    } else if (view === "bets") {
        return (
            <>
                <Form>
                    <Table>
                        <thead>
                            <tr>
                                <th className="hidden-md">Type</th>
                                <th>Line(s)</th>
                                <th>Odds</th>
                                <th>Risk</th>
                                <th>Win</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.openBets.map((bet, i) => {
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

                                    return (
                                        <tr className={"openBet"} key={i}>
                                            <td className="hidden-md">{bet.type}</td>
                                            <Leg leg={leg} />
                                            <td>{stringifyOddsAndPoints(bet.odds)}</td>
                                            <td>{"$" + parseFloat(bet.wager).toFixed(2)}</td>
                                            <td>{"$" + win}</td>
                                            <td>
                                                <Form.Check type="radio" name="bet" onClick={() => setBet(bet)} />
                                            </td>
                                        </tr>
                                    )
                                } else {
                                    return <></>;
                                }
                            })}
                        </tbody>
                    </Table>
                    <Form.Group as={Row} className="cp-footer">
                        <Col xs={{ span: 6}} className="left-align">
                            <Image className="icon-dark" src={back} width="28" height="auto" onClick={() => setView("writeup")} />
                        </Col>
                        <Col xs={{ span: 6}} className="right-align">
                            <Image className="icon-dark" src={add} width="28" height="auto" onClick={() => setView("writeup")} />
                        </Col>
                    </Form.Group>
                </Form>
            </>
        )
    }

}



const mapStateToProps = (state) => {
    return {
        openBets: state.user.openBets,
    }
}


export default connect(mapStateToProps)(CreatePost);