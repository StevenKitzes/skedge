import db from '../../helpers/db'

async function handler(req, res) {
  const eventData = {}
  // ensure only expected params are used
  eventData.eventId = req.body.eventId
  eventData.dates = req.body.dates
  eventData.eventDesc = req.body.eventDesc
  eventData.eventName = req.body.eventName
  eventData.expires = req.body.expires
  eventData.finalizedDate = req.body.finalizedDate
  eventData.hasTime = req.body.hasTime
  eventData.nick = req.body.nick
  eventData.userId = req.body.userId

  await db.writeEvent(eventData.eventId, eventData, (err) => {
    if (err) {
      res.status(500).end(JSON.stringify(err))
    } else {
      res.status(200).end()
    }
  })
}

export default handler
