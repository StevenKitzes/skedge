import db from '../../helpers/db'

async function handler(req, res) {
  const {slug} = req.query
  const [eventId, userId] = slug

  const readEventPromise = new Promise((resolve, reject) => {
    db.readEvent(eventId, (err, data) => {
      if (err) {
        reject(`Error reading Event database: ${JSON.stringify(err)}`)
      }
      resolve(data.Item)
    })
  })
  const readUserPromise = new Promise((resolve, reject) => {
    db.readUser(eventId, userId, (err, data) => {
      if (err) {
        reject(`Error reading User database: ${JSON.stringify(err)}`)
      }
      resolve(data.Item)
    })
  })
  const queryUsersPromise = new Promise((resolve, reject) => {
    db.queryEventUsers(eventId, (err, data) => {
      if (err) {
        reject(`Error querying User database: ${JSON.stringify(err)}`)
      }
      resolve(data.Items)
    })
  })

  await Promise.all([readEventPromise, readUserPromise, queryUsersPromise])
    .then((values) => res.status(200).end(JSON.stringify(values)))
    .catch((err) => res.status(500).end(JSON.stringify(err)))
}

export default handler

export const config = {
  api: {
    externalResolver: true,
  },
}
