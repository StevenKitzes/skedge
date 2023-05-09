import { NextApiRequest, NextApiResponse } from 'next'

import db from '../../helpers/db'
import type { UserShape } from '../../helpers/db'

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const userData: UserShape = req.body

  db.writeUser(userData, (err) => {
    if (err) {
      return res.status(500).end(`Failed to write user to DB: ${err}`)
    }
    return res.status(200).end()
  })
}

export default handler
