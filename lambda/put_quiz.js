const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });
const ddb = new AWS.DynamoDB.DocumentClient();
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

function getDTO(statusCode, message, data) {
  return {
    statusCode,
    body: JSON.stringify({
      'success': statusCode === 200 ? true : false,
      'message': statusCode === 200 ? "success" : (message ? message : "failure"),
      'data': data || null,
    })
  };
}

function createQuiz(item) {
  return ddb.put({
    Item: item,
    TableName: process.env.DB_NAME
  }).promise().then(data => {
    return data;
  });
}

exports.handler = async function(event, context) {
  if (!event.body) return getDTO(400, "Must have body");
  const quiz = JSON.parse(event.body);
  // perform data validation
  if (!quiz || !quiz.questions || !quiz.questions.length || !quiz.topTitle ||
      !quiz.bottomTitle || !quiz.leftTitle || !quiz.rightTitle) return getDTO(400, "invalid format");
  // validate all questions
  for (let q of quiz.questions) {
    if (!q.question) return getDTO(400, "questions must have a question");
    if (!q.options || !q.options.length) return getDTO(400, "questions must have answers");
    if (!q.id) return getDTO(400, "questions must have ids");
    for (let a of q.options) {
      if (!a.text || !a.xValue || !a.yValue || !a.id) return getDTO(400, "invalid answer format");
    }
  }
  // filter all text through anti-slur filter
  
  // had to construct a custom file for this... that was not a comfortable experience
  // I'm going to leave this out of the repo. don't want this stuff associated with
  // my name, even if its to keep things civil.
  let raw_slurs = fs.readFileSync('slur_list.txt', 'utf8');
  raw_slurs = raw_slurs.replace(/(\n)/g, "");
  console.log(raw_slurs);
  const slurs = raw_slurs.toLowerCase().split(" ");
  const lbody = event.body.toLowerCase();
  for (const slur of slurs) {
    if (lbody.includes(slur)) return getDTO(400, "lets keep it clean");
  }
  // generate quiz id
  quiz.id = uuidv4();
  // save it to db
  try {
    const qData = await createQuiz(quiz);
    return getDTO(200, "success", qData);
  } catch (e) {
    return getDTO(500, "server failure", e);
  }
};
