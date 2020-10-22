import React from 'react';
import './App.css';
import { useAuth0 } from "./react-auth0-spa";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-widgets/dist/css/react-widgets.css';
import {Container} from 'react-bootstrap';
import './css/global/media.css'
import './css/global/global.css'

//Components
import NavBar from './components/individual/NavBar'; 
import Profile from './components/pages/Profile';
import PrivateRoute from './components/individual/PrivateRoute';
import AdminPage from './components/pages/Admin';
import ContestsPage from './components/pages/ContestsPage';
import Lobby from './components/pages/LobbyPage';
import LiveContest from './components/pages/LiveContest';

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Router history={history}>
            <NavBar />
            <Container id="main-container">
              <Switch>
                <Route exact path="/"/>
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/lobby" component={Lobby} />
                <PrivateRoute path="/contests" component={ContestsPage} />
                <PrivateRoute path="/admin" component={AdminPage} /> 
                <PrivateRoute path="/live-contest/:contestid/entry/:entryid" component={LiveContest} /> 
              </Switch>
            </Container>
      </Router>
    </div>
  );
}

export default App;
