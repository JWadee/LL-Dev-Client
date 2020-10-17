import React from 'react'
import {Col, Form, Table} from 'react-bootstrap';

const TotalBet = (props) => {
    const bet = props.bet;
    //index of bet in array
    const i = props.i;

    //Function to toggle bet details 
    const toggleDetails = (i) => {
        let detailRows = document.getElementsByClassName("betDetails"+i);
        let arrow = document.getElementById("arrow"+i);

        for(let i =0; i < detailRows.length; i++){
            if(detailRows[i].style.display ==='none'){
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
        <Table className="bet">
            <tbody>
                <tr>
                    <td onClick={()=>toggleDetails(i)}><i className="arrow right" id={"arrow"+i} ></i> {bet.bet}</td>
                    <td>{bet.odds} <i onClick={()=>props.removeBet(bet.id)}>&times;</i></td>
                </tr>
                <tr>
                    <td colSpan={2}>{bet.type}</td>
                </tr>
                <tr style={{display:'none'}} className={"betDetails"+i}>
                    <td  colSpan={2}>{bet.fixture}</td>
                </tr>
                <tr style={{display:'none'}} className={"betDetails"+i}>
                    <td colSpan={2}>{bet.time}</td>
                </tr>
                <tr>
                    <td colSpan={2}>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Control type="text" placeholder="Risk" />
                            </Form.Group> 
                            <Form.Group as={Col}>
                                <Form.Control type="text" placeholder="Win" readOnly/>
                            </Form.Group> 
                        </Form.Row>
                    </Form>
                    </td>   
                </tr>
            </tbody>
        </Table>    
    )

}

export default TotalBet