const AWS = require('aws-sdk');
const uuid = require('uuid');

AWS.config.update({
  region: 'us-east-2'
});

const db = new AWS.DynamoDB.DocumentClient();

exports.handle = async (event) => {
  const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const newNote = {
    uid: uuid.v4(),
    title: body.title,
    content:  body.content,
    date: Date.now()
  }
  try {
    await db.put({
      TableName: 'Notes',
      Item: newNote
    }).promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify(newNote)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: 'Something went wrong. Check the logs for more info'
      // body: e.message // los errores deben verse en cloud watch :P
    };
  }
};