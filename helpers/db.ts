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

export type KeyType = {
  eventId: string,
  userId: string,
} | {
  eventId: string,
}

export type EventShape = {
  eventName: string,
  eventDesc: string,
  nick: string,
  dates: number[],
  hasTime: boolean,
  eventId: string,
  userId: string,
  finalizedDate: number | null,
  expires: number | null,
}
export type UserShape = {
  eventId: string,
  userId: string,
  nickname: string,
  responses: {
    [key: string]: boolean
  },
  comments: string,
  expires: number | null,
}

export type GetParamsType = {
  TableName: string,
  Key: KeyType,
}
export type PutParamsType = {
  TableName: string,
  Item: UserShape,
}
export type QueryParamsType = {
  TableName: string,
  KeyConditionExpression: string,
  ExpressionAttributeNames: {
    '#ev': string,
  },
  ExpressionAttributeValues: {
    ':id': string
  },
}
export type UpdateParamsType = {
  TableName: string,
  Key: KeyType,
  ExpressionAttributeValues: {
    ':dt': number[],
    ':ed': string,
    ':en': string,
    ':ex': number | null,
    ':fd': number | null,
    ':ht': boolean,
    ':nk': string,
    ':us': string,
  },
  UpdateExpression: string,
}

export type EventDataFromDB = {
  Item: EventShape,
}
export type UserDataFromDB = {
  Item: UserShape,
}
export type UsersDataFromDB = {
  Items: UserShape[],
  Count?: number,
  ScannedCount?: number,
}

function dynamoGetParams (table: string, key: KeyType): GetParamsType {
  return {
    TableName: table,
    Key: key
  }
}
function dynamoPutParams (table: string, data: UserShape): PutParamsType {
  return {
    TableName: table,
    Item: data
  }
}
function dynamoQueryParams (eventId: string): QueryParamsType | void {
  const tableName: string | undefined = process.env.SKEDGE_AWS_USERS_TABLE
  if (tableName === undefined) {
    console.error(`Database error retrieving user information.`)
    return
  }
  return {
    TableName: tableName,
    KeyConditionExpression: '#ev = :id',
    ExpressionAttributeNames: {
      '#ev': 'eventId'
    },
    ExpressionAttributeValues: {
      ':id': eventId
    }
  }
}
function dynamoUpdateEventParams (table: string, key: string, data: EventShape): UpdateParamsType {
  return {
    TableName: table,
    Key: {
      eventId: key,
    },
    ExpressionAttributeValues: {
      ':dt': data.dates,
      ':ed': data.eventDesc,
      ':en': data.eventName,
      ':ex': data.expires,
      ':fd': data.finalizedDate,
      ':ht': data.hasTime,
      ':nk': data.nick,
      ':us': data.userId,
    },
    UpdateExpression: "set dates = :dt, eventDesc = :ed, eventName = :en, expires = :ex, finalizedDate = :fd, hasTime = :ht, nick = :nk, userId = :us",
  }
}

// callback should be of the form (err, data) => { ... }
async function readEvent (eventId: string, callback: (err: string, data: EventDataFromDB) => void) {
  const tableName: string | undefined = process.env.SKEDGE_AWS_EVENTS_TABLE
  if (tableName === undefined) {
    console.error(`Database error retrieving user information.`)
    return
  }
  eventsClient.get(
    dynamoGetParams(tableName, {eventId}),
    callback
  )
}
async function readUser (eventId: string, userId: string, callback: (err: string, data: UserDataFromDB) => void) {
  const tableName: string | undefined = process.env.SKEDGE_AWS_USERS_TABLE;
  if (tableName === undefined) {
    console.error(`Database error retrieving user information.`)
    return
  }
  usersClient.get(
    dynamoGetParams(tableName, {eventId, userId}),
    callback
  )
}

// uses <client>.update which creates or updates existing, depending on context
// callback should be of the form (err) => { ... }
async function writeEvent (eventId: string, data: EventShape, callback: (err: string) => void) {
  const tableName: string | undefined = process.env.SKEDGE_AWS_EVENTS_TABLE;
  if (tableName === undefined) {
    console.error(`Database error retrieving user information.`)
    return
  }
  eventsClient.update(
    dynamoUpdateEventParams(tableName, eventId, data),
    callback
  )
}
// uses <client>.put which always overwrites an entire document
async function writeUser (data: UserShape, callback: (err: string) => void) {
  const tableName: string | undefined = process.env.SKEDGE_AWS_USERS_TABLE;
  if (tableName === undefined) {
    console.error(`Database error retrieving user information.`)
    return
  }
  usersClient.put(
    dynamoPutParams(tableName, data),
    callback
  )
}

// callback should be of the form (err, data) => { ... }
async function queryEventUsers (eventId: string, callback: (err: string, data: UsersDataFromDB) => void) {
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
