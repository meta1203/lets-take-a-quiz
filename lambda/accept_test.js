const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });
const ddb = new AWS.DynamoDB.DocumentClient();

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
  if (!quiz || !quiz.questions || !quiz.questions.length || !quiz.topTitle
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
  // TODO: filter all text through anti-slur filter

  // TODO: generate quiz id
  quiz.id = "i'm an ID :)";
  try {
    const qData = await createQuiz(quiz);
    return getDTO(200, "success", qData);
  } catch (e) {
    return getDTO(500, "server failure", e);
  }
}
