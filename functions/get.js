const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-2'
});

const db = new AWS.DynamoDB.DocumentClient();

exports.handle = async ({ pathParameters }) => {
  try {
    const notes = await db.get({
      TableName: 'Notes',
      Key: {
        uid: pathParameters.uid
      }
    }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(notes.Item)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: 'Something went wrong. Check the logs for more info'
      // body: e.message // los errores deben verse en cloud watch :P
    };
  }
};