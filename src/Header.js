import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';

export default function Header(props) {
  const loc = useLocation();
  return (
    <Nav variant="tabs">
      <Nav.Item>
        <Nav.Link href="/" to="/" active={loc.pathname === "/"} as={Link}>Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/create" to="/create" active={loc.pathname === "/create"} as={Link}>Create a quiz</Nav.Link>
      </Nav.Item>
      {loc.pathname.includes("/quiz") ?
      <Nav.Item>
        <Nav.Link href="/quizzes" to="/" active as={Link}>Quizzes</Nav.Link>
     </Nav.Item>
     : undefined}
    </Nav>
  );
}
