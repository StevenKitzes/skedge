import db from '../../helpers/db'

async function handler(req, res) {
  const eventData = req.body
  console.log(`create handler eventData: ${JSON.stringify(eventData, null, 2)}`)
  const expireDate = new Date()
  expireDate.setMonth(expireDate.getMonth() + 1)
  // trim milliseconds to satisfy AWS requirements
  const expires = Math.floor(expireDate.getTime() / 1000)
  const userData = {
    eventId: eventData.eventId,
    userId: eventData.userId,
    nickname: eventData.nick,
    responses: {},
    comments: '',
    expires
  }

  // Create expiry for this event
  eventData.expires = expires

  const writeEventPromise = new Promise((resolve, reject) => {
    db.writeEvent(eventData.eventId, eventData, (err) => {
      if (err) {
        reject(`Failed to write event to DB: ${err}`)
      }
      resolve()
    })
  })
  const writeUserPromise = new Promise((resolve, reject) => {
    db.writeUser(userData, (err) => {
      if (err) {
        reject(`Failed to write user to DB: ${err}`)
      }
      resolve()
    })
  })

  await Promise.all([writeEventPromise, writeUserPromise])
    .then(() => res.status(200).end())
    .catch((err) => {
      console.log(`create event error: ${err}`)
      res.status(500).end(JSON.stringify(err))
    })
}

export default handler
