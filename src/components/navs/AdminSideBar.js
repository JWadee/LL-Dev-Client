
import React from 'react'
import { slide as Menu } from 'react-burger-menu';
import {Nav} from 'react-bootstrap';
//css
import '../../css/burger-menu.css';

const AdminSideNav = () => {
    return (
        <Menu>
            <h4>Trace Therapy</h4>
            <Nav>
                <Nav.Link id="home" className="menu-item" href="/">Dashboard</Nav.Link>
                <Nav.Link id="home" className="menu-item" href="/">Help</Nav.Link>
            </Nav>
        </Menu>
    )

}

export default AdminSideNav