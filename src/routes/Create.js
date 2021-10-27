import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Text from "parts/Text";
import Graph from "parts/Graph";

export default function Create(props) {
  return (
    <>
      <Row>
	<Col> 
	  <h2>Let's create a quiz!</h2>
	</Col>
      </Row>
      <Row>
	<Col> 
	  <Graph leftTitle="I dunno" rightTitle="Dumb shit"
                 bottomTitle="That's pretty fun."
		 topTitle="This is the story of a girl"
		 x={25} y={40}
                 width={600} height={600} />
	</Col>
      </Row>
    </>
  );
}
