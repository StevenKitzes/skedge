import { NextApiRequest, NextApiResponse } from 'next'
import type { EventShape, UserShape } from '../../helpers/db'
import db from '../../helpers/db'

type QueryUsersReturnType = UserShape[] | string | null
type ReadEventReturnType = EventShape | string | null
type ReadUserReturnType = UserShape | string | null

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const eventId: string | undefined = req.query?.slug?.[0]
  const userId: string | undefined = req.query?.slug?.[1]
  if (eventId === undefined) {
    throw new Error('Attempted to read event with no ID.')
  }

  const readEventPromise = new Promise<ReadEventReturnType>((resolve, reject) => {
    db.readEvent(eventId, (err, data) => {
      if (err) {
        console.error(`db error: ${JSON.stringify(err)}`)
        return reject(`Error reading Event database: ${JSON.stringify(err)}`)
      }
      if (data == null) {
        return resolve(null)
      }
      return resolve(data.Item)
    })
  })
  const queryUsersPromise = new Promise<QueryUsersReturnType>((resolve, reject) => {
    db.queryEventUsers(eventId, (err, data) => {
      if (err) {
        console.error(`db error: ${JSON.stringify(err)}`)
        return reject(`Error querying User database: ${JSON.stringify(err)}`)
      }
      if (data == null) {
        return resolve(null)
      }
      return resolve(data.Items)
    })
  })

  if (userId) {
    const readUserPromise = new Promise<ReadUserReturnType>((resolve, reject) => {
      db.readUser(eventId, userId, (err, data) => {
        if (err) {
          console.error(`db error: ${JSON.stringify(err)}`)
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
        if (!values[0] || !values[1] || !values[2]) return res.status(404).end()
        res.status(200).end(JSON.stringify(values))
      })
      .catch((err) => res.status(500).end(JSON.stringify(err)))
    return
  }

  await Promise.all([readEventPromise, queryUsersPromise])
  .then((values) => {
    if (!values[0] || !values[1]) return res.status(404).end()
    res.status(200).end(JSON.stringify(values))
  })
  .catch((err) => res.status(500).end(JSON.stringify(err)))
}

export default handler
