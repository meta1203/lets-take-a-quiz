import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';

export default function LoadingButton(props) {
  const [loading, setLoading] = useState(false);

  const disabled = props.disabled || loading ? true : undefined;
  const style = {
    width: (props.width || (props.children.length + 'em')),
    ...props.style
  };
  
  return (
    <Button variant={props.type || "primary"} className={props.className} style={style} onClick={ loading ? e => {e.preventDefault();} : event => {
      props.onClick(event).then(() => {setLoading(false);});
      setLoading(true);
    }} disabled={disabled}>
      {loading ? (<img src="/img/tail-spin.svg" alt="Loading..." style={{height: '1.25em'}} />) : props.children}
    </Button>
  );
}
