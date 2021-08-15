const aws = require('aws-sdk')

aws.config.update({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  table: process.env.AWS_EVENTS_TABLE,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
})
const eventsClient = new aws.DynamoDB.DocumentClient()

aws.config.update({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  table: process.env.AWS_USERS_TABLE,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
})
const usersClient = new aws.DynamoDB.DocumentClient()

function dynamoGetParams (table, guid) {
  return {
    TableName: table,
    Key: {
      guid
    }
  }
}
function dynamoPutParams (table, data) {
  return {
    TableName: table,
    Item: data
  }
}

// callback should be of the form (err, data) => { ... }
function readEvent (eventId, callback) {
  eventsClient.get(
    dynamoGetParams(process.env.AWS_EVENTS_TABLE, eventId),
    callback
  )
}
function readUser (userId, callback) {
  usersClient.get(
    dynamoGetParams(process.env.AWS_USERS_TABLE, userId),
    callback
  )
}

// callback should be of the form (err) => { ... }
function writeEvent (data, callback) {
  eventsClient.put(
    dynamoPutParams(process.env.AWS_EVENTS_TABLE, data),
    callback
  )
}
function writeUser (data, callback) {
  usersClient.put(
    dynamoPutParams(process.env.AWS_USERS_TABLE, data),
    callback
  )
}

export default {
  readEvent,
  readUser,
  writeEvent,
  writeUser,
}
