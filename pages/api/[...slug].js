import db from '../../helpers/db'

async function handler(req, res) {
  const {slug} = req.query
  const [eventId, userId] = slug

  console.log(`slug handler called`)

  const readEventPromise = new Promise((resolve, reject) => {
    console.log(`making read event call...`)
    db.readEvent(eventId, (err, data) => {
      if (err) {
        console.log('read event failed')
        reject(`Error reading Event database: ${JSON.stringify(err)}`)
      }
      console.log('read event succeeded')
      resolve(data.Item)
    })
  })
  console.log(`between reads ...`)
  const readUserPromise = new Promise((resolve, reject) => {
    console.log(`making read user call...`)
    db.readUser(eventId, userId, (err, data) => {
      if (err) {
        console.log('read user failed')
        reject(`Error reading User database: ${JSON.stringify(err)}`)
      }
      console.log('read user succeeded')
      resolve(data.Item)
    })
  })

  await Promise.all([readEventPromise, readUserPromise])
    .then((values) => res.status(200).end(JSON.stringify(values)))
    .catch((err) => res.status(500).end(JSON.stringify(err)))
}

export default handler

export const config = {
  api: {
    externalResolver: true,
  },
}
