import db from '../../helpers/db'

async function handler(req, res) {
  const data = req.body
  const expireDate = new Date()
  expireDate.setMonth(expireDate.getMonth() + 1)
  const expires = Math.floor(expireDate.getTime() / 1000)

  // Create expiry for this event and trim milliseconds to satisfy AWS requirements
  data.expires = expires

  const writeEventPromise = new Promise((resolve, reject) => {
    db.writeEvent(data, (err) => {
      if (err) {
        reject(`Failed to write event to DB: ${err}`)
      }
      resolve()
    })
  })
  const writeUserPromise = new Promise((resolve, reject) => {
    const userData = {
      eventId: data.eventId,
      userId: data.userId,
      nickname: data.nick,
      responses: [],
      comments: '',
      expires
    }
    db.writeUser(userData, (err) => {
      if (err) {
        reject(`Failed to write user to DB: ${err}`)
      }
      resolve()
    })
  })

  await Promise.all([writeEventPromise, writeUserPromise])
    .then(() => res.status(200).end())
    .catch((err) => res.status(500).end(JSON.stringify(err)))
}

export default handler
