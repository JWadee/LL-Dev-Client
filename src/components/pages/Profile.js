import React, {useState, useEffect} from "react";
import { useAuth0 } from "../../react-auth0-spa";
import {Col, Form, Tabs, Tab} from 'react-bootstrap';
import { connect } from 'react-redux';
import OpenBets from '../../social/bets/OpenBets';
import SettledBets from '../../social/bets/SettledBets';

const Profile = (props) => {
  const { loading, user } = useAuth0();
  const [showCreateBet, setShowCreateBet] = useState(false);

  const [display, setDisplay] = useState(false);
  const [activeTab, setActiveTab] = useState('book');

  //Function to run when user_id is set and fetch bets
  useEffect(()=>{  
    const fetchBets = async ()=> {
      const response = await fetch('https://api.lineleaders.net/bets/personal?id='+props.user_id);
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

    fetchBets();
  },[props.user_id])

  return (
    <>
      <Form className="hidden-lg">
        <Form.Row>                    
          <Col>
              <Form.Control as="select" onChange={(e)=>setActiveTab(e.target.value)}>
                <option key="posts" value="posts">Posts</option>
                <option key="open" value="open">{"Open ("+props.openBets.length+")"}</option>
                <option key="settled" value="settled">Settled</option>
              </Form.Control>
          </Col>
        </Form.Row>
      </Form>
      {/* Display when screens are large */}
      <Tabs fill activeKey={activeTab} onSelect={(k)=>setActiveTab(k)} id="contestsTab" className="hidden-md">
          <Tab eventKey="posts" title="Posts">
             
          </Tab>
          <Tab eventKey="open" title={"Open ("+props.openBets.length+")"}>
              <OpenBets />
          </Tab>
          <Tab eventKey="settled" title="Settled">
              <SettledBets />
          </Tab>
      </Tabs>   
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user_id: state.user.ID,
    openBets: state.user.openBets,
    settledBets: state.user.settledBets
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return{
    setOpenBets: bets => { dispatch({type: 'SET_OPEN_BETS', bets: bets })},      
    setSettledBets: bets => { dispatch({type: 'SET_SETTLED_BETS', bets: bets })},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);