import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Graph from "parts/Graph";

export default function Quiz(props) {
  const [quizData, setQuizData] = useState(null);
  const [answerData, setAnswerData] = useState([]);
  const [done, setDone] = useState(false);
  const { id } = useParams();
  
  useEffect(() => {
    if (id)
      fetch("https://api.meta1203.com/quiz/" + id).then(r => r.json()).then(d => {
        if (d.success) {
          let ad = [];
          for (let i = 0; i < d.data.questions.length; i++) {
            answerData.push([0,0,false]);
          }
          setAnswerData(ad);
          setQuizData(d.data);
        }
        else alert("FAILURE: " + d.message);
      });
  }, [id]);
  
  if (!id) return (<h2>Oops, looks like you're in the wrong spot. Why not try again?</h2>);
  if (!quizData) return (<h2>Loading, please wait...</h2>);
  if (done) {
    const size = Math.round(document.getElementById("root-container").clientWidth * 0.90);
    return (
      <Row>
        <Col>
	  <Graph leftTitle={quizData.leftTitle}
                 rightTitle={quizData.rightTitle}
                 bottomTitle={quizData.bottomTitle}
		 topTitle={quizData.topTitle}
		 x={25} y={40}
                 width={size}
                 height={size} />
        </Col>
      </Row>
    );
  }
  return (
    <>
      <Row>
	<Col> 
	  <h2>Let's Take A Quiz!</h2>
	</Col>
      </Row>
      <hr />
      {quizData.questions.map(q => {
        const qPos = quizData.questions.indexOf(q);
        return (
          <Row key={q.id}>
            <Form>
              <b>{q.question}</b>
              <hr />
              {q.options.map(o =>
                <Form.Check key={q.id + "-" + o.id}
                            type="radio"
                            id={q.id + "-" + o.id}
                            label={o.text}
                            name={q.id}
                            onClick={e => {
                              let ad = [...answerData];
                              ad[qPos] = [o.xValue, o.yValue, true];
                              setAnswerData(ad);
                            }}
                />
              )}
            </Form>
          </Row>
        );
      })}
    </>
  );
}
