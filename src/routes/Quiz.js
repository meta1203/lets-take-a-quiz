import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Graph from "parts/Graph";

var answerData = [];

export default function Quiz(props) {
  // set up state data
  const [quizData, setQuizData] = useState(null);
  const [done, setDone] = useState({is: false, x: 0, y: 0});
  const { id } = useParams();

  // fetch the data from the server when the component is loaded
  useEffect(() => {
    if (id)
      fetch("https://api.meta1203.com/quiz/" + id).then(r => r.json()).then(d => {
        if (d.success) {
          answerData = [];
          for (let i = 0; i < d.data.questions.length; i++) {
            answerData.push([0,0,false]);
          }
          setQuizData(d.data);
        }
        else alert("FAILURE: " + d.message);
      });
  }, [id]);

  // function to call when user clicks submit
  function tabulate() {
    // find the upper & lower bounds to the question values
    const [minX, maxX, minY, maxY] = quizData.questions.reduce((col, q) => {
      let [lx, ux, ly, uy] = [0, 0, 0, 0];
      for (const o of q.options) {
        if (o.xValue < lx) lx = o.xValue;
        if (o.xValue > ux) ux = o.xValue;
        if (o.yValue < ly) ly = o.yValue;
        if (o.yValue > uy) uy = o.yValue;
      }
      return [col[0] + lx, col[1] + ux, col[2] + ly, col[3] + uy];
    }, [0,0,0,0]);
    // console.log([minX, maxX, minY, maxY]);

    // scale the graph according to the max & min values
    const xScale = 200 / (maxX - minX);
    const yScale = 200 / (maxY - minY);
    let x = 0;
    // total all the answer values
    let y = 0;
    for (const a of answerData) {
      x = x + a[0];
      y = y + a[1];
    }
    console.log(`X: ${x}, Y: ${y}`);
    // normalize x & y values to the graph
    x = (x - minX) * xScale - 100;
    y = (y - minY) * yScale - 100;
    // console.log(`Final X: ${x}, Final Y: ${y}, X Scale: ${xScale}, Y Scale: ${yScale}`);
    setDone({is: true, x, y});
  }

  // show an error message if there's no id
  if (!id) return (<h2>Oops, looks like you're in the wrong spot. Why not try again?</h2>);
  // show loading screen if we're not done loading yet
  if (!quizData) return (<h2>Loading, please wait...</h2>);
  // render the graph if already tabluated
  if (done.is) {
    const width = Math.round(document.getElementById("root-container").clientWidth * 0.9);
    const height = Math.round(document.getElementById("root-container").clientHeight * 0.9);
    const size = width > height ? height : width;
    return (
      <Row>
        <Col>
	  <Graph leftTitle={quizData.leftTitle}
                 rightTitle={quizData.rightTitle}
                 bottomTitle={quizData.bottomTitle}
		 topTitle={quizData.topTitle}
		 x={done.x} y={done.y}
                 width={size}
                 height={size} />
          {/*<Button onClick={e => {setDone({is: false});}}>Reset</Button>*/}
        </Col>
      </Row>
    );
  }
  // render the quiz if not already tabluated
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
        console.log(qPos);
        return (
          <Row key={q.id} className="pb-3">
            <Form>
              <b>{q.question}</b>
              <hr />
              {q.options.map(o =>
                <Form.Check key={q.id + "-" + o.id}
                            type="radio"
                            id={q.id + "-" + o.id}
                            label={o.text}
                            name={q.id}
                            onClick={e =>{ 
                              answerData[qPos] = [o.xValue, o.yValue, true];
                            }}
                />
              )}
            </Form>
          </Row>
        );
      })}
      <hr/>
      <Button variant="success" onClick={tabulate}>Submit</Button>
    </>
  );
}
