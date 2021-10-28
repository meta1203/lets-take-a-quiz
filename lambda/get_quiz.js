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

function getQuiz(id) {
  return ddb.get({
    TableName: process.env.DB_NAME,
    Key: {
      'id': id
    }
  }).promise().then(data => {
    if (data.Item) {
      return data.Item;
    } else {
      return null;
    }
  });
}

exports.handler = async function(event, context) {
  if (!event.pathParameters || !event.pathParameters.id) return getDTO(404, "quiz not found");
  const id = event.pathParameters.id;
  
  try {
    const quiz = await getQuiz(id);
    if (quiz) return getDTO(200, "success", quiz);
    else return getDTO(404, "quiz not found");
  } catch (e) {
    return getDTO(500, "server failure", e);
  }
};
