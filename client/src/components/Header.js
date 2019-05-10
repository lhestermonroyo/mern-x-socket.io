import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand href="#home"><i className="fa fa-list fa-fw"></i> Realtime Todo</Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Link to="/"  style={{textDecoration: 'none'}}>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link to="/about" style={{textDecoration: 'none'}}>
              <Nav.Link>About</Nav.Link>
            </Link>
            <Link to="/contact" style={{textDecoration: 'none'}}>
              <Nav.Link>Contact</Nav.Link>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    )
  }
}

export default Header;