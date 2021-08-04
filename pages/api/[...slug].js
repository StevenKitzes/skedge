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
        console.log(`db error: ${JSON.stringify(err, null, 2)}`);
    } else {
        console.log(`db success`);
    }
  });

  res.end(`created dynamo record (probably)`)
}

export default handler
