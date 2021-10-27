import React from 'react';
import Form from 'react-bootstrap/Form';

/*
 * Props:
 * id <required>: The ID of the textbox
 * obj <required>: the JS object where the textbox data should be stored to
 * handler <required>: the function to update the value in state (see: useInputChange)
 * col: The bootstrap col width of the textbox
 * label: the textbox label (not required, but strongly recommended)
 * required: should perform input validation on this textbox
 * type: type of textbox (such as password). defaults to "text"
 * placeholder: default placeholder text
 * help: help text
 * invalid: text to display if textbox is invalid
 */

export default function Text(props) {
  return (
    <Form.Group controlId={props.id} className={"col-12 " + (props.col ? "col-lg-" + props.col : "col-lg-6")}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control required={props.required} type={props.type || "text"} placeholder={props.placeholder} value={props.obj[props.id] || ""} onChange={props.handler} aria-describedby={props.help ? props.id + "-help" : undefined} />
      { props.help ? <Form.Text id={props.id + "-help"} muted>{props.help}</Form.Text> : undefined }
      { props.invalid ? <Form.Control.Feedback type="invalid">{props.invalid}</Form.Control.Feedback> : undefined }
    </Form.Group>
  );
}

// <div className={"form-group " + (props.col ? "col-" + props.col : "col-6")}>
//   <label htmlFor={props.id}>{props.label}</label>
//   <input type={props.type || "text"} className="form-control" id={props.id} placeholder={props.placeholder} value={props.obj[props.id] || ""} onChange={props.handler} />
//   { props.help ? <small id={props.id + "Help"} className="form-text text-muted">{props.help}</small> : undefined }
// </div>
