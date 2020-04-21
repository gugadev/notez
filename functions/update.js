const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-2'
});

const db = new AWS.DynamoDB.DocumentClient();

exports.handle = async (event) => {
  const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const pathParameters = typeof event.pathParameters === 'string' ? JSON.parse(event.pathParameters) : event.pathParameters;

  try {
    await db.update({
      TableName: 'Notes',
      Key: {
        uid: pathParameters.uid,
      },
      UpdateExpression: 'set title = :title, content = :content',
      ExpressionAttributeValues: {
        ':title': body.title,
        ':content': body.content
      },
      ReturnValues: 'UPDATED_NEW'
    }).promise();

    const updated = await db.get({
      TableName: 'Notes',
      Key: {
        uid: pathParameters.uid
      }
    }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(updated.Item)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: 'Something went wrong. Check the logs for more info'
      // body: e.message // los errores deben verse en cloud watch :P
    };
  }
};