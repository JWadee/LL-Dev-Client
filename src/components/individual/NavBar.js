import React, {useEffect} from "react";
import { useAuth0 } from "../../react-auth0-spa";
import {Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import logo from '../../images/logo.PNG';

//components 
import AccessControl from './AccessControl';

const NavBar = (props) => {
  const { isAuthenticated, loginWithRedirect, logout, getTokenSilently } = useAuth0();

  /* Runs on initial mount
  *  Calls fetchPermissions + fetchDetails then updates redux store  
  */
  useEffect( () => {
      if(isAuthenticated){
      let permissions =[];

      async function fetchPermissions(){
          try {
          const token = await getTokenSilently();
          const response = await fetch("https://api.lineleaders.net/accounts/permissions", {
          headers: {
              Authorization: `Bearer ${token}`
          }
          });
          
          permissions = await response.json();
          props.setPermissions(permissions);
          } catch (error) {
          console.error(error);
          }
      }

      async function fetchDetails(){
          try {
            const token = await getTokenSilently();
            const response = await fetch("https://api.lineleaders.net/accounts/details", {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
          
            let data = await response.json();
            props.setUserID(data.intAccountID);
          } catch (error) {
            console.error(error);
          }
      }
      fetchPermissions();
      fetchDetails();
      }
  },[])
  
  return (
    <Navbar className="main-nav" expand="md" sticky="top">
      <Navbar.Brand>
        <Image  src={logo} rounded width="100%" height="auto"/>
      </Navbar.Brand> 
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          {/* Show regardless of login state */}

          {/* Show when logged in */}
          {isAuthenticated && (
            <>
              <LinkContainer to="/book">
                <Nav.Link>Book</Nav.Link>
              </LinkContainer>
              <NavDropdown title="My Account">
                <NavDropdown.Item disabled>Balance: ${props.balance}</NavDropdown.Item>
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <AccessControl permissions={props.permissions} allowedPermissions={["create:contest"]} protectedResource={
                  <LinkContainer to="/admin">
                    <NavDropdown.Item>Admin</NavDropdown.Item>
                  </LinkContainer>
                } />
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout()}>Log out</NavDropdown.Item>
              </NavDropdown>
            </>
          )}
  
          {/* Show if not logged in */}
          {!isAuthenticated && (
            <Nav.Link onClick={() => loginWithRedirect({})}>Log in</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
    return {
      permissions: state.user.permissions,
      ID: state.user.ID,
      username: state.user.username,
      balance: state.user.balance
    }
  }
  
  const mapDispatchToProps = ( dispatch ) => {
    return{
      setPermissions: (permissions) => { dispatch({type: 'SET_PERMISSIONS', permissions: permissions}) },
      setUserID: (ID) => { dispatch({type: 'SET_USER_ID', ID: ID})},
      setUsername: (username) => { dispatch({type: 'SET_USER_USERNAME', username: username})},
      setBalance: (balance) => { dispatch({type: 'SET_USER_BALANCE', balance: balance})}
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NavBar);