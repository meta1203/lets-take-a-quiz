import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function CustomModal(props) {

  /*
    Props:
    visible*: whether the modal is visible or not
    onClose: run necessary code when closing the modal
    onOpen: run necessary code when opening the modal
    
    title*: the shown title of the modal. human-readable
    children*: the contents of the modal.
    size: width of the modal (sm, lg, xl)
    submit: function to run for the optional submit button
  */

  const {visible, onClose, onOpen, size, title, children, submit, ...leftovers} = props;

  return (
    <Modal show={props.visible} onHide={props.onClose} onShow={props.onOpen} size={props.size || "sm"} enforceFocus={props.enforceFocus} centered {...leftovers}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.visible ? props.children : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>Close</Button>
        {props.submit ? <Button variant="primary" className="ml-auto waves-effect waves-themed" onClick={e => {props.submit(e); e.preventDefault();}}>Submit</Button> : null}
      </Modal.Footer>
    </Modal>
  );
}

// footer settings: className="modal-footer border-faded border-left-0 border-right-0 border-bottom-0" style={{'justifyContent': 'flex-end', 'flexDirection': 'row', 'display': 'flex'}}
// ?: if (props.onClose) props.onClose();
