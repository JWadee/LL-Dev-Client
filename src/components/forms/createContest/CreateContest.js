import React, { useState, useEffect } from 'react'
import {Form, Row, Col, Button, Card} from 'react-bootstrap';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Multiselect from 'react-widgets/lib/Multiselect';
import NumberPicker from 'react-widgets/lib/NumberPicker';
//components 
import LeagueSelect from './LeagueSelect';
import simpleNumberLocalizer from 'react-widgets-simple-number';


import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';



const CreateContest = (props) => {
    const moment = require('moment');

    const [dispLeagues,setDispLeagues] = useState(false);    
    const [dispSports,setDispSports] = useState(false);
    const [types,setTypes] = useState([]);
    const [name,setName] = useState(String);
    const [typeID,setTypeID] = useState(Number);
    const [start,setStart] = useState();
    const [end,setEnd] = useState();
    const [disabled,setDisabled] = useState(true);
    const [sports, setSports] = useState([])
    const [sportIDs, setSportIDs] = useState([])
    const [leagueIDs, setLeagueIDs] = useState([1, 2])
    const [leaguesLabel, setLeaguesLabel] = useState('Click to Select');
    const [entry, setEntry] = useState(Number);
    const [prizepool, setPrizepool] = useState(Number);
    const [bankroll, setBankroll] = useState(Number);
    const [submitted, setSubmitted] = useState(false);
    const [submittedStatus, setSubmittedStatus] = useState();
    const [minPlayers, setMinPlayers] = useState();
    const [maxPlayers, setMaxPlayers] = useState();
    
    //Localization for datetime picker
    Moment.locale('en');
    momentLocalizer();
    simpleNumberLocalizer();
    //Run on initial render, fetch contest types
    useEffect(()=>{
        const fetchContestTypes = async() =>{
            const response = await fetch('https://lineleaders.net/dev-server/contests/types');
            const data = await response.json();
            setTypes(data);
        }

        const fetchSports = async () => {
            const response = await fetch('https://lineleaders.net/dev-server/sports/');
            const data = await response.json();
            setSports(data)
        }

        fetchSports();
        fetchContestTypes();
    },[])


    //Function to add selected sports to sports variable
    const addSports = (sports) => {
        setSports(sports);
    }

    //Function to add selected leagues to leagues variable
    const addLeagues = () => {
    }

    //Function to change date to UTC for storage
    const getUTCTime = (date) => {
        let newDate = moment.parseZone(date).utc().format();
        let zIndex = newDate.indexOf('Z');
        newDate = newDate.substring(0, zIndex);
        return(newDate);
    }

    //Function to create contest record in database
    const submit = (e) => {
        //set submitted to true 
        setSubmitted(true)

        let UTCstart = getUTCTime(start);
        let UTCend = getUTCTime(end);

        //Create contest record in database
        const createContest = async () => {
            const body = {
                name: name,
                typeID: typeID,
                entry: entry,
                prizepool: prizepool,
                bankroll: bankroll, 
                start: UTCstart, 
                end: UTCend,
                minPlayers: minPlayers,
                maxPlayers: maxPlayers,
                leagueIDs: leagueIDs
            }

            //api parameters to create game
            const url ='https://lineleaders.net/dev-server/contests/create'
            const options = {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json;charset=UTF-8'
                }, 
                body: JSON.stringify(body)
            }

            //call api
            fetch(url, options)
                .then(response=> {
                    setSubmittedStatus(<p>Contest Created Successfully</p>)
                })
                .catch(err=>{
                    setSubmittedStatus(<p>Something went wrong on our end, please try again</p>)
                    console.log(err)
                })
        }
        createContest();
    }

    const addSportID = (id) => {
        let temp = sportIDs;
        temp.push(id)
    }

    return (
        <Card>
            <Card.Header>CREATE NEW CONTEST</Card.Header>
            <Card.Body>
                {/* If form is submitted, show successful or failed submission. If not submitted, show form. */}
                {submitted ? submittedStatus : 
                <Form>
                     <Form.Row>                    
                        <Form.Label column >Name</Form.Label>
                        <Col>
                            <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                        </Col>
                    </Form.Row>
                    <Form.Row>                    
                        <Form.Label column >Type</Form.Label>
                        <Col>
                            <Form.Control as="select" onChange={(e)=>setTypeID(e.target.value)}>
                                <option>Select type</option>
                                {types.map(type=>{
                                    return (
                                        <option key={type.intContestTypeID} value={type.intContestTypeID}>{type.strContestType}</option>
                                    )
                                })}
                            </Form.Control>
                        </Col>
                    </Form.Row>
                    <Form.Row>                    
                        <Form.Label column >Start</Form.Label>
                        <Col >
                            <DateTimePicker
                                onChange={(dt)=>setStart(dt)}
                                value={start}
                                time={true}
                                disableCalendar={true}
                                culture='en'
                                step={15}
                            />                    
                        </Col>
                    </Form.Row>
                    <Form.Row>                    
                        <Form.Label column  >End</Form.Label>
                        <Col >
                            <DateTimePicker
                                onChange={(dt)=>setEnd(dt)}
                                value={end}
                                time={true}
                                disableCalendar={true}
                                culture='en'
                                step={15}
                            />        
                        </Col>  
                    </Form.Row>
                    <Form.Row>                    
                        <Form.Label column >Sports</Form.Label>
                        <Col >
                            <Multiselect
                                data={sports}
                                textField={'strSportName'}
                                valueField={'intSportID'}
                                value={sportIDs}
                                onChange={value => setSportIDs(value)}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row>                    
                        <Form.Label column>Entry Fee ($)</Form.Label>
                        <Col >
                            <NumberPicker
                                value={entry}
                                onChange={value => setEntry(value )}
                                format='-$#,###.00'
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row>                    
                        <Form.Label column>Initial Bankroll ($)</Form.Label>
                        <Col >
                            <NumberPicker 
                                value={bankroll}
                                onChange={value => setBankroll(value)}
                                format='-$#,###.00'
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row>                    
                        <Form.Label column>Prize Pool ($)</Form.Label>
                        <Col >
                            <NumberPicker 
                                value={prizepool}
                                onChange={value => setPrizepool(value)}
                                format='-$#,###.00'
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row>                    
                        <Form.Label column>Min Players</Form.Label>
                        <Col >
                            <NumberPicker 
                                value={minPlayers}
                                onChange={value => setMinPlayers(value)}
                                step={1}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Row>                    
                        <Form.Label column>Max Players</Form.Label>
                        <Col >
                            <NumberPicker 
                                value={maxPlayers}
                                onChange={value => setMaxPlayers(value)}
                                step={1}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Group as={Row}> 
                        <Col>                   
                            <Button onClick={()=>props.close()}>Cancel</Button>
                        </Col>
                        <Col>                   
                            <Button type="submit" onClick={(e)=>submit(e)}>Create Contest</Button>
                        </Col>
                    </Form.Group>
                </Form>
                }
                <LeagueSelect addLeagues={addLeagues} show={dispLeagues} setDisp={setDispLeagues} />
            </Card.Body>
        </Card>
    )

}

export default CreateContest;