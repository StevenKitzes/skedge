import db from '../../helpers/db'

async function handler(req, res) {
  const {slug} = req.query
  const [eventId, userId] = slug

  const readEventPromise = new Promise((resolve, reject) => {
    db.readEvent(eventId, (err, data) => {
      if (err) {
        console.log(`db error: ${JSON.stringify(err)}`)
        return reject(`Error reading Event database: ${JSON.stringify(err)}`)
      }
      if (data == null) {
        return resolve(null)
      }
      return resolve(data.Item)
    })
  })
  const queryUsersPromise = new Promise((resolve, reject) => {
    db.queryEventUsers(eventId, (err, data) => {
      if (err) {
        console.log(`db error: ${JSON.stringify(err)}`)
        return reject(`Error querying User database: ${JSON.stringify(err)}`)
      }
      if (data == null) {
        return resolve(null)
      }
      return resolve(data.Items)
    })
  })

  if (userId) {
    const readUserPromise = new Promise((resolve, reject) => {
      db.readUser(eventId, userId, (err, data) => {
        if (err) {
          console.log(`db error: ${JSON.stringify(err)}`)
          return reject(`Error reading User database: ${JSON.stringify(err)}`)
        }
        if (data == null) {
          return resolve(null)
        }
        return resolve(data.Item)
      })
    })
    await Promise.all([readEventPromise, queryUsersPromise, readUserPromise])
      .then((values) => {
        console.log(`values: ${JSON.stringify(values, null, 2)}`)
        if (!values[0] || !values[1] || !values[2]) return res.status(404).end()
        res.status(200).end(JSON.stringify(values))
      })
      .catch((err) => res.status(500).end(JSON.stringify(err)))
    return
  }

  await Promise.all([readEventPromise, queryUsersPromise])
  .then((values) => {
    console.log(`values: ${JSON.stringify(values, null, 2)}`)
    if (!values[0] || !values[1]) return res.status(404).end()
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
