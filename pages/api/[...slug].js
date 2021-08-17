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
  const queryUsersPromise = new Promise((resolve, reject) => {
    db.queryEventUsers(eventId, (err, data) => {
      if (err) {
        reject(`Error querying User database: ${JSON.stringify(err)}`)
      }
      resolve(data.Items)
    })
  })

  if (userId) {
    const readUserPromise = new Promise((resolve, reject) => {
      db.readUser(eventId, userId, (err, data) => {
        if (err) {
          reject(`Error reading User database: ${JSON.stringify(err)}`)
        }
        resolve(data.Item)
      })
    })
    await Promise.all([readEventPromise, readUserPromise, queryUsersPromise])
      .then((values) => {
        if (!values[0] || !values[1]) return res.status(404).end()
        res.status(200).end(JSON.stringify(values))
      })
      .catch((err) => res.status(500).end(JSON.stringify(err)))
    return
  }

  await Promise.all([readEventPromise, queryUsersPromise])
  .then((values) => {
    if (!values[0]) return res.status(404).end()
    res.status(200).end(JSON.stringify(values))
  })
  .catch((err) => res.status(500).end(JSON.stringify(err)))
}

export default handler

export const config = {
  api: {
    externalResolver: true,
  },
}
