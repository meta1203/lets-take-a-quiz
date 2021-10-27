import React from 'react';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// custom components
import Header from "Header";
import Create from "routes/Create";

export default function App() {
  return (
    <Router>
      <div>
	<Header />
	<Container fluid="lg" className="pt-3" id="root-container">
	  <Switch>
	    <Route path="/quizzes">
	      <h1>Quizzes</h1>
	    </Route>
	    <Route path="/create">
	      <Create />
	    </Route>
	    <Route path="/">
	      <h1>Home</h1>
	      <br />
	      <Link to="/quizzes">Go to quizzes</Link>
	    </Route>
	  </Switch>
	</Container>
      </div>
    </Router>
  );
} 
