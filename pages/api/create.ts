import { NextApiRequest, NextApiResponse } from 'next'

import db, { EventShape, UserShape } from '../../helpers/db'

type WriteEventReturnType = string | void
type WriteUserReturnType = string | void

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const eventData: EventShape = req.body
  const expireDate: Date = new Date()
  expireDate.setMonth(expireDate.getMonth() + 1)
  // trim milliseconds to satisfy AWS requirements
  const expires: number = Math.floor(expireDate.getTime() / 1000)
  const userData: UserShape = {
    eventId: eventData.eventId,
    userId: eventData.userId,
    nickname: eventData.nick,
    responses: {},
    comments: '',
    expires,
  }

  // Create expiry for this event
  eventData.expires = expires

  const writeEventPromise = db.writeEvent(eventData.eventId, eventData)
  const writeUserPromise = db.writeUser(userData)

  await Promise.all([writeEventPromise, writeUserPromise])
    .then(() => res.status(200).end())
    .catch((err) => {
      console.log(`create event error: ${err}`)
      res.status(500).end(JSON.stringify(err))
    })
}

export default handler
