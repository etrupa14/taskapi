const AWS = require('aws-sdk');

const isOffline = process.env.IS_OFFLINE === 'true';

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: isOffline ? 'localhost' : 'us-east-1',
  endpoint: isOffline ? 'http://localhost:8000' : undefined,
  accessKeyId: isOffline ? 'fakeAccessKeyId' : undefined,
  secretAccessKey: isOffline ? 'fakeSecretAccessKey' : undefined,
});

module.exports = dynamoDb;
