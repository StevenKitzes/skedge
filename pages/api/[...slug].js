const aws = require('aws-sdk')

aws.config.update({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  table: process.env.AWS_TABLE,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

const dynamoClient = new aws.DynamoDB.DocumentClient();

function handler(req, res) {
  const {slug} = req.query
  const [eventId, userId] = slug

  const dynamoPutParams = {
    TableName: process.env.AWS_TABLE,
    Item: {
      guid: 'test', eventId, userId
    }
  }
  dynamoClient.put(dynamoPutParams, (err) => {
    if (err) {
      const msg = `db error: ${JSON.stringify(err, null, 2)}`
      console.log(msg)
      return res.end(msg)
    }

    console.log('db put success')
    const dynamoGetParams = {
      TableName: process.env.AWS_TABLE,
      Key: {
        guid: 'test'
      }
    }
    dynamoClient.get(dynamoGetParams, (getErr, data) => {
      if (getErr) {
        console.log(`db get error: ${getErr}`)
        return res.end(`put success but get fail: ${getErr}`)
      }

      console.log(`db all success!`)
      return res.end(`successful put and get: ${JSON.stringify(data, null, 2)}`)
    })
  });
}

export default handler

export const config = {
  api: {
    externalResolver: true,
  },
}
