const aws = require('aws-sdk')

aws.config.update({
  region: process.env.SKEDGE_AWS_REGION,
  endpoint: process.env.SKEDGE_AWS_ENDPOINT,
  table: process.env.SKEDGE_AWS_EVENTS_TABLE,
  accessKeyId: process.env.SKEDGE_AWS_ACCESS_KEY,
  secretAccessKey: process.env.SKEDGE_AWS_SECRET_KEY
})
const eventsClient = new aws.DynamoDB.DocumentClient()

aws.config.update({
  region: process.env.SKEDGE_AWS_REGION,
  endpoint: process.env.SKEDGE_AWS_ENDPOINT,
  table: process.env.SKEDGE_AWS_USERS_TABLE,
  accessKeyId: process.env.SKEDGE_AWS_ACCESS_KEY,
  secretAccessKey: process.env.SKEDGE_AWS_SECRET_KEY
})
const usersClient = new aws.DynamoDB.DocumentClient()

function dynamoGetParams (table, key) {
  return {
    TableName: table,
    Key: key
  }
}
function dynamoPutParams (table, data) {
  return {
    TableName: table,
    Item: data
  }
}
function dynamoQueryParams (eventId) {
  return {
    TableName: process.env.SKEDGE_AWS_USERS_TABLE,
    KeyConditionExpression: '#ev = :id',
    ExpressionAttributeNames: {
      '#ev': 'eventId'
    },
    ExpressionAttributeValues: {
      ':id': eventId
    }
  }
}

// callback should be of the form (err, data) => { ... }
async function readEvent (eventId, callback) {
  eventsClient.get(
    dynamoGetParams(process.env.SKEDGE_AWS_EVENTS_TABLE, {eventId}),
    callback
  )
}
async function readUser (eventId, userId, callback) {
  usersClient.get(
    dynamoGetParams(process.env.SKEDGE_AWS_USERS_TABLE, {eventId, userId}),
    callback
  )
}

// callback should be of the form (err) => { ... }
async function writeEvent (data, callback) {
  eventsClient.put(
    dynamoPutParams(process.env.SKEDGE_AWS_EVENTS_TABLE, data),
    callback
  )
}
async function writeUser (data, callback) {
  usersClient.put(
    dynamoPutParams(process.env.SKEDGE_AWS_USERS_TABLE, data),
    callback
  )
}

// callback should be of the form (err, data) => { ... }
async function queryEventUsers (eventId, callback) {
  usersClient.query(
    dynamoQueryParams(eventId),
    callback
  )
}

export default {
  readEvent,
  readUser,
  writeEvent,
  writeUser,
  queryEventUsers
}
