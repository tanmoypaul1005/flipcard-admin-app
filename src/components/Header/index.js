import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from '../../actions/authActions';
export default function Header() {
const auth=useSelector(state => state.auth);
const dispatch=useDispatch();
const logout=()=>{
    dispatch(signOut());
}
const renderLoggedInLinks=() => {
    return(
        <Nav>
       
        <li className="nev-item">
        <span className="nav-link" onClick={logout} >SignOut</span>  
        </li>
    </Nav> 
    );
}    
const renderNonLoggedInLinks=() => {
    return(
        <Nav>
        {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
        <li className="nev-item">
        <NavLink className="nav-link" to="/signin">SignIn</NavLink>  
        </li>
        <li className="nev-item">
        <NavLink className="nav-link" to="/signup">Signup</NavLink>
        </li>

    </Nav> 
    );
}  
    return (
        <div>
            <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{zIndex:1}}>
                <Container fluid> 
                    {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                    <Link to="/" className="navbar-brand">Admin Dashboard</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="#features">Features</Nav.Link>
                                <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                                                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown> */}
                        </Nav>
                        {auth.authenticate?renderLoggedInLinks():renderNonLoggedInLinks()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
