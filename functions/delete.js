const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-2'
});

const db = new AWS.DynamoDB.DocumentClient();

exports.handle = async ({ pathParameters }) => {
  try {
    const deleted = await db.delete({
      TableName: 'Notes',
      Key: {
        uid: pathParameters.uid,
      }
    }).promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify(deleted)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: 'Something went wrong. Check the logs for more info'
    };
  }
};