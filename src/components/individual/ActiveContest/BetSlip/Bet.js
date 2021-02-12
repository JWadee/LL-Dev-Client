import React, {useState, useEffect} from 'react';
import {Col, Form, Table} from 'react-bootstrap';
import formatTime from '../../../../utils/formatTime';
import stringifyOddsAndPoints from '../../../../utils/stringifyOddsAndPoints';

const Bet = (props) => {
    const [risk, setRisk] = useState("");
    const [win, setWin] = useState("");
    const [showEditBet, setShowEditBet] = useState(false);

    const bet = props.bet;
    //index of bet in array
    const i = props.i;

    //Run whenever risk is set, set win variable and setWager on bet in array 
    useEffect(()=>{
        if(risk !== ""){
            let odds = parseFloat(bet.odds);
            let tmpRisk = parseFloat(risk);
            let tmpWin;
            if(odds > 0){
                tmpWin = parseFloat(tmpRisk*parseFloat(odds)/100).toFixed(2);
            }else{
                odds = Math.abs(odds);
                let denom = odds/100;
                tmpWin = parseFloat(tmpRisk/ denom).toFixed(2);
            }
            setWin(tmpWin);
        }else{
            setWin("")
        }

        props.addWager(bet.id, risk)

    },[risk])

    //Function to toggle bet details 
    const toggleDetails = (i) => {
        let detailRows = document.getElementsByClassName("betDetails"+i);
        let arrow = document.getElementById("arrow"+i);

        for(let i =0; i < detailRows.length; i++){
            if(detailRows[i].style.display === 'none'){
                detailRows[i].style.display = '';
                arrow.classList.remove("right");
                arrow.classList.add("down");
            }else{
                detailRows[i].style.display = 'none';
                arrow.classList.remove("down");
                arrow.classList.add("right");
            }
        }
    }

    return (
        <>
            <Table className="bet">
                <tbody>
                    <tr>
                        {(bet.type === "Spread") ? 
                            <td onClick={()=>toggleDetails(i)}>
                                <i className="arrow down" id={"arrow"+i} ></i> {bet.bet+" "+stringifyOddsAndPoints(bet.handicap) + " ("+stringifyOddsAndPoints(bet.odds)+")"}
                            </td>
                        : 
                        (bet.type === "Total") ?
                            <td onClick={()=>toggleDetails(i)}>
                                <i className="arrow down" id={"arrow"+i} ></i> {bet.bet+" "+bet.total + " ("+stringifyOddsAndPoints(bet.odds)+")"}
                            </td>
                        :
                            <td onClick={()=>toggleDetails(i)}>
                                <i className="arrow down" id={"arrow"+i} ></i> {bet.bet + " ("+stringifyOddsAndPoints(bet.odds)+")"}
                            </td>
                        }
                        <td className="odds">{bet.odds.american} <i onClick={()=>props.removeBets([bet.id])}>&times;</i></td> 
                    </tr>
                    <tr>
                        <td colSpan={2}>{bet.type}</td>
                    </tr>
                    <tr className={"betDetails"+i}>
                        <td  colSpan={2}>{bet.fixture}</td>
                    </tr>
                    <tr className={"betDetails"+i}>
                        <td colSpan={2}>{formatTime(bet.time)}</td>
                    </tr>
                    {props.slipType === "Straight" ? 
                        <tr>
                            <td colSpan={2}>
                                <Form>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Control type="number" placeholder="Risk" value={risk} onChange={(e)=>setRisk(e.target.value)}/>
                                        </Form.Group> 
                                        <Form.Group as={Col}>
                                            <Form.Control type="text"  tabIndex="-1" placeholder="Win" value={win} readOnly/>
                                        </Form.Group> 
                                    </Form.Row>
                                </Form>
                            </td>   
                        </tr>
                        :
                        <></>
                    }    
                </tbody>
            </Table>  
        </>  
    )
}

export default Bet