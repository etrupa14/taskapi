const { v4: uuidv4 } = require('uuid');
const dynamoDb = require('../database/dynamoDbClient');
const { TABLE_NAME } = require('../database/models/taskModel');

exports.getAllTasks = async (query = {}) => {
  const { search = '', limit = 10, lastKey } = query;

  const params = {
    TableName: TABLE_NAME,
    Limit: Number(limit),
  };

  if (search) {
    params.FilterExpression = 'contains(#title, :search)';
    params.ExpressionAttributeNames = {
      '#title': 'title',
    };
    params.ExpressionAttributeValues = {
      ':search': search.trim(),
    };
  }

  if (lastKey) {
    params.ExclusiveStartKey = { id: lastKey };
  }

  const result = await dynamoDb.scan(params).promise();

  return {
    items: result.Items,
    nextPageKey: result.LastEvaluatedKey?.id || null,
  };
};

exports.getTaskById = async (id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };

  const result = await dynamoDb.get(params).promise();
  return result.Item;
};

exports.createTask = async (payload) => {
  const { title, description = '', status = 'To Do' } = payload;

  const task = {
    id: uuidv4(),
    title,
    description,
    status,
  };

  await dynamoDb.put({
    TableName: TABLE_NAME,
    Item: task,
  }).promise();

  return task;
};

exports.updateTask = async (id, payload) => {
  const { title, description = '', status } = payload;

  const result = await dynamoDb.update({
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set title = :title, description = :desc, #status = :status',
    ExpressionAttributeNames: {
      '#status': 'status',
    },
    ExpressionAttributeValues: {
      ':title': title,
      ':desc': description,
      ':status': status,
    },
    ReturnValues: 'ALL_NEW',
  }).promise();

  return result.Attributes;
};

exports.deleteTask = async (id) => {
  await dynamoDb.delete({
    TableName: TABLE_NAME,
    Key: { id },
  }).promise();
};
