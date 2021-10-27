import React, {
  useState,
  useEffect,
} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Text from "parts/Text";
import Graph from "parts/Graph";
import Card from "parts/Panel";
import useInputChange from "hooks/useInputChange";

var ids = 0;

export default function Create(props) {
  let [body, setBody] = useInputChange({});
  let [gWidth, setGWidth] = useState(0);
  let [questions, setQuestions] = useState([]);
  useEffect(() => {
    setGWidth(Math.round(document.getElementById("graph-container").clientWidth * 0.9667));
    if (questions.length === 0) addQuestion();
  }, [gWidth, questions]);

  function addQuestion() {
    questions.push({
      question: "Add your question here.",
      options: [
        {text: "Option 1", xValue: 0, yValue: 0, id: 0},
        {text: "Option 2", xValue: 0, yValue: 0, id: 1},
        {text: "Option 3", xValue: 0, yValue: 0, id: 2},
        {text: "Option 4", xValue: 0, yValue: 0, id: 3},
      ],
      id: ++ids,
    });
    setQuestions([...questions]);
  }
  
  return (
    <>
      <Row>
	<Col> 
	  <h2>Let's create a quiz!</h2>
	</Col>
      </Row>
      <hr />
      <Row className="pb-3">
        <Col>
          <b>Let's set up the axes:</b>
        </Col>
      </Row>
      <Row>
        <Col xs="12" lg="6">
          <Form>
            <Text obj={body} handler={setBody} id="topTitle"  label="Top Label" />
            <Text obj={body} handler={setBody} id="bottomTitle"  label="Bottom Label" />
            <Text obj={body} handler={setBody} id="leftTitle"  label="Left Label" />
            <Text obj={body} handler={setBody} id="rightTitle"  label="Right Label" />
          </Form>
        </Col>
	<Col xs="12" lg="6" className="justify-content-center" id="graph-container"> 
	  <Graph leftTitle={body.leftTitle || ""} rightTitle={body.rightTitle || ""}
                 bottomTitle={body.bottomTitle || ""}
		 topTitle={body.topTitle || ""}
		 x={25} y={40}
                 width={gWidth}
                 height={gWidth} />
	</Col>
      </Row>
      <Row className="pt-3">
        <Col><b>Let's set up some questions:</b></Col>
      </Row>
      <Row>
        <Col>
          <Card submit={addQuestion} submitLabel="Add question...">
            <Container>
              {questions.map(q =>
                <React.Fragment key={`question-${q.id}`}>
                  <Row className="pb-2">
                    <Col>
                      <Form>
                        <Form.Group controlId={q.id} className="col-12">
                          <Form.Label className="d-flex justify-content-between" style={{width: "100%"}}>
                            <b>Question:</b>
                            <Button variant="danger" disabled={questions.length < 2} onClick={e => {
                              const pos = questions.findIndex(e => e === q);
                              questions.splice(pos, 1);
                              setQuestions([...questions]);
                            }}>Remove question...</Button>
                          </Form.Label>
                          <Form.Control type="text" value={q.question} onChange={event => {
                            const pos = questions.findIndex(e => e === q);
                            questions[pos].question = event.target.value;
                            setQuestions([...questions]);
                          }} />
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                  {q.options.map(o =>
                    <Form key={`${q.id}-${o.id}`}>
                      <Row>
                        <Form.Group className="col-lg-10 pb-2">
                          <Form.Label>Answer {o.id + 1}:</Form.Label>
                          <Form.Control type="text" value={o.text} onChange={event => {
                            const pos = questions.findIndex(e => e === q);
                            const pos2 = questions[pos].options.findIndex(e => e === o);
                            questions[pos].options[pos2].text = event.target.value;
                            setQuestions([...questions]);
                          }} />
                        </Form.Group>

                        <Form.Group className="col-6 col-lg-1 pb-2">
                          <Form.Label>X Axis:</Form.Label>
                          <Form.Control type="number" value={o.xValue > 0 ? `+${o.xValue}` : o.xValue} onChange={event => {
                            const pos = questions.findIndex(e => e === q);
                            const pos2 = questions[pos].options.findIndex(e => e === o);
                            const v = event.target.value;
                            const vn = Number(event.target.value);
                            if (v === "-") vn = -0;
                            else if (event.target.value === "+" || event.target.value === "" ) {}
                            else if (vn != vn) return;
                            questions[pos].options[pos2].xValue = vn;
                            setQuestions([...questions]);
                          }} />
                        </Form.Group>
                        <Form.Group className="col-6 col-lg-1 pb-2">
                          <Form.Label>X Axis:</Form.Label>
                          <Form.Control type="number" value={o.xValue > 0 ? `${o.yValue}` : o.yValue} onChange={event => {
                            const pos = questions.findIndex(e => e === q);
                            const pos2 = questions[pos].options.findIndex(e => e === o);
                            const v = event.target.value;
                            const vn = Number(event.target.value);
                            if (v === "-") vn = -0;
                            else if (event.target.value === "+" || event.target.value === "" ) {}
                            else if (vn != vn) return;
                            questions[pos].options[pos2].yValue = vn;
                            setQuestions([...questions]);
                          }} />
                        </Form.Group>
                      </Row>
                    </Form>
                  )}
                <hr />
                </React.Fragment>
              )}
            </Container>
          </Card>
        </Col>
      </Row>
    </>
  );
}
