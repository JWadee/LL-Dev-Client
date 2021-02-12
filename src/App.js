import React, {useEffect} from 'react';
import { useAuth0 } from "./react-auth0-spa";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import { connect } from 'react-redux';
import fetchSports from './api/fetchSports';
import fetchLeagues from './api/fetchLeagues';

//CSS
import './css/global/media.css'
import './css/global/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-widgets/dist/css/react-widgets.css';
import './App.css';

//Components
import NavBar from './components/individual/NavBar'; 
import Profile from './components/pages/Profile';
import PrivateRoute from './components/individual/PrivateRoute';
import AdminPage from './components/pages/Admin';
import ContestsPage from './components/pages/ContestsPage';
import Lobby from './components/pages/LobbyPage';
import LiveContest from './components/pages/LiveContest';
import Book from './social/Book/Book';
import {Container, Row} from 'react-bootstrap';

function App(props) {
  const { loading } = useAuth0();

  //run on initial render, pull application data for redux store
  useEffect(()=> { 
    const asyncFunc = async() => {
      let sports = await fetchSports();
      let leagues = await fetchLeagues();;

      props.setSports(sports);
      props.setLeagues(leagues);
    }

    asyncFunc();
  },[])

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Container className="App">
      <Router history={history}>
        <Row>
          <NavBar />
        </Row>
          <Switch>
            <Route exact path="/"/>
            <Route path="/book" component={Book} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/admin" component={AdminPage} /> 
            <PrivateRoute path="/lobby" component={Lobby} />
            <PrivateRoute path="/contests" component={ContestsPage} />
            <PrivateRoute path="/live-contest/:contestid/entry/:entryid" component={LiveContest} /> 
          </Switch>
      </Router>
    </Container>
  );
}


const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return{
    setSports: sports => { dispatch({type: 'SET_SPORTS', sports: sports })},   
    setLeagues: leagues => { dispatch({type: 'SET_LEAGUES', leagues: leagues })},      
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);