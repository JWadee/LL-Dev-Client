import React, {useEffect, useState} from 'react'
import {Row, Col} from 'react-bootstrap';

import FixturesTable from './FixturesTable';
import EnterResult from './EnterResult';

const NeedResultsPage = () => {
    const [needResults, setNeedResults] = useState([]);
    const [selectedFixt, setSelectedFixt] = useState({});
    
    //Run on render
    useEffect(()=>{
        const fetch_needsResults = async()=>{
            const response = await fetch('https://api.lineleaders.net/fixtures/needResults');
            const fixts = await response.json();
            setNeedResults(fixts);
        }

        fetch_needsResults()
    },[])

    const removeFixt = (id) => { 
        setSelectedFixt({});
        let index = needResults.findIndex(fixt => fixt.fixture_id === id)
        let tmp = [...needResults];
        tmp.splice(index, 1);
        setNeedResults(tmp);
    }

    return (
        <Row>
            <Col md={8}>
                <FixturesTable fixts={needResults} setSelected={setSelectedFixt}/>
            </Col>
            <Col md={4}> 
                <EnterResult fixt={selectedFixt} removeFixt={removeFixt}/>
            </Col>
        </Row>   
    )

}

export default NeedResultsPage

