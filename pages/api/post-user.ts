import { NextApiRequest, NextApiResponse } from 'next'

import db from '../../helpers/db'
import type { UserShape } from '../../helpers/db'
import type { WriteResult } from '../../helpers/db'

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const userData: UserShape = req.body

  const result: WriteResult = await db.writeUser(userData)
  
  if (result.success) res.status(200).end()
  else res.status(500).end(result.message)
}

export default handler
