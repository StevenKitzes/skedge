import { NextApiRequest, NextApiResponse } from 'next'

import db from '../../helpers/db'
import type { EventShape } from '../../helpers/db'

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const eventData: EventShape = req.body

  await db.writeEvent(eventData.eventId, eventData, (err) => {
    if (err) {
      res.status(500).end(JSON.stringify(err))
    } else {
      res.status(200).end()
    }
  })
}

export default handler
