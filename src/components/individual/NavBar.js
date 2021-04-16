import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import logo from '../../images/logo.PNG';
import write from '../../images/icons/sm-write.svg';
import search from '../../images/icons/search.svg'
import '../../css/navs.css'
import CPModal from "../../social/forms/createPost/CPModal";
//components 
import AccessControl from './AccessControl';

const NavBar = (props) => {
  const { isAuthenticated, loginWithRedirect, logout, getTokenSilently, user } = useAuth0();
  const [showCreatePost, setShowCreatePost] = useState(false);

  /* Runs on initial mount
  *  Calls fetchPermissions + fetchDetails then updates redux store  
  */
  useEffect(() => {
    if (isAuthenticated) {
      let permissions = [];

      async function fetchPermissions() {
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

      async function fetchDetails() {
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
  }, [])

  //Function to handle cancellation of creating a post
  const handleCancellation = () => {
    setShowCreatePost(false);
  }

  console.log(user)

  return (
    <>
      <Navbar className="main-nav" collapseOnSelect variant="dark" bg="dark" expand="lg" sticky="top">
        <Navbar.Toggle />
        <Navbar.Brand>
          {/* <Image src={logo} rounded width="100%" height="auto" /> */}
          <strong>LineLeaders</strong>
        </Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="mr-auto links">
            {/* Show regardless of login state */}

            {/* Show when logged in */}
            {isAuthenticated && (
              <>
                <LinkContainer to="/book">
                  <Nav.Link>Book</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/lobby">
                  <Nav.Link>Lobby</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/contests">
                  <Nav.Link>My Contests</Nav.Link>
                </LinkContainer>
                <NavDropdown title="My Account">
                  {/* <NavDropdown.Item disabled>Balance: ${props.balance}</NavDropdown.Item> */}
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
          </Nav>
        </Navbar.Collapse>
        {/* Show if not logged in */}
        {!isAuthenticated ? (
          <Nav.Link onClick={() => loginWithRedirect({})}>Log in</Nav.Link>)
          :
          (<Nav className="d-flex flex-row order-2 order-lg-3 icons">
            <Nav.Item className="icon" onClick={() => setShowCreatePost(true)}><Image src={write} width="24" height="auto" /></Nav.Item>
            {/* <Nav.Item className="icon" onClick={() => alert("search")}><Image src={search} width="28" height="auto" /> </Nav.Item> */}
          </Nav>)
        }



      </Navbar>
      <CPModal close={handleCancellation} show={showCreatePost} openBets={props.openBets} userid={props.ID} user={user} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    permissions: state.user.permissions,
    ID: state.user.ID,
    username: state.user.username,
    balance: state.user.balance,
    openBets: state.user.openBets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPermissions: (permissions) => { dispatch({ type: 'SET_PERMISSIONS', permissions: permissions }) },
    setUserID: (ID) => { dispatch({ type: 'SET_USER_ID', ID: ID }) },
    setUsername: (username) => { dispatch({ type: 'SET_USER_USERNAME', username: username }) },
    setBalance: (balance) => { dispatch({ type: 'SET_USER_BALANCE', balance: balance }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);