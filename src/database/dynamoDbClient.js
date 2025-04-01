const AWS = require('aws-sdk');
require('dotenv').config();

const isOffline = process.env.IS_OFFLINE === 'true';

const options = isOffline
  ? {
      region: 'localhost',
      endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'fakeAccessKeyId',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'fakeSecretAccessKey',
    }
  : {};

const dynamoDb = new AWS.DynamoDB.DocumentClient(options);

module.exports = dynamoDb;
