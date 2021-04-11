import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { Row, Col, Form, Tabs, Tab, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import OpenBets from '../../social/bets/OpenBets';
import SettledBets from '../../social/bets/SettledBets';
import MyPosts from '../../social/MyPosts';
import CPModal from "../../social/forms/createPost/CPModal";
import '../../css/global/profile.css';

const Profile = (props) => {
  const { user } = useAuth0();
  const [record, setRecord] = useState(String);
  const [PL, setPL] = useState();
  const [activeTab, setActiveTab] = useState('posts');
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    const calcRecordAndPL = () => {
      let profitloss = 0;
      let w = 0;
      let l = 0;
      let p = 0;

      let rec = "";

      props.settledBets.forEach(bet => {
        //get result and update counter
        if (bet.result === "W") {
          w = w + 1;
          //if bet won add amount to PL
          let win = 0;
          if (bet.odds > 0) {
            let dec = bet.odds / 100;
            win = parseFloat(bet.wager * dec).toFixed(2);
          } else {
            let dec = Math.abs(bet.odds) / 100;
            win = parseFloat(bet.wager / dec).toFixed(2);
          }
          profitloss = parseFloat(profitloss) + parseFloat(win);
        } else if (bet.result === "L") {
          l = l + 1;
          //if bet lost subtract wager from PL
          profitloss = parseFloat(profitloss) - parseFloat(bet.wager);
        } else p = p + 1;
      });

      if (p > 0) {
        rec = w + "-" + l + "-" + p;
      } else rec = w + "-" + l;

      setRecord(rec);
      setPL(profitloss);
    }

    calcRecordAndPL();
  }, [props])

  //Function to run when user_id is set and fetch bets
  useEffect(() => {
    const fetchBets = async () => {
      const response = await fetch('https://api.lineleaders.net/bets/personal?id=' + props.user_id);
      const bets = await response.json();
      //separate into open and settled and set redux state
      let open = [];
      let settled = [];

      bets.forEach(bet => {
        if (bet.result === "W" || bet.result === "L" || bet.Result === "P") {
          settled.push(bet);
        } else {
          open.push(bet);
        }
      })
      props.setOpenBets(open);
      props.setSettledBets(settled);
    }

    const fetchPosts = async () => {
      const response = await fetch('https://api.lineleaders.net/posts/byAccount?ID=' + props.user_id);
      const posts = await response.json();
      props.setPosts(posts);
    }
    fetchBets();
    fetchPosts();
  }, [props.user_id])

  //Function to handle cancellation of creating a post
  const handleCancellation = () => {
    setShowCreatePost(false);
  }

  return (
    <>
      <Row className="profile-header">
        <Col sm={12}>
          <img className="profile" src={user.picture} alt="Profile" /> 
          <span className="prof-links">5 Posts</span>
          <span className="prof-links">1 Followers</span>
          <span className="prof-links">1 Following</span>
          <p><strong className="username">{user.email}</strong></p>
        </Col>
        <Col sm={10}>
            <Button size="sm" variant="outline-primary" disabled>Edit Profile</Button>
            <span className="prof-stats">{"Record: " + record}</span>
            <span className="prof-stats">{"P/L: $" + PL}</span>
        </Col>
      </Row>
      <Form className="hidden-lg">
        <Form.Row>
          <Col>
            <Form.Control as="select" onChange={(e) => setActiveTab(e.target.value)}>
              <option key="posts" value="posts">Posts</option>
              <option key="open" value="open">{"Open (" + props.openBets.length + ")"}</option>
              <option key="settled" value="settled">Settled</option>
            </Form.Control>
          </Col>
        </Form.Row>
      </Form>
      {/* Display when screens are large */}
      <Tabs fill activeKey={activeTab} onSelect={(k) => setActiveTab(k)} id="contestsTab" className="hidden-md">
        <Tab eventKey="posts" title="Posts">
          <MyPosts posts={props.posts} user={user} />
        </Tab>
        <Tab eventKey="open" title={"Open (" + props.openBets.length + ")"}>
          <OpenBets />
        </Tab>
        <Tab eventKey="settled" title="Settled">
          <SettledBets />
        </Tab>
      </Tabs>
      <CPModal close={handleCancellation} show={showCreatePost} openBets={props.openBets} userid={props.user_id} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user_id: state.user.ID,
    openBets: state.user.openBets,
    settledBets: state.user.settledBets,
    posts: state.user.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOpenBets: bets => { dispatch({ type: 'SET_OPEN_BETS', bets: bets }) },
    setSettledBets: bets => { dispatch({ type: 'SET_SETTLED_BETS', bets: bets }) },
    setPosts: posts => { dispatch({ type: 'SET_POSTS', posts: posts }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);