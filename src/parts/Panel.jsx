import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

function Panel(props) {
  return (
    <Card className={"m-1 m-lg-3 p-0 col-md-" + (props.col || "11")}>
      {props.title ? (<div className="card-header"><h4>{props.title}</h4></div>) : null}
      <ListGroup variant="flush">
        <ListGroup.Item className="m-0 p-1 p-lg-3">
          <Row className={props.className}>
            {props.children}
          </Row>
        </ListGroup.Item>
        {props.cancel || props.submit ? (
          <ListGroup.Item className="d-flex justify-content-between">
            {props.cancel ? (
              <div><button onClick={props.cancel} className="btn btn-secondary ml-auto p-2">{props.cancelLabel || "Cancel"}</button></div>
            ) : null}
            {props.submit ? (
              <div><button onClick={props.submit} className="btn btn-primary mr-auto p-2">{props.submitLabel || "Submit"}</button></div>
            ) : null}
          </ListGroup.Item>
        ) : null}
      </ListGroup>
    </Card>
  );
}

export default Panel;
